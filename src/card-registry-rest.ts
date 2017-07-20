
import { SignedKeyIdentity, SignedAddressIdentity } from "./channels-identity";
import { SignedBankReceipt, BankAccountInformation, ServiceEndpoints, ServiceRequest, ServiceDescription } from "./channels-common";

export const CHANNELS_CARD_REGISTRY_PROTOCOL = "https://channelelements.org/protocols/card-registry";

export interface CardRegistryServiceDescription extends ServiceDescription { }

export interface CardRegistryServiceEndpoints extends ServiceEndpoints { }

// ----------------------------------------------------------------------------
// REST Requests to serviceURL
// All requests use POST and include signed identity
// All requests and responses are in JSON
// ----------------------------------------------------------------------------

export interface CardRegistryServiceRequest<I extends SignedKeyIdentity | SignedAddressIdentity, T> extends ServiceRequest<I, T> { }

// type = 'register-user', identity type:  SignedKeyIdentity
export interface CardRegistryRegisterUserDetails { }

export interface CardRegistryRegisterUserResponse { }

// type = 'pay', identity type: SignedAddressIdentity
export interface CardRegistryPaymentDetails {
  signedPayment?: SignedBankReceipt;
}

export interface CardRegistryPaymentResponse { }

// type = 'search', identity type:  SignedAddressIdentity
export interface CardRegistrySearchDetails {
  searchString: string;
  categoriesFilter?: string;
  sortBy?: string;  // 'price', 'rating'
  sortOrder?: string; // 'ascending', 'descending'
  maxCount?: number;
  offset?: number;  // for paging
}

export interface CardRegistrySearchResponse {
  matches: CardRegistryEntry[];
}

// type = 'get-reviews', identity type:  SignedAddressIdentity
export interface CardRegistryGetReviewsDetails {
  entryId: string;
  sortOrder?: string;  // 'ascending', 'descending'
  maxCount?: number;
  offset?: number;  // for paging
}

export interface CardRegistryGetReviewsResponse {
  reviews: CardRegistryReview[];
  totalCount: number;
}

// type = 'review', identity type:  SignedAddressIdentity
export interface CardRegistryReviewDetails {
  entryId: string;
  rating: number;
  comment: string;
}

export interface CardRegistryReviewResponse { }

// type = 'notify-purchase', identity type:  SignedAddressIdentity
export interface CardRegistryNotifyPurchaseDetails {
  entryId: string;
}

export interface CardRegistryNotifyPurchaseResponse { }

export interface CardRegistryEntry {
  entryId: string; // a GUID for this card registry entry, constant over versions of the same card
  approved: boolean;  // if false, do not use this card
  cardSourceWithVersion: string;  // e.g., 'ChannelElementsTeam/card-sample-text-w-comments'
  lastSubmitted: number;
  lastSubmittedByAddress: string;
  firstApproved: number;
  lastApprovedVersion: string;  // e.g., 1.0.3
  lastApproved: number;
  cardName: string;  // e.g., "Text with comments"
  websiteUrl: string;
  description: string;
  author: string;
  iconUrl: string;
  price: number;  // "rental cost" for up to 4 hours of composing
  bankAccount: BankAccountInformation;  // where to pay
  overallRating: number;  // 0 to 5 stars
  purchaseCount: number; // number of purchases
  purchasersCount: number; // number of distinct purchasers
  numberReviews: number;
  requestsPayment: boolean;  // if true, this card may require a payment
  offersPayment: boolean;  // if true, this card may offer a payment
  collaborative: boolean;  // if true, this card provides participant collaboration
}

export interface CardRegistryReview {
  entryId: string;
  reviewedAt: number;
  byAccountAddress: string;
  rating: number;
  comment: string;
}
