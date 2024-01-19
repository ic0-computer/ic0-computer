<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import { startScene, stopScene } from "../libs/simplex";

let canvas_element: HTMLCanvasElement;

onMount(() => {
  if (canvas_element) { startScene(canvas_element) };
});

onDestroy(() => {
  stopScene();
});

</script>

<canvas class="z-0 p-0 m-0 overflow-hidden absolute top-0 left-0" bind:this={canvas_element}></canvas>