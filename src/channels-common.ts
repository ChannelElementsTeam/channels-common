import { SignedKeyIdentity, SignedAddressIdentity } from "./channels-identity";

export interface ServiceDescription {
  protocol: string;
  version: {
    current: number;
    min: number;
  };
  service: {
    name: string;
    logo: string;
    homepage: string;
    bankAccount?: BankAccountInformation;
    address?: string;
    publicKey?: string;
    details: any;
  };
  implementation: {
    name: string;
    logo: string;
    homepage: string;
    version: string;
    implementationExtensions?: any;
  };
  serviceEndpoints: ServiceEndpoints;
  signedKeyIdentity: SignedKeyIdentity;
}

export interface ServiceRequest<I extends SignedKeyIdentity | SignedAddressIdentity, T> {
  version: number;
  type: string;
  identity: I;
  details: T;
}

export interface ServiceEndpoints {
  descriptionUrl: string; // returns description in JSON
  homeUrl: string;  // human-oriented service description, suitable for browser
  restServiceUrl: string;  // to use the service, always with POST with identity and signature
}

export interface SignedBankReceipt {
  bankUrl: string;
  signedReceipt: string;  // result of signing a BankTransferReceipt using the public key returned from the bankUrl
}

export interface BankAccountInformation {
  accountAddress: string;
  bankUrl: string;
}

export interface HasMemberIdentity {
  memberIdentity: MemberIdentityInfo;
}

export interface MemberIdentityInfo {
  name?: string;
  imageUrl?: string;
  contactMeShareCode?: string;
  bankAccount?: BankAccountInformation;
  timezoneOffsetMinutes?: number;  // minutes before UTC (e.g., Pacific GMT-08:00 = 480)
  memberExtensions?: any;
}
