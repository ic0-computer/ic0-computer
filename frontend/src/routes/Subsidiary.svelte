<script lang="ts">
  // @ts-ignore
  import { idlFactory } from "../../../.dfx/local/canisters/profile/service.did.js";
  import { connectr, state, profile, identity } from "../libs/store";
  import { PROFILE_CANISTER_ID } from "../libs/constants";
  import { onMount } from "svelte";
  import { Principal } from "@dfinity/principal";
  import stoic from "../assets/stoic.png";
  import bitfinity from "../assets/bitfinity.png";
  import plug from "../assets/plug.svg";
  import seed from "../assets/seed.png";
  import { setProfileData } from "../libs/authOperations.js";

  // Lifecycle hook
  onMount(() => {
    $state.page = "Subsidiary";
  });

  // Listen for messages from the extension
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'FROM_EXTENSION') {
      console.log("Received message from the extension:", event.data.data);
    }
  });

  // Utility function to update store
  const updateStore = () => {
    $connectr.store = $connectr.connectr.getStore();
  };

  // Connect wallet function
  const connect = async (wallet: 'stoic' | 'plug' | 'bitfinity' | 'seed') => {
    switch (wallet) {
      case 'stoic':
        await $connectr.connectr.stoicConnect();
        break;
      case 'plug':
        await $connectr.connectr.plugConnect();
        break;
      case 'bitfinity':
        await $connectr.connectr.bitfinityConnect();
        break;
      case 'seed':
        const seedValue = window.prompt("Enter seed... (not recommended)");
        if (seedValue !== null) {
          await $connectr.connectr.seedCreate(seedValue);
        }
        break;
      default:
        throw new Error(`Invalid wallet type: ${wallet}`);
    }

    updateStore();
  };

  // Add Subsidiary function
  const addSubsidiary = async (wallet: 'stoic' | 'plug' | 'bitfinity') => {
    let addRequest;
    let walletAgent;

    switch (wallet) {
      case 'stoic':
        addRequest = [$connectr.store.stoic?.principal];
        walletAgent = $connectr.connectr.stoicGetAgent;
        break;
      case 'plug':
        addRequest = [$connectr.store.plug?.principal];
        walletAgent = $connectr.connectr.plugGetAgent;
        break;
      case 'bitfinity':
        addRequest = [$connectr.store.bitfinity?.principal];
        walletAgent = $connectr.connectr.bitfinityGetAgent;
        break;
      default:
        throw new Error(`Invalid wallet type: ${wallet}`);
    }

    const addResponse = await $identity.profile_canister_actor.call("manage_subsidiaries", { AddRequest: addRequest });
    console.log(`add${wallet}`, addResponse);

    const agentId = await walletAgent(PROFILE_CANISTER_ID, idlFactory);
    const agentResponse = await agentId.manage_subsidiaries({
      Confirm: {
        primary: Principal.fromText($identity.principal),
        wallet: { [wallet.charAt(0).toUpperCase() + wallet.slice(1)]: null },
      },
    });
    console.log(`${wallet}Res`, agentResponse);

    setProfileData($identity.profile_canister_actor);
  };

  const addSubsidiaryFromSeed = async (index: number) => {
    const seeds = $connectr.store.seed
    const addResponse = await $identity.profile_canister_actor.call("manage_subsidiaries", { AddRequest: [seeds[index].principal] });
    console.log(`add${seeds[index].principal}`, addResponse);

    const agentId = await $connectr.connectr.seedGetAgent(PROFILE_CANISTER_ID, idlFactory, index);
    const agentResponse = await agentId.manage_subsidiaries({
      Confirm: {
        primary: Principal.fromText($identity.principal),
        wallet: { Seed : null },
      },
    });
    console.log(`Res`, agentResponse);

    setProfileData($identity.profile_canister_actor);
  };

</script>

<div class="flex flex-col gap-4 w-9/12 p-3 mb-6">
  <!-- Stoic -->
  <div class="flex flex-row gap-4 w-full" style="border: 1px solid red; padding: 5px">
    <button on:click={() => connect("stoic")}>
      <img class="h-10 w-10" src={stoic} alt="Stoic Connect">
    </button>
    <div class="flex flex-col gap-4 w-full">
      <!-- Currently Connected Principal -->
      <p class="text-primary">Currently Connected Principal</p>
      {#if $connectr.store?.stoic}
        <div class="flex flex-row items-center gap-4">
          <p>{$connectr.store?.stoic?.principal}</p>
          <button class="btn-outline border-gray border-2 p-1" on:click={() => {addSubsidiary('stoic')}}>Add Subsidiary</button>
        </div>
      {:else}
        <p>None</p>
      {/if}

      <!-- Subsidiaries -->
      <p class="text-primary">Subsidiaries</p>
      {#if $profile.subsidiaries && $profile.subsidiaries.length > 0}
        {#each $profile.subsidiaries.filter((sub) => sub.wallet_type.hasOwnProperty("Stoic")) as item}
          <div class="flex flex-row items-center gap-4">
            <p>{item.principal}</p>
          </div>
        {/each}
      {:else}
        <p>None</p>
      {/if}
    </div>
  </div>

  <!-- Plug -->
  <div class="flex flex-row gap-4 w-full" style="border: 1px solid red; padding: 5px">
    <button on:click={() => connect("plug")}>
      <img class="h-10 w-10" src={plug} alt="Plug Connect">
    </button>
    <div class="flex flex-col gap-4 w-full">
      <!-- Currently Connected Principal -->
      <p class="text-primary">Currently Connected Principal</p>
      {#if $connectr.store?.plug}
        <div class="flex flex-row items-center gap-4">
          <p>{$connectr.store?.plug?.principal}</p>
          <button class="btn-outline border-gray border-2 p-1" on:click={() => {addSubsidiary('plug')}}>Add Subsidiary</button>
        </div>
      {:else}
        <p>None</p>
      {/if}

      <!-- Subsidiaries -->
      <p class="text-primary">Subsidiaries</p>
      {#if $profile.subsidiaries && $profile.subsidiaries.length > 0}
        {#each $profile.subsidiaries.filter((sub) => sub.wallet_type.hasOwnProperty("Plug")) as item}
          <div class="flex flex-row items-center gap-4">
            <p>{item.principal}</p>
          </div>
        {/each}
      {:else}
        <p>None</p>
      {/if}
    </div>
  </div>

  <!-- Bitfinity -->
  <div class="flex flex-row gap-4 w-full" style="border: 1px solid red; padding: 5px">
    <button on:click={() => connect("bitfinity")}>
      <img class="h-10 w-10" src={bitfinity} alt="Bitfinity Connect">
    </button>
    <div class="flex flex-col gap-4 w-full">
      <!-- Currently Connected Principal -->
      <p class="text-primary">Currently Connected Principal</p>
      {#if $connectr.store?.bitfinity}
        <div class="flex flex-row items-center gap-4">
          <p>{$connectr.store?.bitfinity?.principal}</p>
          <button class="btn-outline border-gray border-2 p-1" on:click={() => {addSubsidiary('bitfinity')}}>Add Subsidiary</button>
        </div>
      {:else}
        <p>None</p>
      {/if}

      <!-- Subsidiaries -->
      <p class="text-primary">Subsidiaries</p>
      {#if $profile.subsidiaries && $profile.subsidiaries.length > 0}
        {#each $profile.subsidiaries.filter((sub) => sub.wallet_type.hasOwnProperty("Bitfinity")) as item}
          <div class="flex flex-row items-center gap-4">
            <p>{item.principal}</p>
          </div>
        {/each}
      {:else}
        <p>None</p>
      {/if}
    </div>
  </div>

  <!-- Seed -->
  <div class="flex flex-row gap-4 w-full" style="border: 1px solid red; padding: 5px">
    <button on:click={() => connect("seed")}>
      <img class="h-10 w-10" src={seed} alt="Seed Connect">
    </button>
    <div class="flex flex-col gap-4 w-full">
      <!-- Currently Connected Principals -->
      <p class="text-primary">Currently Connected Principals</p>
      {#if $connectr.store?.seed}
        {#each $connectr.store.seed as seed_identity, i}
          <div class="flex flex-row items-center gap-4">
            <p>{seed_identity.principal}</p>
            <button class="btn-outline border-gray border-2 p-1" on:click={() => {addSubsidiaryFromSeed(i)}}>Add Subsidiary</button>
          </div>
        {/each}
      {:else}
        <p>None</p>
      {/if}

      <!-- Subsidiaries -->
      <p class="text-primary">Subsidiaries</p>
      {#if $profile.subsidiaries && $profile.subsidiaries.length > 0}
        {#each $profile.subsidiaries.filter((sub) => sub.wallet_type.hasOwnProperty("Seed")) as item}
          <div class="flex flex-row items-center gap-4">
            <p>{item.principal}</p>
          </div>
        {/each}
      {:else}
        <p>None</p>
      {/if}
    </div>
  </div>
</div>