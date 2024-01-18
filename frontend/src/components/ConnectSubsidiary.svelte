<script>
import { ConnectDialog, ConnectButton, useConnect, useCanister } from "@connect2ic/svelte";
import { Principal } from "@dfinity/principal"
import { identity } from '../libs/store';

const { principal, disconnect } = useConnect({});
const [profile] = useCanister("profile");

let createResult;

const do_it = async () => {
  let manage_subsidiaries = await $profile.manage_subsidiaries({
    Confirm: Principal.fromText("l4bhv-nc3z2-r3zi3-ldgie-jm4yi-l3fpw-xsvja-pqknr-icfhq-zayes-5qe")
  });
  console.log("manage_subsidiaries", manage_subsidiaries);
};

const createProfile = async () => {
    console.log($identity);
    createResult = await $identity.profileActor.call('manage_subsidiaries', 
      { AddRequest: [Principal.fromText("lzsqn-kxes3-k4b5k-ifqqg-gh4rb-ndof5-gygrk-jtf7c-n7tqm-twbbw-uqe")] }
    );
    console.log(createResult);
  }
</script>

<div>Add Subsidiary</div>

<div class="btn-primary font-bold rounded-full m-3 p-2 items-center text-right top-0 right-0">
  <ConnectButton />
</div>

<ConnectDialog dark={true} />

<h1>{$principal}</h1>

<button on:click={do_it}>Confirm Subsidiary</button>
<br>

<button on:click={createProfile}>Add Sub from II</button>
<br>

<p class="text-slate-800">
  {#if createResult}
    {JSON.stringify(createResult)}
  {/if}
</p>
<br>