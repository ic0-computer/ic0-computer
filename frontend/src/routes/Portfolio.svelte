<script>
  import { identity } from '../libs/store';

  let profileData;
  let displayName = '';

  const getProfileData = async () => {
    console.log($identity);
    profileData = await $identity.profileActor.call('manage_primary', { Init: { display_name: displayName } });
    console.log(profileData);
  }
</script>

<input bind:value={displayName} placeholder="Enter Display Name" />
<br>

<button on:click={getProfileData}>Create My Profile</button>
<br>

<p class="text-slate-800">
  {#if profileData}
    {JSON.stringify(profileData)}
  {/if}
</p>
