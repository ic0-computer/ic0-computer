import MigrationTypes "../types";
import V00_00_01 "./types";
import SB "mo:stablebuffer/StableBuffer";
import Map "mo:map/Map";

module {

  let { phash } = Map;

  public func upgrade(prev_migration_state: MigrationTypes.State, args: MigrationTypes.Args): MigrationTypes.State {
    return #v0_0_1(#data({
        // should only initialize admins array and ledger on first deploy
        var admins = SB.fromArray<Principal>([args.deployer]);
        var deployer = args.deployer;

        var principals = Map.new<Principal, V00_00_01.PrincipalStatus>(phash);
        var users = Map.new<Principal, ?V00_00_01.User>(phash);
      }));
  };

  //////////////////////////////////////////////////////////////////////////

  public func downgrade(migration_state: MigrationTypes.State, args: MigrationTypes.Args): MigrationTypes.State {
    return #v0_0_0(#data);
  };

};