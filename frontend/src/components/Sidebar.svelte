<script lang="ts">
  import { SIDEBAR_WIDTH } from "../libs/constants";
  import { link } from "svelte-routing";
  import ConnectIIFooter from "./ConnectIIFooter.svelte";
  import { state } from "../libs/store";
</script>

<div class="drawer-side" style="width: {SIDEBAR_WIDTH}rem">
  <div class="{(!$state.drawer_open) ? 'shadow-lg shadow-slate-200' : ''} w-full rounded-r-2xl border-accent border-r-2 overflow-hidden">
    <ul class="menu p-4 pt-32 overflow-y-auto bg-neutral text-secondary font-black h-screen w-full">
      <li><a href="/portfolio" use:link> Portfolio </a></li>
      <li><a href="/exchange"  use:link> Exchange </a></li>
      <li><a href="/miner"     use:link> Principal Miner </a></li>
      <li><a href="/settings"  use:link> Settings </a></li>
      <footer class="footer footer-center p-1 text-base-content bg-none mt-auto self-end flex-end gap-4">
        <ConnectIIFooter />
      </footer>
    </ul>
  </div>
</div>
