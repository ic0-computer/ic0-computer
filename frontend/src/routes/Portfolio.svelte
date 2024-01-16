<script>
  import { identity } from '../libs/store';

  let profileData;
  let createResult;
  let displayName = '';

  const createProfile = async () => {
    console.log($identity);
    createResult = await $identity.profileActor.call('manage_primary', { Init: { display_name: displayName } });
    console.log(createResult);
  }
  
  const getProfileData = async () => {
    console.log($identity);
    profileData = await $identity.profileActor.call('get');
    console.log(profileData);
  }

</script>

<input bind:value={displayName} placeholder="Enter Display Name" />
<br>

<button on:click={createProfile}>Create My Profile</button>
<br>

<p class="text-slate-800">
  {#if createResult}
    {JSON.stringify(createResult)}
  {/if}
</p>
<br>

<button on:click={getProfileData}>Get</button>
<br>

<p class="text-slate-800">
  {#if profileData}
    {JSON.stringify(profileData)}
  {/if}
</p>
<br>