var createTFLiteModule = function () { var e = "undefined" != typeof document && document.currentScript ? document.currentScript.src : void 0; return "undefined" != typeof __filename && (e = e || __filename), function (n) { var t, r, a = void 0 !== (n = n || {}) ? n : {}; a.ready = new Promise(function (e, n) { t = e, r = n; }); var o, u = {}; for (o in a)
    a.hasOwnProperty(o) && (u[o] = a[o]); var s, i = [], c = "./this.program", f = function (e, n) { throw n; }, p = !1, l = !1; p = "object" == typeof window, l = "function" == typeof importScripts, s = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node; var d, m, y = ""; !p && !s && !l ? ("undefined" != typeof read && function (e) { return read(e); }, m = function (e) { var n, t; return "function" == typeof readbuffer ? new Uint8Array(readbuffer(e)) : (n = read(e, "binary"), "object" == typeof n || U("Assertion failed: " + t), n); }, "undefined" != typeof scriptArgs ? i = scriptArgs : void 0 !== arguments && (i = arguments), "function" == typeof quit && (f = function (e) { quit(e); }), "undefined" != typeof print && ("undefined" == typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" != typeof printErr ? printErr : print)) : (p || l) && (l ? y = self.location.href : "undefined" != typeof document && document.currentScript && (y = document.currentScript.src), e && (y = e), y = 0 !== y.indexOf("blob:") ? y.substr(0, y.lastIndexOf("/") + 1) : "", function (e) { var n = new XMLHttpRequest; return n.open("GET", e, !1), n.send(null), n.responseText; }, l && (m = function (e) { var n = new XMLHttpRequest; return n.open("GET", e, !1), n.responseType = "arraybuffer", n.send(null), new Uint8Array(n.response); }), d = function (e, n, t) { var r = new XMLHttpRequest; r.open("GET", e, !0), r.responseType = "arraybuffer", r.onload = function () { 200 == r.status || 0 == r.status && r.response ? n(r.response) : t(); }, r.onerror = t, r.send(null); }); var g, h, v, w = a.print || console.log.bind(console), b = a.printErr || console.warn.bind(console); for (o in u)
    u.hasOwnProperty(o) && (a[o] = u[o]); u = null, a.arguments && (i = a.arguments), a.thisProgram && (c = a.thisProgram), a.quit && (f = a.quit), a.wasmBinary && (g = a.wasmBinary), a.noExitRuntime && (h = a.noExitRuntime), "object" != typeof WebAssembly && U("no native wasm support detected"); var _ = !1; var A, E, R, I, M = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0; function O(e, n, t) { for (var r = n + t, a = n; e[a] && !(a >= r);)
    ++a; if (a - n > 16 && e.subarray && M)
    return M.decode(e.subarray(n, a)); for (var o = ""; n < a;) {
    var u = e[n++];
    if (128 & u) {
        var s = 63 & e[n++];
        if (192 != (224 & u)) {
            var i = 63 & e[n++];
            if ((u = 224 == (240 & u) ? (15 & u) << 12 | s << 6 | i : (7 & u) << 18 | s << 12 | i << 6 | 63 & e[n++]) < 65536)
                o += String.fromCharCode(u);
            else {
                var c = u - 65536;
                o += String.fromCharCode(55296 | c >> 10, 56320 | 1023 & c);
            }
        }
        else
            o += String.fromCharCode((31 & u) << 6 | s);
    }
    else
        o += String.fromCharCode(u);
} return o; } function C(e) { A = e, a.HEAP8 = E = new Int8Array(e), a.HEAP16 = new Int16Array(e), a.HEAP32 = I = new Int32Array(e), a.HEAPU8 = R = new Uint8Array(e), a.HEAPU16 = new Uint16Array(e), a.HEAPU32 = new Uint32Array(e), a.HEAPF32 = new Float32Array(e), a.HEAPF64 = new Float64Array(e); } a.INITIAL_MEMORY; var S, T = [], x = [], P = [], H = []; x.push({ func: function () { ne(); } }); var W = 0, L = null, k = null; function U(e) { a.onAbort && a.onAbort(e), b(e += ""), _ = !0, 1, e = "abort(" + e + "). Build with -s ASSERTIONS=1 for more info."; var n = new WebAssembly.RuntimeError(e); throw r(n), n; } function j(e, n) { return String.prototype.startsWith ? e.startsWith(n) : 0 === e.indexOf(n); } a.preloadedImages = {}, a.preloadedAudios = {}; var F = "data:application/octet-stream;base64,"; function D(e) { return j(e, F); } var q = "file://"; function B(e) { return j(e, q); } var N, G = "https://sdk.sariska.io/tflite.wasm"; function z(e) { try {
    if (e == G && g)
        return new Uint8Array(g);
    if (m)
        return m(e);
    throw "both async and sync fetching of the wasm failed";
}
catch (e) {
    U(e);
} } function X(e) { for (; e.length > 0;) {
    var n = e.shift();
    if ("function" != typeof n) {
        var t = n.func;
        "number" == typeof t ? void 0 === n.arg ? S.get(t)() : S.get(t)(n.arg) : t(void 0 === n.arg ? null : n.arg);
    }
    else
        n(a);
} } D(G) || (G = G), N = s ? function () { var e = process.hrtime(); return 1e3 * e[0] + e[1] / 1e6; } : "undefined" != typeof dateNow ? dateNow : function () { return performance.now(); }; var Y = !0; function J(e) { return I[te() >> 2] = e, e; } function K(e) { try {
    return v.grow(e - A.byteLength + 65535 >>> 16), C(v.buffer), 1;
}
catch (e) { } } var Q = {}; function V() { if (!V.strings) {
    var e = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: c || "./this.program" };
    for (var n in Q)
        e[n] = Q[n];
    var t = [];
    for (var n in e)
        t.push(n + "=" + e[n]);
    V.strings = t;
} return V.strings; } var Z = { mappings: {}, buffers: [null, [], []], printChar: function (e, n) { var t = Z.buffers[e]; 0 === n || 10 === n ? ((1 === e ? w : b)(O(t, 0)), t.length = 0) : t.push(n); }, varargs: void 0, get: function () { return Z.varargs += 4, I[Z.varargs - 4 >> 2]; }, getStr: function (e) { return function (e, n) { return e ? O(R, e, n) : ""; }(e); }, get64: function (e, n) { return e; } }; var $, ee = { a: function () { U(); }, n: function (e, n) { var t; if (0 === e)
        t = Date.now();
    else {
        if (1 !== e && 4 !== e || !Y)
            return J(28), -1;
        t = N();
    } return I[n >> 2] = t / 1e3 | 0, I[n + 4 >> 2] = t % 1e3 * 1e3 * 1e3 | 0, 0; }, i: function (e, n) { U("To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"); }, e: function (e, n) { U("To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"); }, l: function (e, n, t) { R.copyWithin(e, n, n + t); }, m: function (e) { e >>>= 0; var n = R.length; if (e > 2147483648)
        return !1; for (var t, r, a = 1; a <= 4; a *= 2) {
        var o = n * (1 + .2 / a);
        if (o = Math.min(o, e + 100663296), K(Math.min(2147483648, ((t = Math.max(16777216, e, o)) % (r = 65536) > 0 && (t += r - t % r), t))))
            return !0;
    } return !1; }, o: function (e) { for (var n = N(); N() - n < e;)
        ; }, p: function (e, n) { var t = 0; return V().forEach(function (r, a) { var o = n + t; I[e + 4 * a >> 2] = o, function (e, n, t) { for (var r = 0; r < e.length; ++r)
        E[n++ >> 0] = e.charCodeAt(r); t || (E[n >> 0] = 0); }(r, o), t += r.length + 1; }), 0; }, g: function (e, n) { var t = V(); I[e >> 2] = t.length; var r = 0; return t.forEach(function (e) { r += e.length + 1; }), I[n >> 2] = r, 0; }, j: function (e) { !function (e, n) { n && h && 0 === e || (h || (e, !0, a.onExit && a.onExit(e), _ = !0), f(e, new re(e))); }(e); }, h: function (e) { return 0; }, k: function (e, n, t, r, a) { }, c: function (e, n, t, r) { for (var a = 0, o = 0; o < t; o++) {
        for (var u = I[n + 8 * o >> 2], s = I[n + (8 * o + 4) >> 2], i = 0; i < s; i++)
            Z.printChar(e, R[u + i]);
        a += s;
    } return I[r >> 2] = a, 0; }, d: function () { return 6; }, f: function () { return 28; }, b: function (e) { switch (e) {
        case 30: return 16384;
        case 85: return 131072;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46: return 200809;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
        case 80:
        case 81:
        case 79: return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91: return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4: return 1024;
        case 31:
        case 42:
        case 72: return 32;
        case 87:
        case 26:
        case 33: return 2147483647;
        case 34:
        case 1: return 47839;
        case 38:
        case 36: return 99;
        case 43:
        case 37: return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 28: return 32768;
        case 44: return 32767;
        case 75: return 16384;
        case 39: return 1e3;
        case 89: return 700;
        case 71: return 256;
        case 40: return 255;
        case 2: return 100;
        case 180: return 64;
        case 25: return 20;
        case 5: return 16;
        case 6: return 6;
        case 73: return 4;
        case 84: return "object" == typeof navigator && navigator.hardwareConcurrency || 1;
    } return J(28), -1; } }, ne = (function () { var e = { a: ee }; function n(e, n) { var t = e.exports; a.asm = t, C((v = a.asm.q).buffer), S = a.asm.D, function (e) { if (W--, a.monitorRunDependencies && a.monitorRunDependencies(W), 0 == W && (null !== L && (clearInterval(L), L = null), k)) {
    var n = k;
    k = null, n();
} }(); } function t(e) { n(e.instance); } function o(n) { return function () { if (!g && (p || l)) {
    if ("function" == typeof fetch && !B(G))
        return fetch(G, { credentials: "same-origin" }).then(function (e) { if (!e.ok)
            throw "failed to load wasm binary file at '" + G + "'"; return e.arrayBuffer(); }).catch(function () { return z(G); });
    if (d)
        return new Promise(function (e, n) { d(G, function (n) { e(new Uint8Array(n)); }, n); });
} return Promise.resolve().then(function () { return z(G); }); }().then(function (n) { return WebAssembly.instantiate(n, e); }).then(n, function (e) { b("failed to asynchronously prepare wasm: " + e), U(e); }); } if (W++, a.monitorRunDependencies && a.monitorRunDependencies(W), a.instantiateWasm)
    try {
        return a.instantiateWasm(e, n);
    }
    catch (e) {
        return b("Module.instantiateWasm callback failed with error: " + e), !1;
    } (g || "function" != typeof WebAssembly.instantiateStreaming || D(G) || B(G) || "function" != typeof fetch ? o(t) : fetch(G, { credentials: "same-origin" }).then(function (n) { return WebAssembly.instantiateStreaming(n, e).then(t, function (e) { return b("wasm streaming compile failed: " + e), b("falling back to ArrayBuffer instantiation"), o(t); }); })).catch(r); }(), a.___wasm_call_ctors = function () { return (ne = a.___wasm_call_ctors = a.asm.r).apply(null, arguments); }), te = (a._getModelBufferMemoryOffset = function () { return (a._getModelBufferMemoryOffset = a.asm.s).apply(null, arguments); }, a._getInputMemoryOffset = function () { return (a._getInputMemoryOffset = a.asm.t).apply(null, arguments); }, a._getInputHeight = function () { return (a._getInputHeight = a.asm.u).apply(null, arguments); }, a._getInputWidth = function () { return (a._getInputWidth = a.asm.v).apply(null, arguments); }, a._getInputChannelCount = function () { return (a._getInputChannelCount = a.asm.w).apply(null, arguments); }, a._getOutputMemoryOffset = function () { return (a._getOutputMemoryOffset = a.asm.x).apply(null, arguments); }, a._getOutputHeight = function () { return (a._getOutputHeight = a.asm.y).apply(null, arguments); }, a._getOutputWidth = function () { return (a._getOutputWidth = a.asm.z).apply(null, arguments); }, a._getOutputChannelCount = function () { return (a._getOutputChannelCount = a.asm.A).apply(null, arguments); }, a._loadModel = function () { return (a._loadModel = a.asm.B).apply(null, arguments); }, a._runInference = function () { return (a._runInference = a.asm.C).apply(null, arguments); }, a.___errno_location = function () { return (te = a.___errno_location = a.asm.E).apply(null, arguments); }); function re(e) { this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e; } function ae(e) { function n() { $ || ($ = !0, a.calledRun = !0, _ || (!0, X(x), X(P), t(a), a.onRuntimeInitialized && a.onRuntimeInitialized(), function () { if (a.postRun)
    for ("function" == typeof a.postRun && (a.postRun = [a.postRun]); a.postRun.length;)
        e = a.postRun.shift(), H.unshift(e); var e; X(H); }())); } e = e || i, W > 0 || (!function () { if (a.preRun)
    for ("function" == typeof a.preRun && (a.preRun = [a.preRun]); a.preRun.length;)
        e = a.preRun.shift(), T.unshift(e); var e; X(T); }(), W > 0 || (a.setStatus ? (a.setStatus("Running..."), setTimeout(function () { setTimeout(function () { a.setStatus(""); }, 1), n(); }, 1)) : n())); } if (k = function e() { $ || ae(), $ || (k = e); }, a.run = ae, a.preInit)
    for ("function" == typeof a.preInit && (a.preInit = [a.preInit]); a.preInit.length > 0;)
        a.preInit.pop()(); return h = !0, ae(), n.ready; }; }();
"object" == typeof exports && "object" == typeof module ? module.exports = createTFLiteModule : "function" == typeof define && define.amd ? define([], function () { return createTFLiteModule; }) : "object" == typeof exports && (exports.createTFLiteModule = createTFLiteModule);
