import { KeyInfo, FullIdentity, SignedIdentity, KeyIdentity, AddressIdentity, Signable, Signed } from "./channel-service-identity";
export declare class ChannelIdentityUtils {
    static generatePrivateKey(): Uint8Array;
    static generateValidAddress(): string;
    static getKeyInfo(privateKey: Uint8Array): KeyInfo;
    static createSignedFullIdentity(keyInfo: KeyInfo, name?: string, imageUrl?: string, contactMeShareCode?: string, extensions?: any): SignedIdentity<FullIdentity>;
    static createSignedKeyedIdentity(keyInfo: KeyInfo): SignedIdentity<KeyIdentity>;
    static createSignedAddressIdentity(keyInfo: KeyInfo, address: string): SignedIdentity<AddressIdentity>;
    private static sign(keyInfo, object);
    static verifyKeyIdentity<T extends KeyIdentity>(object: SignedIdentity<T>, expectedSignTime: number): boolean;
    static verifySignedObject<T extends Signable>(object: Signed<T>, publicKey: string, expectedSignTime: number): boolean;
    private static verify(signature, publicKeyPem);
}
