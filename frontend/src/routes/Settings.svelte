<script lang="ts">
  import { link } from "svelte-routing";
  import { themeChange } from 'theme-change'
  import { onMount } from 'svelte';
  import { state } from "../libs/store";

  onMount(() => {
    themeChange(false);
    $state.page = "Settings";
  })

</script>

<div class="flex flex-col items-center gap-8">

<div class="flex items-center mt-6">
  <p>Select Theme: </p>
  <select class="select select-bordered border-secondary border-4 w-15 max-w-xs ml-6" data-choose-theme>
    <option value="internet">Internet</option>
    <option value="computer">Computer</option>
    <option value="protocol">Protocol</option>
  </select>
</div>

<div class="flex items-center">
  <button class="btn btn-outline"><a href="/subsidiary" use:link>Update Subsidiaries <class class="text-primary">↗</class></a></button>
</div>

</div>