
import V00_00_01 "./v000_000_001";
import MigrationTypes "./types";
import D "mo:base/Debug";

module {
  
  // do not forget to add your new migration upgrade method here
  let upgrades = [
    V00_00_01.upgrade,
    
  ];

  // do not forget to add your new migration downgrade method here
  let downgrades = [
    V00_00_01.downgrade,
    
  ];

  // do not forget to add your new migration id here
  // should be increased by 1 as it will be later used as an index to get upgrade/downgrade methods
  func getMigrationId(state: MigrationTypes.State): Nat {
    return switch (state) {
      case (#v0_0_0(_)) 0;
      case (#v0_0_1(_)) 1;

    };
  };

  public func migrate(
    prevState: MigrationTypes.State, 
    nextState: MigrationTypes.State, 
    args: MigrationTypes.Args
  ): MigrationTypes.State {

    // D.print("in migrate" # debug_show(prevState));
    var state = prevState;
    var migrationId = getMigrationId(prevState);
    // D.print("getting migration id");
    let nextMigrationId = getMigrationId(nextState);
    // D.print(debug_show(nextMigrationId));

    while (migrationId != nextMigrationId) {
      // D.print("in nft while" # debug_show((nextMigrationId, migrationId)));
      let migrate = if (nextMigrationId > migrationId) upgrades[migrationId] else downgrades[migrationId - 1];
      // D.print("upgrade should have run");
      migrationId := if (nextMigrationId > migrationId) migrationId + 1 else migrationId - 1;
      state := migrate(state, args);
    };

    return state;
  };
};