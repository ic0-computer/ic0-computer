<script lang="ts">
import { handleLogin, handleDisconnect } from "../libs/authOperations";
import { avatar } from '@ic0-computer/tools';
import { identity } from '../libs/store';
import connect_gif from "../assets/connect.gif";
</script>

{#if $identity.connected}
  <button on:click={handleDisconnect}>Disconnect</button>
  <div class="avatar">
    <div class="w-8 rounded-full ring ring-black ring-offset-base-100 ring-offset-2">
      {@html avatar({aid: $identity.aid})}
    </div>
  </div>
{:else}
  <button on:click={handleLogin}>
    Connect
    <img class="h-10" src={connect_gif} alt="Connect . . .">
  </button>
{/if}