import { KeyInfo, Signable, SignedKeyIdentity, SignedAddressIdentity } from "./channels-identity";
export declare class ChannelIdentityUtils {
    static generatePrivateKey(): Uint8Array;
    static generateValidAddress(): string;
    static getKeyInfo(privateKey: Uint8Array): KeyInfo;
    static createSignedFullIdentity(keyInfo: KeyInfo, name?: string, imageUrl?: string, contactMeShareCode?: string, extensions?: any): SignedKeyIdentity;
    static createSignedKeyIdentity(keyInfo: KeyInfo, address: string, publicKey: string): SignedKeyIdentity;
    static createSignedAddressIdentity(keyInfo: KeyInfo, address: string): SignedAddressIdentity;
    static sign<T extends Signable>(keyInfo: KeyInfo, object: T): string;
    static decode<T extends Signable>(signature: string, publicKey: string, expectedSignTime: number): T;
    private static verify(signature, publicKeyPem);
}
