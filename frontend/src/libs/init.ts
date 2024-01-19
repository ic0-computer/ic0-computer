import { AuthClient } from '@dfinity/auth-client';
import { p2Aid } from '@ic0-computer/tools';
import { replica, HttpAgent } from 'ic0';
import type { Replica, AgentCanister } from 'ic0';
import { identity } from './store';
import fetch from 'isomorphic-fetch';

export const initInternetIdentity = async () => {
  // Get Internet Identity auth client
  const auth_client = await AuthClient.create();

  // If connected, write data to store
  if (await auth_client.isAuthenticated()) {
    const auth_client_identity = await auth_client.getIdentity();

    const ii_agent: Replica<AgentCanister> = replica(
      new HttpAgent({
        host: 'https://icp-api.io',
        // @ts-ignore
        identity: auth_client_identity,
        fetch,
      }),
    );

    const profile_canister_actor = ii_agent('krcn7-paaaa-aaaak-qcnla-cai');

    identity.set({
      connected: true,
      principal: auth_client_identity.getPrincipal().toString(),
      aid: p2Aid(auth_client_identity.getPrincipal().toString()),
      ii_agent,
      profile_canister_actor,
    });
  }
};
