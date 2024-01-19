<script lang="ts">
//@ts-ignore
import { ConnectDialog, ConnectButton, useConnect, useCanister } from "@connect2ic/svelte";
import type { TextResult } from "../../../.dfx/local/canisters/profile/service.did"
import { Principal } from "@dfinity/principal"
import { identity } from '../libs/store';

const { principal } = useConnect({});
const [ sub ] = useCanister("sub");

let create_result: TextResult;

const do_it = async () => {
  let manage_subsidiaries = await $sub?.manage_subsidiaries?.({
    Confirm: Principal.fromText("l4bhv-nc3z2-r3zi3-ldgie-jm4yi-l3fpw-xsvja-pqknr-icfhq-zayes-5qe")
  });

  if (manage_subsidiaries != null) {
    console.log("manage_subsidiaries", manage_subsidiaries);
  } else {
    console.error("Error calling do_it: $profile or manage_subsidiaries is null or undefined");
  }
};

const createProfile = async () => {
  create_result = await $identity?.profile_canister_actor?.call('manage_subsidiaries',
    { AddRequest: [Principal.fromText("lzsqn-kxes3-k4b5k-ifqqg-gh4rb-ndof5-gygrk-jtf7c-n7tqm-twbbw-uqe")] }
  );

  if (create_result != null) {
    console.log(create_result);
  } else {
    console.error("Error calling createProfile: $identity or $identity.profileActor is null or undefined");
  }
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
  {#if create_result}
    {JSON.stringify(create_result)}
  {/if}
</p>
<br>
