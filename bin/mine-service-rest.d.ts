import { SignedKeyIdentity, SignedAddressIdentity } from "./channels-identity";
import { SignedBankReceipt, ServiceRequest, ServiceDescription, BankAccountInformation } from "./channels-common";
export declare const CHANNELS_MINE_PROTOCOL = "https://channelelements.org/protocols/mine";
export interface MineServiceDescription extends ServiceDescription {
}
export interface MineServiceRequest<I extends SignedKeyIdentity | SignedAddressIdentity, T> extends ServiceRequest<I, T> {
}
export interface MineRegisterUserDetails {
}
export interface MineRegisterUserResponse {
}
export interface MinePollDetails {
    clientSignature: string;
    bankAccount: BankAccountInformation;
    services: ChannelServiceUrls;
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
