import C, { useRef as N, useState as Me, useCallback as pr } from "react";
var Re = { exports: {} }, K = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var We;
function gr() {
  if (We) return K;
  We = 1;
  var y = C, w = Symbol.for("react.element"), k = Symbol.for("react.fragment"), j = Object.prototype.hasOwnProperty, M = y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, W = { key: !0, ref: !0, __self: !0, __source: !0 };
  function F(S, g, m) {
    var l, _ = {}, T = null, Y = null;
    m !== void 0 && (T = "" + m), g.key !== void 0 && (T = "" + g.key), g.ref !== void 0 && (Y = g.ref);
    for (l in g) j.call(g, l) && !W.hasOwnProperty(l) && (_[l] = g[l]);
    if (S && S.defaultProps) for (l in g = S.defaultProps, g) _[l] === void 0 && (_[l] = g[l]);
    return { $$typeof: w, type: S, key: T, ref: Y, props: _, _owner: M.current };
  }
  return K.Fragment = k, K.jsx = F, K.jsxs = F, K;
}
var z = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ye;
function hr() {
  return Ye || (Ye = 1, process.env.NODE_ENV !== "production" && function() {
    var y = C, w = Symbol.for("react.element"), k = Symbol.for("react.portal"), j = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), W = Symbol.for("react.profiler"), F = Symbol.for("react.provider"), S = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), Y = Symbol.for("react.offscreen"), H = Symbol.iterator, G = "@@iterator";
    function D(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = H && e[H] || e[G];
      return typeof r == "function" ? r : null;
    }
    var x = y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function h(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        ie("error", e, t);
      }
    }
    function ie(e, r, t) {
      {
        var n = x.ReactDebugCurrentFrame, s = n.getStackAddendum();
        s !== "" && (r += "%s", t = t.concat([s]));
        var f = t.map(function(o) {
          return String(o);
        });
        f.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, f);
      }
    }
    var X = !1, J = !1, ue = !1, se = !1, ce = !1, Z;
    Z = Symbol.for("react.module.reference");
    function le(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === j || e === W || ce || e === M || e === m || e === l || se || e === Y || X || J || ue || typeof e == "object" && e !== null && (e.$$typeof === T || e.$$typeof === _ || e.$$typeof === F || e.$$typeof === S || e.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Z || e.getModuleId !== void 0));
    }
    function i(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var s = r.displayName || r.name || "";
      return s !== "" ? t + "(" + s + ")" : t;
    }
    function u(e) {
      return e.displayName || "Context";
    }
    function c(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case j:
          return "Fragment";
        case k:
          return "Portal";
        case W:
          return "Profiler";
        case M:
          return "StrictMode";
        case m:
          return "Suspense";
        case l:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case S:
            var r = e;
            return u(r) + ".Consumer";
          case F:
            var t = e;
            return u(t._context) + ".Provider";
          case g:
            return i(e, e.render, "ForwardRef");
          case _:
            var n = e.displayName || null;
            return n !== null ? n : c(e.type) || "Memo";
          case T: {
            var s = e, f = s._payload, o = s._init;
            try {
              return c(o(f));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var v = Object.assign, P = 0, I, L, Q, ee, re, A, be;
    function me() {
    }
    me.__reactDisabledLog = !0;
    function Ve() {
      {
        if (P === 0) {
          I = console.log, L = console.info, Q = console.warn, ee = console.error, re = console.group, A = console.groupCollapsed, be = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: me,
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
    function Be() {
      {
        if (P--, P === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: v({}, e, {
              value: I
            }),
            info: v({}, e, {
              value: L
            }),
            warn: v({}, e, {
              value: Q
            }),
            error: v({}, e, {
              value: ee
            }),
            group: v({}, e, {
              value: re
            }),
            groupCollapsed: v({}, e, {
              value: A
            }),
            groupEnd: v({}, e, {
              value: be
            })
          });
        }
        P < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var fe = x.ReactCurrentDispatcher, de;
    function te(e, r, t) {
      {
        if (de === void 0)
          try {
            throw Error();
          } catch (s) {
            var n = s.stack.trim().match(/\n( *(at )?)/);
            de = n && n[1] || "";
          }
        return `
` + de + e;
      }
    }
    var ve = !1, ne;
    {
      var Ue = typeof WeakMap == "function" ? WeakMap : Map;
      ne = new Ue();
    }
    function _e(e, r) {
      if (!e || ve)
        return "";
      {
        var t = ne.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      ve = !0;
      var s = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var f;
      f = fe.current, fe.current = null, Ve();
      try {
        if (r) {
          var o = function() {
            throw Error();
          };
          if (Object.defineProperty(o.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(o, []);
            } catch (R) {
              n = R;
            }
            Reflect.construct(e, [], o);
          } else {
            try {
              o.call();
            } catch (R) {
              n = R;
            }
            e.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (R) {
            n = R;
          }
          e();
        }
      } catch (R) {
        if (R && n && typeof R.stack == "string") {
          for (var a = R.stack.split(`
`), E = n.stack.split(`
`), d = a.length - 1, p = E.length - 1; d >= 1 && p >= 0 && a[d] !== E[p]; )
            p--;
          for (; d >= 1 && p >= 0; d--, p--)
            if (a[d] !== E[p]) {
              if (d !== 1 || p !== 1)
                do
                  if (d--, p--, p < 0 || a[d] !== E[p]) {
                    var b = `
` + a[d].replace(" at new ", " at ");
                    return e.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", e.displayName)), typeof e == "function" && ne.set(e, b), b;
                  }
                while (d >= 1 && p >= 0);
              break;
            }
        }
      } finally {
        ve = !1, fe.current = f, Be(), Error.prepareStackTrace = s;
      }
      var B = e ? e.displayName || e.name : "", $ = B ? te(B) : "";
      return typeof e == "function" && ne.set(e, $), $;
    }
    function Ne(e, r, t) {
      return _e(e, !1);
    }
    function He(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function ae(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return _e(e, He(e));
      if (typeof e == "string")
        return te(e);
      switch (e) {
        case m:
          return te("Suspense");
        case l:
          return te("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case g:
            return Ne(e.render);
          case _:
            return ae(e.type, r, t);
          case T: {
            var n = e, s = n._payload, f = n._init;
            try {
              return ae(f(s), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var q = Object.prototype.hasOwnProperty, Te = {}, we = x.ReactDebugCurrentFrame;
    function oe(e) {
      if (e) {
        var r = e._owner, t = ae(e.type, e._source, r ? r.type : null);
        we.setExtraStackFrame(t);
      } else
        we.setExtraStackFrame(null);
    }
    function Je(e, r, t, n, s) {
      {
        var f = Function.call.bind(q);
        for (var o in e)
          if (f(e, o)) {
            var a = void 0;
            try {
              if (typeof e[o] != "function") {
                var E = Error((n || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw E.name = "Invariant Violation", E;
              }
              a = e[o](r, o, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (d) {
              a = d;
            }
            a && !(a instanceof Error) && (oe(s), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, o, typeof a), oe(null)), a instanceof Error && !(a.message in Te) && (Te[a.message] = !0, oe(s), h("Failed %s type: %s", t, a.message), oe(null));
          }
      }
    }
    var qe = Array.isArray;
    function pe(e) {
      return qe(e);
    }
    function Ke(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function ze(e) {
      try {
        return Se(e), !1;
      } catch {
        return !0;
      }
    }
    function Se(e) {
      return "" + e;
    }
    function Pe(e) {
      if (ze(e))
        return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ke(e)), Se(e);
    }
    var Oe = x.ReactCurrentOwner, Ge = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ce, je;
    function Xe(e) {
      if (q.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Ze(e) {
      if (q.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Qe(e, r) {
      typeof e.ref == "string" && Oe.current;
    }
    function er(e, r) {
      {
        var t = function() {
          Ce || (Ce = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function rr(e, r) {
      {
        var t = function() {
          je || (je = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var tr = function(e, r, t, n, s, f, o) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: w,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: o,
        // Record the component responsible for creating this element.
        _owner: f
      };
      return a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(a, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(a, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: s
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    };
    function nr(e, r, t, n, s) {
      {
        var f, o = {}, a = null, E = null;
        t !== void 0 && (Pe(t), a = "" + t), Ze(r) && (Pe(r.key), a = "" + r.key), Xe(r) && (E = r.ref, Qe(r, s));
        for (f in r)
          q.call(r, f) && !Ge.hasOwnProperty(f) && (o[f] = r[f]);
        if (e && e.defaultProps) {
          var d = e.defaultProps;
          for (f in d)
            o[f] === void 0 && (o[f] = d[f]);
        }
        if (a || E) {
          var p = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && er(o, p), E && rr(o, p);
        }
        return tr(e, a, E, s, n, Oe.current, o);
      }
    }
    var ge = x.ReactCurrentOwner, xe = x.ReactDebugCurrentFrame;
    function V(e) {
      if (e) {
        var r = e._owner, t = ae(e.type, e._source, r ? r.type : null);
        xe.setExtraStackFrame(t);
      } else
        xe.setExtraStackFrame(null);
    }
    var he;
    he = !1;
    function ye(e) {
      return typeof e == "object" && e !== null && e.$$typeof === w;
    }
    function ke() {
      {
        if (ge.current) {
          var e = c(ge.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ar(e) {
      return "";
    }
    var Fe = {};
    function or(e) {
      {
        var r = ke();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function De(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = or(r);
        if (Fe[t])
          return;
        Fe[t] = !0;
        var n = "";
        e && e._owner && e._owner !== ge.current && (n = " It was passed a child from " + c(e._owner.type) + "."), V(e), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), V(null);
      }
    }
    function Ie(e, r) {
      {
        if (typeof e != "object")
          return;
        if (pe(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            ye(n) && De(n, r);
          }
        else if (ye(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var s = D(e);
          if (typeof s == "function" && s !== e.entries)
            for (var f = s.call(e), o; !(o = f.next()).done; )
              ye(o.value) && De(o.value, r);
        }
      }
    }
    function ir(e) {
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
          var n = c(r);
          Je(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !he) {
          he = !0;
          var s = c(r);
          h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", s || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ur(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            V(e), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), V(null);
            break;
          }
        }
        e.ref !== null && (V(e), h("Invalid attribute `ref` supplied to `React.Fragment`."), V(null));
      }
    }
    var Ae = {};
    function $e(e, r, t, n, s, f) {
      {
        var o = le(e);
        if (!o) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var E = ar();
          E ? a += E : a += ke();
          var d;
          e === null ? d = "null" : pe(e) ? d = "array" : e !== void 0 && e.$$typeof === w ? (d = "<" + (c(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : d = typeof e, h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", d, a);
        }
        var p = nr(e, r, t, s, f);
        if (p == null)
          return p;
        if (o) {
          var b = r.children;
          if (b !== void 0)
            if (n)
              if (pe(b)) {
                for (var B = 0; B < b.length; B++)
                  Ie(b[B], e);
                Object.freeze && Object.freeze(b);
              } else
                h("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ie(b, e);
        }
        if (q.call(r, "key")) {
          var $ = c(e), R = Object.keys(r).filter(function(vr) {
            return vr !== "key";
          }), Ee = R.length > 0 ? "{key: someKey, " + R.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ae[$ + Ee]) {
            var dr = R.length > 0 ? "{" + R.join(": ..., ") + ": ...}" : "{}";
            h(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ee, $, dr, $), Ae[$ + Ee] = !0;
          }
        }
        return e === j ? ur(p) : ir(p), p;
      }
    }
    function sr(e, r, t) {
      return $e(e, r, t, !0);
    }
    function cr(e, r, t) {
      return $e(e, r, t, !1);
    }
    var lr = cr, fr = sr;
    z.Fragment = j, z.jsx = lr, z.jsxs = fr;
  }()), z;
}
process.env.NODE_ENV === "production" ? Re.exports = gr() : Re.exports = hr();
var O = Re.exports;
const Le = typeof window < "u" && typeof window.document < "u" ? C.useLayoutEffect : C.useEffect, U = (y) => {
  const w = N(y);
  return Le(() => {
    w.current = y;
  }), pr((...k) => w.current(...k), []);
}, Er = ({
  items: y,
  className: w = "",
  itemClassName: k = "",
  style: j,
  itemStyle: M,
  overscanCount: W = 5,
  initialRenderCount: F = 20,
  estimatedItemHeight: S = 100
}) => {
  if (!C.useState)
    throw new Error("React hooks are not available. Ensure you are using a compatible version of React.");
  const g = N(null), m = N(/* @__PURE__ */ new Map()), [l, _] = Me({
    start: 0,
    end: F
  }), [T, Y] = Me(0), H = N(0), G = N("down"), D = N(/* @__PURE__ */ new Map()), x = U(
    (i) => m.current.get(i) || S
  ), h = U(() => {
    let i = 0;
    D.current.clear();
    for (let u = 0; u < y.length; u++)
      D.current.set(u, i), i += x(u);
    return i;
  }), ie = U((i, u) => {
    if (!u) return;
    const c = u.getBoundingClientRect().height;
    if (c > 0 && m.current.get(i) !== c) {
      m.current.set(i, c);
      const v = h();
      Y(v);
    }
  }), X = U((i) => {
    let u = 0, c = y.length - 1;
    for (; u <= c; ) {
      const v = Math.floor((u + c) / 2), P = D.current.get(v) || 0, I = D.current.get(v + 1) || T;
      if (i >= P && i < I)
        return v;
      i < P ? c = v - 1 : u = v + 1;
    }
    return 0;
  }), J = U(() => {
    if (!g.current) return;
    const i = g.current, u = i.scrollTop, c = i.clientHeight, v = u + c;
    G.current = u > H.current ? "down" : "up", H.current = u;
    const I = T - v < c * 1.5, L = c, Q = G.current === "up" ? L * 1.5 : L, ee = I ? c * 2 : L, re = Math.max(0, X(u - Q));
    let A = Math.min(
      y.length - 1,
      X(v + ee)
    );
    I && (A = y.length - 1), A > y.length - 4 && (A = y.length - 1), _({
      start: re,
      end: A + W
    });
  }), ue = () => {
    requestAnimationFrame(J);
  };
  Le(() => {
    m.current.clear(), h(), J();
  }, [h, y, J]);
  const se = y.slice(l.start, l.end + 1), ce = D.current.get(l.start) || 0, Z = U((i, u) => {
    try {
      if (typeof i == "string")
        return /* @__PURE__ */ O.jsx("div", { dangerouslySetInnerHTML: { __html: i } }, `string-${l.start + u}`);
      if (C.isValidElement(i))
        return C.cloneElement(i, { key: `element-${l.start + u}` });
      if (typeof i == "function") {
        const c = i;
        return /* @__PURE__ */ O.jsx(C.Fragment, { children: c({ index: l.start + u }) }, `func-${l.start + u}`);
      }
      if (i && (i.render || i.component)) {
        const c = i.render || i.component, v = i.props || {};
        return /* @__PURE__ */ O.jsx(C.Fragment, { children: c({ ...v, index: l.start + u }) }, `complex-${l.start + u}`);
      }
      return /* @__PURE__ */ O.jsx("div", { children: String(i) }, `default-${l.start + u}`);
    } catch (c) {
      return console.error("Error rendering virtualization item:", c), /* @__PURE__ */ O.jsx("div", { children: "Render Error" }, `error-${l.start + u}`);
    }
  }), le = {
    overflow: "auto",
    ...j
  };
  return /* @__PURE__ */ O.jsx(
    "div",
    {
      ref: g,
      className: w,
      style: le,
      onScroll: ue,
      children: /* @__PURE__ */ O.jsx("div", { style: { height: T }, children: /* @__PURE__ */ O.jsx("div", { style: { paddingTop: ce }, children: se.map((i, u) => /* @__PURE__ */ O.jsx(
        "div",
        {
          ref: (c) => ie(l.start + u, c),
          className: k,
          style: M,
          children: Z(i, u)
        },
        l.start + u
      )) }) })
    }
  );
};
export {
  Er as Virtualization
};
