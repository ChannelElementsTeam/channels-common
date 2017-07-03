import { SignedKeyIdentity, SignedAddressIdentity, Signable } from "./channel-service-identity";
export declare const BANKING_PROTOCOL = "https://channelelements.com/protocols/banking/0.1.0";
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
export interface BankServiceRequest<I extends SignedKeyIdentity | SignedAddressIdentity, T> {
    type: string;
    identity: I;
    details: T;
}
export interface BankOpenAccountDetails {
}
export interface BankOpenAccountResponse extends BankGetAccountResponse {
}
export interface BankGetAccountDetails {
}
export interface BankGetAccountResponse {
    accountAddress: string;
    balance: number;
    lastTransaction: number;
}
export interface BankTransferDetails {
    amount: number;
    to: BankAccountInformation;
    requestReference: string;
}
export interface BankTransferResponse {
    signedReceipts: SignedBankReceipt[];
}
export interface SignedBankReceipt {
    bankUrl: string;
    signedReceipt: string;
}
export interface BankTransferReceipt extends Signable {
    requestReference: string;
    amount: number;
    timestamp: number;
    from: BankAccountInformation;
    to: BankAccountInformation;
    bankReference: string;
}
export interface BankServiceEndpoints {
    descriptionUrl: string;
    homeUrl: string;
    restServiceUrl: string;
}
export interface HasBankServiceEndpoints {
    serviceEndpoints: BankServiceEndpoints;
}
export interface BankAccountInformation {
    accountAddress: string;
    bankUrl: string;
}
