<script>
import { ConnectDialog, ConnectButton, useConnect, useCanister } from "@connect2ic/svelte";

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

<ConnectButton />
<ConnectDialog />

<h1>{$principal}</h1>

<button on:click={do_it}>Do it</button>