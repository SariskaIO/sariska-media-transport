/**
 * Force download of Blob in browser by faking an <a> tag.
 *
 * @param {Blob} blob - Base64 URL.
 * @param {string} fileName - The filename to appear in the download dialog.
 * @returns {void}
 */
export function downloadBlob(blob: Blob, fileName?: string): void;
