<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import { startScene, stopScene } from "../libs/scene";

let canvasElement: HTMLCanvasElement;

onMount(() => {
  if (canvasElement) {
    startScene(canvasElement);
  }
});

onDestroy(() => {
  stopScene();
});

</script>

<canvas class="z-0 p-0 m-0 overflow-hidden absolute top-0 left-0" bind:this={canvasElement}></canvas>