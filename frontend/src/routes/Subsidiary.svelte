<script lang="ts"> 
  import { createClient } from "@connect2ic/core";
  import { InfinityWallet, StoicWallet, PlugWallet, NFID, AstroX } from "@connect2ic/core/providers";
  import { Connect2ICProvider, ConnectDialog, ConnectButton, useConnect, useCanister } from "@connect2ic/svelte";
  import { idlFactory } from "../../../.dfx/local/canisters/profile/service.did.js"

  // initialize client
  const client = createClient({
    canisters: {
      ["profile"]: {
        canisterId: "krcn7-paaaa-aaaak-qcnla-cai",
        idlFactory: idlFactory,
      },
    },
    providers: [
      new StoicWallet(),
      new PlugWallet(),
      new InfinityWallet(),
      new NFID(),
      new AstroX(),
    ],
    globalProviderConfig: {
      dev: false,
      host: "https://icp-api.io",
      appName: "ic0.computer",
      whitelist: ["krcn7-paaaa-aaaak-qcnla-cai"],
    },
  })

  // const { principal, disconnect } = useConnect({});
  // const [profile] = useCanister("profile");

  // let displayNameInput = '';

  // const do_it = async () => {
  //   let manage_primary = await $profile.manage_primary({
  //     Init: {
  //       display_name: displayNameInput
  //     }
  //   });
  //   console.log("manage_primary", manage_primary);
  // };

</script>

<p>
Hej
</p>

<Connect2ICProvider client={client}>
  <div>Add Subsidiary</div>

  <ConnectButton />
  <div class="absolute top-0 left-0 w-screen h-screen">
    <ConnectDialog />
  </div>

  <!-- <h1>{$principal}</h1> -->
</Connect2ICProvider>
