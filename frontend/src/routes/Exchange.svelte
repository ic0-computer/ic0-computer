<script lang="ts">
import Loader from "../components/Loader.svelte";
import { state } from "../libs/store";
import { onMount } from "svelte";

onMount(() => {
  $state.page = "Exchange";
})
</script>

<div class="p-6">
  <Loader type="stretch" />
</div>

<div class="p-6">
  <Loader type="spinner" />
</div>

<div class="p-6">
  <Loader />
</div>