import { writable } from 'svelte/store';
import type { Replica, AgentCanister } from 'ic0';

interface IdentityData {
  connected: boolean;
  principal: string;
  aid: string;
  ii_agent: Replica<AgentCanister> | null;
  profile_actor: AgentCanister | null;
}

export const identity = writable<IdentityData>({
  connected: false,
  principal: '2vxsx-fae',
  aid: '1c7a48ba6a562aa9eaa2481a9049cdf0433b9738c992d698c31d8abf89cadc79',
  ii_agent: null,
  profile_actor: null,
});
