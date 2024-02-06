import { writable } from 'svelte/store';
import type { Replica, AgentCanister } from 'ic0';
import { ss1 } from '../assets/string';
import { createConnectr, type Connectr, type WalletStore } from '@ic0-computer/connectr';
import type { Subsidiary } from '../../../.dfx/local/canisters/profile/service.did';
import { PROFILE_CANISTER_ID } from './constants';

interface IdentityData {
  connected: boolean;
  principal: string;
  aid: string;
  ii_agent: Replica<AgentCanister> | null;
  profile_canister_actor: AgentCanister | null;
}

interface ConnectrData {
  connectr: Connectr;
  store: WalletStore;
}

interface ProfileData {
  display_name: string | null;
  subsidiaries: Subsidiary[] | null;
}

interface StateData {
  drawer_open: boolean;
  logo: string;
  page: string;
}

export const identity = writable<IdentityData>({
  connected: false,
  principal: '2vxsx-fae',
  aid: '1c7a48ba6a562aa9eaa2481a9049cdf0433b9738c992d698c31d8abf89cadc79',
  ii_agent: null,
  profile_canister_actor: null,
});

export const connectr = writable<ConnectrData>({
  connectr: createConnectr({
    whitelist: [PROFILE_CANISTER_ID],
    host: "https://icp0.io",
  }),
  store: {},
});

export const profile = writable<ProfileData>({
  display_name: null,
  subsidiaries: null,
});

export const state = writable<StateData>({
  drawer_open: true,
  logo: ss1,
  page: "",
});