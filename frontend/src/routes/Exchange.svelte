<script lang="ts">
import { startScene, stopScene } from "../libs/scene";

let e : HTMLCanvasElement;

$ : {
  if(e){
    startScene(e)
  }
}
</script>

<canvas class="z-0 p-0 m-0 overflow-hidden absolute top-0 left-0" bind:this={e}></canvas>