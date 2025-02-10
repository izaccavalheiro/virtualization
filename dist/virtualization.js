import he, { useRef as N, useState as Me, useCallback as pe, useEffect as vr } from "react";
var ge = { exports: {} }, H = {};
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
function pr() {
  if (We) return H;
  We = 1;
  var g = he, F = Symbol.for("react.element"), L = Symbol.for("react.fragment"), x = Object.prototype.hasOwnProperty, M = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, k = { key: !0, ref: !0, __self: !0, __source: !0 };
  function P(R, p, _) {
    var h, m = {}, O = null, C = null;
    _ !== void 0 && (O = "" + _), p.key !== void 0 && (O = "" + p.key), p.ref !== void 0 && (C = p.ref);
    for (h in p) x.call(p, h) && !k.hasOwnProperty(h) && (m[h] = p[h]);
    if (R && R.defaultProps) for (h in p = R.defaultProps, p) m[h] === void 0 && (m[h] = p[h]);
    return { $$typeof: F, type: R, key: O, ref: C, props: m, _owner: M.current };
  }
  return H.Fragment = L, H.jsx = P, H.jsxs = P, H;
}
var q = {};
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
function gr() {
  return Ye || (Ye = 1, process.env.NODE_ENV !== "production" && function() {
    var g = he, F = Symbol.for("react.element"), L = Symbol.for("react.portal"), x = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), P = Symbol.for("react.provider"), R = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), _ = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), J = Symbol.iterator, B = "@@iterator";
    function ee(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = J && e[J] || e[B];
      return typeof r == "function" ? r : null;
    }
    var j = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        re("error", e, t);
      }
    }
    function re(e, r, t) {
      {
        var n = j.ReactDebugCurrentFrame, u = n.getStackAddendum();
        u !== "" && (r += "%s", t = t.concat([u]));
        var s = t.map(function(o) {
          return String(o);
        });
        s.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var te = !1, ne = !1, ae = !1, oe = !1, i = !1, l;
    l = Symbol.for("react.module.reference");
    function f(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === x || e === k || i || e === M || e === _ || e === h || oe || e === C || te || ne || ae || typeof e == "object" && e !== null && (e.$$typeof === O || e.$$typeof === m || e.$$typeof === P || e.$$typeof === R || e.$$typeof === p || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === l || e.getModuleId !== void 0));
    }
    function T(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var u = r.displayName || r.name || "";
      return u !== "" ? t + "(" + u + ")" : t;
    }
    function W(e) {
      return e.displayName || "Context";
    }
    function E(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case x:
          return "Fragment";
        case L:
          return "Portal";
        case k:
          return "Profiler";
        case M:
          return "StrictMode";
        case _:
          return "Suspense";
        case h:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case R:
            var r = e;
            return W(r) + ".Consumer";
          case P:
            var t = e;
            return W(t._context) + ".Provider";
          case p:
            return T(e, e.render, "ForwardRef");
          case m:
            var n = e.displayName || null;
            return n !== null ? n : E(e.type) || "Memo";
          case O: {
            var u = e, s = u._payload, o = u._init;
            try {
              return E(o(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var w = Object.assign, D = 0, K, z, I, ye, Re, be, Ee;
    function _e() {
    }
    _e.__reactDisabledLog = !0;
    function Ve() {
      {
        if (D === 0) {
          K = console.log, z = console.info, I = console.warn, ye = console.error, Re = console.group, be = console.groupCollapsed, Ee = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: _e,
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
        D++;
      }
    }
    function Le() {
      {
        if (D--, D === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: w({}, e, {
              value: K
            }),
            info: w({}, e, {
              value: z
            }),
            warn: w({}, e, {
              value: I
            }),
            error: w({}, e, {
              value: ye
            }),
            group: w({}, e, {
              value: Re
            }),
            groupCollapsed: w({}, e, {
              value: be
            }),
            groupEnd: w({}, e, {
              value: Ee
            })
          });
        }
        D < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ie = j.ReactCurrentDispatcher, ue;
    function G(e, r, t) {
      {
        if (ue === void 0)
          try {
            throw Error();
          } catch (u) {
            var n = u.stack.trim().match(/\n( *(at )?)/);
            ue = n && n[1] || "";
          }
        return `
` + ue + e;
      }
    }
    var se = !1, X;
    {
      var Be = typeof WeakMap == "function" ? WeakMap : Map;
      X = new Be();
    }
    function me(e, r) {
      if (!e || se)
        return "";
      {
        var t = X.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      se = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = ie.current, ie.current = null, Ve();
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
            } catch (b) {
              n = b;
            }
            Reflect.construct(e, [], o);
          } else {
            try {
              o.call();
            } catch (b) {
              n = b;
            }
            e.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (b) {
            n = b;
          }
          e();
        }
      } catch (b) {
        if (b && n && typeof b.stack == "string") {
          for (var a = b.stack.split(`
`), y = n.stack.split(`
`), c = a.length - 1, d = y.length - 1; c >= 1 && d >= 0 && a[c] !== y[d]; )
            d--;
          for (; c >= 1 && d >= 0; c--, d--)
            if (a[c] !== y[d]) {
              if (c !== 1 || d !== 1)
                do
                  if (c--, d--, d < 0 || a[c] !== y[d]) {
                    var S = `
` + a[c].replace(" at new ", " at ");
                    return e.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", e.displayName)), typeof e == "function" && X.set(e, S), S;
                  }
                while (c >= 1 && d >= 0);
              break;
            }
        }
      } finally {
        se = !1, ie.current = s, Le(), Error.prepareStackTrace = u;
      }
      var V = e ? e.displayName || e.name : "", A = V ? G(V) : "";
      return typeof e == "function" && X.set(e, A), A;
    }
    function Ue(e, r, t) {
      return me(e, !1);
    }
    function Ne(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function Z(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return me(e, Ne(e));
      if (typeof e == "string")
        return G(e);
      switch (e) {
        case _:
          return G("Suspense");
        case h:
          return G("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case p:
            return Ue(e.render);
          case m:
            return Z(e.type, r, t);
          case O: {
            var n = e, u = n._payload, s = n._init;
            try {
              return Z(s(u), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var U = Object.prototype.hasOwnProperty, Te = {}, Se = j.ReactDebugCurrentFrame;
    function Q(e) {
      if (e) {
        var r = e._owner, t = Z(e.type, e._source, r ? r.type : null);
        Se.setExtraStackFrame(t);
      } else
        Se.setExtraStackFrame(null);
    }
    function He(e, r, t, n, u) {
      {
        var s = Function.call.bind(U);
        for (var o in e)
          if (s(e, o)) {
            var a = void 0;
            try {
              if (typeof e[o] != "function") {
                var y = Error((n || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw y.name = "Invariant Violation", y;
              }
              a = e[o](r, o, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (c) {
              a = c;
            }
            a && !(a instanceof Error) && (Q(u), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, o, typeof a), Q(null)), a instanceof Error && !(a.message in Te) && (Te[a.message] = !0, Q(u), v("Failed %s type: %s", t, a.message), Q(null));
          }
      }
    }
    var qe = Array.isArray;
    function le(e) {
      return qe(e);
    }
    function Je(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Ke(e) {
      try {
        return we(e), !1;
      } catch {
        return !0;
      }
    }
    function we(e) {
      return "" + e;
    }
    function Pe(e) {
      if (Ke(e))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(e)), we(e);
    }
    var Oe = j.ReactCurrentOwner, ze = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ce, je;
    function Ge(e) {
      if (U.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Xe(e) {
      if (U.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Ze(e, r) {
      typeof e.ref == "string" && Oe.current;
    }
    function Qe(e, r) {
      {
        var t = function() {
          Ce || (Ce = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function er(e, r) {
      {
        var t = function() {
          je || (je = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var rr = function(e, r, t, n, u, s, o) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: F,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: o,
        // Record the component responsible for creating this element.
        _owner: s
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
        value: u
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    };
    function tr(e, r, t, n, u) {
      {
        var s, o = {}, a = null, y = null;
        t !== void 0 && (Pe(t), a = "" + t), Xe(r) && (Pe(r.key), a = "" + r.key), Ge(r) && (y = r.ref, Ze(r, u));
        for (s in r)
          U.call(r, s) && !ze.hasOwnProperty(s) && (o[s] = r[s]);
        if (e && e.defaultProps) {
          var c = e.defaultProps;
          for (s in c)
            o[s] === void 0 && (o[s] = c[s]);
        }
        if (a || y) {
          var d = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && Qe(o, d), y && er(o, d);
        }
        return rr(e, a, y, u, n, Oe.current, o);
      }
    }
    var ce = j.ReactCurrentOwner, xe = j.ReactDebugCurrentFrame;
    function Y(e) {
      if (e) {
        var r = e._owner, t = Z(e.type, e._source, r ? r.type : null);
        xe.setExtraStackFrame(t);
      } else
        xe.setExtraStackFrame(null);
    }
    var fe;
    fe = !1;
    function de(e) {
      return typeof e == "object" && e !== null && e.$$typeof === F;
    }
    function ke() {
      {
        if (ce.current) {
          var e = E(ce.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function nr(e) {
      return "";
    }
    var Fe = {};
    function ar(e) {
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
        var t = ar(r);
        if (Fe[t])
          return;
        Fe[t] = !0;
        var n = "";
        e && e._owner && e._owner !== ce.current && (n = " It was passed a child from " + E(e._owner.type) + "."), Y(e), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), Y(null);
      }
    }
    function Ie(e, r) {
      {
        if (typeof e != "object")
          return;
        if (le(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            de(n) && De(n, r);
          }
        else if (de(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var u = ee(e);
          if (typeof u == "function" && u !== e.entries)
            for (var s = u.call(e), o; !(o = s.next()).done; )
              de(o.value) && De(o.value, r);
        }
      }
    }
    function or(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === p || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === m))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = E(r);
          He(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !fe) {
          fe = !0;
          var u = E(r);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", u || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ir(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            Y(e), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), Y(null);
            break;
          }
        }
        e.ref !== null && (Y(e), v("Invalid attribute `ref` supplied to `React.Fragment`."), Y(null));
      }
    }
    var Ae = {};
    function $e(e, r, t, n, u, s) {
      {
        var o = f(e);
        if (!o) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var y = nr();
          y ? a += y : a += ke();
          var c;
          e === null ? c = "null" : le(e) ? c = "array" : e !== void 0 && e.$$typeof === F ? (c = "<" + (E(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : c = typeof e, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", c, a);
        }
        var d = tr(e, r, t, u, s);
        if (d == null)
          return d;
        if (o) {
          var S = r.children;
          if (S !== void 0)
            if (n)
              if (le(S)) {
                for (var V = 0; V < S.length; V++)
                  Ie(S[V], e);
                Object.freeze && Object.freeze(S);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ie(S, e);
        }
        if (U.call(r, "key")) {
          var A = E(e), b = Object.keys(r).filter(function(dr) {
            return dr !== "key";
          }), ve = b.length > 0 ? "{key: someKey, " + b.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ae[A + ve]) {
            var fr = b.length > 0 ? "{" + b.join(": ..., ") + ": ...}" : "{}";
            v(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ve, A, fr, A), Ae[A + ve] = !0;
          }
        }
        return e === x ? ir(d) : or(d), d;
      }
    }
    function ur(e, r, t) {
      return $e(e, r, t, !0);
    }
    function sr(e, r, t) {
      return $e(e, r, t, !1);
    }
    var lr = sr, cr = ur;
    q.Fragment = x, q.jsx = lr, q.jsxs = cr;
  }()), q;
}
process.env.NODE_ENV === "production" ? ge.exports = pr() : ge.exports = gr();
var $ = ge.exports;
const yr = ({
  items: g,
  className: F = "",
  itemClassName: L = "",
  style: x,
  itemStyle: M
}) => {
  const k = N(null), P = N(/* @__PURE__ */ new Map()), [R, p] = Me({ start: 0, end: 20 }), [_, h] = Me(0), m = N(0), O = N("down"), C = N(/* @__PURE__ */ new Map()), J = (i) => P.current.get(i) || 100, B = pe(() => {
    let i = 0;
    C.current.clear();
    for (let l = 0; l < g.length; l++)
      C.current.set(l, i), i += J(l);
    return i;
  }, [g.length]), ee = (i, l) => {
    if (!l) return;
    const f = l.getBoundingClientRect().height;
    if (f > 0 && P.current.get(i) !== f) {
      P.current.set(i, f);
      const T = B();
      h(T);
    }
  }, j = pe((i) => {
    let l = 0, f = g.length - 1;
    for (; l <= f; ) {
      const T = Math.floor((l + f) / 2), W = C.current.get(T) || 0, E = C.current.get(T + 1) || _;
      if (i >= W && i < E)
        return T;
      i < W ? f = T - 1 : l = T + 1;
    }
    return 0;
  }, [g.length, _]), v = pe(() => {
    if (!k.current) return;
    const i = k.current, l = i.scrollTop, f = i.clientHeight, T = l + f;
    O.current = l > m.current ? "down" : "up", m.current = l;
    const E = _ - T < f * 1.5, w = f, D = O.current === "up" ? w * 1.5 : w, K = E ? f * 2 : w, z = Math.max(0, j(l - D));
    let I = Math.min(
      g.length - 1,
      j(T + K)
    );
    E && (I = g.length - 1), I > g.length - 4 && (I = g.length - 1), p({
      start: z,
      end: I
    });
  }, [j, g.length, _]), re = () => {
    requestAnimationFrame(v);
  };
  vr(() => {
    P.current.clear(), B(), v();
  }, [B, g, v]);
  const te = g.slice(R.start, R.end + 1), ne = C.current.get(R.start) || 0, ae = (i, l) => {
    if (typeof i == "string")
      return /* @__PURE__ */ $.jsx("div", { dangerouslySetInnerHTML: { __html: i } });
    if (he.isValidElement(i))
      return i;
    if (typeof i == "function") {
      const f = i;
      return /* @__PURE__ */ $.jsx(f, {});
    }
    if (i && (i.render || i.component)) {
      const f = i.render || i.component;
      return /* @__PURE__ */ $.jsx(f, { ...i.props, index: R.start + l });
    }
    return String(i);
  }, oe = {
    overflow: "auto",
    ...x
  };
  return /* @__PURE__ */ $.jsx(
    "div",
    {
      ref: k,
      className: F,
      style: oe,
      onScroll: re,
      children: /* @__PURE__ */ $.jsx("div", { style: { height: _ }, children: /* @__PURE__ */ $.jsx("div", { style: { paddingTop: ne }, children: te.map((i, l) => /* @__PURE__ */ $.jsx(
        "div",
        {
          ref: (f) => ee(R.start + l, f),
          className: L,
          style: M,
          children: ae(i, l)
        },
        R.start + l
      )) }) })
    }
  );
};
export {
  yr as Virtualization
};
