
import { SignedKeyIdentity, SignedAddressIdentity } from "./channels-identity";
import { SignedBankReceipt, ServiceRequest, ServiceDescription, BankAccountInformation } from "./channels-common";

export const CHANNELS_MINE_PROTOCOL = "https://channelelements.org/protocols/mine";

export interface MineServiceDescription extends ServiceDescription { }

export interface MineServiceRequest<I extends SignedKeyIdentity | SignedAddressIdentity, T> extends ServiceRequest<I, T> { }

// type = 'register-user', identity type:  SignedKeyIdentity
export interface MineRegisterUserDetails { }

export interface MineRegisterUserResponse { }

// type = 'poll', identity type: SignedAddressIdentity
export interface MinePollDetails {
  clientSignature: string;
  bankAccount: BankAccountInformation;
  services: ChannelServiceUrls;  // this is the quid pro quo for mining
}

export interface MinePollResponse {
  signedPayment?: SignedBankReceipt;
}

export interface ChannelServiceUrls {
  client: string;
  switch: string;
  cardRegistry: string;
  bank: string;
}
