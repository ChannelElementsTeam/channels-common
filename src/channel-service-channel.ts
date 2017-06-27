
import { FullIdentity, SignedKeyIdentity } from "./channel-service-identity";

export interface ChannelInformation extends BasicChannelInformation {
  transportUrl: string;
  isCreator: boolean;
  members: ChannelMemberInfo[]; // in reverse chronological order based on lastActive; list may be truncated (compare against memberCount)
  lastUpdated: number;
}

export interface BasicChannelInformation {
  channelAddress: string;
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
  extensions: any;
}
export interface ParticipationContract {
  type: string;
  extensions?: any;
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
  topology: string; // many-to-many, one-to-many, many-to-one
}

export interface MemberContractDetails {
  subscribe: boolean; // if true, server will attempt to notify about new channel activity
}
