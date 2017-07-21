import { SignedAddressIdentity, SignedKeyIdentity } from "./channels-identity";
import { HasMemberIdentity } from "./channels-common";
export interface ControlChannelMessage {
    requestId?: string;
    type: string;
    details: JoinRequestDetails | JoinResponseDetails | JoinNotificationDetails | LeaveRequestDetails | LeaveNotificationDetails | HistoryRequestDetails | HistoryResponseDetails | HistoryMessageDetails | PingRequestDetails | ErrorDetails | RateLimitDetails | ChannelDeletedNotificationDetails;
}
export interface JoinRequestDetails {
    channelAddress: string;
    memberIdentity: SignedAddressIdentity;
    participantIdentityDetails: any;
}
export interface JoinResponseDetails {
    channelAddress: string;
    channelCode: number;
    participantCode: number;
    participants: ChannelParticipantInfo[];
}
export interface LeaveRequestDetails {
    channelAddress: string;
    permanently?: boolean;
}
export interface HistoryRequestDetails {
    channelAddress: string;
    before: number;
    after?: number;
    maxCount: number;
}
export interface HistoryResponseDetails {
    count: number;
    total: number;
}
export interface HistoryMessageDetails {
    timestamp: number;
    channelAddress: string;
    senderAddress: string;
}
export interface PingRequestDetails {
    interval?: number;
}
export interface ErrorDetails {
    statusCode: number;
    errorMessage: string;
    channelAddress?: string;
}
export interface RateLimitDetails {
    channelAddress: string;
    options: string[];
}
export interface JoinNotificationDetails extends HasMemberIdentity {
    channelAddress: string;
    signedIdentity: SignedKeyIdentity;
    participantCode: number;
    participantDetails: any;
}
export interface LeaveNotificationDetails {
    channelAddress: string;
    participantAddress: string;
    participantCode: number;
    permanently: boolean;
}
export interface ChannelDeletedNotificationDetails {
    channelAddress: string;
}
export interface ControlMessagePayload {
    jsonMessage: ControlChannelMessage;
    binaryPortion?: Uint8Array;
}
export interface ChannelParticipantIdentity extends HasMemberIdentity {
    signedIdentity: SignedKeyIdentity;
    participantDetails: any;
}
export interface ChannelParticipantInfo {
    code: number;
    participantIdentity: ChannelParticipantIdentity;
    isCreator: boolean;
    isYou: boolean;
    memberSince: number;
    lastActive: number;
}
