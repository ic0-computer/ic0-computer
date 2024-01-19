<script lang="ts">
import { state } from "../libs/store"
import { SIDEBAR_WIDTH } from "../libs/constants";
</script>

<div class="h-28 p-3 w-full top-0 left-0 self-end text-center flex bg-neutral-400"
  style="{$state.drawer_open 
    ? `width: calc(100vw - ${SIDEBAR_WIDTH}rem); transition: width 0.3s` 
    : 'width: calc(100vw - 11.4rem); transition: width 0.3s;'
  }; justify-content: space-between;">
  <div class="flex-auto w-5 m-5">
    ic0.computer
  </div>
</div>