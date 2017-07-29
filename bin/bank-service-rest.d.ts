import { SignedKeyIdentity, SignedAddressIdentity, Signable } from "./channels-identity";
import { BankAccountInformation, SignedBankReceipt, ServiceRequest, ServiceEndpoints, ServiceDescription } from "./channels-common";
export declare const CHANNELS_BANK_PROTOCOL = "https://channelelements.org/protocols/bank";
export interface BankServiceDescription extends ServiceDescription {
}
export interface BankServiceRequest<I extends SignedKeyIdentity | SignedAddressIdentity, T> extends ServiceRequest<I, T> {
}
export interface BankRegisterUserDetails {
}
export interface BankRegisterUserResponse extends BankGetAccountResponse {
}
export interface BankRegisterBankDetails {
    bankProviderUrl: string;
}
export interface BankRegisterBankResponse extends BankGetAccountResponse {
}
export interface BankRegisterMineDetails {
    mineProviderUrl: string;
}
export interface BankRegisterMineResponse extends BankGetAccountResponse {
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
export interface InterBankTransferDetails {
    amount: number;
    to: string;
    requestReference: string;
    sendingBankReference: string;
}
export interface InterBankTransferResponse {
    signedReceipt: SignedBankReceipt;
}
export interface BankTransferReceipt extends Signable {
    amount: number;
    timestamp: number;
    from: BankAccountInformation;
    to: BankAccountInformation;
    requestReference: string;
    requesterBankReference: string;
    recipientBankReference: string;
}
export interface BankServiceEndpoints extends ServiceEndpoints {
}
