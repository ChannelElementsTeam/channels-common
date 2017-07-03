import { KeyInfo, FullIdentity, KeyIdentity, AddressIdentity, Signable, Signed, SignedKeyIdentity, SignedAddressIdentity } from "./channel-service-identity";
import * as crypto from 'crypto';
const secp256k1 = require('secp256k1');
const ethereumUtils = require('ethereumjs-util');
const KeyEncoder = require('key-encoder');
const jws = require('jws');

const MAX_VERIFY_CLOCK_SKEW = 1000 * 60 * 15;

export class ChannelIdentityUtils {

  static generatePrivateKey(): Uint8Array {
    let privateKeyBuffer: Buffer;
    do {
      privateKeyBuffer = crypto.randomBytes(32);
    } while (!secp256k1.privateKeyVerify(privateKeyBuffer));
    return new Uint8Array(privateKeyBuffer);
  }

  static generateValidAddress(): string {
    const privateKey = this.generatePrivateKey();
    const publicKey = secp256k1.publicKeyCreate(new Buffer(privateKey)) as Uint8Array;
    const ethPublic = ethereumUtils.importPublic(new Buffer(publicKey)) as Uint8Array;
    const ethAddress = ethereumUtils.pubToAddress(ethPublic, false) as Uint8Array;
    return new Buffer(ethAddress).toString('base64');
  }

  static getKeyInfo(privateKey: Uint8Array): KeyInfo {
    const publicKey = secp256k1.publicKeyCreate(new Buffer(privateKey)) as Uint8Array;
    const ethPublic = ethereumUtils.importPublic(new Buffer(publicKey)) as Uint8Array;
    const ethAddress = ethereumUtils.pubToAddress(ethPublic, false) as Uint8Array;
    const keyEncoder = new KeyEncoder('secp256k1');
    const result: KeyInfo = {
      privateKeyBytes: privateKey,
      privateKeyPem: keyEncoder.encodePrivate(new Buffer(privateKey).toString('hex'), 'raw', 'pem'),
      publicKeyBytes: publicKey,
      publicKeyPem: keyEncoder.encodePublic(new Buffer(publicKey).toString('hex'), 'raw', 'pem'),
      ethereumAddress: '0x' + new Buffer(ethAddress).toString('hex'),
      address: new Buffer(ethAddress).toString('base64')
    };
    return result;
  }

  static createSignedFullIdentity(keyInfo: KeyInfo, name?: string, imageUrl?: string, contactMeShareCode?: string, extensions?: any): SignedKeyIdentity {
    const identity: FullIdentity = {
      address: keyInfo.address,
      account: keyInfo.ethereumAddress,
      publicKey: keyInfo.publicKeyPem,
      signedAt: Date.now(),
    };
    if (name) {
      identity.name = name;
    }
    if (imageUrl) {
      identity.imageUrl = imageUrl;
    }
    if (contactMeShareCode) {
      identity.contactMeShareCode = contactMeShareCode;
    }
    if (extensions) {
      identity.extensions = extensions;
    }
    const result: SignedKeyIdentity = {
      publicKey: keyInfo.publicKeyPem,
      signature: this.sign(keyInfo, identity)
    };
    return result;
  }

  static createSignedKeyIdentity(keyInfo: KeyInfo, address: string, publicKey: string): SignedKeyIdentity {
    const addressInfo: KeyIdentity = {
      address: address,
      publicKey: publicKey,
      signedAt: Date.now()
    };
    const result: SignedKeyIdentity = {
      publicKey: publicKey,
      signature: this.sign(keyInfo, addressInfo)
    };
    return result;
  }

  static createSignedAddressIdentity(keyInfo: KeyInfo, address: string): SignedAddressIdentity {
    const addressInfo: AddressIdentity = {
      address: address,
      signedAt: Date.now()
    };
    const result: SignedAddressIdentity = {
      address: address,
      signature: this.sign(keyInfo, addressInfo)
    };
    return result;
  }

  static sign<T extends Signable>(keyInfo: KeyInfo, object: T): string {
    const jwsSignature = jws.sign({
      header: { alg: 'RS256' },
      payload: object,
      privateKey: keyInfo.privateKeyPem
    });
    return jwsSignature;
  }

  static decode<T extends Signable>(signature: string, publicKey: string, expectedSignTime: number): T {
    if (!this.verify(signature, publicKey)) {
      return null;
    }
    const decoded = jws.decode(signature);
    try {
      const result = JSON.parse(decoded.payload) as T;
      if (expectedSignTime && Math.abs(result.signedAt - expectedSignTime) > MAX_VERIFY_CLOCK_SKEW) {
        return null;
      }
      return result;
    } catch (err) {
      console.warn("Identity.verifySignedObject: invalid JSON payload");
      return null;
    }
  }

  private static verify(signature: string, publicKeyPem: string): boolean {
    try {
      return jws.verify(signature, 'RS256', publicKeyPem);
    } catch (err) {
      console.warn("ChannelIdentity.verify failure", err);
      return false;
    }
  }
}
