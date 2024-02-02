<script lang="ts">
  import { onMount } from "svelte";
  import { state } from "../libs/store";
  import { generatePrincipal } from "@ic0-computer/tools";
  import type { Secp256k1KeyIdentity } from "@ic0-computer/tools";
  import ClipboardCopier from "../components/ClipboardCopier.svelte";
  import Loader from "../components/Loader.svelte";

  let principals: { identity: Secp256k1KeyIdentity, seed_phrase: string }[] = [];
  let substring = "";
  let generating = false; // Flag to indicate whether principals are being generated
  let startsWith = false; // Checkbox value

  const generateNewPrincipal = () => {
    let newPrincipal = generatePrincipal();
    principals = [newPrincipal, ...principals];
    return newPrincipal;
  };

  onMount(() => {
    $state.page = "Principal Miner";
  });

  const copy = (elementID: string) => {
    const element = document.getElementById(elementID);
    if (element) {
      const app = new ClipboardCopier({
        target: element,
        props: { text: elementID },
      });
      app.$destroy();
    }
  };

  const generateAsync = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (!generating) {
          resolve();
          return;
        }

        let p = generateNewPrincipal();
        console.log(p.identity.getPrincipal().toString());

        if (
          (startsWith && p.identity.getPrincipal().toString().startsWith(substring)) ||
          (!startsWith && p.identity.getPrincipal().toString().includes(substring))
        ) {
          generating = false;
          resolve();
        } else {
          resolve(generateAsync());
        }
      }, 0);
    });
  };

  const handleClick = async () => {
    if (generating) return;

    generating = true;
    while (generating) {
      await generateAsync();
    }

    generating = false;
  };

  const stopGenerating = () => {
    generating = false;
  };

  const isMatch = (identity: string): boolean => {
    return startsWith ? identity.startsWith(substring) : identity.includes(substring);
  };
</script>

<div class="flex items-center mb-4">
  <input
    type="text"
    placeholder="Search by substring"
    bind:value={substring}
    class="p-2 border border-gray-300 rounded"
  />
  <label class="ml-2">
    <input type="checkbox" bind:checked={startsWith} />
    Start with substring
  </label>
  <button
    on:click={handleClick}
    class="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
  >
    Generate Principal
  </button>
  {#if generating}
    <button
      on:click={stopGenerating}
      class="ml-2 px-4 py-2 bg-red-500 text-white rounded"
    >
      Stop Generating
    </button>
  {/if}
</div>

{#if generating}
  <div class="p-6">
    <Loader type="stretch" />
  </div>
{/if}

<div class="mockup-code w-10/12 mt-6 overflow-y-auto">
  {#each principals.slice(0, 50) as { identity, seed_phrase }, i}
    <pre class={isMatch(identity.getPrincipal().toString()) ? "bg-warning text-warning-content" : ''} id={seed_phrase} data-prefix="{principals.length - i}">
      <code>{identity.getPrincipal().toString()}</code>
      <button class="bg-success b-0 p-1 m-1 ml-3 text-black rounded-sm" on:click={() => copy(seed_phrase)}>copy seed 🌱</button>
    </pre>
  {/each}
</div>
