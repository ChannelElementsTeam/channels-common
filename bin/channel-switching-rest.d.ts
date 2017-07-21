import { MemberContractDetails, ChannelContractDetails, ChannelInformation, BasicChannelInformation } from "./channel-switching-channel";
import { SignedKeyIdentity, SignedAddressIdentity } from "./channels-identity";
import { ServiceRequest, ServiceEndpoints, ServiceDescription, SignedBankReceipt, HasMemberIdentity } from "./channels-common";
export declare const CHANNELS_SWITCH_PROTOCOL = "https://channelelements.org/protocols/switch";
export interface SwitchServiceDescription extends ServiceDescription {
}
export interface ChannelShareCodeResponse {
    protocol: string;
    invitationId: string;
    channelInfo: BasicChannelInformation;
    serviceEndpoints: ServiceEndpoints;
    shareExtensions: any;
}
export interface SwitchingServiceRequest<I extends SignedKeyIdentity | SignedAddressIdentity, T> extends ServiceRequest<I, T> {
}
export interface SwitchRegisterUserDetails extends SwitchRegistrationDetails {
}
export interface SwitchRegisterUserResponse extends SwitchRegistrationResponse {
}
export interface SwitchPaymentDetails {
    signedPayment?: SignedBankReceipt;
}
export interface SwitchPaymentResponse {
}
export interface ChannelCreateDetails extends HasMemberContractDetails, HasMemberIdentity {
    name?: string;
    channelContract: ChannelContractDetails;
}
export interface ChannelCreateResponse extends ChannelInformation {
}
export interface ChannelShareDetails extends HasChannel {
    shareExtensions: any;
}
export interface ChannelShareResponse {
    shareCodeUrl: string;
}
export interface ChannelGetDetails extends HasChannel {
}
export interface ChannelGetResponse extends ChannelInformation {
}
export interface ChannelAcceptDetails extends HasMemberContractDetails, HasMemberIdentity {
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
export interface GetSwitchRegistrationDetails {
}
export interface GetSwitchRegistrationResponse extends SwitchRegistrationResponse {
}
export interface UpdateSwitchRegistrationDetails extends SwitchRegistrationDetails {
}
export interface UpdateSwitchRegistrationResponse extends SwitchRegistrationResponse {
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
    webPushNotifications?: WebPushSwitchNotificationInfo[];
    minimumWebPushIntervalMinutes?: number;
    timing?: SwitchNotificationTiming;
    smsNotificationCallbackUrlTemplate?: string;
    minimumChannelInactiveNotificationIntervalMinutes?: number;
    minimumChannelActiveNotificationIntervalMinutes?: number;
}
export interface SwitchNotificationTiming {
    notBeforeMinutes: number;
    notAfterMinutes: number;
    noNotificationDays: number[];
}
export interface WebPushSwitchNotificationInfo {
    type: string;
    browserPublicKey: string;
}
export interface SwitchRegistrationDetails {
    timezone?: string;
    notifications?: NotificationSettings;
}
export interface SwitchRegistrationResponse {
    timezone?: string;
    notifications?: NotificationSettings;
}
