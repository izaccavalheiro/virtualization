import B, { useState as de, useRef as F, useCallback as Re, useEffect as we } from "react";
var Pe = { exports: {} }, ye = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ue;
function gr() {
  if (Ue) return ye;
  Ue = 1;
  var E = B, P = Symbol.for("react.element"), $ = Symbol.for("react.fragment"), L = Object.prototype.hasOwnProperty, H = E.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, J = { key: !0, ref: !0, __self: !0, __source: !0 };
  function z(I, g, j) {
    var d, _ = {}, C = null, K = null;
    j !== void 0 && (C = "" + j), g.key !== void 0 && (C = "" + g.key), g.ref !== void 0 && (K = g.ref);
    for (d in g) L.call(g, d) && !J.hasOwnProperty(d) && (_[d] = g[d]);
    if (I && I.defaultProps) for (d in g = I.defaultProps, g) _[d] === void 0 && (_[d] = g[d]);
    return { $$typeof: P, type: I, key: C, ref: K, props: _, _owner: H.current };
  }
  return ye.Fragment = $, ye.jsx = z, ye.jsxs = z, ye;
}
var be = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qe;
function mr() {
  return qe || (qe = 1, process.env.NODE_ENV !== "production" && function() {
    var E = B, P = Symbol.for("react.element"), $ = Symbol.for("react.portal"), L = Symbol.for("react.fragment"), H = Symbol.for("react.strict_mode"), J = Symbol.for("react.profiler"), z = Symbol.for("react.provider"), I = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), K = Symbol.for("react.offscreen"), Q = Symbol.iterator, ne = "@@iterator";
    function D(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = Q && e[Q] || e[ne];
      return typeof r == "function" ? r : null;
    }
    var A = E.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        ve("error", e, t);
      }
    }
    function ve(e, r, t) {
      {
        var n = A.ReactDebugCurrentFrame, f = n.getStackAddendum();
        f !== "" && (r += "%s", t = t.concat([f]));
        var p = t.map(function(c) {
          return String(c);
        });
        p.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, p);
      }
    }
    var k = !1, O = !1, T = !1, M = !1, G = !1, oe;
    oe = Symbol.for("react.module.reference");
    function X(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === L || e === J || G || e === H || e === j || e === d || M || e === K || k || O || T || typeof e == "object" && e !== null && (e.$$typeof === C || e.$$typeof === _ || e.$$typeof === z || e.$$typeof === I || e.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === oe || e.getModuleId !== void 0));
    }
    function o(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var f = r.displayName || r.name || "";
      return f !== "" ? t + "(" + f + ")" : t;
    }
    function s(e) {
      return e.displayName || "Context";
    }
    function u(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case L:
          return "Fragment";
        case $:
          return "Portal";
        case J:
          return "Profiler";
        case H:
          return "StrictMode";
        case j:
          return "Suspense";
        case d:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case I:
            var r = e;
            return s(r) + ".Consumer";
          case z:
            var t = e;
            return s(t._context) + ".Provider";
          case g:
            return o(e, e.render, "ForwardRef");
          case _:
            var n = e.displayName || null;
            return n !== null ? n : u(e.type) || "Memo";
          case C: {
            var f = e, p = f._payload, c = f._init;
            try {
              return u(c(p));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var h = Object.assign, w = 0, N, ee, ae, Z, Y, U, ie;
    function pe() {
    }
    pe.__reactDisabledLog = !0;
    function a() {
      {
        if (w === 0) {
          N = console.log, ee = console.info, ae = console.warn, Z = console.error, Y = console.group, U = console.groupCollapsed, ie = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: pe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        w++;
      }
    }
    function l() {
      {
        if (w--, w === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: h({}, e, {
              value: N
            }),
            info: h({}, e, {
              value: ee
            }),
            warn: h({}, e, {
              value: ae
            }),
            error: h({}, e, {
              value: Z
            }),
            group: h({}, e, {
              value: Y
            }),
            groupCollapsed: h({}, e, {
              value: U
            }),
            groupEnd: h({}, e, {
              value: ie
            })
          });
        }
        w < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var m = A.ReactCurrentDispatcher, q;
    function V(e, r, t) {
      {
        if (q === void 0)
          try {
            throw Error();
          } catch (f) {
            var n = f.stack.trim().match(/\n( *(at )?)/);
            q = n && n[1] || "";
          }
        return `
` + q + e;
      }
    }
    var se = !1, re;
    {
      var Ee = typeof WeakMap == "function" ? WeakMap : Map;
      re = new Ee();
    }
    function ce(e, r) {
      if (!e || se)
        return "";
      {
        var t = re.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      se = !0;
      var f = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var p;
      p = m.current, m.current = null, a();
      try {
        if (r) {
          var c = function() {
            throw Error();
          };
          if (Object.defineProperty(c.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(c, []);
            } catch (x) {
              n = x;
            }
            Reflect.construct(e, [], c);
          } else {
            try {
              c.call();
            } catch (x) {
              n = x;
            }
            e.call(c.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (x) {
            n = x;
          }
          e();
        }
      } catch (x) {
        if (x && n && typeof x.stack == "string") {
          for (var i = x.stack.split(`
`), S = n.stack.split(`
`), y = i.length - 1, R = S.length - 1; y >= 1 && R >= 0 && i[y] !== S[R]; )
            R--;
          for (; y >= 1 && R >= 0; y--, R--)
            if (i[y] !== S[R]) {
              if (y !== 1 || R !== 1)
                do
                  if (y--, R--, R < 0 || i[y] !== S[R]) {
                    var W = `
` + i[y].replace(" at new ", " at ");
                    return e.displayName && W.includes("<anonymous>") && (W = W.replace("<anonymous>", e.displayName)), typeof e == "function" && re.set(e, W), W;
                  }
                while (y >= 1 && R >= 0);
              break;
            }
        }
      } finally {
        se = !1, m.current = p, l(), Error.prepareStackTrace = f;
      }
      var ue = e ? e.displayName || e.name : "", te = ue ? V(ue) : "";
      return typeof e == "function" && re.set(e, te), te;
    }
    function he(e, r, t) {
      return ce(e, !1);
    }
    function Se(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function ge(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ce(e, Se(e));
      if (typeof e == "string")
        return V(e);
      switch (e) {
        case j:
          return V("Suspense");
        case d:
          return V("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case g:
            return he(e.render);
          case _:
            return ge(e.type, r, t);
          case C: {
            var n = e, f = n._payload, p = n._init;
            try {
              return ge(p(f), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var me = Object.prototype.hasOwnProperty, ke = {}, We = A.ReactDebugCurrentFrame;
    function _e(e) {
      if (e) {
        var r = e._owner, t = ge(e.type, e._source, r ? r.type : null);
        We.setExtraStackFrame(t);
      } else
        We.setExtraStackFrame(null);
    }
    function Je(e, r, t, n, f) {
      {
        var p = Function.call.bind(me);
        for (var c in e)
          if (p(e, c)) {
            var i = void 0;
            try {
              if (typeof e[c] != "function") {
                var S = Error((n || "React class") + ": " + t + " type `" + c + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[c] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw S.name = "Invariant Violation", S;
              }
              i = e[c](r, c, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (y) {
              i = y;
            }
            i && !(i instanceof Error) && (_e(f), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, c, typeof i), _e(null)), i instanceof Error && !(i.message in ke) && (ke[i.message] = !0, _e(f), v("Failed %s type: %s", t, i.message), _e(null));
          }
      }
    }
    var Ke = Array.isArray;
    function Te(e) {
      return Ke(e);
    }
    function Ge(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Xe(e) {
      try {
        return Fe(e), !1;
      } catch {
        return !0;
      }
    }
    function Fe(e) {
      return "" + e;
    }
    function Ie(e) {
      if (Xe(e))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ge(e)), Fe(e);
    }
    var De = A.ReactCurrentOwner, Ze = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ae, $e;
    function Qe(e) {
      if (me.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function er(e) {
      if (me.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function rr(e, r) {
      typeof e.ref == "string" && De.current;
    }
    function tr(e, r) {
      {
        var t = function() {
          Ae || (Ae = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function nr(e, r) {
      {
        var t = function() {
          $e || ($e = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var or = function(e, r, t, n, f, p, c) {
      var i = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: P,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: c,
        // Record the component responsible for creating this element.
        _owner: p
      };
      return i._store = {}, Object.defineProperty(i._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(i, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(i, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: f
      }), Object.freeze && (Object.freeze(i.props), Object.freeze(i)), i;
    };
    function ar(e, r, t, n, f) {
      {
        var p, c = {}, i = null, S = null;
        t !== void 0 && (Ie(t), i = "" + t), er(r) && (Ie(r.key), i = "" + r.key), Qe(r) && (S = r.ref, rr(r, f));
        for (p in r)
          me.call(r, p) && !Ze.hasOwnProperty(p) && (c[p] = r[p]);
        if (e && e.defaultProps) {
          var y = e.defaultProps;
          for (p in y)
            c[p] === void 0 && (c[p] = y[p]);
        }
        if (i || S) {
          var R = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          i && tr(c, R), S && nr(c, R);
        }
        return or(e, i, S, f, n, De.current, c);
      }
    }
    var xe = A.ReactCurrentOwner, Le = A.ReactDebugCurrentFrame;
    function le(e) {
      if (e) {
        var r = e._owner, t = ge(e.type, e._source, r ? r.type : null);
        Le.setExtraStackFrame(t);
      } else
        Le.setExtraStackFrame(null);
    }
    var je;
    je = !1;
    function Ce(e) {
      return typeof e == "object" && e !== null && e.$$typeof === P;
    }
    function Me() {
      {
        if (xe.current) {
          var e = u(xe.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ir(e) {
      return "";
    }
    var Ye = {};
    function sr(e) {
      {
        var r = Me();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Ve(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = sr(r);
        if (Ye[t])
          return;
        Ye[t] = !0;
        var n = "";
        e && e._owner && e._owner !== xe.current && (n = " It was passed a child from " + u(e._owner.type) + "."), le(e), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), le(null);
      }
    }
    function Be(e, r) {
      {
        if (typeof e != "object")
          return;
        if (Te(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            Ce(n) && Ve(n, r);
          }
        else if (Ce(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var f = D(e);
          if (typeof f == "function" && f !== e.entries)
            for (var p = f.call(e), c; !(c = p.next()).done; )
              Ce(c.value) && Ve(c.value, r);
        }
      }
    }
    function cr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === g || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === _))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = u(r);
          Je(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !je) {
          je = !0;
          var f = u(r);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", f || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function lr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            le(e), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), le(null);
            break;
          }
        }
        e.ref !== null && (le(e), v("Invalid attribute `ref` supplied to `React.Fragment`."), le(null));
      }
    }
    var ze = {};
    function Ne(e, r, t, n, f, p) {
      {
        var c = X(e);
        if (!c) {
          var i = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (i += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var S = ir();
          S ? i += S : i += Me();
          var y;
          e === null ? y = "null" : Te(e) ? y = "array" : e !== void 0 && e.$$typeof === P ? (y = "<" + (u(e.type) || "Unknown") + " />", i = " Did you accidentally export a JSX literal instead of a component?") : y = typeof e, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", y, i);
        }
        var R = ar(e, r, t, f, p);
        if (R == null)
          return R;
        if (c) {
          var W = r.children;
          if (W !== void 0)
            if (n)
              if (Te(W)) {
                for (var ue = 0; ue < W.length; ue++)
                  Be(W[ue], e);
                Object.freeze && Object.freeze(W);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Be(W, e);
        }
        if (me.call(r, "key")) {
          var te = u(e), x = Object.keys(r).filter(function(hr) {
            return hr !== "key";
          }), Oe = x.length > 0 ? "{key: someKey, " + x.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!ze[te + Oe]) {
            var pr = x.length > 0 ? "{" + x.join(": ..., ") + ": ...}" : "{}";
            v(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Oe, te, pr, te), ze[te + Oe] = !0;
          }
        }
        return e === L ? lr(R) : cr(R), R;
      }
    }
    function ur(e, r, t) {
      return Ne(e, r, t, !0);
    }
    function fr(e, r, t) {
      return Ne(e, r, t, !1);
    }
    var dr = fr, vr = ur;
    be.Fragment = L, be.jsx = dr, be.jsxs = vr;
  }()), be;
}
process.env.NODE_ENV === "production" ? Pe.exports = gr() : Pe.exports = mr();
var b = Pe.exports;
function Rr({
  data: E,
  Header: P,
  Footer: $,
  Row: L,
  style: H = {},
  headerStyle: J = {},
  footerStyle: z = {},
  rowStyle: I = {},
  tableHeight: g = "400px",
  estimatedRowHeight: j = 40,
  overscanCount: d = 5,
  columnWidths: _,
  footerDistributed: C = !0,
  defaultSortColumn: K = "",
  defaultSortDirection: Q = null
}) {
  const [ne] = de(0), [D, A] = de(_ || []), [v, ve] = de({
    column: K,
    direction: Q
  }), k = F(null), O = F(null), T = F(null), M = F(null), G = Re(() => {
    var V, se, re, Ee;
    if (!O.current || !k.current || !_)
      return;
    const a = k.current.getBoundingClientRect().width, l = ((V = T.current) == null ? void 0 : V.offsetWidth) && ((se = T.current) == null ? void 0 : se.clientWidth) && ((re = T.current) == null ? void 0 : re.offsetWidth) - ((Ee = T.current) == null ? void 0 : Ee.clientWidth) || 0, m = a - l, q = _.reduce((ce, he) => ce + parseInt(he, 10), 0);
    if (m > q) {
      const ce = m / q, he = _.map((Se) => `${Math.floor(parseInt(Se, 10) * ce)}px`);
      A(he);
    } else
      A(_);
  }, []);
  we(() => {
    console.log("Setting up ResizeObserver");
    const a = new ResizeObserver((l) => {
      console.log("Resize observed:", l[0].contentRect.width), requestAnimationFrame(() => {
        G();
      });
    });
    return k.current && (a.observe(k.current), console.log("Observing container")), () => {
      console.log("Cleaning up ResizeObserver"), a.disconnect();
    };
  }, [G]), we(() => {
    console.log("Initial column width calculation"), requestAnimationFrame(() => {
      G();
    });
  }, [G]);
  const oe = D.length > 0 ? D.join(" ") : `repeat(${ne}, 1fr)`, X = D.reduce((a, l) => {
    const m = parseInt(l);
    return a + (isNaN(m) ? 0 : m);
  }, 0), o = {
    container: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      ...H
    },
    headerWrapper: {
      position: "relative",
      overflow: "auto",
      borderBottom: "1px solid #e2e8f0",
      backgroundColor: "#fff",
      width: "100%",
      ...J
    },
    bodyWrapper: {
      position: "relative",
      height: g,
      overflow: "auto",
      width: "100%",
      ...I
    },
    footerWrapper: {
      position: "relative",
      overflow: "auto",
      borderTop: "1px solid #e2e8f0",
      backgroundColor: "#fff",
      width: "100%",
      ...z
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: oe,
      width: k.current && _ ? Math.max(
        k.current.getBoundingClientRect().width,
        _.reduce((a, l) => a + parseInt(l, 10), 0)
      ) + "px" : "100%"
    }
  }, [s, u] = de(0), h = Re((a) => {
    u(a), requestAnimationFrame(() => {
      O.current && (O.current.scrollLeft = a), T.current && (T.current.scrollLeft = a), M.current && (M.current.scrollLeft = a);
    });
  }, []), w = Re((a) => {
    const l = a.target.scrollLeft;
    l !== s && h(l);
  }, [s, h]);
  we(() => {
    const a = O.current, l = T.current, m = M.current;
    return a == null || a.addEventListener("scroll", w), l == null || l.addEventListener("scroll", w), m == null || m.addEventListener("scroll", w), () => {
      a == null || a.removeEventListener("scroll", w), l == null || l.removeEventListener("scroll", w), m == null || m.removeEventListener("scroll", w);
    };
  }, [w]);
  const N = (a) => {
    ve((l) => ({
      column: a,
      direction: l.column === a ? l.direction === "asc" ? "desc" : l.direction === "desc" ? null : "asc" : "asc"
    }));
  }, ae = B.useMemo(() => !v.column || !v.direction ? E : [...E].sort((a, l) => {
    const m = a[v.column], q = l[v.column];
    if (m === q) return 0;
    const V = m < q ? -1 : 1;
    return v.direction === "asc" ? V : -V;
  }), [E, v.column, v.direction]).map((a) => ({
    component: ({ index: l }) => /* @__PURE__ */ b.jsx("div", { style: o.gridContainer, children: /* @__PURE__ */ b.jsx(L, { item: a, index: l }) })
  })), Z = F(!1), Y = F(), U = Re((a, l) => {
    Z.current || (Z.current = !0, requestAnimationFrame(() => {
      l !== "header" && O.current && (O.current.scrollLeft = a), l !== "body" && T.current && (T.current.scrollLeft = a), l !== "footer" && M.current && (M.current.scrollLeft = a), Y.current && window.clearTimeout(Y.current), Y.current = window.setTimeout(() => {
        Z.current = !1;
      }, 50);
    }));
  }, []), ie = (a) => (l) => {
    const m = l.target;
    U(m.scrollLeft, a);
  };
  we(() => () => {
    Y.current && window.clearTimeout(Y.current);
  }, []);
  const pe = {
    horizontalScroll: {
      overflowY: "hidden",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      "&::-webkit-scrollbar": {
        display: "none"
      }
    }
  };
  return /* @__PURE__ */ b.jsxs("div", { ref: k, style: o.container, children: [
    /* @__PURE__ */ b.jsx(
      "div",
      {
        ref: O,
        style: {
          ...o.headerWrapper,
          ...pe.horizontalScroll
        },
        onScroll: ie("header"),
        children: /* @__PURE__ */ b.jsx("div", { style: {
          ...o.gridContainer,
          minWidth: X || void 0
        }, children: /* @__PURE__ */ b.jsx(P, { onSort: N, sortState: v }) })
      }
    ),
    /* @__PURE__ */ b.jsx(
      "div",
      {
        ref: T,
        style: o.bodyWrapper,
        onScroll: ie("body"),
        children: /* @__PURE__ */ b.jsx("div", { style: {
          width: X ? `${X}px` : "100%",
          minWidth: "100%"
        }, children: /* @__PURE__ */ b.jsx(
          yr,
          {
            items: ae,
            estimatedItemHeight: j,
            overscanCount: d,
            style: {
              height: g,
              width: "100%"
            }
          }
        ) })
      }
    ),
    $ && /* @__PURE__ */ b.jsx(
      "div",
      {
        ref: M,
        style: {
          ...o.footerWrapper,
          ...pe.horizontalScroll
        },
        onScroll: ie("footer"),
        children: /* @__PURE__ */ b.jsx("div", { style: {
          ...o.gridContainer,
          minWidth: X || void 0,
          ...C ? { display: "block" } : {}
        }, children: /* @__PURE__ */ b.jsx($, {}) })
      }
    )
  ] });
}
const He = typeof window < "u" && typeof window.document < "u" ? B.useLayoutEffect : B.useEffect, fe = (E) => {
  const P = F(E);
  return He(() => {
    P.current = E;
  }), Re((...$) => P.current(...$), []);
};
function yr({
  items: E,
  className: P = "",
  itemClassName: $ = "",
  style: L,
  itemStyle: H,
  overscanCount: J = 5,
  initialRenderCount: z = 20,
  estimatedItemHeight: I = 100
}) {
  if (!B.useState)
    throw new Error("React hooks are not available. Ensure you are using a compatible version of React.");
  const g = F(null), j = F(/* @__PURE__ */ new Map()), [d, _] = de({
    start: 0,
    end: z
  }), [C, K] = de(0), Q = F(0), ne = F("down"), D = F(/* @__PURE__ */ new Map()), A = fe(
    (o) => j.current.get(o) || I
  ), v = fe(() => {
    let o = 0;
    D.current.clear();
    for (let s = 0; s < E.length; s++)
      D.current.set(s, o), o += A(s);
    return o;
  }), ve = fe((o, s) => {
    if (!s) return;
    const u = s.getBoundingClientRect().height;
    if (u > 0 && j.current.get(o) !== u) {
      j.current.set(o, u);
      const h = v();
      K(h);
    }
  }), k = fe((o) => {
    let s = 0, u = E.length - 1;
    for (; s <= u; ) {
      const h = Math.floor((s + u) / 2), w = D.current.get(h) || 0, N = D.current.get(h + 1) || C;
      if (o >= w && o < N)
        return h;
      o < w ? u = h - 1 : s = h + 1;
    }
    return 0;
  }), O = fe(() => {
    if (!g.current) return;
    const o = g.current, s = o.scrollTop, u = o.clientHeight, h = s + u;
    ne.current = s > Q.current ? "down" : "up", Q.current = s;
    const N = C - h < u * 1.5, ee = u, ae = ne.current === "up" ? ee * 1.5 : ee, Z = N ? u * 2 : ee, Y = Math.max(0, k(s - ae));
    let U = Math.min(
      E.length - 1,
      k(h + Z)
    );
    N && (U = E.length - 1), U > E.length - 4 && (U = E.length - 1), _({
      start: Y,
      end: U + J
    });
  }), T = () => {
    requestAnimationFrame(O);
  };
  He(() => {
    j.current.clear(), v(), O();
  }, [v, E, O]);
  const M = E.slice(d.start, d.end + 1), G = D.current.get(d.start) || 0, oe = fe((o, s) => {
    try {
      if (typeof o == "string")
        return /* @__PURE__ */ b.jsx("div", { dangerouslySetInnerHTML: { __html: o } }, `string-${d.start + s}`);
      if (B.isValidElement(o))
        return B.cloneElement(o, { key: `element-${d.start + s}` });
      if (typeof o == "function") {
        const u = o;
        return /* @__PURE__ */ b.jsx(B.Fragment, { children: u({ index: d.start + s }) }, `func-${d.start + s}`);
      }
      if (o && (o.render || o.component)) {
        const u = o.render || o.component, h = o.props || {};
        return /* @__PURE__ */ b.jsx(B.Fragment, { children: u({ ...h, index: d.start + s }) }, `complex-${d.start + s}`);
      }
      return /* @__PURE__ */ b.jsx("div", { children: String(o) }, `default-${d.start + s}`);
    } catch (u) {
      return console.error("Error rendering virtualization item:", u), /* @__PURE__ */ b.jsx("div", { children: "Render Error" }, `error-${d.start + s}`);
    }
  }), X = {
    overflow: "auto",
    ...L
  };
  return /* @__PURE__ */ b.jsx(
    "div",
    {
      ref: g,
      className: P,
      style: X,
      onScroll: T,
      children: /* @__PURE__ */ b.jsx("div", { style: { height: C }, children: /* @__PURE__ */ b.jsx("div", { style: { paddingTop: G }, children: M.map((o, s) => /* @__PURE__ */ b.jsx(
        "div",
        {
          ref: (u) => ve(d.start + s, u),
          className: $,
          style: H,
          children: oe(o, s)
        },
        d.start + s
      )) }) })
    }
  );
}
export {
  yr as Virtualization,
  Rr as VirtualizationTable
};
