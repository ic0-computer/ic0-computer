<script>
  import { AuthClient } from '@dfinity/auth-client';
  import { replica, HttpAgent} from 'ic0';
  import fetch from "isomorphic-fetch";
  import { identity } from '../libs/store';
  import { p_to_aid } from '@ic0-computer/tools';
  import { avatar } from '@ic0-computer/tools';

  const handleDisconnect = async () => {
    sessionStorage.removeItem("ii_agent");
    localStorage.removeItem("ii_principal");
    localStorage.removeItem("ii_aid");
    $identity = {
      connected: false,
      principal: '2vxsx-fae',
      aid: '1c7a48ba6a562aa9eaa2481a9049cdf0433b9738c992d698c31d8abf89cadc79',
    };
  };

  const handleLogin = async () => {
    try {
      const authClient = await AuthClient.create();

      await new Promise((resolve) => {
        authClient.login({
          identityProvider: 'https://identity.ic0.app',
          onSuccess: resolve,
        });
      });

      const authClientIdentity = authClient.getIdentity();

      const iiagent = replica(new HttpAgent({ 
        host: "https://icp-api.io",
        identity: authClientIdentity,
        fetch
      }));

      let principal = authClientIdentity.getPrincipal().toString()
      let aid = p_to_aid(principal)

      const profileActor = iiagent('krcn7-paaaa-aaaak-qcnla-cai');

      $identity = {
        connected: true,
        principal,
        aid,
        iiagent,
        profileActor
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
  <button on:click={handleLogin}>Login</button>
{/if}