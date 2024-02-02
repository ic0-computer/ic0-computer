<script lang="ts">
  import { state } from "../libs/store";
  import { SIDEBAR_WIDTH } from "../libs/constants";

  let window_width = window.innerWidth;

  window.addEventListener("resize", () => {
    window_width = window.innerWidth;
  });
</script>

<div
  class="h-28 p-3 w-full top-0 left-0 self-end text-center flex"
  style="{window_width > 640
    ? (!$state.drawer_open ? 'width: 100vw;' : `width: calc(100vw - ${SIDEBAR_WIDTH}rem);`)
    : (!$state.drawer_open ? 'width: calc(100vw - 11.4rem);' : `width: calc(100vw - ${SIDEBAR_WIDTH}rem);`)
  } justify-content: space-between; transition: width 0.3s;"
>
  <div class="flex-auto w-5 m-5 text-4xl text-primary font-black">
    {$state.page}
  </div>
</div>
