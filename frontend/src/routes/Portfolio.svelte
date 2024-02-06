<script lang="ts">
  import { identity , profile} from '../libs/store';
  import { handleLogin, setProfileData } from "../libs/authOperations"
  import { state } from "../libs/store";
  import connect_gif from "../assets/connect.gif"
  import { onMount } from "svelte";
  import { avatar } from '@ic0-computer/tools';

  onMount(() => {
    $state.page = "Portfolio";
    $identity.profile_canister_actor ? setProfileData($identity.profile_canister_actor) : ''
  })

  let display_name = '';

  const createProfile = async () => {
    let create_result = await $identity?.profile_canister_actor?.call('manage_primary', { Init: { display_name: display_name } });

    if (create_result != null) {
      console.log(create_result);
    } else {
      console.error("Error calling createProfile: profile_canister_actor is null or undefined");
    }

    if ($identity.profile_canister_actor !== null) {
      setProfileData($identity.profile_canister_actor);
    }
  };

</script>

{#if $identity?.profile_canister_actor}
  {#if !$profile.display_name}
  <input bind:value={display_name} placeholder="Enter Display Name" />
  <br>

  <button on:click={createProfile}>Create My Profile</button>
  <br>
  {/if}

  <div class="flex flex-row text-accent">

    <div class="h-auto m-10">
      {@html avatar({aid: $identity.aid})}
    </div>

    <div>
    {#if $profile.display_name && $profile.subsidiaries}
      <p class="text-primary">Display Name:</p>
      <p>{$profile.display_name}</p><br>
      <p class="text-primary">Subsidiaries:</p>
      {#each $profile.subsidiaries as subs}
      <div class="flex flex-row items-center gap-4">
        <div class="h-10 m-2">
          {@html avatar({principal: subs.principal})}
        </div>
        <p>{Object.keys(subs.wallet_type)[0]}: {subs.principal}</p>
      </div>
      {/each}
    {/if}
    </div>
    
  </div>
{:else}
<div class="mt-20"></div>
<button on:click={handleLogin} class="relative inline-block">
  <span class="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
    <button class="btn bg-black rounded-2xl hover:btn-primary hover:text-accent hover:scale-105">Connect Internet Identity</button>
  </span>
  <img class="h-44" src={connect_gif} alt="Connect . . .">
</button>
{/if}
