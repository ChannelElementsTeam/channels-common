const secp256k1 = require('secp256k1');
const createKeccakHash = require('keccak');

// subset of ethereumjs-utils
export class EthereumUtils {
  static importPublic(publicKey: Buffer): Buffer {
    if (publicKey.length !== 64) {
      publicKey = secp256k1.publicKeyConvert(publicKey, false).slice(1);
    }
    return publicKey;
  }

  static pubToAddress(pubKey: Buffer, sanitize: boolean): Buffer {
    if (sanitize && (pubKey.length !== 64)) {
      pubKey = secp256k1.publicKeyConvert(pubKey, false).slice(1);
    }
    // Only take the lower 160bits of the hash
    return exports.sha3(pubKey).slice(-20);
  }

  static sha3(a: Buffer, bits = 256): Buffer {
    return createKeccakHash('keccak' + bits).update(a).digest();
  }
}
