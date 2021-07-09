import Bourne from '@hapi/bourne';

/**
 * A list if keys to ignore when parsing.
 * @type {string[]}
 */

const blacklist = [ '__proto__', 'constructor', 'prototype' ];

/**
 * Parses the query/search or fragment/hash parameters out of a specific URL and
 * returns them as a JS object.
 *
 * @param {URL} url - The URL to parse.
 * @param {boolean} dontParse - If falsy, some transformations (for parsing the
 * value as JSON) will be executed.
 * @param {string} source - If {@code 'search'}, the parameters will parsed out
 * of {@code url.search}; otherwise, out of {@code url.hash}.
 * @returns {Object}
 */

export function parseURLParams(dontParse = true) {
    const paramStr = location.search ? location.search : location.hash;
    const params = {};
    const paramParts = paramStr && paramStr.substr(1)
        .split('&') || []; // Detect and ignore hash params for hash routers.

    if (location.hash && paramParts.length === 1) {
        const firstParam = paramParts[0];

        if (firstParam.startsWith('/') && firstParam.split('&').length === 1) {
            return params;
        }
    }

    paramParts.forEach(part => {
        const param = part.split('=');
        const key = param[0];

        if (!key || blacklist.includes(key.split('.')[0])) {
            return;
        }

        let value;

        try {
            value = param[1];

            if (!dontParse) {
                const decoded = decodeURIComponent(value)
                    .replace(/\\&/, '&');
                value = decoded === 'undefined' ? undefined : Bourne.parse(decoded);
            }
        } catch (e) {
            console.log(`Failed to parse URL parameter value: ${String(value)}`);
            return;
        }

        params[key] = value;
    });
    return params;
}


export function syncWithURL(conferenceConfig) {
    const params = parseURLParams();
    Object.keys(params)
        .forEach(param => {
            const key = param.replace('.config', '');
            switch (key) {
                case 'analytics.disabled':
                    conferenceConfig.analytics.disabled = params[param];
                    break;
                case 'startWithAudioMuted':
                    conferenceConfig.startAudioMuted = params[param];
                    break;
                case 'startWithVideoMuted':
                    conferenceConfig.startVideoMuted = params[param];
                    break;
                case 'p2p.enabled':
                    conferenceConfig.p2p.enabled = params[param];
                    break;
                default:
                    conferenceConfig[key] = params[param];
                }
        });
}







