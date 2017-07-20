import { SignedKeyIdentity, SignedAddressIdentity, Signable } from "./channels-identity";
import { BankAccountInformation, SignedBankReceipt, ServiceRequest, ServiceEndpoints, ServiceDescription } from "./channels-common";
export declare const CHANNELS_BANK_PROTOCOL = "https://channelelements.org/protocols/bank";
export interface BankeServiceDescription extends ServiceDescription {
}
export interface BankServiceRequest<I extends SignedKeyIdentity | SignedAddressIdentity, T> extends ServiceRequest<I, T> {
}
export interface BankRegisterUserDetails {
}
export interface BankRegisterUserResponse extends BankGetAccountResponse {
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
export interface BankTransferReceipt extends Signable {
    requestReference: string;
    amount: number;
    timestamp: number;
    from: BankAccountInformation;
    to: BankAccountInformation;
    bankReference: string;
}
export interface BankServiceEndpoints extends ServiceEndpoints {
}
