<script>
import { ConnectDialog, ConnectButton, useConnect, useCanister } from "@connect2ic/svelte";
import { identity } from '../libs/store';

const { principal, disconnect } = useConnect({});
const [profile] = useCanister("profile");

const do_it = async () => {
  let manage_primary = await $profile.manage_primary({
    Init: {
      display_name: "su"
    }
  });
  console.log("manage_primary", manage_primary);
};
</script>

<div>Add Subsidiary</div>

<div class="btn-primary font-bold rounded-full m-3 p-2 items-center text-right top-0 right-0">
  <ConnectButton dark={true}/>
</div>

<ConnectDialog dark={true} />

<h1>{$principal}</h1>

<button on:click={do_it}>Do it</button>