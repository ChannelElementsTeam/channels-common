export interface KeyInfo {
  privateKeyBytes: Uint8Array;
  privateKeyPem: string;
  publicKeyBytes: Uint8Array;
  publicKeyPem: string;
  ethereumAddress: string;
  address: string;
}

export interface SignedIdentity<I extends AddressIdentity> extends Signed<I> { }

export interface FullIdentity extends KeyIdentity, HasExtendedIdentity { }
export interface KeyIdentity extends AddressIdentity, HasPublicKey { }
export interface AddressIdentity extends Signable, HasAddress { }

export interface HasExtendedIdentity {
  account?: string;
  name?: string;
  imageUrl?: string;
  contactMeShareCode?: string;
  extensions?: any;
}

export interface HasPublicKey {
  publicKey: string;
}

export interface HasAddress {
  address: string;
}

export interface Signed<T extends Signable> {
  info: T;
  signature: string;
}

export interface Signable {
  signedAt: number;
}
