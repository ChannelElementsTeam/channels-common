import { KeyInfo, Signable, Signed, SignedKeyIdentity, SignedAddressIdentity } from "./channel-service-identity";
export declare class ChannelIdentityUtils {
    static generatePrivateKey(): Uint8Array;
    static generateValidAddress(): string;
    static getKeyInfo(privateKey: Uint8Array): KeyInfo;
    static createSignedFullIdentity(keyInfo: KeyInfo, name?: string, imageUrl?: string, contactMeShareCode?: string, extensions?: any): SignedKeyIdentity;
    static createSignedKeyIdentity(keyInfo: KeyInfo, address: string, publicKey: string): SignedKeyIdentity;
    static createSignedAddressIdentity(keyInfo: KeyInfo, address: string): SignedAddressIdentity;
    private static sign(keyInfo, object);
    static verifySignedObject<T extends Signable>(object: Signed, publicKey: string, expectedSignTime: number): T;
    private static verify(signature, publicKeyPem);
}
