<script lang="ts"> 
  import { createClient } from "@connect2ic/core";
  import { InfinityWallet, StoicWallet, PlugWallet, NFID, AstroX } from "@connect2ic/core/providers";
  import { Connect2ICProvider} from "@connect2ic/svelte";
  import { idlFactory } from "../../../.dfx/local/canisters/profile/service.did.js"
  import ConnectSubsidiary from "../components/ConnectSubsidiary.svelte";
  import "@connect2ic/core/style.css"

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

</script>

<Connect2ICProvider client={client}>
  <ConnectSubsidiary />
</Connect2ICProvider>
