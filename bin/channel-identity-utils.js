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
            publicKey: keyInfo.publicKeyPem,
            signature: this.sign(keyInfo, identity)
        };
        return result;
    }
    static createSignedKeyIdentity(keyInfo, address, publicKey) {
        const addressInfo = {
            address: address,
            publicKey: publicKey,
            signedAt: Date.now()
        };
        const result = {
            publicKey: publicKey,
            signature: this.sign(keyInfo, addressInfo)
        };
        return result;
    }
    static createSignedAddressIdentity(keyInfo, address) {
        const addressInfo = {
            address: address,
            signedAt: Date.now()
        };
        const result = {
            address: address,
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
        return jwsSignature;
    }
    static verifySignedObject(object, publicKey, expectedSignTime) {
        if (!this.verify(object.signature, publicKey)) {
            return null;
        }
        const decoded = jws.decode(object.signature);
        try {
            const result = JSON.parse(decoded.payload);
            if (expectedSignTime && Math.abs(result.signedAt - expectedSignTime) > MAX_VERIFY_CLOCK_SKEW) {
                return null;
            }
            return result;
        }
        catch (err) {
            console.warn("Identity.verifySignedObject: invalid JSON payload");
            return null;
        }
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