import { KeyInfo, FullIdentity, SignedIdentity, KeyIdentity, AddressIdentity, Signable, Signed } from "./channel-service-identity";
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

  static createSignedFullIdentity(keyInfo: KeyInfo, name?: string, imageUrl?: string, contactMeShareCode?: string, extensions?: any): SignedIdentity<FullIdentity> {
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
    const result: SignedIdentity<FullIdentity> = {
      info: identity,
      signature: this.sign(keyInfo, identity)
    };
    return result;
  }

  static createSignedKeyedIdentity(keyInfo: KeyInfo): SignedIdentity<KeyIdentity> {
    const identity: KeyIdentity = {
      address: keyInfo.address,
      publicKey: keyInfo.publicKeyPem,
      signedAt: Date.now(),
    };
    const result: SignedIdentity<KeyIdentity> = {
      info: identity,
      signature: this.sign(keyInfo, identity)
    };
    return result;
  }

  static createSignedAddressIdentity(keyInfo: KeyInfo, address: string): SignedIdentity<AddressIdentity> {
    const addressInfo: AddressIdentity = {
      address: address,
      signedAt: Date.now()
    };
    const result: SignedIdentity<AddressIdentity> = {
      info: addressInfo,
      signature: this.sign(keyInfo, addressInfo)
    };
    return result;
  }

  private static sign(keyInfo: KeyInfo, object: any): any {
    const jwsSignature = jws.sign({
      header: { alg: 'RS256' },
      payload: object,
      privateKey: keyInfo.privateKeyPem
    });
    const verification = this.verify(jwsSignature, keyInfo.publicKeyPem);
    if (!verification) {
      throw new Error("Sign/Verify is not working");
    }
    return jwsSignature;
  }

  static verifyKeyIdentity<T extends KeyIdentity>(object: SignedIdentity<T>, expectedSignTime: number): boolean {
    return this.verifySignedObject(object, object.info.publicKey, expectedSignTime);
  }

  static verifySignedObject<T extends Signable>(object: Signed<T>, publicKey: string, expectedSignTime: number): boolean {
    if (expectedSignTime && Math.abs(object.info.signedAt - expectedSignTime) > MAX_VERIFY_CLOCK_SKEW) {
      return false;
    }
    return this.verify(object.signature, publicKey);
  }

  private static verify(signature: any, publicKeyPem: string): boolean {
    try {
      return jws.verify(signature, 'RS256', publicKeyPem);
    } catch (err) {
      console.warn("ChannelIdentity.verify failure", err);
      return false;
    }
  }
}
