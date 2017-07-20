import { SignedKeyIdentity, SignedAddressIdentity, Signable } from "./channels-identity";
import { BankAccountInformation, SignedBankReceipt, ServiceRequest, ServiceEndpoints, ServiceDescription } from "./channels-common";

export const CHANNELS_BANK_PROTOCOL = "https://channelelements.org/protocols/bank";

export interface BankServiceDescription extends ServiceDescription { }

// ----------------------------------------------------------------------------
// REST Requests to serviceURL
// All requests use POST and include signed identity
// All requests and responses are in JSON
// ----------------------------------------------------------------------------

export interface BankServiceRequest<I extends SignedKeyIdentity | SignedAddressIdentity, T> extends ServiceRequest<I, T> { }

// type = 'register-user', identity type:  SignedKeyIdentity
export interface BankRegisterUserDetails { }

export interface BankRegisterUserResponse extends BankGetAccountResponse { }

// type = 'get-account', identity type: SignedAddressIdentity
export interface BankGetAccountDetails { }

export interface BankGetAccountResponse {
  accountAddress: string;
  balance: number;  // positive: available for withdrawal, negative: overdrawn
  lastTransaction: number;  // timestamp
}

// type = 'transfer', identity type:  SignedAddressIdentity
export interface BankTransferDetails {
  amount: number;
  to: BankAccountInformation;
  requestReference: string;
}
export interface BankTransferResponse {
  signedReceipts: SignedBankReceipt[];  // recipient's bank comes first, sender's bank comes last
}

// ----------------------------------------------------------------------------
// Miscellaneous interfaces
// ----------------------------------------------------------------------------

export interface BankTransferReceipt extends Signable {
  requestReference: string;
  amount: number;
  timestamp: number;
  from: BankAccountInformation;
  to: BankAccountInformation;
  bankReference: string;
}

export interface BankServiceEndpoints extends ServiceEndpoints { }
