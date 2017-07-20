import { MemberContractDetails, ChannelContractDetails, ChannelInformation, BasicChannelInformation } from "./channel-service-channel";
import { SignedKeyIdentity, SignedAddressIdentity } from "./channels-identity";
import { ServiceRequest, ServiceEndpoints, ServiceDescription, SignedBankReceipt } from "./channels-common";

export const CHANNELS_SWITCH_PROTOCOL = "https://channelelements.org/protocols/switch";

export interface SwitchServiceDescription extends ServiceDescription { }

// ----------------------------------------------------------------------------
// Response to GET share code URL (when request contains header: Accepts: application/json)
// ----------------------------------------------------------------------------

export interface ChannelShareCodeResponse {
  protocol: string;  // e.g., "1.0.0":  conforms to which version of the specification
  invitationId: string;
  channelInfo: BasicChannelInformation;
  serviceEndpoints: ServiceEndpoints;
  extensions: any;
}

// ----------------------------------------------------------------------------
// REST Requests to serviceURL
// All requests use POST and include signed identity
// All requests and responses are in JSON
// ----------------------------------------------------------------------------

export interface SwitchingServiceRequest<I extends SignedKeyIdentity | SignedAddressIdentity, T> extends ServiceRequest<I, T> { }

// type = 'register-user', identity type:  SignedKeyIdentity
export interface SwitchRegisterUserDetails extends RegistrationDetails { }

export interface SwitchRegisterUserResponse extends RegistrationResponse { }

// type = 'pay', identity type: SignedAddressIdentity
export interface CardRegistryPaymentDetails {
  signedPayment?: SignedBankReceipt;
}

export interface CardRegistryPaymentResponse { }

// type = 'create', identity type:  SignedAddressIdentity
export interface ChannelCreateDetails extends HasMemberContractDetails {
  name?: string;
  channelContract: ChannelContractDetails; // shared with everyone
}
export interface ChannelCreateResponse extends ChannelInformation { }

// type = 'share', identity type:  SignedAddressIdentity
export interface ChannelShareDetails extends HasChannel {
  extensions: any;
}
export interface ChannelShareResponse {
  shareCodeUrl: string;
}

// type = 'get', identity type:  SignedAddressIdentity
export interface ChannelGetDetails extends HasChannel { }
export interface ChannelGetResponse extends ChannelInformation { }

// type = 'accept', identity type:  SignedKeyIdentity
export interface ChannelAcceptDetails extends HasMemberContractDetails {
  invitationId: string;
}
export interface ChannelAcceptResponse extends ChannelInformation { }

// type = 'delete', identity type:  SignedAddressIdentity
export interface ChannelDeleteDetails extends HasChannel { }
export interface ChannelDeleteResponse { }

// type = 'list', identity type:  SignedAddressIdentity
export interface ChannelsListDetails {
  lastActiveBefore?: number;
  limit?: number;
}
export interface ChannelsListResponse {
  total: number;
  channels: ChannelInformation[];
}

// type = 'get-registration', identity type: SignedAddressIdentity
export interface GetRegistrationDetails { }

export interface GetRegistrationResponse extends RegistrationResponse { }

// type = 'update-registration', identity type: SignedAddressIdentity
export interface UpdateRegistrationDetails extends RegistrationDetails { }

export interface UpdateRegistrationResponse extends RegistrationResponse { }

// ----------------------------------------------------------------------------
// Miscellaneous interfaces
// ----------------------------------------------------------------------------

export interface HasMemberContractDetails {
  memberContract: MemberContractDetails;
}

export interface HasChannel {
  channel: string;
}

export interface NotificationSettings {
  suspended?: boolean; // while true, no notifications sent
  smsNumber?: string;  // E.164 format (e.g., "+16505551212")
  minimumSmsIntervalMinutes?: number;
  webPushNotifications?: WebPushNotificationInfo[];
  minimumWebPushIntervalMinutes?: number;
  timing?: NotificationTiming;
  smsNotificationCallbackUrlTemplate?: string; // used to create the appropriate client URL in notifications, e.g., 'https://example-client.org/channel/{{channel}}'
  minimumChannelInactiveNotificationIntervalMinutes?: number; // when you've been notified for a channel since you were last active, this is the minimum interval in between notifications
  minimumChannelActiveNotificationIntervalMinutes?: number; // when you have been active on a channel since the last notification about that channel, this is the minimum interval before a notification
}

export interface NotificationTiming {
  notBeforeMinutes: number; // no notifications before this number of minutes after midnight local time
  notAfterMinutes: number; // no notifications after this number of minutes after midnight local time
  noNotificationDays: number[]; // days of week (0 = Sunday, 6 = Saturday) on which notifications will not be sent at any time
}
export interface WebPushNotificationInfo {
  type: string;  // chrome, firefox, safari
  browserPublicKey: string;
}

export interface RegistrationDetails {
  timezone?: string;
  notifications?: NotificationSettings; // only included fields will be modified
}

export interface RegistrationResponse {
  timezone?: string;
  notifications?: NotificationSettings;
}
