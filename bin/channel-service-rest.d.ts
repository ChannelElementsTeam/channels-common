import { MemberContractDetails, ChannelContractDetails, ChannelInformation, BasicChannelInformation } from "./channel-service-channel";
import { AddressIdentity, SignedIdentity } from "./channel-service-identity";
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
export interface ChannelServiceRequest<I extends AddressIdentity, T> {
    type: string;
    identity: SignedIdentity<I>;
    details: T;
}
export interface ChannelCreateDetails extends HasMemberContractDetails {
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