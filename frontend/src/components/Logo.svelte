<script lang="ts">
  import { state } from "../libs/store";
  import { ss1,ss2,ss3,ss4 } from "../assets/string";

  // logo init
  $state.logo = localStorage.getItem('logo') ?? ss1;

  // open & close drawer
  $: $state.drawer_open = $state.logo === ss2 || $state.logo === ss4;

  // logo update
  const updateLogo = () => {
    $state.logo = ($state.logo === ss1) ? ss2 : ($state.logo === ss2) ? ss3 : ($state.logo === ss3) ? ss4 : ss1;
    localStorage.setItem('logo', $state.logo);
  };
</script>

<button class="z-50 fixed flex flex-row items-center p-3 cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 normal-case text-xl font-bold text-primary _logo_no_select" unselectable="on" 
  on:click={updateLogo}>
  <pre class="text-left b-0 m-0 pl-1 text-[10px] leading-[9px] tracking-[-0.5px]">{$state.logo}</pre>
  <p>&nbsp;{#if $state.drawer_open} ⟪ {:else} ⟫ {/if}</p>
</button>