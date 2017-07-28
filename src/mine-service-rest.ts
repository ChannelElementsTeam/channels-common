import { SignedKeyIdentity, SignedAddressIdentity } from "./channels-identity";
import { ServiceDescription, SignedBankReceipt, ServiceRequest } from "./channels-common";

export const CHANNELS_MINE_PROTOCOL = "https://channelelements.org/protocols/mine";

export interface MineServiceDescription extends ServiceDescription { }

// ----------------------------------------------------------------------------
// REST Requests to serviceURL
// All requests use POST and include signed identity
// All requests and responses are in JSON
// ----------------------------------------------------------------------------

export interface MineServiceRequest<I extends SignedKeyIdentity | SignedAddressIdentity, T> extends ServiceRequest<I, T> { }

// type = 'register-user', identity type:  SignedKeyIdentity
export interface MineRegisterUserDetails { }

export interface MineRegisterUserResponse { }

// type = 'poll', identity type: SignedAddressIdentity
export interface MinePollDetails {
  switchProviderUrls: string[];
  bankProviderUrl: string;
  cardRegistryUrls: string[];
}

export interface MinePollResponse {
  miningReceipt?: SignedBankReceipt;
}
