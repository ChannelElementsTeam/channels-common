import { KeyInfo, KeyIdentity, AddressIdentity, Signable, SignedKeyIdentity, SignedAddressIdentity } from "./channels-identity";
export declare class ChannelIdentityUtils {
    static generatePrivateKey(): Uint8Array;
    static generateValidAddress(): string;
    static getKeyInfo(privateKey: Uint8Array): KeyInfo;
    static createSignedKeyIdentity(keyInfo: KeyInfo, address: string, publicKey: string): SignedKeyIdentity;
    static decodeSignedKeySignature(signature: string, publicKey: string, expectedSignTime: number): KeyIdentity;
    static createSignedAddressIdentity(keyInfo: KeyInfo, address: string): SignedAddressIdentity;
    static decodeAddressSignature(signature: string, publicKey: string, expectedSignTime: number): AddressIdentity;
    static sign<T extends Signable>(keyInfo: KeyInfo, object: T): string;
    static decode<T extends Signable>(signature: string, publicKey: string, expectedSignTime: number): T;
    private static verify(signature, publicKeyPem);
}
