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

<div class="flex items-center">
  <p>Select Theme: </p>
  <select class="select select-bordered border-secondary border-4 w-15 max-w-xs m-9" data-choose-theme>
    <option value="internet">Internet</option>
    <option value="computer">Computer</option>
    <option value="protocol">Protocol</option>
  </select>
</div>

<button class="btn btn-link"><a href="/subsidiary" use:link> Subsidiary </a></button>