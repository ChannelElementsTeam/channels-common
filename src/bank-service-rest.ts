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

// type = 'register-bank', identity type:  SignedKeyIdentity
export interface BankRegisterBankDetails {
  bankProviderUrl: string;
}

export interface BankRegisterBankResponse extends BankGetAccountResponse { }

// type = 'register-mine', identity type:  SignedKeyIdentity
export interface BankRegisterMineDetails {
  mineProviderUrl: string;
}

export interface BankRegisterMineResponse extends BankGetAccountResponse { }

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
  signedReceipts: SignedBankReceipt[];  // recipient's bank comes first, requester's bank comes last
}

// type = 'interbank-transfer', identity type:  SignedAddressIdentity
export interface InterBankTransferDetails {
  amount: number;
  to: string; // address of recipient account
  requestReference: string;
  sendingBankReference: string;
}

export interface InterBankTransferResponse {
  signedReceipt: SignedBankReceipt;  // signed by recipient's bank
}

// ----------------------------------------------------------------------------
// Miscellaneous interfaces
// ----------------------------------------------------------------------------

export interface BankTransferReceipt extends Signable {
  amount: number;
  timestamp: number;
  from: BankAccountInformation;
  to: BankAccountInformation;
  requestReference: string;
  requesterBankReference: string;
  recipientBankReference: string;
}

export interface BankServiceEndpoints extends ServiceEndpoints { }
