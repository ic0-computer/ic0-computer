// please do not import any types from your project outside migrations folder here
// it can lead to bugs when you change those types later, because migration types should not be changed
// you should also avoid importing these types anywhere in your project directly from here
// use MigrationTypes.Current property instead

import SB "mo:stablebuffer/StableBuffer"; 
import Map "mo:map/Map";

module {

  public type State = {
    // this is the data you previously had as stable variables inside your actor class
    var admins: SB.StableBuffer<Principal>;
    var deployer: Principal;

    var users: Map.Map<Principal, ?User>;
    var principals: Map.Map<Principal, PrincipalStatus>;
  };

  ///////////////////////////////////
  //        DATA STRUCTURES        //
  ///////////////////////////////////
  
  public type User = {
    subsidiaries: [Subsidiary];
    add_requests: [Principal];
    init_time: Int;
    display_name: Text;
    handle: ?Text;
  };

  public type Subsidiary = {
    principal: Principal;
    wallet_type: WalletType;
  };

  public type WalletType = {
    #Stoic;
    #Plug;
    #Bitfinity;
    #Seed;
    #Unspecified;
  };

  public type PrincipalStatus = {
    #Primary;
    #Subsidiary: { 
      primary: Principal; 
    };
    #Unused;
  };

  ///////////////////////////////////
  //        REQUEST TYPES          //
  ///////////////////////////////////

  public type AdminGetRequest = {
    #Admins;
    #Users;
    #Principals;
  };

  public type AdminSetRequest = {
    #Add: [Principal];
    #Remove: [Principal];
    #Reset;
  };
  
  public type ManageSubsidiariesRequest = {
    #AddRequest: [Principal];
    #RemoveSubsidiaries: [Principal];
    #Confirm: { primary: Principal; wallet: WalletType};
    #ClearRequests;
  };
  
  public type ManagePrimaryRequest = {
    #Init: {
      display_name: Text;
    };
    #DeleteUser;
  };

};