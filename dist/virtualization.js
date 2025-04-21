import H, { useRef as M, useState as ie, useCallback as ce, useLayoutEffect as gr, useEffect as _e } from "react";
var Pe = { exports: {} }, be = {};
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
function mr() {
  if (Ue) return be;
  Ue = 1;
  var p = H, x = Symbol.for("react.element"), j = Symbol.for("react.fragment"), k = Object.prototype.hasOwnProperty, Y = p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, B = { key: !0, ref: !0, __self: !0, __source: !0 };
  function V(W, m, C) {
    var i, b = {}, O = null, z = null;
    C !== void 0 && (O = "" + C), m.key !== void 0 && (O = "" + m.key), m.ref !== void 0 && (z = m.ref);
    for (i in m) k.call(m, i) && !B.hasOwnProperty(i) && (b[i] = m[i]);
    if (W && W.defaultProps) for (i in m = W.defaultProps, m) b[i] === void 0 && (b[i] = m[i]);
    return { $$typeof: x, type: W, key: O, ref: z, props: b, _owner: Y.current };
  }
  return be.Fragment = j, be.jsx = V, be.jsxs = V, be;
}
var Re = {};
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
function yr() {
  return qe || (qe = 1, process.env.NODE_ENV !== "production" && function() {
    var p = H, x = Symbol.for("react.element"), j = Symbol.for("react.portal"), k = Symbol.for("react.fragment"), Y = Symbol.for("react.strict_mode"), B = Symbol.for("react.profiler"), V = Symbol.for("react.provider"), W = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), C = Symbol.for("react.suspense"), i = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), z = Symbol.for("react.offscreen"), K = Symbol.iterator, Q = "@@iterator";
    function A(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = K && e[K] || e[Q];
      return typeof r == "function" ? r : null;
    }
    var D = p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function f(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        te("error", e, t);
      }
    }
    function te(e, r, t) {
      {
        var n = D.ReactDebugCurrentFrame, v = n.getStackAddendum();
        v !== "" && (r += "%s", t = t.concat([v]));
        var h = t.map(function(l) {
          return String(l);
        });
        h.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, h);
      }
    }
    var R = !1, T = !1, E = !1, L = !1, N = !1, ee;
    ee = Symbol.for("react.module.reference");
    function U(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === k || e === B || N || e === Y || e === C || e === i || L || e === z || R || T || E || typeof e == "object" && e !== null && (e.$$typeof === O || e.$$typeof === b || e.$$typeof === V || e.$$typeof === W || e.$$typeof === m || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ee || e.getModuleId !== void 0));
    }
    function o(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var v = r.displayName || r.name || "";
      return v !== "" ? t + "(" + v + ")" : t;
    }
    function s(e) {
      return e.displayName || "Context";
    }
    function d(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case k:
          return "Fragment";
        case j:
          return "Portal";
        case B:
          return "Profiler";
        case Y:
          return "StrictMode";
        case C:
          return "Suspense";
        case i:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case W:
            var r = e;
            return s(r) + ".Consumer";
          case V:
            var t = e;
            return s(t._context) + ".Provider";
          case m:
            return o(e, e.render, "ForwardRef");
          case b:
            var n = e.displayName || null;
            return n !== null ? n : d(e.type) || "Memo";
          case O: {
            var v = e, h = v._payload, l = v._init;
            try {
              return d(l(h));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var y = Object.assign, P = 0, G, ne, se, re, q, X, le;
    function he() {
    }
    he.__reactDisabledLog = !0;
    function a() {
      {
        if (P === 0) {
          G = console.log, ne = console.info, se = console.warn, re = console.error, q = console.group, X = console.groupCollapsed, le = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: he,
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
        P++;
      }
    }
    function u() {
      {
        if (P--, P === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: y({}, e, {
              value: G
            }),
            info: y({}, e, {
              value: ne
            }),
            warn: y({}, e, {
              value: se
            }),
            error: y({}, e, {
              value: re
            }),
            group: y({}, e, {
              value: q
            }),
            groupCollapsed: y({}, e, {
              value: X
            }),
            groupEnd: y({}, e, {
              value: le
            })
          });
        }
        P < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var w = D.ReactCurrentDispatcher, Z;
    function J(e, r, t) {
      {
        if (Z === void 0)
          try {
            throw Error();
          } catch (v) {
            var n = v.stack.trim().match(/\n( *(at )?)/);
            Z = n && n[1] || "";
          }
        return `
` + Z + e;
      }
    }
    var ue = !1, oe;
    {
      var Ee = typeof WeakMap == "function" ? WeakMap : Map;
      oe = new Ee();
    }
    function fe(e, r) {
      if (!e || ue)
        return "";
      {
        var t = oe.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      ue = !0;
      var v = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var h;
      h = w.current, w.current = null, a();
      try {
        if (r) {
          var l = function() {
            throw Error();
          };
          if (Object.defineProperty(l.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(l, []);
            } catch (I) {
              n = I;
            }
            Reflect.construct(e, [], l);
          } else {
            try {
              l.call();
            } catch (I) {
              n = I;
            }
            e.call(l.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (I) {
            n = I;
          }
          e();
        }
      } catch (I) {
        if (I && n && typeof I.stack == "string") {
          for (var c = I.stack.split(`
`), F = n.stack.split(`
`), _ = c.length - 1, S = F.length - 1; _ >= 1 && S >= 0 && c[_] !== F[S]; )
            S--;
          for (; _ >= 1 && S >= 0; _--, S--)
            if (c[_] !== F[S]) {
              if (_ !== 1 || S !== 1)
                do
                  if (_--, S--, S < 0 || c[_] !== F[S]) {
                    var $ = `
` + c[_].replace(" at new ", " at ");
                    return e.displayName && $.includes("<anonymous>") && ($ = $.replace("<anonymous>", e.displayName)), typeof e == "function" && oe.set(e, $), $;
                  }
                while (_ >= 1 && S >= 0);
              break;
            }
        }
      } finally {
        ue = !1, w.current = h, u(), Error.prepareStackTrace = v;
      }
      var ve = e ? e.displayName || e.name : "", ae = ve ? J(ve) : "";
      return typeof e == "function" && oe.set(e, ae), ae;
    }
    function ge(e, r, t) {
      return fe(e, !1);
    }
    function Se(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function me(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return fe(e, Se(e));
      if (typeof e == "string")
        return J(e);
      switch (e) {
        case C:
          return J("Suspense");
        case i:
          return J("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case m:
            return ge(e.render);
          case b:
            return me(e.type, r, t);
          case O: {
            var n = e, v = n._payload, h = n._init;
            try {
              return me(h(v), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var ye = Object.prototype.hasOwnProperty, ke = {}, Fe = D.ReactDebugCurrentFrame;
    function we(e) {
      if (e) {
        var r = e._owner, t = me(e.type, e._source, r ? r.type : null);
        Fe.setExtraStackFrame(t);
      } else
        Fe.setExtraStackFrame(null);
    }
    function He(e, r, t, n, v) {
      {
        var h = Function.call.bind(ye);
        for (var l in e)
          if (h(e, l)) {
            var c = void 0;
            try {
              if (typeof e[l] != "function") {
                var F = Error((n || "React class") + ": " + t + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw F.name = "Invariant Violation", F;
              }
              c = e[l](r, l, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (_) {
              c = _;
            }
            c && !(c instanceof Error) && (we(v), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, l, typeof c), we(null)), c instanceof Error && !(c.message in ke) && (ke[c.message] = !0, we(v), f("Failed %s type: %s", t, c.message), we(null));
          }
      }
    }
    var Ke = Array.isArray;
    function xe(e) {
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
        return Ie(e), !1;
      } catch {
        return !0;
      }
    }
    function Ie(e) {
      return "" + e;
    }
    function We(e) {
      if (Xe(e))
        return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ge(e)), Ie(e);
    }
    var Ae = D.ReactCurrentOwner, Ze = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, De, Me;
    function Qe(e) {
      if (ye.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function er(e) {
      if (ye.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function rr(e, r) {
      typeof e.ref == "string" && Ae.current;
    }
    function tr(e, r) {
      {
        var t = function() {
          De || (De = !0, f("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
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
          Me || (Me = !0, f("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var or = function(e, r, t, n, v, h, l) {
      var c = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: x,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: l,
        // Record the component responsible for creating this element.
        _owner: h
      };
      return c._store = {}, Object.defineProperty(c._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(c, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(c, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: v
      }), Object.freeze && (Object.freeze(c.props), Object.freeze(c)), c;
    };
    function ar(e, r, t, n, v) {
      {
        var h, l = {}, c = null, F = null;
        t !== void 0 && (We(t), c = "" + t), er(r) && (We(r.key), c = "" + r.key), Qe(r) && (F = r.ref, rr(r, v));
        for (h in r)
          ye.call(r, h) && !Ze.hasOwnProperty(h) && (l[h] = r[h]);
        if (e && e.defaultProps) {
          var _ = e.defaultProps;
          for (h in _)
            l[h] === void 0 && (l[h] = _[h]);
        }
        if (c || F) {
          var S = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          c && tr(l, S), F && nr(l, S);
        }
        return or(e, c, F, v, n, Ae.current, l);
      }
    }
    var Te = D.ReactCurrentOwner, Le = D.ReactDebugCurrentFrame;
    function de(e) {
      if (e) {
        var r = e._owner, t = me(e.type, e._source, r ? r.type : null);
        Le.setExtraStackFrame(t);
      } else
        Le.setExtraStackFrame(null);
    }
    var je;
    je = !1;
    function Oe(e) {
      return typeof e == "object" && e !== null && e.$$typeof === x;
    }
    function $e() {
      {
        if (Te.current) {
          var e = d(Te.current.type);
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
    var Ve = {};
    function cr(e) {
      {
        var r = $e();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Ye(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = cr(r);
        if (Ve[t])
          return;
        Ve[t] = !0;
        var n = "";
        e && e._owner && e._owner !== Te.current && (n = " It was passed a child from " + d(e._owner.type) + "."), de(e), f('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), de(null);
      }
    }
    function Be(e, r) {
      {
        if (typeof e != "object")
          return;
        if (xe(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            Oe(n) && Ye(n, r);
          }
        else if (Oe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var v = A(e);
          if (typeof v == "function" && v !== e.entries)
            for (var h = v.call(e), l; !(l = h.next()).done; )
              Oe(l.value) && Ye(l.value, r);
        }
      }
    }
    function sr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === m || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === b))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = d(r);
          He(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !je) {
          je = !0;
          var v = d(r);
          f("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", v || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && f("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function lr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            de(e), f("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), de(null);
            break;
          }
        }
        e.ref !== null && (de(e), f("Invalid attribute `ref` supplied to `React.Fragment`."), de(null));
      }
    }
    var ze = {};
    function Ne(e, r, t, n, v, h) {
      {
        var l = U(e);
        if (!l) {
          var c = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (c += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var F = ir();
          F ? c += F : c += $e();
          var _;
          e === null ? _ = "null" : xe(e) ? _ = "array" : e !== void 0 && e.$$typeof === x ? (_ = "<" + (d(e.type) || "Unknown") + " />", c = " Did you accidentally export a JSX literal instead of a component?") : _ = typeof e, f("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", _, c);
        }
        var S = ar(e, r, t, v, h);
        if (S == null)
          return S;
        if (l) {
          var $ = r.children;
          if ($ !== void 0)
            if (n)
              if (xe($)) {
                for (var ve = 0; ve < $.length; ve++)
                  Be($[ve], e);
                Object.freeze && Object.freeze($);
              } else
                f("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Be($, e);
        }
        if (ye.call(r, "key")) {
          var ae = d(e), I = Object.keys(r).filter(function(hr) {
            return hr !== "key";
          }), Ce = I.length > 0 ? "{key: someKey, " + I.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!ze[ae + Ce]) {
            var pr = I.length > 0 ? "{" + I.join(": ..., ") + ": ...}" : "{}";
            f(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ce, ae, pr, ae), ze[ae + Ce] = !0;
          }
        }
        return e === k ? lr(S) : sr(S), S;
      }
    }
    function ur(e, r, t) {
      return Ne(e, r, t, !0);
    }
    function fr(e, r, t) {
      return Ne(e, r, t, !1);
    }
    var dr = fr, vr = ur;
    Re.Fragment = k, Re.jsx = dr, Re.jsxs = vr;
  }()), Re;
}
process.env.NODE_ENV === "production" ? Pe.exports = mr() : Pe.exports = yr();
var g = Pe.exports;
function Er({
  dimensions: p,
  estimatedColumnWidth: x = 100,
  estimatedRowHeight: j = 50,
  overscanCount: k = 2,
  renderCell: Y,
  className: B = "",
  style: V,
  cellClassName: W = "",
  cellStyle: m
}) {
  const C = M(null), [i, b] = ie({
    rowStart: 0,
    rowEnd: 10,
    columnStart: 0,
    columnEnd: 10
  }), O = ce(() => {
    if (!C.current) return;
    const {
      scrollTop: R,
      scrollLeft: T,
      clientHeight: E,
      clientWidth: L
    } = C.current, N = Math.floor(R / j), ee = Math.min(
      p.rowCount - 1,
      Math.ceil((R + E) / j)
    ), U = Math.floor(T / x), o = Math.min(
      p.columnCount - 1,
      Math.ceil((T + L) / x)
    );
    b({
      rowStart: Math.max(0, N - k),
      rowEnd: Math.min(p.rowCount - 1, ee + k),
      columnStart: Math.max(0, U - k),
      columnEnd: Math.min(p.columnCount - 1, o + k)
    });
  }, [p, j, x, k]), z = ce(() => {
    requestAnimationFrame(O);
  }, [O]);
  gr(() => {
    O();
  }, [O]);
  const K = p.rowCount * j, Q = p.columnCount * x, A = i.rowStart * j, D = i.columnStart * x, f = [];
  for (let R = i.rowStart; R <= i.rowEnd; R++) {
    const T = [];
    for (let E = i.columnStart; E <= i.columnEnd; E++)
      T.push(
        /* @__PURE__ */ g.jsx(
          "div",
          {
            className: W,
            style: {
              ...m,
              display: "inline-block",
              width: x,
              height: j,
              verticalAlign: "top"
            },
            children: Y(R, E)
          },
          `${R}-${E}`
        )
      );
    f.push(
      /* @__PURE__ */ g.jsx(
        "div",
        {
          style: {
            height: j,
            whiteSpace: "nowrap"
          },
          children: T
        },
        R
      )
    );
  }
  const te = {
    overflow: "auto",
    width: "100%",
    height: "100%",
    ...V
  };
  return /* @__PURE__ */ g.jsx(
    "div",
    {
      ref: C,
      className: B,
      style: te,
      onScroll: z,
      children: /* @__PURE__ */ g.jsx("div", { style: { height: K, width: Q }, children: /* @__PURE__ */ g.jsx("div", { style: { paddingTop: A, paddingLeft: D }, children: f }) })
    }
  );
}
function wr({
  data: p,
  Header: x,
  Footer: j,
  Row: k,
  style: Y = {},
  headerStyle: B = {},
  footerStyle: V = {},
  rowStyle: W = {},
  tableHeight: m = "400px",
  estimatedRowHeight: C = 40,
  overscanCount: i = 5,
  columnWidths: b,
  footerDistributed: O = !0,
  defaultSortColumn: z = "",
  defaultSortDirection: K = null
}) {
  const [Q] = ie(0), [A, D] = ie(b || []), [f, te] = ie({
    column: z,
    direction: K
  }), R = M(null), T = M(null), E = M(null), L = M(null), N = ce(() => {
    var J, ue, oe, Ee;
    if (!T.current || !R.current || !b)
      return;
    const a = R.current.getBoundingClientRect().width, u = ((J = E.current) == null ? void 0 : J.offsetWidth) && ((ue = E.current) == null ? void 0 : ue.clientWidth) && ((oe = E.current) == null ? void 0 : oe.offsetWidth) - ((Ee = E.current) == null ? void 0 : Ee.clientWidth) || 0, w = a - u, Z = b.reduce((fe, ge) => fe + parseInt(ge, 10), 0);
    if (w > Z) {
      const fe = w / Z, ge = b.map((Se) => `${Math.floor(parseInt(Se, 10) * fe)}px`);
      D(ge);
    } else
      D(b);
  }, []);
  _e(() => {
    console.log("Setting up ResizeObserver");
    const a = new ResizeObserver((u) => {
      console.log("Resize observed:", u[0].contentRect.width), requestAnimationFrame(() => {
        N();
      });
    });
    return R.current && (a.observe(R.current), console.log("Observing container")), () => {
      console.log("Cleaning up ResizeObserver"), a.disconnect();
    };
  }, [N]), _e(() => {
    console.log("Initial column width calculation"), requestAnimationFrame(() => {
      N();
    });
  }, [N]);
  const ee = A.length > 0 ? A.join(" ") : `repeat(${Q}, 1fr)`, U = A.reduce((a, u) => {
    const w = parseInt(u);
    return a + (isNaN(w) ? 0 : w);
  }, 0), o = {
    container: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      ...Y
    },
    headerWrapper: {
      position: "relative",
      overflow: "auto",
      borderBottom: "1px solid #e2e8f0",
      backgroundColor: "#fff",
      width: "100%",
      ...B
    },
    bodyWrapper: {
      position: "relative",
      height: m,
      overflow: "auto",
      width: "100%",
      ...W
    },
    footerWrapper: {
      position: "relative",
      overflow: "auto",
      borderTop: "1px solid #e2e8f0",
      backgroundColor: "#fff",
      width: "100%",
      ...V
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: ee,
      width: R.current && b ? Math.max(
        R.current.getBoundingClientRect().width,
        b.reduce((a, u) => a + parseInt(u, 10), 0)
      ) + "px" : "100%"
    }
  }, [s, d] = ie(0), y = ce((a) => {
    d(a), requestAnimationFrame(() => {
      T.current && (T.current.scrollLeft = a), E.current && (E.current.scrollLeft = a), L.current && (L.current.scrollLeft = a);
    });
  }, []), P = ce((a) => {
    const u = a.target.scrollLeft;
    u !== s && y(u);
  }, [s, y]);
  _e(() => {
    const a = T.current, u = E.current, w = L.current;
    return a == null || a.addEventListener("scroll", P), u == null || u.addEventListener("scroll", P), w == null || w.addEventListener("scroll", P), () => {
      a == null || a.removeEventListener("scroll", P), u == null || u.removeEventListener("scroll", P), w == null || w.removeEventListener("scroll", P);
    };
  }, [P]);
  const G = (a) => {
    te((u) => ({
      column: a,
      direction: u.column === a ? u.direction === "asc" ? "desc" : u.direction === "desc" ? null : "asc" : "asc"
    }));
  }, se = H.useMemo(() => !f.column || !f.direction ? p : [...p].sort((a, u) => {
    const w = a[f.column], Z = u[f.column];
    if (w === Z) return 0;
    const J = w < Z ? -1 : 1;
    return f.direction === "asc" ? J : -J;
  }), [p, f.column, f.direction]).map((a) => ({
    component: ({ index: u }) => /* @__PURE__ */ g.jsx("div", { style: o.gridContainer, children: /* @__PURE__ */ g.jsx(k, { item: a, index: u }) })
  })), re = M(!1), q = M(), X = ce((a, u) => {
    re.current || (re.current = !0, requestAnimationFrame(() => {
      u !== "header" && T.current && (T.current.scrollLeft = a), u !== "body" && E.current && (E.current.scrollLeft = a), u !== "footer" && L.current && (L.current.scrollLeft = a), q.current && window.clearTimeout(q.current), q.current = window.setTimeout(() => {
        re.current = !1;
      }, 50);
    }));
  }, []), le = (a) => (u) => {
    const w = u.target;
    X(w.scrollLeft, a);
  };
  _e(() => () => {
    q.current && window.clearTimeout(q.current);
  }, []);
  const he = {
    horizontalScroll: {
      overflowY: "hidden",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      "&::-webkit-scrollbar": {
        display: "none"
      }
    }
  };
  return /* @__PURE__ */ g.jsxs("div", { ref: R, style: o.container, children: [
    /* @__PURE__ */ g.jsx(
      "div",
      {
        ref: T,
        style: {
          ...o.headerWrapper,
          ...he.horizontalScroll
        },
        onScroll: le("header"),
        children: /* @__PURE__ */ g.jsx("div", { style: {
          ...o.gridContainer,
          minWidth: U || void 0
        }, children: /* @__PURE__ */ g.jsx(x, { onSort: G, sortState: f }) })
      }
    ),
    /* @__PURE__ */ g.jsx(
      "div",
      {
        ref: E,
        style: o.bodyWrapper,
        onScroll: le("body"),
        children: /* @__PURE__ */ g.jsx("div", { style: {
          width: U ? `${U}px` : "100%",
          minWidth: "100%"
        }, children: /* @__PURE__ */ g.jsx(
          br,
          {
            items: se,
            estimatedItemHeight: C,
            overscanCount: i,
            style: {
              height: m,
              width: "100%"
            }
          }
        ) })
      }
    ),
    j && /* @__PURE__ */ g.jsx(
      "div",
      {
        ref: L,
        style: {
          ...o.footerWrapper,
          ...he.horizontalScroll
        },
        onScroll: le("footer"),
        children: /* @__PURE__ */ g.jsx("div", { style: {
          ...o.gridContainer,
          minWidth: U || void 0,
          ...O ? { display: "block" } : {}
        }, children: /* @__PURE__ */ g.jsx(j, {}) })
      }
    )
  ] });
}
const Je = typeof window < "u" && typeof window.document < "u" ? H.useLayoutEffect : H.useEffect, pe = (p) => {
  const x = M(p);
  return Je(() => {
    x.current = p;
  }), ce((...j) => x.current(...j), []);
};
function br({
  items: p,
  className: x = "",
  itemClassName: j = "",
  style: k,
  itemStyle: Y,
  overscanCount: B = 5,
  initialRenderCount: V = 20,
  estimatedItemHeight: W = 100
}) {
  if (!H.useState)
    throw new Error("React hooks are not available. Ensure you are using a compatible version of React.");
  const m = M(null), C = M(/* @__PURE__ */ new Map()), [i, b] = ie({
    start: 0,
    end: V
  }), [O, z] = ie(0), K = M(0), Q = M("down"), A = M(/* @__PURE__ */ new Map()), D = pe(
    (o) => C.current.get(o) || W
  ), f = pe(() => {
    let o = 0;
    A.current.clear();
    for (let s = 0; s < p.length; s++)
      A.current.set(s, o), o += D(s);
    return o;
  }), te = pe((o, s) => {
    if (!s) return;
    const d = s.getBoundingClientRect().height;
    if (d > 0 && C.current.get(o) !== d) {
      C.current.set(o, d);
      const y = f();
      z(y);
    }
  }), R = pe((o) => {
    let s = 0, d = p.length - 1;
    for (; s <= d; ) {
      const y = Math.floor((s + d) / 2), P = A.current.get(y) || 0, G = A.current.get(y + 1) || O;
      if (o >= P && o < G)
        return y;
      o < P ? d = y - 1 : s = y + 1;
    }
    return 0;
  }), T = pe(() => {
    if (!m.current) return;
    const o = m.current, s = o.scrollTop, d = o.clientHeight, y = s + d;
    Q.current = s > K.current ? "down" : "up", K.current = s;
    const G = O - y < d * 1.5, ne = d, se = Q.current === "up" ? ne * 1.5 : ne, re = G ? d * 2 : ne, q = Math.max(0, R(s - se));
    let X = Math.min(
      p.length - 1,
      R(y + re)
    );
    G && (X = p.length - 1), X > p.length - 4 && (X = p.length - 1), b({
      start: q,
      end: X + B
    });
  }), E = () => {
    requestAnimationFrame(T);
  };
  Je(() => {
    C.current.clear(), f(), T();
  }, [f, p, T]);
  const L = p.slice(i.start, i.end + 1), N = A.current.get(i.start) || 0, ee = pe((o, s) => {
    try {
      if (typeof o == "string")
        return /* @__PURE__ */ g.jsx("div", { dangerouslySetInnerHTML: { __html: o } }, `string-${i.start + s}`);
      if (H.isValidElement(o))
        return H.cloneElement(o, { key: `element-${i.start + s}` });
      if (typeof o == "function") {
        const d = o;
        return /* @__PURE__ */ g.jsx(H.Fragment, { children: d({ index: i.start + s }) }, `func-${i.start + s}`);
      }
      if (o && (o.render || o.component)) {
        const d = o.render || o.component, y = o.props || {};
        return /* @__PURE__ */ g.jsx(H.Fragment, { children: d({ ...y, index: i.start + s }) }, `complex-${i.start + s}`);
      }
      return /* @__PURE__ */ g.jsx("div", { children: String(o) }, `default-${i.start + s}`);
    } catch (d) {
      return console.error("Error rendering virtualization item:", d), /* @__PURE__ */ g.jsx("div", { children: "Render Error" }, `error-${i.start + s}`);
    }
  }), U = {
    overflow: "auto",
    ...k
  };
  return /* @__PURE__ */ g.jsx(
    "div",
    {
      ref: m,
      className: x,
      style: U,
      onScroll: E,
      children: /* @__PURE__ */ g.jsx("div", { style: { height: O }, children: /* @__PURE__ */ g.jsx("div", { style: { paddingTop: N }, children: L.map((o, s) => /* @__PURE__ */ g.jsx(
        "div",
        {
          ref: (d) => te(i.start + s, d),
          className: j,
          style: Y,
          children: ee(o, s)
        },
        i.start + s
      )) }) })
    }
  );
}
export {
  br as Virtualization,
  Er as VirtualizationGrid,
  wr as VirtualizationTable
};
