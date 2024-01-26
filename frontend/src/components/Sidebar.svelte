<script lang="ts">
import { SIDEBAR_WIDTH } from "../libs/constants";
import { link } from "svelte-routing";
import ConnectIIFooter from "./ConnectIIFooter.svelte";
</script>

<div class="drawer-side" style="width: {SIDEBAR_WIDTH}rem">
  <ul class="menu p-4 pt-32 overflow-y-auto bg-neutral text-secondary h-screen w-full">
    <li><a href="/portfolio" use:link> Portfolio </a></li>
    <li><a href="/exchange"  use:link> Exchange  </a></li>
    <li><a href="/settings"  use:link> Settings  </a></li>
    <footer class="footer footer-center p-1 text-base-content bg-none mt-auto self-end flex-end gap-4">
      <ConnectIIFooter />
    </footer>
  </ul>
</div>