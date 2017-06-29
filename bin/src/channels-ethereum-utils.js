"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var secp256k1 = require('secp256k1');
var createKeccakHash = require('keccak');
// subset of ethereumjs-utils
var EthereumUtils = (function () {
    function EthereumUtils() {
    }
    EthereumUtils.importPublic = function (publicKey) {
        if (publicKey.length !== 64) {
            publicKey = secp256k1.publicKeyConvert(publicKey, false).slice(1);
        }
        return publicKey;
    };
    EthereumUtils.pubToAddress = function (pubKey, sanitize) {
        if (sanitize && (pubKey.length !== 64)) {
            pubKey = secp256k1.publicKeyConvert(pubKey, false).slice(1);
        }
        // Only take the lower 160bits of the hash
        return exports.sha3(pubKey).slice(-20);
    };
    EthereumUtils.sha3 = function (a, bits) {
        if (bits === void 0) { bits = 256; }
        return createKeccakHash('keccak' + bits).update(a).digest();
    };
    return EthereumUtils;
}());
exports.EthereumUtils = EthereumUtils;
//# sourceMappingURL=channels-ethereum-utils.js.map