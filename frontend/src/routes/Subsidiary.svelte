<script lang="ts"> 
  //@ts-ignore
  import { connectr, state } from "../libs/store";
  import { onMount } from "svelte";
  // assets
  import stoic from "../assets/stoic.png"
  import bitfinity from "../assets/bitfinity.png"
  import plug from "../assets/plug.svg"
  import seed from "../assets/seed.png"
  
  onMount(() => {
    $state.page = "Subsidiary";
  })

  const askForSeed = async () => {
    const seedValue = window.prompt("Enter seed... (not recommended)");
    if (seedValue !== null) {
      await $connectr.connectr.seedCreate(seedValue);
    }
  }
</script>

<div class="p-3 mb-6">
  <button on:click={$connectr.connectr.stoicConnect}>
    <img class="h-10" src={stoic} alt="Stoic Connect">
  </button>

  <button on:click={$connectr.connectr.plugConnect}>
    <img class="h-10" src={plug} alt="Plug Connect">
  </button>

  <button on:click={$connectr.connectr.bitfinityConnect}>
    <img class="h-10" src={bitfinity} alt="Bitfinity Connect">
  </button>

  <button on:click={askForSeed}>
    <img class="h-10" src={seed} alt="Seed Connect">
  </button>
</div>

<button class="btn btn-outline" on:click={async () => console.log($connectr.connectr.getStore())}>Get Store</button>
