import { MemberContractDetails, ChannelContractDetails, ChannelInformation, BasicChannelInformation } from "./channel-service-channel";
import { SignedKeyIdentity, SignedAddressIdentity } from "./channel-service-identity";
export declare const CHANNELS_PROTOCOL = "https://channelelements.com/protocols/client-server/0.2.0";
export interface ChannelServiceDescription extends HasProtocolVersion, HasServiceEndpoints, HasExtensions {
    protocol: string;
    provider: {
        name: string;
        logo: string;
        homepage: string;
        details: any;
    };
    implementation: {
        name: string;
        logo: string;
        homepage: string;
        version: string;
        extensions: any;
    };
    serviceEndpoints: ProviderServiceEndpoints;
}
export interface ChannelShareCodeResponse extends HasProtocolVersion, HasServiceEndpoints, HasExtensions {
    invitationId: string;
    channelInfo: BasicChannelInformation;
}
export interface ChannelServiceRequest<I extends SignedKeyIdentity | SignedAddressIdentity, T> {
    type: string;
    identity: I;
    details: T;
}
export interface ChannelCreateDetails extends HasMemberContractDetails {
    name?: string;
    channelContract: ChannelContractDetails;
}
export interface ChannelCreateResponse extends ChannelInformation {
}
export interface ChannelShareDetails extends HasChannel, HasExtensions {
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
export interface GetRegistrationResponse {
    timezone?: string;
    notifications?: NotificationSettings;
}
export interface UpdateRegistrationDetails {
    timezone?: string;
    notifications?: NotificationSettings;
}
export interface UpdateRegistrationResponse extends GetRegistrationResponse {
}
export interface ProviderServiceEndpoints {
    descriptionUrl: string;
    homeUrl: string;
    restServiceUrl: string;
}
export interface HasExtensions {
    extensions?: any;
}
export interface HasMemberContractDetails {
    memberContract: MemberContractDetails;
}
export interface HasChannel {
    channel: string;
}
export interface HasProtocolVersion {
    protocol: string;
}
export interface HasServiceEndpoints {
    serviceEndpoints: ProviderServiceEndpoints;
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
