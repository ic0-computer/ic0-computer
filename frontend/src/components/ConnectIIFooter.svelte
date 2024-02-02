<script lang="ts">
import { handleLogin, handleDisconnect } from "../libs/identity";
import { avatar } from '@ic0-computer/tools';
import { identity, profile } from '../libs/store';
import connect_gif from "../assets/connect.gif";
</script>

{#if $identity.connected}
<div class="dropdown dropdown-top w-full">
  <div tabindex="0" role="button" class="w-full flex items-center hover:scale-105">
    <div class="avatar mr-5">
      <div class="w-8 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2 self-start">
        {@html avatar({aid: $identity.aid})}
      </div>
    </div>
    <p>{$profile.display_name}</p>
  </div>
    <ul class="dropdown-content z-[1] menu p-1 shadow text-accent rounded-box m-3">
      <button class="hover:brightness-75" on:click={handleDisconnect}>Disconnect</button>
    </ul>  
  </div>
{:else}
  <div class="w-full flex items-center hover:scale-105 hover:text-accent">
    <button on:click={handleLogin} class="flex items-center">
      <img class="h-6" src={connect_gif} alt="Connect . . .">
      <span class="ml-2 text-xs">Connect Internet Identity</span>
    </button>
  </div>
{/if}