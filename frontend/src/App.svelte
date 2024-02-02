<script lang="ts">
  // libs
  import { onMount } from 'svelte';
  import { SIDEBAR_WIDTH } from './libs/constants';
  import { setInternetIdentityData } from './libs/identity';
  import { state } from './libs/store';
  import { themeChange } from 'theme-change';
  // routing
  import { Router, Route } from "svelte-routing";
  export let url = "";
  import Portfolio from "./routes/Portfolio.svelte";
  import Exchange from "./routes/Exchange.svelte";
  import Miner from "./routes/PrincipalMiner.svelte";
  import Settings from "./routes/Settings.svelte";
  import Subsidiary from "./routes/Subsidiary.svelte";
  import User from "./routes/User.svelte";
  // components
  import Logo from './components/Logo.svelte';
  import Header from './components/Header.svelte';
  import Sidebar from './components/Sidebar.svelte';

  onMount(() => {
    setInternetIdentityData();
    themeChange(false);
  });

  // calculate sidebar width adjustment
  $: width_adjustment = $state.drawer_open ? SIDEBAR_WIDTH.toString() + 'rem ': '0rem';

</script>

<Router url="{url}">

  <div class="drawer">

    <input type="checkbox" class="drawer-toggle" bind:checked={$state.drawer_open} />

    <Logo />

    <div class="page-contents _page_contents_extra" style="--width-adjustment: {width_adjustment}">
      <Header />
      <!-------------------->
      <!-- route contents -->
      <!-------------------->
      <Route path="/"           ><Portfolio /></Route>
      <Route path="/portfolio"  ><Portfolio /></Route>
      <Route path="/exchange"   ><Exchange  /></Route>
      <Route path="/miner"      ><Miner     /></Route>
      <Route path="/settings"   ><Settings  /></Route>
      <Route path="/subsidiary" ><Subsidiary/></Route>
      <Route path="user/:id" let:params>
        <User id="{params.id}" />
      </Route>
    </div>

    <Sidebar />

  </div>

</Router>