var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Derives a set of keys from the master key.
 * @param {CryptoKey} material - master key to derive from
 *
 * See https://tools.ietf.org/html/draft-omara-sframe-00#section-4.3.1
 */
export function deriveKeys(material) {
    return __awaiter(this, void 0, void 0, function* () {
        const info = new ArrayBuffer();
        const textEncoder = new TextEncoder();
        // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#HKDF
        // https://developer.mozilla.org/en-US/docs/Web/API/HkdfParams
        const encryptionKey = yield crypto.subtle.deriveKey({
            name: 'HKDF',
            salt: textEncoder.encode('JFrameEncryptionKey'),
            hash: 'SHA-256',
            info
        }, material, {
            name: 'AES-GCM',
            length: 128
        }, false, ['encrypt', 'decrypt']);
        return {
            material,
            encryptionKey
        };
    });
}
/**
 * Ratchets a key. See
 * https://tools.ietf.org/html/draft-omara-sframe-00#section-4.3.5.1
 * @param {CryptoKey} material - base key material
 * @returns {ArrayBuffer} - ratcheted key material
 */
export function ratchet(material) {
    return __awaiter(this, void 0, void 0, function* () {
        const textEncoder = new TextEncoder();
        // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveBits
        return crypto.subtle.deriveBits({
            name: 'HKDF',
            salt: textEncoder.encode('JFrameRatchetKey'),
            hash: 'SHA-256',
            info: new ArrayBuffer()
        }, material, 256);
    });
}
/**
 * Converts a raw key into a WebCrypto key object with default options
 * suitable for our usage.
 * @param {ArrayBuffer} keyBytes - raw key
 * @param {Array} keyUsages - key usages, see importKey documentation
 * @returns {CryptoKey} - the WebCrypto key.
 */
export function importKey(keyBytes) {
    return __awaiter(this, void 0, void 0, function* () {
        // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey
        return crypto.subtle.importKey('raw', keyBytes, 'HKDF', false, ['deriveBits', 'deriveKey']);
    });
}
//# sourceMappingURL=crypto-utils.js.map