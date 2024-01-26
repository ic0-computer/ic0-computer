<script lang="ts">
  import { state } from "../libs/store";
  import { onMount } from "svelte";

  export let id: string;

  onMount(() => {
    $state.page = `User #${id}`;
  })
</script>

<div>User #{id}</div>