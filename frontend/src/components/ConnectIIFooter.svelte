<script lang="ts">
  import { AuthClient } from '@dfinity/auth-client';
  import { replica, HttpAgent} from 'ic0';
  import fetch from "isomorphic-fetch";
  import { identity } from '../libs/store';
  import { p2Aid } from '@ic0-computer/tools';
  import { avatar } from '@ic0-computer/tools';
  import connect_gif from "../assets/connect.gif";

  const handleDisconnect = async () => {
    (await AuthClient.create()).logout();
    $identity = {
      connected: false,
      principal: '2vxsx-fae',
      aid: '1c7a48ba6a562aa9eaa2481a9049cdf0433b9738c992d698c31d8abf89cadc79',
      ii_agent: null,
      profile_canister_actor: null,
    };
  };

  const handleLogin = async () => {
    try {
      const auth_client = await AuthClient.create();

      await new Promise<void>((resolve) => {
        auth_client.login({
          identityProvider: 'https://identity.ic0.app',
          onSuccess: () => resolve(),
        });
      });

      const auth_client_identity = auth_client.getIdentity();

      const ii_agent = replica(new HttpAgent({ 
        host: "https://icp-api.io",
        // @ts-ignore
        identity: auth_client_identity,
        fetch
      }));

      let principal = auth_client_identity.getPrincipal().toString()
      let aid = p2Aid(principal)

      const profile_canister_actor = ii_agent('krcn7-paaaa-aaaak-qcnla-cai');

      $identity = {
        connected: true,
        principal,
        aid,
        ii_agent,
        profile_canister_actor
      };

    } catch (error) {
      console.error('Login error:', error);
    }
  };

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