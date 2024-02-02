<script lang="ts"> 
  //@ts-ignore
  import { idlFactory } from "../../../.dfx/local/canisters/profile/service.did.js"
  import { createConnectr } from "@ic0-computer/connectr";
  import { state } from "../libs/store";
  import { onMount } from "svelte";
  import { LEDGER_CANISTER_ID } from "../libs/constants.js";
  // assets
  import stoic from "../assets/stoic.png"
  import bitfinity from "../assets/bitfinity.png"
  import plug from "../assets/plug.svg"
  import seed from "../assets/seed.png"
  
  onMount(() => {
    $state.page = "Subsidiary";
  })

  const connectr = createConnectr({
    whitelist: ["krcn7-paaaa-aaaak-qcnla-cai", LEDGER_CANISTER_ID],
    host: "https://icp0.io",
  });

  const askForSeed = async () => {
    const seedValue = window.prompt("Enter seed... (not recommended)");
    if (seedValue !== null) {
      await connectr.seedCreate(seedValue);
    }
  }
</script>

<div class="p-3 mb-6">
  <button on:click={connectr.stoicConnect}>
    <img class="h-10" src={stoic} alt="Stoic Connect">
  </button>

  <button on:click={connectr.plugConnect}>
    <img class="h-10" src={plug} alt="Plug Connect">
  </button>

  <button on:click={connectr.bitfinityConnect}>
    <img class="h-10" src={bitfinity} alt="Bitfinity Connect">
  </button>

  <button on:click={askForSeed}>
    <img class="h-10" src={seed} alt="Seed Connect">
  </button>
</div>

<button class="btn btn-outline" on:click={async () => console.log(connectr.getStore())}>Get Store</button>
