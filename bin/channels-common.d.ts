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
        extensions: any;
    };
    serviceEndpoints: ServiceEndpoints;
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
