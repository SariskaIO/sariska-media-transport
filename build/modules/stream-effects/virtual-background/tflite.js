var createTFLiteModule = function () {
  var e = void 0;
  return "undefined" != typeof __filename && (e = e || __filename), function (n) {
    var t,
        r,
        a = void 0 !== (n = n || {}) ? n : {};
    a.ready = new Promise(function (e, n) {
      t = e, r = n;
    });
    var o,
        s = {};

    for (o in a) a.hasOwnProperty(o) && (s[o] = a[o]);

    var i,
        u = [],
        c = "./this.program",
        f = function (e, n) {
      throw n;
    },
        p = !1,
        l = !1;

    p = "object" == typeof window, l = "function" == typeof importScripts, i = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node;
    var d,
        m,
        y = "";
    p || i || l ? (p || l) && (l ? y = self.location.href : "undefined" != typeof document && document.currentScript && (y = document.currentScript.src), e && (y = e), y = 0 !== y.indexOf("blob:") ? y.substr(0, y.lastIndexOf("/") + 1) : "", l && (m = function (e) {
      var n = new XMLHttpRequest();
      return n.open("GET", e, !1), n.responseType = "arraybuffer", n.send(null), new Uint8Array(n.response);
    }), d = function (e, n, t) {
      var r = new XMLHttpRequest();
      r.open("GET", e, !0), r.responseType = "arraybuffer", r.onload = function () {
        200 == r.status || 0 == r.status && r.response ? n(r.response) : t();
      }, r.onerror = t, r.send(null);
    }) : (m = function (e) {
      var n;
      return "function" == typeof readbuffer ? new Uint8Array(readbuffer(e)) : ("object" == typeof (n = read(e, "binary")) || F("Assertion failed: " + void 0), n);
    }, "undefined" != typeof scriptArgs ? u = scriptArgs : void 0 !== arguments && (u = arguments), "function" == typeof quit && (f = function (e) {
      quit(e);
    }), "undefined" != typeof print && ("undefined" == typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" != typeof printErr ? printErr : print));
    var g,
        h,
        v,
        w = a.print || console.log.bind(console),
        b = a.printErr || console.warn.bind(console);

    for (o in s) s.hasOwnProperty(o) && (a[o] = s[o]);

    s = null, a.arguments && (u = a.arguments), a.thisProgram && (c = a.thisProgram), a.quit && (f = a.quit), a.wasmBinary && (g = a.wasmBinary), a.noExitRuntime && (h = a.noExitRuntime), "object" != typeof WebAssembly && F("no native wasm support detected");

    var _,
        A,
        E,
        I,
        R = !1,
        M = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;

    function O(e, n, t) {
      for (var r = n + t, a = n; e[a] && !(a >= r);) ++a;

      if (a - n > 16 && e.subarray && M) return M.decode(e.subarray(n, a));

      for (var o = ""; n < a;) {
        var s = e[n++];

        if (128 & s) {
          var i = 63 & e[n++];

          if (192 != (224 & s)) {
            var u = 63 & e[n++];
            if ((s = 224 == (240 & s) ? (15 & s) << 12 | i << 6 | u : (7 & s) << 18 | i << 12 | u << 6 | 63 & e[n++]) < 65536) o += String.fromCharCode(s);else {
              var c = s - 65536;
              o += String.fromCharCode(55296 | c >> 10, 56320 | 1023 & c);
            }
          } else o += String.fromCharCode((31 & s) << 6 | i);
        } else o += String.fromCharCode(s);
      }

      return o;
    }

    function C(e) {
      _ = e, a.HEAP8 = A = new Int8Array(e), a.HEAP16 = new Int16Array(e), a.HEAP32 = I = new Int32Array(e), a.HEAPU8 = E = new Uint8Array(e), a.HEAPU16 = new Uint16Array(e), a.HEAPU32 = new Uint32Array(e), a.HEAPF32 = new Float32Array(e), a.HEAPF64 = new Float64Array(e);
    }

    a.INITIAL_MEMORY;
    var S,
        T = [],
        x = [],
        P = [],
        H = [];
    x.push({
      func: function () {
        ne();
      }
    });
    var W = 0,
        L = null,
        k = null;

    function F(e) {
      a.onAbort && a.onAbort(e), b(e += ""), R = !0, e = "abort(" + e + "). Build with -s ASSERTIONS=1 for more info.";
      var n = new WebAssembly.RuntimeError(e);
      throw r(n), n;
    }

    function U(e, n) {
      return String.prototype.startsWith ? e.startsWith(n) : 0 === e.indexOf(n);
    }

    a.preloadedImages = {}, a.preloadedAudios = {};
    var j = "data:application/octet-stream;base64,";

    function D(e) {
      return U(e, j);
    }

    var B = "file://";

    function q(e) {
      return U(e, B);
    }

    var N,
        G,
        z = "https://sdk.sariska.io/tflite.wasm";

    function X(e) {
      try {
        if (e == z && g) return new Uint8Array(g);
        if (m) return m(e);
        throw "both async and sync fetching of the wasm failed";
      } catch (e) {
        F(e);
      }
    }

    function Y(e) {
      for (; e.length > 0;) {
        var n = e.shift();

        if ("function" != typeof n) {
          var t = n.func;
          "number" == typeof t ? void 0 === n.arg ? S.get(t)() : S.get(t)(n.arg) : t(void 0 === n.arg ? null : n.arg);
        } else n(a);
      }
    }

    function J(e) {
      return I[te() >> 2] = e, e;
    }

    function K(e) {
      try {
        return v.grow(e - _.byteLength + 65535 >>> 16), C(v.buffer), 1;
      } catch (e) {}
    }

    D(z) || (N = z, z = a.locateFile ? a.locateFile(N, y) : y + N), G = i ? function () {
      var e = process.hrtime();
      return 1e3 * e[0] + e[1] / 1e6;
    } : "undefined" != typeof dateNow ? dateNow : function () {
      return performance.now();
    };
    var Q = {};

    function V() {
      if (!V.strings) {
        var e = {
          USER: "web_user",
          LOGNAME: "web_user",
          PATH: "/",
          PWD: "/",
          HOME: "/home/web_user",
          LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
          _: c || "./this.program"
        };

        for (var n in Q) e[n] = Q[n];

        var t = [];

        for (var n in e) t.push(n + "=" + e[n]);

        V.strings = t;
      }

      return V.strings;
    }

    var Z,
        $ = {
      mappings: {},
      buffers: [null, [], []],
      printChar: function (e, n) {
        var t = $.buffers[e];
        0 === n || 10 === n ? ((1 === e ? w : b)(O(t, 0)), t.length = 0) : t.push(n);
      },
      varargs: void 0,
      get: function () {
        return $.varargs += 4, I[$.varargs - 4 >> 2];
      },
      getStr: function (e) {
        return function (e, n) {
          return e ? O(E, e, void 0) : "";
        }(e);
      },
      get64: function (e, n) {
        return e;
      }
    },
        ee = {
      a: function () {
        F();
      },
      n: function (e, n) {
        var t;
        if (0 === e) t = Date.now();else {
          if (1 !== e && 4 !== e) return J(28), -1;
          t = G();
        }
        return I[n >> 2] = t / 1e3 | 0, I[n + 4 >> 2] = t % 1e3 * 1e3 * 1e3 | 0, 0;
      },
      i: function (e, n) {
        F("To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking");
      },
      e: function (e, n) {
        F("To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking");
      },
      l: function (e, n, t) {
        E.copyWithin(e, n, n + t);
      },
      m: function (e) {
        e >>>= 0;
        var n = E.length;
        if (e > 2147483648) return !1;

        for (var t, r = 1; r <= 4; r *= 2) {
          var a = n * (1 + .2 / r);
          if (a = Math.min(a, e + 100663296), K(Math.min(2147483648, ((t = Math.max(16777216, e, a)) % 65536 > 0 && (t += 65536 - t % 65536), t)))) return !0;
        }

        return !1;
      },
      o: function (e) {
        for (var n = G(); G() - n < e;);
      },
      p: function (e, n) {
        var t = 0;
        return V().forEach(function (r, a) {
          var o = n + t;
          I[e + 4 * a >> 2] = o, function (e, n, t) {
            for (var r = 0; r < e.length; ++r) A[n++ >> 0] = e.charCodeAt(r);

            A[n >> 0] = 0;
          }(r, o), t += r.length + 1;
        }), 0;
      },
      g: function (e, n) {
        var t = V();
        I[e >> 2] = t.length;
        var r = 0;
        return t.forEach(function (e) {
          r += e.length + 1;
        }), I[n >> 2] = r, 0;
      },
      j: function (e) {
        !function (e, n) {
          h || (a.onExit && a.onExit(e), R = !0), f(e, new re(e));
        }(e);
      },
      h: function (e) {
        return 0;
      },
      k: function (e, n, t, r, a) {},
      c: function (e, n, t, r) {
        for (var a = 0, o = 0; o < t; o++) {
          for (var s = I[n + 8 * o >> 2], i = I[n + (8 * o + 4) >> 2], u = 0; u < i; u++) $.printChar(e, E[s + u]);

          a += i;
        }

        return I[r >> 2] = a, 0;
      },
      d: function () {
        return 6;
      },
      f: function () {
        return 28;
      },
      b: function (e) {
        switch (e) {
          case 30:
            return 16384;

          case 85:
            return 131072;

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
          case 46:
            return 200809;

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
          case 79:
            return -1;

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
          case 91:
            return 1;

          case 74:
          case 60:
          case 69:
          case 70:
          case 4:
            return 1024;

          case 31:
          case 42:
          case 72:
            return 32;

          case 87:
          case 26:
          case 33:
            return 2147483647;

          case 34:
          case 1:
            return 47839;

          case 38:
          case 36:
            return 99;

          case 43:
          case 37:
            return 2048;

          case 0:
            return 2097152;

          case 3:
            return 65536;

          case 28:
            return 32768;

          case 44:
            return 32767;

          case 75:
            return 16384;

          case 39:
            return 1e3;

          case 89:
            return 700;

          case 71:
            return 256;

          case 40:
            return 255;

          case 2:
            return 100;

          case 180:
            return 64;

          case 25:
            return 20;

          case 5:
            return 16;

          case 6:
            return 6;

          case 73:
            return 4;

          case 84:
            return "object" == typeof navigator && navigator.hardwareConcurrency || 1;
        }

        return J(28), -1;
      }
    },
        ne = (function () {
      var e = {
        a: ee
      };

      function n(e, n) {
        var t = e.exports;
        a.asm = t, C((v = a.asm.q).buffer), S = a.asm.D, function (e) {
          if (W--, a.monitorRunDependencies && a.monitorRunDependencies(W), 0 == W && (null !== L && (clearInterval(L), L = null), k)) {
            var n = k;
            k = null, n();
          }
        }();
      }

      function t(e) {
        n(e.instance);
      }

      function o(n) {
        return function () {
          if (!g && (p || l)) {
            if ("function" == typeof fetch && !q(z)) return fetch(z, {
              credentials: "same-origin"
            }).then(function (e) {
              if (!e.ok) throw "failed to load wasm binary file at '" + z + "'";
              return e.arrayBuffer();
            }).catch(function () {
              return X(z);
            });
            if (d) return new Promise(function (e, n) {
              d(z, function (n) {
                e(new Uint8Array(n));
              }, n);
            });
          }

          return Promise.resolve().then(function () {
            return X(z);
          });
        }().then(function (n) {
          return WebAssembly.instantiate(n, e);
        }).then(n, function (e) {
          b("failed to asynchronously prepare wasm: " + e), F(e);
        });
      }

      if (W++, a.monitorRunDependencies && a.monitorRunDependencies(W), a.instantiateWasm) try {
        return a.instantiateWasm(e, n);
      } catch (e) {
        return b("Module.instantiateWasm callback failed with error: " + e), !1;
      }
      (g || "function" != typeof WebAssembly.instantiateStreaming || D(z) || q(z) || "function" != typeof fetch ? o(t) : fetch(z, {
        credentials: "same-origin"
      }).then(function (n) {
        return WebAssembly.instantiateStreaming(n, e).then(t, function (e) {
          return b("wasm streaming compile failed: " + e), b("falling back to ArrayBuffer instantiation"), o(t);
        });
      })).catch(r);
    }(), a.___wasm_call_ctors = function () {
      return (ne = a.___wasm_call_ctors = a.asm.r).apply(null, arguments);
    }),
        te = (a._getModelBufferMemoryOffset = function () {
      return (a._getModelBufferMemoryOffset = a.asm.s).apply(null, arguments);
    }, a._getInputMemoryOffset = function () {
      return (a._getInputMemoryOffset = a.asm.t).apply(null, arguments);
    }, a._getInputHeight = function () {
      return (a._getInputHeight = a.asm.u).apply(null, arguments);
    }, a._getInputWidth = function () {
      return (a._getInputWidth = a.asm.v).apply(null, arguments);
    }, a._getInputChannelCount = function () {
      return (a._getInputChannelCount = a.asm.w).apply(null, arguments);
    }, a._getOutputMemoryOffset = function () {
      return (a._getOutputMemoryOffset = a.asm.x).apply(null, arguments);
    }, a._getOutputHeight = function () {
      return (a._getOutputHeight = a.asm.y).apply(null, arguments);
    }, a._getOutputWidth = function () {
      return (a._getOutputWidth = a.asm.z).apply(null, arguments);
    }, a._getOutputChannelCount = function () {
      return (a._getOutputChannelCount = a.asm.A).apply(null, arguments);
    }, a._loadModel = function () {
      return (a._loadModel = a.asm.B).apply(null, arguments);
    }, a._runInference = function () {
      return (a._runInference = a.asm.C).apply(null, arguments);
    }, a.___errno_location = function () {
      return (te = a.___errno_location = a.asm.E).apply(null, arguments);
    });

    function re(e) {
      this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e;
    }

    function ae(e) {
      function n() {
        Z || (Z = !0, a.calledRun = !0, R || (Y(x), Y(P), t(a), a.onRuntimeInitialized && a.onRuntimeInitialized(), function () {
          if (a.postRun) for ("function" == typeof a.postRun && (a.postRun = [a.postRun]); a.postRun.length;) e = a.postRun.shift(), H.unshift(e);
          var e;
          Y(H);
        }()));
      }

      e = e || u, W > 0 || (function () {
        if (a.preRun) for ("function" == typeof a.preRun && (a.preRun = [a.preRun]); a.preRun.length;) e = a.preRun.shift(), T.unshift(e);
        var e;
        Y(T);
      }(), W > 0 || (a.setStatus ? (a.setStatus("Running..."), setTimeout(function () {
        setTimeout(function () {
          a.setStatus("");
        }, 1), n();
      }, 1)) : n()));
    }

    if (k = function e() {
      Z || ae(), Z || (k = e);
    }, a.run = ae, a.preInit) for ("function" == typeof a.preInit && (a.preInit = [a.preInit]); a.preInit.length > 0;) a.preInit.pop()();
    return h = !0, ae(), n.ready;
  };
}();

"object" == typeof exports && "object" == typeof module ? module.exports = createTFLiteModule : "function" == typeof define && define.amd ? define([], function () {
  return createTFLiteModule;
}) : "object" == typeof exports && (exports.createTFLiteModule = createTFLiteModule);