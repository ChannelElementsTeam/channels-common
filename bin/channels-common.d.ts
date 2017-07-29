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
    descriptionUrl: string;
    homeUrl: string;
    restServiceUrl: string;
}
export interface SignedBankReceipt {
    bankUrl: string;
    signedReceipt: string;
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
    timezoneOffsetMinutes?: number;
    memberExtensions?: any;
}
