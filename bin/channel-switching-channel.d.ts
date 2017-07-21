import { SignedKeyIdentity } from "./channels-identity";
import { HasMemberIdentity } from "./channels-common";
export interface ChannelInformation extends BasicChannelInformation {
    transportUrl: string;
    isCreator: boolean;
    members: ChannelMemberInfo[];
    lastUpdated: number;
}
export interface BasicChannelInformation {
    channelAddress: string;
    name?: string;
    contract: ChannelContractDetails;
    memberCount: number;
    created: number;
}
export interface ChannelMemberInfo extends HasMemberIdentity {
    identity: SignedKeyIdentity;
    isCreator: boolean;
    memberSince: number;
    lastActive: number;
}
export interface ChannelContractDetails {
    package: string;
    serviceContract: ServiceContractInfo;
    participationContract: ParticipationContract;
}
export interface ServiceContractInfo {
    options: ChannelOptions;
    channelPricing: ChannelPricing;
    serviceContractExtensions?: any;
}
export interface ChannelPricing {
    perMessageSent: number;
    perMessageDelivered: number;
    perMessageStored: number;
}
export interface ParticipationContract {
    type: string;
    cards: {
        [packageWildcardString: string]: CardParticipationContract;
    };
    participantContractExtensions?: any;
}
export interface CardParticipationContract {
    price: number;
}
export interface ChannelOptions {
    history?: boolean;
    maxHistoryCount?: number;
    maxHistorySeconds?: number;
    priority?: boolean;
    maxParticipants?: number;
    maxPayloadSize?: number;
    maxMessageRate?: number;
    maxDataRate?: number;
    topology: string;
}
export interface MemberContractDetails {
    subscribe: boolean;
}
