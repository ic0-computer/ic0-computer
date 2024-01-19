<script lang="ts"> 
  // @ts-ignore
  import { idlFactory } from "../../../.dfx/local/canisters/profile/service.did.js"
  // @ts-ignore
  import { Connect2ICProvider} from "@connect2ic/svelte";
  import { createClient } from "@connect2ic/core";
  import { InfinityWallet, StoicWallet, PlugWallet, NFID, AstroX } from "@connect2ic/core/providers";
  import "@connect2ic/core/style.css"
  import ConnectSubsidiary from "../components/ConnectSubsidiary.svelte";

  // Initialize connect2IC client
  const client = createClient({
    canisters: {
      ["sub"]: {
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
  });

</script>

<!-- Context for Connect2IC -->
<Connect2ICProvider client={client}>
  <ConnectSubsidiary />
</Connect2ICProvider>
