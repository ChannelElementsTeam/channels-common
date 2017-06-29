/// <reference types="node" />
export declare class EthereumUtils {
    static importPublic(publicKey: Buffer): Buffer;
    static pubToAddress(pubKey: Buffer, sanitize: boolean): Buffer;
    static sha3(a: Buffer, bits?: number): Buffer;
}
