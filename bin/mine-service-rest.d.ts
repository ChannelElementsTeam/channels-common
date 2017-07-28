import { SignedKeyIdentity, SignedAddressIdentity } from "./channels-identity";
import { ServiceDescription, SignedBankReceipt, ServiceRequest } from "./channels-common";
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
    switchProviderUrls: string[];
    bankProviderUrl: string;
    cardRegistryUrls: string[];
}
export interface MinePollResponse {
    miningReceipt?: SignedBankReceipt;
}
