"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var channels_ethereum_utils_1 = require("./channels-ethereum-utils");
var crypto = require("crypto");
// Kingston: base64url-adhoc because otherwise compiler errors:  see https://github.com/brianloveswords/base64url/issues/13
var base64url_adhoc_1 = require("base64url-adhoc");
var secp256k1 = require('secp256k1');
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
        var ethPublic = channels_ethereum_utils_1.EthereumUtils.importPublic(publicKey);
        var ethAddress = channels_ethereum_utils_1.EthereumUtils.pubToAddress(ethPublic, false);
        return base64url_adhoc_1.default.encode(ethAddress);
    };
    ChannelIdentityUtils.getKeyInfo = function (privateKey) {
        var publicKey = secp256k1.publicKeyCreate(new Buffer(privateKey));
        var ethPublic = channels_ethereum_utils_1.EthereumUtils.importPublic(publicKey);
        var ethAddress = channels_ethereum_utils_1.EthereumUtils.pubToAddress(ethPublic, false);
        var keyEncoder = new KeyEncoder('secp256k1');
        var result = {
            privateKeyBytes: privateKey,
            privateKeyPem: keyEncoder.encodePrivate(new Buffer(privateKey).toString('hex'), 'raw', 'pem'),
            publicKeyBytes: publicKey,
            publicKeyPem: keyEncoder.encodePublic(publicKey.toString('hex'), 'raw', 'pem'),
            ethereumAddress: '0x' + ethAddress.toString('hex'),
            address: base64url_adhoc_1.default.encode(ethAddress)
        };
        return result;
    };
    ChannelIdentityUtils.createSignedFullIdentity = function (keyInfo, name, imageUrl, contactMeShareCode, extensions) {
        var identity = {
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
        var result = {
            publicKey: keyInfo.publicKeyPem,
            signature: this.sign(keyInfo, identity)
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
    ChannelIdentityUtils.verifySignedObject = function (object, publicKey, expectedSignTime) {
        if (!this.verify(object.signature, publicKey)) {
            return null;
        }
        var decoded = jws.decode(object.signature);
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