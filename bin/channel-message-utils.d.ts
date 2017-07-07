import { ControlChannelMessage } from "./channel-service-control";
export declare class ChannelMessageUtils {
    static MESSAGE_HEADER_LENGTH: number;
    static CHANNEL_ELEMENTS_VERSION_V1: number;
    static serializeControlMessage(requestId: string, type: string, details: any, binaryPortion?: Uint8Array): Uint8Array;
    static createControlMessage(requestId: string, type: string, details: any): ControlChannelMessage;
    static serializeChannelMessage(messageInfo: MessageToSerialize, lastTimestampSent: number, clockSkew: number): Uint8Array;
    static parseChannelMessage(message: Uint8Array, enforceClockSync?: boolean): DeserializedMessage;
}
export interface MessageToSerialize {
    channelCode: number;
    senderCode: number;
    priority: boolean;
    history: boolean;
    jsonMessage?: any;
    binaryPayload?: Uint8Array;
    timestamp?: number;
}
export interface ChannelMessage {
    serializedMessage: Uint8Array;
    timestamp: number;
    channelCode: number;
    senderCode: number;
    priority: boolean;
    history: boolean;
    fullPayload?: Uint8Array;
    controlMessagePayload?: {
        jsonMessage: any;
        binaryPortion?: Uint8Array;
    };
}
export interface DeserializedMessage {
    valid: boolean;
    errorMessage?: string;
    rawMessage?: Uint8Array;
    contents?: ChannelMessage;
}
