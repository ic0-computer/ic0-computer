<script lang="ts">
  import ClipboardCopier from "../components/ClipboardCopier.svelte";
  import { onMount } from "svelte";
  import { state } from "../libs/store";
  import { generatePrincipal } from "@ic0-computer/tools";
  import type { Secp256k1KeyIdentity } from "@ic0-computer/tools";

  onMount(() => {
    $state.page = "Principal Miner";
  });

  let principals: { identity: Secp256k1KeyIdentity; seed_phrase: string; copied: boolean }[] = [];
  let substring = "";
  let generating = false;
  let startsWith = false;

  const generateNewPrincipal = () => {
    const newPrincipal = { ...generatePrincipal(), copied: false };
    principals = [newPrincipal, ...principals];
    return newPrincipal;
  };

  const copy = async (elementID: string, index: number) => {
    const element = document.getElementById(elementID);

    if (element) {
      const clipboardCopier = new ClipboardCopier({
        target: element,
        props: { text: elementID },
      });

      clipboardCopier.$destroy();
    }

    principals[index].copied = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    principals[index].copied = false;
  };

  const generateAsync = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (!generating) {
          resolve();
          return;
        }

        const p = generateNewPrincipal();

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

  const stopGenerating = () => {
    generating = false;
  };

  const isMatch = (identity: string): boolean => {
    return startsWith ? identity.startsWith(substring) : identity.includes(substring);
  };

  const toggleGeneration = async () => {
    if (generating) {
      stopGenerating();
    } else {
      generating = true;
      while (generating) {
        await generateAsync();
      }
    }

    generating = false;
  };
</script>

<div class="flex mb-4 w-10/12 space-x-10">
  <input
    type="text"
    placeholder="Substring"
    bind:value={substring}
    class="p-2 border border-gray-300 rounded w-36"
  />
  <label class="flex items-center">
    <input type="checkbox" class="checkbox rounded-sm m-1" bind:checked={startsWith} />
    <span class="ml-1 text-sm">Starts with substring</span>
  </label>
  <button
    on:click={toggleGeneration}
    class={
      "px-4 py-2 " +
      (generating ? "bg-error" : "bg-secondary") +
      " rounded text-neutral"
    }
  >
    {#if generating}
      Stop
    {:else}
      Generate
    {/if}
  </button>

  {#if generating}
    <span class="loading loading-infinity loading-lg ml-2"></span>
  {/if}
</div>

<div class="mockup-code w-10/12 mt-6 overflow-y-auto">
  {#each principals.slice(0, 25) as { identity, seed_phrase, copied }, i}
    <pre
      class={
        isMatch(identity.getPrincipal().toString())
          ? "bg-warning text-warning-content"
          : ""
      }
      id={seed_phrase}
      data-prefix="{principals.length - i}"
    >
      <code>{identity.getPrincipal().toString()}</code><button class="bg-success b-0 p-1 m-1 ml-3 text-black rounded-sm" on:click={() => copy(seed_phrase, i)}>{#if copied} ✅ {:else} copy seed 🌱 {/if}</button>
    </pre>
  {/each}
</div>

<style>
  .mockup-code::-webkit-scrollbar {
    width: 12px;
  }

  .mockup-code::-webkit-scrollbar-thumb {
    background-color: #777777;
    border-radius: 6px;
  }

  .mockup-code::-webkit-scrollbar-track {
    background-color: transparent;
  }

  .mockup-code::-webkit-scrollbar-thumb:hover {
    background-color: #555555;
  }

  .mockup-code::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }
</style>
