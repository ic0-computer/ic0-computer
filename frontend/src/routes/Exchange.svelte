<script lang="ts">
  import Loader2 from "../components/Loader.svelte";
import { state } from "../libs/store";
import { onMount } from "svelte";

onMount(() => {
  $state.page = "Exchange";
})
</script>

<div class="p-6">
  <Loader2 type="stretch" />
</div>

<div class="p-6">
  <Loader2 type="spinner" />
</div>

<div class="p-6">
  <Loader2 />
</div>