import { AuthClient } from '@dfinity/auth-client';
import { p2Aid } from '@ic0-computer/tools';
import { replica, HttpAgent } from 'ic0';
import type { Replica, AgentCanister } from 'ic0';
import { identity, profile, connectr } from './store';
import type { UserResult } from '../../../.dfx/local/canisters/profile/service.did';
import { createConnectr } from '@ic0-computer/connectr';

/**
 * Set Internet Identity Data if Authenticated and save to the store
 * @param auth_client Optional AuthClient instance
 * @returns Promise resolving to AgentCanister or Error
 */
export const initInternetIdentityData = async (auth_client?: AuthClient): Promise<AgentCanister | Error> => {
  // Use provided auth client or create a new one
  const current_auth_client = auth_client || (await AuthClient.create());

  // If connected, write data to store
  if (await current_auth_client.isAuthenticated()) {
    const auth_client_identity = await current_auth_client.getIdentity();

    // Create a replica of the Internet Identity Agent
    const ii_agent: Replica<AgentCanister> = replica(
      new HttpAgent({
        host: 'https://icp-api.io',
        // @ts-ignore
        identity: auth_client_identity,
      }),
    );

    // Get the profile canister actor
    const profile_canister_actor = ii_agent('krcn7-paaaa-aaaak-qcnla-cai') as AgentCanister;

    // Set identity store data
    identity.set({
      connected: true,
      principal: auth_client_identity.getPrincipal().toString(),
      aid: p2Aid(auth_client_identity.getPrincipal().toString()),
      ii_agent,
      profile_canister_actor,
    });

    // We don't want to await this call
    setProfileData(profile_canister_actor);

    return profile_canister_actor;
  }
  
  // If not connected, return error
  return new Error("Internet Identity not authenticated");
};

/**
 * Handle Internet Identity Login
 */
export const handleLogin = async () => {
  let profile_canister_actor: AgentCanister;

  try {
    // Create a new AuthClient instance
    const auth_client = await AuthClient.create();

    // Prompt the user to log in
    await new Promise<void>((resolve) => {
      auth_client.login({
        identityProvider: 'https://identity.ic0.app',
        onSuccess: () => resolve(),
      });
    });

    // Set Internet Identity data and retrieve the profile canister actor
    const SetIIResult = await initInternetIdentityData(auth_client);

    // Check if the result is an Error
    if (SetIIResult instanceof Error) {
      console.error('Error in initInternetIdentityData:', SetIIResult);
      return;
    }

    profile_canister_actor = SetIIResult;

  } catch (error) {
    console.error('Login error:', error);
    return;
  }

  try {
    // Set profile data using the profile canister actor
    await setProfileData(profile_canister_actor);
  } catch (error) {
    console.error('Set profile data error:', error);
    return;
  }
};

/**
 * Handle Internet Identity Disconnect
 */
export const handleDisconnect = async () => {
  // Log out the user
  (await AuthClient.create()).logout();

  // Reset identity store data
  identity.set({
    connected: false,
    principal: '2vxsx-fae',
    aid: '1c7a48ba6a562aa9eaa2481a9049cdf0433b9738c992d698c31d8abf89cadc79',
    ii_agent: null,
    profile_canister_actor: null,
  });

  // Reset profile store data
  profile.set({
    display_name: null,
    subsidiaries: null,
  });
};

/**
 * Set Profile Data from Backend canister
 * @param profileCanisterActor The profile canister actor
 */
export const setProfileData = async (profileCanisterActor: AgentCanister) => {
  try {
    // Call 'get_profile' method on the profile canister actor
    const profile_data: UserResult = await profileCanisterActor.call('get_profile');

    // Check if the result contains 'ok' property
    if ('ok' in profile_data) {
      const { display_name, subsidiaries } = profile_data.ok;

      // Set profile store data
      profile.set({
        display_name: display_name,
        subsidiaries: subsidiaries,
      });
    } else {
      console.error('Error from profile Canister:', profile_data.err);
    }
  } catch (error) {
    console.error('Error calling \'get_profile\' method:', error);
  }
};

/**
 * Initialize Subsidiary Wallet Data
 */
export const initConnectr = async () => {
  const connectr_instance = createConnectr({
    whitelist: ["krcn7-paaaa-aaaak-qcnla-cai"],
    host: "https://icp0.io",
  });

  connectr.set({
    connectr: connectr_instance
  });
};