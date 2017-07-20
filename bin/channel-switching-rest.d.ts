import { MemberContractDetails, ChannelContractDetails, ChannelInformation, BasicChannelInformation } from "./channel-service-channel";
import { SignedKeyIdentity, SignedAddressIdentity } from "./channels-identity";
import { ServiceRequest, ServiceEndpoints, ServiceDescription, SignedBankReceipt } from "./channels-common";
export declare const CHANNELS_SWITCH_PROTOCOL = "https://channelelements.org/protocols/switch";
export interface SwitchServiceDescription extends ServiceDescription {
}
export interface ChannelShareCodeResponse {
    protocol: string;
    invitationId: string;
    channelInfo: BasicChannelInformation;
    serviceEndpoints: ServiceEndpoints;
    extensions: any;
}
export interface SwitchingServiceRequest<I extends SignedKeyIdentity | SignedAddressIdentity, T> extends ServiceRequest<I, T> {
}
export interface SwitchRegisterUserDetails extends RegistrationDetails {
}
export interface SwitchRegisterUserResponse extends RegistrationResponse {
}
export interface CardRegistryPaymentDetails {
    signedPayment?: SignedBankReceipt;
}
export interface CardRegistryPaymentResponse {
}
export interface ChannelCreateDetails extends HasMemberContractDetails {
    name?: string;
    channelContract: ChannelContractDetails;
}
export interface ChannelCreateResponse extends ChannelInformation {
}
export interface ChannelShareDetails extends HasChannel {
    extensions: any;
}
export interface ChannelShareResponse {
    shareCodeUrl: string;
}
export interface ChannelGetDetails extends HasChannel {
}
export interface ChannelGetResponse extends ChannelInformation {
}
export interface ChannelAcceptDetails extends HasMemberContractDetails {
    invitationId: string;
}
export interface ChannelAcceptResponse extends ChannelInformation {
}
export interface ChannelDeleteDetails extends HasChannel {
}
export interface ChannelDeleteResponse {
}
export interface ChannelsListDetails {
    lastActiveBefore?: number;
    limit?: number;
}
export interface ChannelsListResponse {
    total: number;
    channels: ChannelInformation[];
}
export interface GetRegistrationDetails {
}
export interface GetRegistrationResponse extends RegistrationResponse {
}
export interface UpdateRegistrationDetails extends RegistrationDetails {
}
export interface UpdateRegistrationResponse extends RegistrationResponse {
}
export interface HasMemberContractDetails {
    memberContract: MemberContractDetails;
}
export interface HasChannel {
    channel: string;
}
export interface NotificationSettings {
    suspended?: boolean;
    smsNumber?: string;
    minimumSmsIntervalMinutes?: number;
    webPushNotifications?: WebPushNotificationInfo[];
    minimumWebPushIntervalMinutes?: number;
    timing?: NotificationTiming;
    smsNotificationCallbackUrlTemplate?: string;
    minimumChannelInactiveNotificationIntervalMinutes?: number;
    minimumChannelActiveNotificationIntervalMinutes?: number;
}
export interface NotificationTiming {
    notBeforeMinutes: number;
    notAfterMinutes: number;
    noNotificationDays: number[];
}
export interface WebPushNotificationInfo {
    type: string;
    browserPublicKey: string;
}
export interface RegistrationDetails {
    timezone?: string;
    notifications?: NotificationSettings;
}
export interface RegistrationResponse {
    timezone?: string;
    notifications?: NotificationSettings;
}
