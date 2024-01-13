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
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZ0lEQVR4nO2Yu0oDQRhGT6mdoKlsvFUiliIoImkFrVcRTCkEtDBai08i+AaCTyBeXsBrZWHEzkoFQ0YG/kAIgWgy/7+zMAc+WEh295wml4VEIpFIRMo0sCubomBsAt+Ak/njjIIwD3y1ybf2Ka9FyTCwD9x3Ee/cnbx3iEhYBV7+IN45f44/N1d2gEYf8q01gEpe8msDyrdH+GuZMgLUA8g7WV2uacZhQHknq1kGPCoEPFjJjyrIO1nJIqCsGFC2CNhSDMgsAvYUA6oWASeKAccWAWeKAacWAdeKAZcWAe+KAW/a8uOK8k7m76HGtkFAphlwYRBwriW/AjQNAprAcmj5deDDQN7J/L02QskvAj+G8k7m77kQIuAqB3kX6nthLkd5J5uN/WPT9Zj/9ds3tQgCDgYJmAGec5R/kmesif985B71mH9PtJR6PC96BcaInEngtov8DTBBgViS/7hVOU4kEokE0fELxOqQt+9hzXMAAAAASUVORK5CYII=" alt="information icon">
        </div>
        <div class="flex-end w-5">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADd0lEQVR4nO2aT08UQRDFfwSENRiRhRWPcjQY5VMoRFTghuJNgxeRoFeVm4ieSEj4HBpC0KghUSP+QbmoKJwED0a8uUDQjKn4JunEmYWdnd0dCC+ZZHeqp7prurq6+tXALnYu0kAncBeYAD4BP4F1Xfb7o2TW5ixQT0KQAi4AD4E/gJfn9RuYAnqBmnIYsBe4BnxzBrUGPAFuaGaO6I3v0VWveya7CTzVM/7zy8CgXk5JcApYdAbwGrgI1EXQdQC4BLxx9C0A7RQR9qbGnQ7fAidi1N8GvHP0jxVjdg5p4NbBL+AKUBl3J/zTeRXIOrPdFJfyZk23p6hzlOLjGDCvPr9oDAUh4yh8BTRSOtQDz9T3orwiElKOO70Aaik9aoGXjptFWjPjjjvZZpcvqoE7CtEWWod1L180OF5hASDvEOsv7KhrYjhgA7R7UddMVjosum15s/P3CYtOUbEcYIjdi4oBZ/FvycWuO/tEZYIMqQLeS48ZlRMpJ+0odLMLcq3bBepsl56lzXKzXidCFIpqGbNc4GJ3UeFE0nPkwCM1stwpqejTGCfDGqSVVq9FTABLuVGuAxth4+ySpY9JPqY11tNBwnsS2nki6RjSWEeChBMSnomho7ATYVzokr77QcLPEtopLumGtEif8QL/YUXCKHlVGIplSKP0fQ8SrktYaKwvhSE1Dk+wcw1Z2UaulcnlWnEudh9lWewTEhoDmHRDunOFX39DNPIs6YYM5doQOyU0tjDphkxLX0dYMuYnjcYAJtWQtJM07g9rNKUOjcZMqiGXpcvWdCjOq5FxsUk0pAKYla6ezTaaJTU8mUBDOqTn61bKEINqPBsDvxunIVXAnPT0b+WBlMP1GqEcZ/ZbiEGDenY+n6KQz1ZkRY6V25BWYDUquzPmvAGjLcuFjEg5G8toFAUp0UKeiORykNj7gBmNYaaQOmNGiZlfVrD/pUIaeK6+F+Io+DQ7U2tudpzio9Xp07Lyw3EpbnLcLCvu1cJh3KhSdFp13Olg3J2knADgiVCOq/paoVLGnKN/tNi19zZn2j1xsX0Rv2JIK3fy0w5PrhRntXjT2Rlw0hlPGaml17fEO7UobFfralDRqFttph2ewE87+sv1BUSNWPFJHQG8PK8NZbE95TIgCHXiYu3U9kC1xx/ORzX2+4OOpyNqG3qe2AXbHH8BUFp9NS4UzQMAAAAASUVORK5CYII=">
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