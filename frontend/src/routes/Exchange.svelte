<script lang="ts">
  import Loader from "../components/Loader.svelte";
  import { state } from "../libs/store";
  import { onMount } from "svelte";

  function sendMessageToExtension() {
    const requestInfo = { text: "hi you" };
    window.postMessage({ source: "dataaccessgateway-agent", payload: requestInfo }, "*");
  }

  onMount(() => {
    $state.page = "Exchange";
  })
</script>

<h1 class="mt-6">Coming Soon!</h1>
<div class="p-6">
  <Loader type="stretch" />
</div>

<button on:click={sendMessageToExtension}>Click Me</button>
