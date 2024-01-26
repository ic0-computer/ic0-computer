<script lang="ts">
  import { identity , profile} from '../libs/store';
  import { handleLogin, setProfileData } from "../libs/identity"
  import { state } from "../libs/store";
  import { onMount } from "svelte";

  onMount(() => {
    $state.page = "Portfolio";
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

  <p class="text-slate-800">
    {#if $profile.display_name && $profile.subsidiaries}
      <p>{$profile.display_name}</p>
      <p>{$profile.subsidiaries}</p>
    {/if}
  </p>
  <br>
{:else}
  <button class="btn btn-circle btn-outline w-20 b-2 m-2" on:click={handleLogin}>Connect First</button>
{/if}
