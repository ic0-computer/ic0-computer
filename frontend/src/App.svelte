<script lang="ts">
  // theme
  import { onMount } from 'svelte';
  import { themeChange } from 'theme-change';
  // assets
  import { ss1,ss2,ss3,ss4 } from "./assets/string";
  // routing
  import { Router, Route, link } from "svelte-routing";
  export let url = "";
  import Home from "./routes/Home.svelte";
  import Portfolio from "./routes/Portfolio.svelte";
  import Exchange from "./routes/Exchange.svelte";
  import Settings from "./routes/Settings.svelte";
  import User from "./routes/User.svelte";
  // avatar
  import { avatar } from '@ic0-computer/tools';
  import { identity } from './libs/store';

  // theme change
  onMount(() => {
    themeChange(true);
  });

  // logo init
  let logo = localStorage.getItem('logo') ? localStorage.getItem('logo') : ss1;
  
  // logo update
  const updateLogo = () => {
    logo = (logo === ss1) ? ss2 : (logo === ss2) ? ss3 : (logo === ss3) ? ss4 : ss1 ;
    localStorage.setItem('logo', logo);
  };

  // open/close drawer
  $: drawer_open = logo === ss2 || logo === ss4;

</script>

<Router url="{url}">  

  <div class="drawer bg bg-neutral h-screen">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawer_open} />
    <!------------------->
    <!-- page contents -->
    <!------------------->
    <div class="drawer-content">
      <Route path="/"           ><Home      /></Route>
      <Route path="/portfolio"  ><Portfolio /></Route>
      <Route path="/exchange"   ><Exchange  /></Route>
      <Route path="/settings"   ><Settings  /></Route>
      <Route path="user/:id" let:params>
        <User id="{params.id}" />
      </Route>
    </div>
    <!------------------->
    <!----- sidebar ----->
    <!------------------->
    <div class="drawer-side">
      <ul class="menu p-4 pt-32 overflow-y-auto w-80 bg-base-100 text-base-content h-screen">
        <li><a href="/"          use:link> Home      </a></li>
        <li><a href="/portfolio" use:link> Portfolio </a></li>
        <li><a href="/exchange"  use:link> Exchange  </a></li>
        <li><a href="/settings"  use:link> Settings  </a></li>
        <footer class="footer footer-center p-1 text-base-content bg-none mt-auto self-end flex-end">
          <div class="avatar">
            <div class="w-8 rounded-full ring ring-black ring-offset-base-100 ring-offset-2">
              {@html avatar({aid: $identity.aid})}
            </div>
          </div>
        </footer>
      </ul>
    </div>
    <!------------------->
    <!----- ic0 logo ---->
    <!------------------->
    <button class="z-50 fixed flex flex-row items-center p-3 h-auto cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 normal-case text-xl font-bold text-primary _logo-extra" unselectable="on" 
      on:click={updateLogo}>
      <pre class="text-left b-0 m-0 pl-1 text-[10px] leading-[9px] tracking-[-0.5px]">{logo}</pre>
      <p>&nbsp;{#if drawer_open} ⟪ {:else} ⟫ {/if}</p>
    </button>
  </div>

</Router>