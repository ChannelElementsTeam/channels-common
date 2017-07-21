"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var secp256k1 = require('secp256k1');
var ethereumUtils = require('ethereumjs-util');
var KeyEncoder = require('key-encoder');
var jws = require('jws');
var MAX_VERIFY_CLOCK_SKEW = 1000 * 60 * 15;
var ChannelIdentityUtils = (function () {
    function ChannelIdentityUtils() {
    }
    ChannelIdentityUtils.generatePrivateKey = function () {
        var privateKeyBuffer;
        do {
            privateKeyBuffer = crypto.randomBytes(32);
        } while (!secp256k1.privateKeyVerify(privateKeyBuffer));
        return new Uint8Array(privateKeyBuffer);
    };
    ChannelIdentityUtils.generateValidAddress = function () {
        var privateKey = this.generatePrivateKey();
        var publicKey = secp256k1.publicKeyCreate(new Buffer(privateKey));
        var ethPublic = ethereumUtils.importPublic(new Buffer(publicKey));
        var ethAddress = ethereumUtils.pubToAddress(ethPublic, false);
        return new Buffer(ethAddress).toString('base64');
    };
    ChannelIdentityUtils.getKeyInfo = function (privateKey) {
        var publicKey = secp256k1.publicKeyCreate(new Buffer(privateKey));
        var ethPublic = ethereumUtils.importPublic(new Buffer(publicKey));
        var ethAddress = ethereumUtils.pubToAddress(ethPublic, false);
        var keyEncoder = new KeyEncoder('secp256k1');
        var result = {
            privateKeyBytes: privateKey,
            privateKeyPem: keyEncoder.encodePrivate(new Buffer(privateKey).toString('hex'), 'raw', 'pem'),
            publicKeyBytes: publicKey,
            publicKeyPem: keyEncoder.encodePublic(new Buffer(publicKey).toString('hex'), 'raw', 'pem'),
            ethereumAddress: '0x' + new Buffer(ethAddress).toString('hex'),
            address: new Buffer(ethAddress).toString('base64')
        };
        return result;
    };
    ChannelIdentityUtils.createSignedKeyIdentity = function (keyInfo, address, publicKey) {
        var addressInfo = {
            address: address,
            publicKey: publicKey,
            signedAt: Date.now()
        };
        var result = {
            publicKey: publicKey,
            signature: this.sign(keyInfo, addressInfo)
        };
        return result;
    };
    ChannelIdentityUtils.createSignedAddressIdentity = function (keyInfo, address) {
        var addressInfo = {
            address: address,
            signedAt: Date.now()
        };
        var result = {
            address: address,
            signature: this.sign(keyInfo, addressInfo)
        };
        return result;
    };
    ChannelIdentityUtils.sign = function (keyInfo, object) {
        var jwsSignature = jws.sign({
            header: { alg: 'RS256' },
            payload: object,
            privateKey: keyInfo.privateKeyPem
        });
        return jwsSignature;
    };
    ChannelIdentityUtils.decode = function (signature, publicKey, expectedSignTime) {
        if (!this.verify(signature, publicKey)) {
            return null;
        }
        var decoded = jws.decode(signature);
        try {
            var result = JSON.parse(decoded.payload);
            if (expectedSignTime && Math.abs(result.signedAt - expectedSignTime) > MAX_VERIFY_CLOCK_SKEW) {
                return null;
            }
            return result;
        }
        catch (err) {
            console.warn("Identity.verifySignedObject: invalid JSON payload");
            return null;
        }
    };
    ChannelIdentityUtils.verify = function (signature, publicKeyPem) {
        try {
            return jws.verify(signature, 'RS256', publicKeyPem);
        }
        catch (err) {
            console.warn("ChannelIdentity.verify failure", err);
            return false;
        }
    };
    return ChannelIdentityUtils;
}());
exports.ChannelIdentityUtils = ChannelIdentityUtils;
//# sourceMappingURL=channel-identity-utils.js.map