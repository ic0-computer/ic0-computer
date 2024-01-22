import MigrationTypes "./migrations/types";
import R "mo:base/Result";

module {

  let ST = MigrationTypes.Current;

  ///////////////////////////////////
  //     FUNCTION RETURN TYPES     //
  ///////////////////////////////////

  public type VoidResult = R.Result<(), Text>;
  public type TextResult = R.Result<Text, Text>;
  public type PrincipalArrayResult = R.Result<[Principal], Text>;
  public type UserResult = R.Result<ST.User, Text>;
  public type AdminGetReturn = {
    #Unauthorized;
    #Principals : [(Principal, ST.PrincipalStatus)];
    #Users : [(Principal, ?ST.User)];
    #Admins : [Principal];
  };

};
