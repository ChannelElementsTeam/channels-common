import { SignedKeyIdentity } from "./channel-service-identity";
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
export interface ChannelMemberInfo {
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
    extensions: any;
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
    extensions?: any;
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
