import { AuthClient } from '@dfinity/auth-client';
import { p_to_aid } from '@ic0-computer/tools';
import { replica, HttpAgent} from 'ic0';
import { identity } from './store';
import fetch from "isomorphic-fetch";

export const initIdentity = async () => {
  const authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    const authClientIdentity = await authClient.getIdentity();
    let principal = authClientIdentity.getPrincipal().toString()
    let aid = p_to_aid(principal)
    const iiagent = replica(new HttpAgent({ 
        host: "https://icp-api.io",
        identity: authClientIdentity,
        fetch
      }));
    const profileActor = iiagent('krcn7-paaaa-aaaak-qcnla-cai');
    identity.set({
      connected: true,
      principal,
      aid,
      iiagent,
      profileActor
    });
  }
};
