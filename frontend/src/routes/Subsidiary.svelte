<script lang="ts"> 
  import { createConnectr } from "../libs/connectr";
  import { writable } from "svelte/store";
  //@ts-ignore
  import { idlFactory } from "../../../.dfx/local/canisters/profile/service.did.js"
  import { state } from "../libs/store";
  import { onMount } from "svelte";

  onMount(() => {
    $state.page = "Subsidiary";
  })

  let agent;
  let seedValue = '';

  // Use writable to create a Svelte store
  const localStore = writable({});

  const connectr = createConnectr({
    whitelist: ["krcn7-paaaa-aaaak-qcnla-cai", "ryjl3-tyaaa-aaaaa-aaaba-cai"],
    host: "https://icp0.io",
  });

  // Subscribe to state changes
  connectr.subscribe((newState) => {
    localStore.set(newState);
  });

  $: console.log("local store", $localStore);
</script>

<button on:click={connectr.stoicConnect}>stoicConnect</button>
<button on:click={connectr.stoicDisconnect}>stoicDisconnect</button>
<button on:click={connectr.stoicInit}>stoicInit</button>
<button on:click={async () => console.log(await connectr.stoicIsConnected())}>stoicIsConnected</button>
<button on:click={async () => {
  try {
    agent = await connectr.stoicGetAgent('krcn7-paaaa-aaaak-qcnla-cai', idlFactory);
    console.log("agent", agent);
    console.log("call it", await agent.manage_primary({ Init: { display_name: "hello" } }));
  } catch (error) {
    console.error("Error:", error);
  }
}}>stoicGetAgent and make a call</button>

<br>

<button on:click={connectr.plugConnect}>plugConnect</button>
<button on:click={connectr.plugInit}>plugInit</button>
<button on:click={async () => console.log(await connectr.plugIsConnected())}>plugIsConnected</button>
<button on:click={async () => 
{
  try {
    agent = await connectr.plugGetAgent('krcn7-paaaa-aaaak-qcnla-cai', idlFactory);
    console.log("agent", agent);
    console.log("call it", await agent.manage_primary({ Init: { display_name: "hello" } }));
  } catch (error) {
    console.error("Error:", error);
  }
}}>plugGetAgent and make a call</button>

<br>

<button on:click={connectr.bitfinityConnect}>bitfinityConnect</button>
<button on:click={connectr.bitfinityInit}>bitfinityInit</button>
<button on:click={async () => console.log(await connectr.bitfinityIsConnected())}>bitfinityIsConnected</button>
<button on:click={async () => 
{
  try {
    agent = await connectr.bitfinityGetAgent('krcn7-paaaa-aaaak-qcnla-cai', idlFactory);
    console.log("agent", agent);
    console.log("call it", await agent.manage_primary({ Init: { display_name: "hello" } }));
  } catch (error) {
    console.error("Error:", error);
  }
}}>bitfinityGetAgent and make a call</button>

<br>

<input bind:value={seedValue} placeholder="Enter seed..." />

<button on:click={async () => console.log(await connectr.seedCreate(seedValue))}>seedCreate --not reccomended--</button>
<button on:click={async () => console.log(await connectr.seedGetAgent('krcn7-paaaa-aaaak-qcnla-cai', idlFactory, 0))}>seedGetAgent</button>

<p>{$connectr}</p>
