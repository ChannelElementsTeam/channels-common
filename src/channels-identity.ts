export interface KeyInfo {
  privateKeyBytes: Uint8Array;
  privateKeyPem: string;
  publicKeyBytes: Uint8Array;
  publicKeyPem: string;
  ethereumAddress: string;
  address: string;
}

export interface SignedKeyIdentity extends Signed {
  publicKey: string;
}

export interface SignedAddressIdentity extends Signed {
  address: string;
}

export interface Signed {
  signature: string;
}

export interface KeyIdentity extends AddressIdentity {
  publicKey: string;
}
export interface AddressIdentity extends Signable {
  address: string;
}

export interface Signable {
  signedAt: number;
}
