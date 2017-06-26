"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const secp256k1 = require('secp256k1');
const ethereumUtils = require('ethereumjs-util');
const KeyEncoder = require('key-encoder');
const jws = require('jws');
const MAX_VERIFY_CLOCK_SKEW = 1000 * 60 * 15;
class ChannelIdentityUtils {
    static generatePrivateKey() {
        let privateKeyBuffer;
        do {
            privateKeyBuffer = crypto.randomBytes(32);
        } while (!secp256k1.privateKeyVerify(privateKeyBuffer));
        return new Uint8Array(privateKeyBuffer);
    }
    static generateValidAddress() {
        const privateKey = this.generatePrivateKey();
        const publicKey = secp256k1.publicKeyCreate(new Buffer(privateKey));
        const ethPublic = ethereumUtils.importPublic(new Buffer(publicKey));
        const ethAddress = ethereumUtils.pubToAddress(ethPublic, false);
        return new Buffer(ethAddress).toString('base64');
    }
    static getKeyInfo(privateKey) {
        const publicKey = secp256k1.publicKeyCreate(new Buffer(privateKey));
        const ethPublic = ethereumUtils.importPublic(new Buffer(publicKey));
        const ethAddress = ethereumUtils.pubToAddress(ethPublic, false);
        const keyEncoder = new KeyEncoder('secp256k1');
        const result = {
            privateKeyBytes: privateKey,
            privateKeyPem: keyEncoder.encodePrivate(new Buffer(privateKey).toString('hex'), 'raw', 'pem'),
            publicKeyBytes: publicKey,
            publicKeyPem: keyEncoder.encodePublic(new Buffer(publicKey).toString('hex'), 'raw', 'pem'),
            ethereumAddress: '0x' + new Buffer(ethAddress).toString('hex'),
            address: new Buffer(ethAddress).toString('base64')
        };
        return result;
    }
    static createSignedFullIdentity(keyInfo, name, imageUrl, contactMeShareCode, extensions) {
        const identity = {
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
        const result = {
            info: identity,
            signature: this.sign(keyInfo, identity)
        };
        return result;
    }
    static createSignedKeyedIdentity(keyInfo) {
        const identity = {
            address: keyInfo.address,
            publicKey: keyInfo.publicKeyPem,
            signedAt: Date.now(),
        };
        const result = {
            info: identity,
            signature: this.sign(keyInfo, identity)
        };
        return result;
    }
    static createSignedAddressIdentity(keyInfo, address) {
        const addressInfo = {
            address: address,
            signedAt: Date.now()
        };
        const result = {
            info: addressInfo,
            signature: this.sign(keyInfo, addressInfo)
        };
        return result;
    }
    static sign(keyInfo, object) {
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
    static verifyKeyIdentity(object, expectedSignTime) {
        return this.verifySignedObject(object, object.info.publicKey, expectedSignTime);
    }
    static verifySignedObject(object, publicKey, expectedSignTime) {
        if (expectedSignTime && Math.abs(object.info.signedAt - expectedSignTime) > MAX_VERIFY_CLOCK_SKEW) {
            return false;
        }
        return this.verify(object.signature, publicKey);
    }
    static verify(signature, publicKeyPem) {
        try {
            return jws.verify(signature, 'RS256', publicKeyPem);
        }
        catch (err) {
            console.warn("ChannelIdentity.verify failure", err);
            return false;
        }
    }
}
exports.ChannelIdentityUtils = ChannelIdentityUtils;
//# sourceMappingURL=channel-identity-utils.js.map