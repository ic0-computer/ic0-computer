import { writable } from 'svelte/store';
import type { Replica, AgentCanister } from 'ic0';
import { Principal } from "@dfinity/principal"
import { ss1 } from '../assets/string';

interface IdentityData {
  connected: boolean;
  principal: string;
  aid: string;
  ii_agent: Replica<AgentCanister> | null;
  profile_canister_actor: AgentCanister | null;
}

interface ProfileData {
  display_name: string | null;
  subsidiaries: Principal[] | null;
}

interface StateData {
  drawer_open: boolean;
  logo: string;
}

export const identity = writable<IdentityData>({
  connected: false,
  principal: '2vxsx-fae',
  aid: '1c7a48ba6a562aa9eaa2481a9049cdf0433b9738c992d698c31d8abf89cadc79',
  ii_agent: null,
  profile_canister_actor: null,
});

export const profile = writable<ProfileData>({
  display_name: null,
  subsidiaries: null,
});

export const state = writable<StateData>({
  drawer_open: true,
  logo: ss1,
});