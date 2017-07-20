import { SignedKeyIdentity, SignedAddressIdentity } from "./channels-identity";
import { SignedBankReceipt, ServiceRequest, ServiceDescription } from "./channels-common";
export declare const MINING_PROTOCOL = "https://channelelements.com/protocols/mine/0.1.0";
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
