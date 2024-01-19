<script lang="ts">
  import type { TextResult } from "../../../.dfx/local/canisters/profile/service.did"
  import { identity } from '../libs/store';

  let profile_data: TextResult;
  let create_result: TextResult;
  let display_name = '';

  const createProfile = async () => {
    create_result = await $identity?.profile_canister_actor?.call('manage_primary', { Init: { display_name: display_name } });

    if (create_result != null) {
      console.log(create_result);
    } else {
      console.error("Error calling createProfile: profile_canister_actor is null or undefined");
    }
  };
  
  const getProfileData = async () => {
    profile_data = await $identity?.profile_canister_actor?.call('get');

    if (profile_data != null) {
      console.log(profile_data);
    } else {
      console.error("Error calling getProfileData: profile_canister_actor is null or undefined");
    }
  };

</script>

<input bind:value={display_name} placeholder="Enter Display Name" />
<br>

<button on:click={createProfile}>Create My Profile</button>
<br>

<p class="text-slate-800">
  {#if create_result}
    {JSON.stringify(create_result)}
  {/if}
</p>
<br>

<button on:click={getProfileData}>Get</button>
<br>

<p class="text-slate-800">
  {#if profile_data}
    {JSON.stringify(profile_data, (key, value) => {
      if (typeof value === 'bigint') {
        return value.toString();
      }
      return value;
    })}
  {/if}
</p>
<br>
