import { SignedKeyIdentity, SignedAddressIdentity } from "./channel-service-identity";

export const BANKING_PROTOCOL = "https://channelelements.com/protocols/banking/0.1.0";

// ----------------------------------------------------------------------------
// JSON response to /channel-bank.json
// ----------------------------------------------------------------------------
export interface ChannelBankDescription extends HasBankServiceEndpoints {
  protocol: string;
  bank: {
    name: string;
    logo: string;
    homepage: string;
    publicKey: string;
    details: any;
  };
  implementation: {
    name: string;
    logo: string;
    homepage: string;
    version: string;
    extensions: any;
  };
}


// ----------------------------------------------------------------------------
// REST Requests to serviceURL
// All requests use POST and include signed identity
// All requests and responses are in JSON
// ----------------------------------------------------------------------------

export interface BankServiceRequest<I extends SignedKeyIdentity | SignedAddressIdentity, T> {
  type: string;
  identity: I;
  details: T;
}

// type = 'open-account', identity type:  SignedKeyIdentity
export interface BankOpenAccountDetails { }

export interface BankOpenAccountResponse { }

// type = 'get-account', identity type: SignedAddressIdentity
export interface BankGetAccountDetails { }

export interface BankGetAccountResponse {
  balance: number;  // positive: available for withdrawal, negative: overdrawn
  lastTransaction: number;  // timestamp
}


// type = 'transfer', identity type:  SignedAddressIdentity
export interface BankTransferDetails {
  amount: number;
  to: BankAccountInformation;
  reference: string;
}
export interface BankTransferResponse {
  receiptSignature: string;
}


// ----------------------------------------------------------------------------
// Miscellaneous interfaces
// ----------------------------------------------------------------------------

export interface BankServiceEndpoints {
  descriptionUrl: string; // returns ChannelBankDescription in JSON
  homeUrl: string;  // human-oriented service description, suitable for browser
  restServiceUrl: string;  // to use the service, always with POST with identity and signature
}

export interface HasBankServiceEndpoints {
  serviceEndpoints: HasBankServiceEndpoints;
}


export interface BankAccountInformation {
  accountAddress: string;
  bankUrl: string;

}