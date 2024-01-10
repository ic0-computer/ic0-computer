import V00_00_01 "./v000_000_001/types";

module {
  // do not forget to change current migration when you add a new one
  // you should use this field to import types from you current migration anywhere in your project
  // instead of importing it from migration folder itself
  public let Current = V00_00_01;

  // you can add any fields here to pass external data to your migrations
  public type Args = {
    deployer: Principal;
  };

  // do not forget to add your new migration state types here
  public type State = {
    #v0_0_0: { #id; #data: () };
    #v0_0_1: { #id; #data: V00_00_01.State };
  };
  
};