<script lang="ts">
  // constants
  import { SIDEBAR_WIDTH } from './libs/constants';
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

  // calculate sidebar width adjustment
  $: width_adjustment = drawer_open ? SIDEBAR_WIDTH : 0;

</script>

<Router url="{url}">  

  <div class="drawer">
    <input type="checkbox" class="drawer-toggle" bind:checked={drawer_open} />
    <!------------------->
    <!----- ic0 logo ---->
    <!------------------->
    <button class="z-50 fixed flex flex-row items-center h-28 w-44 p-3 cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 normal-case text-xl font-bold text-primary _logo-extra" style="border: 4px solid pink" unselectable="on" 
      on:click={updateLogo}>
      <pre class="text-left b-0 m-0 pl-1 text-[10px] leading-[9px] tracking-[-0.5px]">{logo}</pre>
      <p>&nbsp;{#if drawer_open} ⟪ {:else} ⟫ {/if}</p>
    </button>
    <!------------------->
    <!-- page contents -->
    <!------------------->
    <div class="page-contents absolute right-0 h-screen flex flex-col items-center" style="width: calc(100vw - {width_adjustment}rem); transition: width 0.3s; border: 4px solid purple">
      <div class="h-28 w-full top-0 left-0 self-end text-center flex" style="{drawer_open ? 'border: 4px solid green' : 'width: calc(100vw - 11.4rem); transition: width 0.3s; border: 4px solid green'}; justify-content: space-between;">
        <div class="flex-start w-5">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyOCAxMjg7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cGF0aCBkPSJNNjQsMUMyOS4zLDEsMSwyOS4zLDEsNjRzMjguMyw2Myw2Myw2M3M2My0yOC4zLDYzLTYzUzk4LjcsMSw2NCwxeiBNNjQsMTE5QzMzLjcsMTE5LDksOTQuMyw5LDY0UzMzLjcsOSw2NCw5ICAgczU1LDI0LjcsNTUsNTVTOTQuMywxMTksNjQsMTE5eiIvPjxyZWN0IGhlaWdodD0iNDAiIHdpZHRoPSI4IiB4PSI2MCIgeT0iNTQuNSIvPjxyZWN0IGhlaWdodD0iOCIgd2lkdGg9IjgiIHg9IjYwIiB5PSIzNS41Ii8+PC9nPjwvc3ZnPg==" alt="information icon">
        </div>
        <div class="flex-end w-5">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZGF0YS1uYW1lPSJMYXllciAxIiBpZD0iTGF5ZXJfMSIgdmlld0JveD0iMCAwIDQ4IDQ4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZS8+PHBhdGggZD0iTTQwLjYyLDI4LjM0bC0uODctLjdBMiwyLDAsMCwxLDM5LDI2LjA4VjE4QTE1LDE1LDAsMCwwLDI2LjkxLDMuMjlhMywzLDAsMCwwLTUuODEsMEExNSwxNSwwLDAsMCw5LDE4djguMDhhMiwyLDAsMCwxLS43NSwxLjU2bC0uODcuN2E5LDksMCwwLDAtMy4zOCw3VjM3YTQsNCwwLDAsMCw0LDRoOC4yNmE4LDgsMCwwLDAsMTUuNDcsMEg0MGE0LDQsMCwwLDAsNC00VjM1LjM2QTksOSwwLDAsMCw0MC42MiwyOC4zNFpNMjQsNDNhNCw0LDAsMCwxLTMuNDQtMmg2Ljg5QTQsNCwwLDAsMSwyNCw0M1ptMTYtNkg4VjM1LjM2YTUsNSwwLDAsMSwxLjg4LTMuOWwuODctLjdBNiw2LDAsMCwwLDEzLDI2LjA4VjE4YTExLDExLDAsMCwxLDIyLDB2OC4wOGE2LDYsMCwwLDAsMi4yNSw0LjY5bC44Ny43QTUsNSwwLDAsMSw0MCwzNS4zNloiLz48L3N2Zz4=" alt="notification icon">
        </div>
      </div>
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
    <div class="drawer-side" style="width: {SIDEBAR_WIDTH}rem">
      <ul class="menu p-4 pt-32 overflow-y-auto bg-base-100 text-base-content h-screen w-full" style="border: 4px solid red">
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
    
  </div>

</Router>