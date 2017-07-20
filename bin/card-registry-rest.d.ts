import { SignedKeyIdentity, SignedAddressIdentity } from "./channels-identity";
import { SignedBankReceipt, BankAccountInformation, ServiceEndpoints, ServiceRequest, ServiceDescription } from "./channels-common";
export declare const CHANNELS_CARD_REGISTRY_PROTOCOL = "https://channelelements.org/protocols/card-registry";
export interface CardRegistryServiceDescription extends ServiceDescription {
}
export interface CardRegistryServiceEndpoints extends ServiceEndpoints {
}
export interface CardRegistryServiceRequest<I extends SignedKeyIdentity | SignedAddressIdentity, T> extends ServiceRequest<I, T> {
}
export interface CardRegistryRegisterUserDetails {
}
export interface CardRegistryRegisterUserResponse {
}
export interface CardRegistryPaymentDetails {
    signedPayment?: SignedBankReceipt;
}
export interface CardRegistryPaymentResponse {
}
export interface CardRegistrySearchDetails {
    searchString: string;
    categoriesFilter?: string;
    sortBy?: string;
    sortOrder?: string;
    maxCount?: number;
    offset?: number;
}
export interface CardRegistrySearchResponse {
    matches: CardRegistryEntry[];
}
export interface CardRegistryGetReviewsDetails {
    entryId: string;
    sortOrder?: string;
    maxCount?: number;
    offset?: number;
}
export interface CardRegistryGetReviewsResponse {
    reviews: CardRegistryReview[];
    totalCount: number;
}
export interface CardRegistryReviewDetails {
    entryId: string;
    rating: number;
    comment: string;
}
export interface CardRegistryReviewResponse {
}
export interface CardRegistryNotifyPurchaseDetails {
    entryId: string;
}
export interface CardRegistryNotifyPurchaseResponse {
}
export interface CardRegistryEntry {
    entryId: string;
    approved: boolean;
    cardSourceWithVersion: string;
    lastSubmitted: number;
    lastSubmittedByAddress: string;
    firstApproved: number;
    lastApprovedVersion: string;
    lastApproved: number;
    cardName: string;
    websiteUrl: string;
    description: string;
    author: string;
    iconUrl: string;
    price: number;
    bankAccount: BankAccountInformation;
    overallRating: number;
    purchaseCount: number;
    purchasersCount: number;
    numberReviews: number;
    requestsPayment: boolean;
    offersPayment: boolean;
    collaborative: boolean;
}
export interface CardRegistryReview {
    entryId: string;
    reviewedAt: number;
    byAccountAddress: string;
    rating: number;
    comment: string;
}
