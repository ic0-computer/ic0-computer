import Array "mo:base/Array";
import Text "mo:base/Text";
import Char "mo:base/Char";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Option "mo:base/Option";
import D "mo:base/Debug";
import SB "mo:stablebuffer/StableBuffer";
import Map "mo:map/Map";

import MigrationTypes "./migrations/types";
import Migrations "./migrations";
import Types "./types";

shared ({ caller = deployer }) actor class RegistrationCanister() = this {

  ///////////////////////////////////
  //          MIGRATIONS           //
  ///////////////////////////////////

  // State types
  let ST = MigrationTypes.Current;

  // Single upgradable/downgradable stable variable for all variables
  stable var migration_state : MigrationTypes.State = #v0_0_0(#data);

  // Do not forget to change versions (ex. #v0_2_0) when you are adding a new migration
  // If you use a previous state instead of #v0_2_0 it will downgrade
  migration_state := Migrations.migrate(migration_state, #v0_0_1(#id), { deployer = deployer });

  // SV is where we can access all stable variables
  let SV = switch (migration_state) {
    case (#v0_0_1(#data(state))) state;
    case (_) D.trap("Unexpected migration state");
  };

  ///////////////////////////////////
  //             USER              //
  ///////////////////////////////////

  // manage user data such as initialize or delete
  public shared ({ caller }) func manage_primary(request : ST.ManagePrimaryRequest) : async Types.TextResult {
    if (Principal.isAnonymous(caller)) { return #err "Anonymous principal" };
    switch (request) {
      case (#Init(init_data)) {
        // validate display name length
        if (init_data.display_name.size() <= 3) {
          return #err("Display name must be more than 3 characters long");
        } else if (init_data.display_name.size() > 30) {
          return #err("Display name must not be more than 30 characters long");
        };

        // validate chars
        switch (__findInvalidChar(init_data.display_name)) {
          case (?char) { return #err("\'" # Char.toText(char) # "\' is not a valid character for a display name") };
          case (null) {};
        };

        // check to see if principal is already in use
        switch (Map.get(SV.principals, phash, caller)) {
          case (?status) {
            switch (status) {
              case (#Primary) {
                return #err("Caller principal has already been initialized");
              };
              case (#Subsidiary(primary)) {
                return #err("Caller principal is already being used as a subsidiary of principal  " # Principal.toText(primary.primary));
              };
              case (#Unused) {};
            };
          };
          case (null) {};
        };

        // add user
        let user_data = {
          subsidiaries = [];
          add_requests = [];
          init_time = Time.now();
          display_name = init_data.display_name;
          handle = null;
        };
        Map.set(SV.users, phash, caller, ?user_data);

        // add to principals list
        Map.set(SV.principals, phash, caller, #Primary);

        #ok("Init success");
      };
      // DANGER ZONE!!
      case (#DeleteUser) {
        // reset user data
        Map.set(SV.users, phash, caller, null);

        // set principal to unused
        Map.set(SV.principals, phash, caller, #Unused);

        #ok("Delete Success");
      };
    };
  };

  // manage subsidiaries of a user account
  public shared ({ caller }) func manage_subsidiaries(request : ST.ManageSubsidiariesRequest) : async Types.PrincipalArrayResult {
    if (Principal.isAnonymous(caller)) { return #err "Anonymous principal" };
    switch (request) {
      // note: duplicates are possible
      case (#AddRequest(principals)) {
        let user_data : ST.User = switch (Map.get(SV.users, phash, caller)) {
          case (?val) { switch (val) { case (null) { return #err("Could not get caller's data") }; case (?v) { v } } };
          case (null) { return #err("Could not get caller's data") };
        };
        if (principals.size() == 0) { return #err("Principal array is empty") };

        // max 10 requests
        if (user_data.add_requests.size() + principals.size() > 10) return #err("User cannot have more than 10 add requests");

        // check to see if a principal is already in use elsewhere
        for (principal in principals.vals()) {
          switch (Map.get(SV.principals, phash, principal)) {
            case (null) {};
            case (?found) {
              switch (found) {
                case (#Primary) { return #err("Principal " # Principal.toText(principal) # " is already in use.") };
                case (#Subsidiary(primary)) {
                  return #err("Principal " # Principal.toText(principal) # " is already in use.");
                };
                case (#Unused) {};
              };
            };
          };
        };

        // append new add requests
        let new_user_data = {
          subsidiaries = user_data.subsidiaries;
          add_requests = Array.append(user_data.add_requests, principals);
          init_time = user_data.init_time;
          display_name = user_data.display_name;
          handle = user_data.handle;
        };
        Map.set(SV.users, phash, caller, ?new_user_data);

        // return new add requests array if succesful
        #ok(new_user_data.add_requests);
      };
      // remove specified subsidiaries from account
      case (#RemoveSubsidiaries(principals)) {
        let user_data : ST.User = switch (Map.get(SV.users, phash, caller)) {
          case (?val) { switch (val) { case (null) { return #err("Could not get caller's data") }; case (?v) { v } } };
          case (null) { return #err("Could not get caller's data") };
        };
        if (principals.size() == 0) { return #err("Principal array is empty") };

        // verify all subsidiaries exist
        for (principal in principals.vals()) {
          switch (Array.find<Principal>(user_data.subsidiaries, func x = x == principal)) {
            case (?match) {};
            case (null) { return #err(Principal.toText(principal) # " is not a subsidiary principal") };
          };
        };

        // remove principals from user_data.subsidiaries
        let new_subsidiaries = Array.filter<Principal>(
          user_data.subsidiaries,
          func(p) {
            Option.isNull(Array.find<Principal>(principals, func(x) { x == p }));
          },
        );
        let new_user_data = {
          subsidiaries = new_subsidiaries;
          add_requests = user_data.add_requests;
          init_time = user_data.init_time;
          display_name = user_data.display_name;
          handle = user_data.handle;
        };
        Map.set(SV.users, phash, caller, ?new_user_data);

        // set principals to #Unused in principals registry
        for (principal in principals.vals()) {
          Map.set(SV.principals, phash, principal, #Unused);
        };

        // return new subsidiaries array if succesful
        #ok(new_subsidiaries);
      };
      // confirm add request from subsidiary principal
      case (#Confirm(principal)) {
        // attempt to get specified principal's data
        let user_data : ST.User = switch (Map.get(SV.users, phash, principal)) {
          case (?val) { switch (val) { case (null) { return #err("Could not find add request") }; case (?v) { v } } };
          case (null) { return #err("Could not find add request") };
        };

        // max subsidiaries - 25
        if (user_data.subsidiaries.size() > 25) { return #err("User cannot have more than 25 subsidiary principals") };

        // verify that caller is not already on the principal registry
        let caller_on_registry = Map.get(SV.principals, phash, caller);
        switch (caller_on_registry) {
          case (?found) {
            switch (found) {
              case (#Primary) {
                // remove caller from add requests
                let new_add_requests = Array.filter<Principal>(user_data.add_requests, func x = x != caller);
                let new_user_data = {
                  subsidiaries = user_data.subsidiaries;
                  add_requests = new_add_requests;
                  init_time = user_data.init_time;
                  display_name = user_data.display_name;
                  handle = user_data.handle;
                };
                Map.set(SV.users, phash, caller, ?new_user_data);

                return #err("Caller principal has already been initialized as a primary account");
              };
              case (#Subsidiary(primary)) {
                // remove caller from add requests
                let new_add_requests = Array.filter<Principal>(user_data.add_requests, func x = x != caller);
                let new_user_data = {
                  subsidiaries = user_data.subsidiaries;
                  add_requests = new_add_requests;
                  init_time = user_data.init_time;
                  display_name = user_data.display_name;
                  handle = user_data.handle;
                };
                Map.set(SV.users, phash, principal, ?new_user_data);

                return #err("Caller principal is already being used as a subsidiary of principal " # Principal.toText(primary.primary));
              };
              case (#Unused) {};
            };
          };
          case (null) {};
        };

        // If caller principal is unused check to see if principal has an add request
        switch (Array.find<Principal>(user_data.add_requests, func x = x == caller)) {
          // Same error text as before
          case (null) { return #err("Could not find add request") };
          case (?found) {
            // remove all add requests for caller (including duplicates)
            let new_add_requests = Array.filter<Principal>(user_data.add_requests, func x = x != caller);
            // add caller as a subsidiary
            let new_subsidiaries = Array.append(user_data.subsidiaries, [caller]);
            // update add requests
            let new_user_data = {
              subsidiaries = new_subsidiaries;
              add_requests = new_add_requests;
              init_time = user_data.init_time;
              display_name = user_data.display_name;
              handle = user_data.handle;
            };
            Map.set(SV.users, phash, caller, ?new_user_data);

            // add to principals list
            Map.set(SV.principals, phash, caller, #Subsidiary({ primary = principal }));

            // return caller principal if confirm is succesful
            #ok([caller]);
          };
        };
      };
      // clear all pending add requests
      case (#ClearRequests) {
        let user_data : ST.User = switch (Map.get(SV.users, phash, caller)) {
          case (?val) { switch (val) { case (null) { return #err("Could not get caller's data") }; case (?v) { v } } };
          case (null) { return #err("Could not get caller's data") };
        };
        let new_user_data = {
          subsidiaries = user_data.subsidiaries;
          add_requests = [];
          init_time = user_data.init_time;
          display_name = user_data.display_name;
          handle = user_data.handle;
        };
        Map.set(SV.users, phash, caller, ?new_user_data);
        #ok(new_user_data.add_requests);
      };
    };
  };

  //
  // !! temp
  //
  public shared query ({ caller }) func get() : async ?ST.User {
    let data = Option.flatten(Map.get(SV.users, phash, caller));
    return data;
  };
  //
  // !!
  //

  ///////////////////////////////////
  //             ADMIN             //
  ///////////////////////////////////

  public shared ({ caller }) func _admin_set(request : ST.AdminSetRequest) : async Types.TextResult {
    if (__is_admin(caller) == false) { return #err("Unauthorized") };
    switch (request) {
      // add admins from array
      case (#Add(new_admins)) {
        let admins_copy = SV.admins;
        for (principal in Array.vals(new_admins)) {
          if (__is_admin(principal)) {
            // if duplicate, revert back to original buffer
            SV.admins := admins_copy;
            return #err("Admin is already in the list");
          } else {
            SB.add(SV.admins, principal);
          };
        };
        #ok("Add success");
      };
      // remove admins from array
      case (#Remove(removals)) {
        for (principal in Array.vals(removals)) {
          if (__is_admin(principal) == false) { return #err("Admin not found") };
          if (principal == deployer) { return #err("Cannot remove deployer as admin") };
        };
        var admin_array = SB.toArray(SV.admins);
        admin_array := Array.filter<Principal>(
          admin_array,
          func(admin) {
            Option.isNull(Array.find<Principal>(removals, func(x) { x == admin }));
          },
        );
        SV.admins := SB.fromArray<Principal>(admin_array);
        #ok("Removal success");
      };
      // reset admins to only deployer
      case (#Reset) {
        SV.admins := SB.fromArray<Principal>([deployer]);
        #ok("Reset success");
      };
    };
  };

  public shared query ({ caller }) func _admin_get(request : ST.AdminGetRequest) : async Types.AdminGetReturn {
    if (__is_admin(caller) == false) { return #Unauthorized };
    switch (request) {
      // nyi - audit
      case (#Admins) { return #Admins(SB.toArray(SV.admins)) };
      case (#Users) { return #Users(Map.toArray(SV.users)) };
      case (#Principals) { return #Principals(Map.toArray(SV.principals)) };
    };
  };

  public shared ({ caller }) func _admin_testing_clear() : async Bool {
    if (__is_admin(caller) == false) { return false };
    Map.clear(SV.principals);
    Map.clear(SV.users);
    true;
  };

  ///////////////////////////////////
  //       Helper Functions        //
  ///////////////////////////////////

  private func __is_admin(principal : Principal) : Bool {
    for (admin in SB.vals(SV.admins)) {
      if (principal == admin) { return true };
    };
    false;
  };

  private let __allowedChars : [Char] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '_', '-', '.',
  ];

  // returns null if all chars are valid
  private func __findInvalidChar(phrase : Text) : ?Char {
    for (c in Text.toIter(phrase)) {
      if (Array.find<Char>(__allowedChars, func x = x == c) == null) { return ?c };
    };
    null;
  };

  // Hash Map hashes
  let { phash } = Map;

};
