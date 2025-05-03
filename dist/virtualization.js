import * as hr from "react";
import ue, { useRef as B, useState as ae, useCallback as Y, useLayoutEffect as gr, useEffect as fe } from "react";
function mr(f) {
  if (f.__esModule) return f;
  var _ = f.default;
  if (typeof _ == "function") {
    var b = function R() {
      return this instanceof R ? Reflect.construct(_, arguments, this.constructor) : _.apply(this, arguments);
    };
    b.prototype = _.prototype;
  } else b = {};
  return Object.defineProperty(b, "__esModule", { value: !0 }), Object.keys(f).forEach(function(R) {
    var W = Object.getOwnPropertyDescriptor(f, R);
    Object.defineProperty(b, R, W.get ? W : {
      enumerable: !0,
      get: function() {
        return f[R];
      }
    });
  }), b;
}
var je = { exports: {} }, he = {};
const Ue = /* @__PURE__ */ mr(hr);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Be;
function yr() {
  if (Be) return he;
  Be = 1;
  var f = Ue, _ = Symbol.for("react.element"), b = Symbol.for("react.fragment"), R = Object.prototype.hasOwnProperty, W = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, N = { key: !0, ref: !0, __self: !0, __source: !0 };
  function V(D, l, j) {
    var a, w = {}, O = null, A = null;
    j !== void 0 && (O = "" + j), l.key !== void 0 && (O = "" + l.key), l.ref !== void 0 && (A = l.ref);
    for (a in l) R.call(l, a) && !N.hasOwnProperty(a) && (w[a] = l[a]);
    if (D && D.defaultProps) for (a in l = D.defaultProps, l) w[a] === void 0 && (w[a] = l[a]);
    return { $$typeof: _, type: D, key: O, ref: A, props: w, _owner: W.current };
  }
  return he.Fragment = b, he.jsx = V, he.jsxs = V, he;
}
var ge = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ne;
function br() {
  return Ne || (Ne = 1, process.env.NODE_ENV !== "production" && function() {
    var f = Ue, _ = Symbol.for("react.element"), b = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), W = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), V = Symbol.for("react.provider"), D = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), a = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), A = Symbol.for("react.offscreen"), H = Symbol.iterator, J = "@@iterator";
    function M(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = H && e[H] || e[J];
      return typeof r == "function" ? r : null;
    }
    var $ = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function d(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        Q("error", e, t);
      }
    }
    function Q(e, r, t) {
      {
        var n = $.ReactDebugCurrentFrame, p = n.getStackAddendum();
        p !== "" && (r += "%s", t = t.concat([p]));
        var g = t.map(function(s) {
          return String(s);
        });
        g.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, g);
      }
    }
    var h = !1, k = !1, x = !1, U = !1, z = !1, K;
    K = Symbol.for("react.module.reference");
    function q(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === R || e === N || z || e === W || e === j || e === a || U || e === A || h || k || x || typeof e == "object" && e !== null && (e.$$typeof === O || e.$$typeof === w || e.$$typeof === V || e.$$typeof === D || e.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === K || e.getModuleId !== void 0));
    }
    function o(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var p = r.displayName || r.name || "";
      return p !== "" ? t + "(" + p + ")" : t;
    }
    function c(e) {
      return e.displayName || "Context";
    }
    function v(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && d("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case R:
          return "Fragment";
        case b:
          return "Portal";
        case N:
          return "Profiler";
        case W:
          return "StrictMode";
        case j:
          return "Suspense";
        case a:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case D:
            var r = e;
            return c(r) + ".Consumer";
          case V:
            var t = e;
            return c(t._context) + ".Provider";
          case l:
            return o(e, e.render, "ForwardRef");
          case w:
            var n = e.displayName || null;
            return n !== null ? n : v(e.type) || "Memo";
          case O: {
            var p = e, g = p._payload, s = p._init;
            try {
              return v(s(g));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var E = Object.assign, P = 0, G, X, me, de, ve, u, m;
    function C() {
    }
    C.__reactDisabledLog = !0;
    function ee() {
      {
        if (P === 0) {
          G = console.log, X = console.info, me = console.warn, de = console.error, ve = console.group, u = console.groupCollapsed, m = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: C,
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
    function re() {
      {
        if (P--, P === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: E({}, e, {
              value: G
            }),
            info: E({}, e, {
              value: X
            }),
            warn: E({}, e, {
              value: me
            }),
            error: E({}, e, {
              value: de
            }),
            group: E({}, e, {
              value: ve
            }),
            groupCollapsed: E({}, e, {
              value: u
            }),
            groupEnd: E({}, e, {
              value: m
            })
          });
        }
        P < 0 && d("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ie = $.ReactCurrentDispatcher, ce;
    function te(e, r, t) {
      {
        if (ce === void 0)
          try {
            throw Error();
          } catch (p) {
            var n = p.stack.trim().match(/\n( *(at )?)/);
            ce = n && n[1] || "";
          }
        return `
` + ce + e;
      }
    }
    var ne = !1, Z;
    {
      var Re = typeof WeakMap == "function" ? WeakMap : Map;
      Z = new Re();
    }
    function Ee(e, r) {
      if (!e || ne)
        return "";
      {
        var t = Z.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      ne = !0;
      var p = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var g;
      g = ie.current, ie.current = null, ee();
      try {
        if (r) {
          var s = function() {
            throw Error();
          };
          if (Object.defineProperty(s.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(s, []);
            } catch (I) {
              n = I;
            }
            Reflect.construct(e, [], s);
          } else {
            try {
              s.call();
            } catch (I) {
              n = I;
            }
            e.call(s.prototype);
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
          for (var i = I.stack.split(`
`), F = n.stack.split(`
`), S = i.length - 1, T = F.length - 1; S >= 1 && T >= 0 && i[S] !== F[T]; )
            T--;
          for (; S >= 1 && T >= 0; S--, T--)
            if (i[S] !== F[T]) {
              if (S !== 1 || T !== 1)
                do
                  if (S--, T--, T < 0 || i[S] !== F[T]) {
                    var L = `
` + i[S].replace(" at new ", " at ");
                    return e.displayName && L.includes("<anonymous>") && (L = L.replace("<anonymous>", e.displayName)), typeof e == "function" && Z.set(e, L), L;
                  }
                while (S >= 1 && T >= 0);
              break;
            }
        }
      } finally {
        ne = !1, ie.current = g, re(), Error.prepareStackTrace = p;
      }
      var le = e ? e.displayName || e.name : "", oe = le ? te(le) : "";
      return typeof e == "function" && Z.set(e, oe), oe;
    }
    function ze(e, r, t) {
      return Ee(e, !1);
    }
    function qe(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function ye(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ee(e, qe(e));
      if (typeof e == "string")
        return te(e);
      switch (e) {
        case j:
          return te("Suspense");
        case a:
          return te("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case l:
            return ze(e.render);
          case w:
            return ye(e.type, r, t);
          case O: {
            var n = e, p = n._payload, g = n._init;
            try {
              return ye(g(p), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var pe = Object.prototype.hasOwnProperty, Oe = {}, Pe = $.ReactDebugCurrentFrame;
    function be(e) {
      if (e) {
        var r = e._owner, t = ye(e.type, e._source, r ? r.type : null);
        Pe.setExtraStackFrame(t);
      } else
        Pe.setExtraStackFrame(null);
    }
    function He(e, r, t, n, p) {
      {
        var g = Function.call.bind(pe);
        for (var s in e)
          if (g(e, s)) {
            var i = void 0;
            try {
              if (typeof e[s] != "function") {
                var F = Error((n || "React class") + ": " + t + " type `" + s + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[s] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw F.name = "Invariant Violation", F;
              }
              i = e[s](r, s, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (S) {
              i = S;
            }
            i && !(i instanceof Error) && (be(p), d("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, s, typeof i), be(null)), i instanceof Error && !(i.message in Oe) && (Oe[i.message] = !0, be(p), d("Failed %s type: %s", t, i.message), be(null));
          }
      }
    }
    var Je = Array.isArray;
    function _e(e) {
      return Je(e);
    }
    function Ke(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Ge(e) {
      try {
        return Ce(e), !1;
      } catch {
        return !0;
      }
    }
    function Ce(e) {
      return "" + e;
    }
    function ke(e) {
      if (Ge(e))
        return d("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ke(e)), Ce(e);
    }
    var Fe = $.ReactCurrentOwner, Xe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ie, We;
    function Ze(e) {
      if (pe.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Qe(e) {
      if (pe.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function er(e, r) {
      typeof e.ref == "string" && Fe.current;
    }
    function rr(e, r) {
      {
        var t = function() {
          Ie || (Ie = !0, d("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function tr(e, r) {
      {
        var t = function() {
          We || (We = !0, d("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var nr = function(e, r, t, n, p, g, s) {
      var i = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: _,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: s,
        // Record the component responsible for creating this element.
        _owner: g
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
        value: p
      }), Object.freeze && (Object.freeze(i.props), Object.freeze(i)), i;
    };
    function or(e, r, t, n, p) {
      {
        var g, s = {}, i = null, F = null;
        t !== void 0 && (ke(t), i = "" + t), Qe(r) && (ke(r.key), i = "" + r.key), Ze(r) && (F = r.ref, er(r, p));
        for (g in r)
          pe.call(r, g) && !Xe.hasOwnProperty(g) && (s[g] = r[g]);
        if (e && e.defaultProps) {
          var S = e.defaultProps;
          for (g in S)
            s[g] === void 0 && (s[g] = S[g]);
        }
        if (i || F) {
          var T = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          i && rr(s, T), F && tr(s, T);
        }
        return nr(e, i, F, p, n, Fe.current, s);
      }
    }
    var we = $.ReactCurrentOwner, De = $.ReactDebugCurrentFrame;
    function se(e) {
      if (e) {
        var r = e._owner, t = ye(e.type, e._source, r ? r.type : null);
        De.setExtraStackFrame(t);
      } else
        De.setExtraStackFrame(null);
    }
    var Se;
    Se = !1;
    function Te(e) {
      return typeof e == "object" && e !== null && e.$$typeof === _;
    }
    function Ae() {
      {
        if (we.current) {
          var e = v(we.current.type);
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
    var Me = {};
    function ir(e) {
      {
        var r = Ae();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function $e(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = ir(r);
        if (Me[t])
          return;
        Me[t] = !0;
        var n = "";
        e && e._owner && e._owner !== we.current && (n = " It was passed a child from " + v(e._owner.type) + "."), se(e), d('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), se(null);
      }
    }
    function Le(e, r) {
      {
        if (typeof e != "object")
          return;
        if (_e(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            Te(n) && $e(n, r);
          }
        else if (Te(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var p = M(e);
          if (typeof p == "function" && p !== e.entries)
            for (var g = p.call(e), s; !(s = g.next()).done; )
              Te(s.value) && $e(s.value, r);
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
        else if (typeof r == "object" && (r.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === w))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = v(r);
          He(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !Se) {
          Se = !0;
          var p = v(r);
          d("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", p || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && d("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function sr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            se(e), d("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), se(null);
            break;
          }
        }
        e.ref !== null && (se(e), d("Invalid attribute `ref` supplied to `React.Fragment`."), se(null));
      }
    }
    var Ve = {};
    function Ye(e, r, t, n, p, g) {
      {
        var s = q(e);
        if (!s) {
          var i = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (i += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var F = ar();
          F ? i += F : i += Ae();
          var S;
          e === null ? S = "null" : _e(e) ? S = "array" : e !== void 0 && e.$$typeof === _ ? (S = "<" + (v(e.type) || "Unknown") + " />", i = " Did you accidentally export a JSX literal instead of a component?") : S = typeof e, d("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", S, i);
        }
        var T = or(e, r, t, p, g);
        if (T == null)
          return T;
        if (s) {
          var L = r.children;
          if (L !== void 0)
            if (n)
              if (_e(L)) {
                for (var le = 0; le < L.length; le++)
                  Le(L[le], e);
                Object.freeze && Object.freeze(L);
              } else
                d("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Le(L, e);
        }
        if (pe.call(r, "key")) {
          var oe = v(e), I = Object.keys(r).filter(function(pr) {
            return pr !== "key";
          }), xe = I.length > 0 ? "{key: someKey, " + I.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ve[oe + xe]) {
            var vr = I.length > 0 ? "{" + I.join(": ..., ") + ": ...}" : "{}";
            d(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, xe, oe, vr, oe), Ve[oe + xe] = !0;
          }
        }
        return e === R ? sr(T) : cr(T), T;
      }
    }
    function lr(e, r, t) {
      return Ye(e, r, t, !0);
    }
    function ur(e, r, t) {
      return Ye(e, r, t, !1);
    }
    var fr = ur, dr = lr;
    ge.Fragment = R, ge.jsx = fr, ge.jsxs = dr;
  }()), ge;
}
process.env.NODE_ENV === "production" ? je.exports = yr() : je.exports = br();
var y = je.exports;
function _r({
  dimensions: f,
  estimatedColumnWidth: _ = 100,
  estimatedRowHeight: b = 50,
  overscanCount: R = 2,
  renderCell: W,
  className: N = "",
  style: V,
  cellClassName: D = "",
  cellStyle: l
}) {
  const j = B(null), [a, w] = ae({
    rowStart: 0,
    rowEnd: 10,
    columnStart: 0,
    columnEnd: 10
  }), O = Y(() => {
    if (!j.current) return;
    const {
      scrollTop: h,
      scrollLeft: k,
      clientHeight: x,
      clientWidth: U
    } = j.current, z = Math.floor(h / b), K = Math.min(
      f.rowCount - 1,
      Math.ceil((h + x) / b)
    ), q = Math.floor(k / _), o = Math.min(
      f.columnCount - 1,
      Math.ceil((k + U) / _)
    );
    w({
      rowStart: Math.max(0, z - R),
      rowEnd: Math.min(f.rowCount - 1, K + R),
      columnStart: Math.max(0, q - R),
      columnEnd: Math.min(f.columnCount - 1, o + R)
    });
  }, [f, b, _, R]), A = Y(() => {
    requestAnimationFrame(O);
  }, [O]);
  gr(() => {
    O();
  }, [O]);
  const H = f.rowCount * b, J = f.columnCount * _, M = a.rowStart * b, $ = a.columnStart * _, d = [];
  for (let h = a.rowStart; h <= a.rowEnd; h++) {
    const k = [];
    for (let x = a.columnStart; x <= a.columnEnd; x++)
      k.push(
        /* @__PURE__ */ y.jsx(
          "div",
          {
            className: D,
            style: {
              ...l,
              display: "inline-block",
              width: _,
              height: b,
              verticalAlign: "top"
            },
            children: W(h, x)
          },
          `${h}-${x}`
        )
      );
    d.push(
      /* @__PURE__ */ y.jsx(
        "div",
        {
          style: {
            height: b,
            whiteSpace: "nowrap"
          },
          children: k
        },
        h
      )
    );
  }
  const Q = {
    overflow: "auto",
    width: "100%",
    height: "100%",
    ...V
  };
  return fe(() => {
    const h = j.current;
    return h == null || h.addEventListener("scroll", A), () => {
      h == null || h.removeEventListener("scroll", A);
    };
  }, [A]), /* @__PURE__ */ y.jsx(
    "div",
    {
      ref: j,
      className: N,
      style: Q,
      onScroll: A,
      children: /* @__PURE__ */ y.jsx("div", { style: { height: H, width: J }, children: /* @__PURE__ */ y.jsx("div", { style: { paddingTop: M, paddingLeft: $ }, children: d }) })
    }
  );
}
function wr({
  data: f,
  Header: _,
  Footer: b,
  Row: R,
  style: W = {},
  headerStyle: N = {},
  footerStyle: V = {},
  rowStyle: D = {},
  tableHeight: l = "400px",
  estimatedRowHeight: j = 40,
  overscanCount: a = 5,
  columnWidths: w,
  footerDistributed: O = !0,
  defaultSortColumn: A = "",
  defaultSortDirection: H = null
}) {
  const [J] = ae(0), [M, $] = ae(w || []), [d, Q] = ae({
    column: A,
    direction: H
  }), h = B(null), k = B(null), x = B(null), U = B(null), z = Y(() => {
    var re, ie, ce, te;
    if (!k.current || !h.current || !w)
      return;
    const u = h.current.getBoundingClientRect().width, m = ((re = x.current) == null ? void 0 : re.offsetWidth) && ((ie = x.current) == null ? void 0 : ie.clientWidth) && ((ce = x.current) == null ? void 0 : ce.offsetWidth) - ((te = x.current) == null ? void 0 : te.clientWidth) || 0, C = u - m, ee = w.reduce((ne, Z) => ne + parseInt(Z, 10), 0);
    if (C > ee) {
      const ne = C / ee, Z = w.map((Re) => `${Math.floor(parseInt(Re, 10) * ne)}px`);
      $(Z);
    } else
      $(w);
  }, []);
  fe(() => {
    const u = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        z();
      });
    });
    return h.current && u.observe(h.current), () => {
      u.disconnect();
    };
  }, [z]), fe(() => {
    requestAnimationFrame(() => {
      z();
    });
  }, [z]);
  const K = M.length > 0 ? M.join(" ") : `repeat(${J}, 1fr)`, q = M.reduce((u, m) => {
    const C = parseInt(m);
    return u + (isNaN(C) ? 0 : C);
  }, 0), o = {
    container: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      ...W
    },
    headerWrapper: {
      position: "relative",
      overflow: "auto",
      borderBottom: "1px solid #e2e8f0",
      backgroundColor: "#fff",
      width: "100%",
      ...N
    },
    bodyWrapper: {
      position: "relative",
      height: l,
      overflow: "auto",
      width: "100%",
      ...D
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
      gridTemplateColumns: K,
      width: h.current && w ? Math.max(
        h.current.getBoundingClientRect().width,
        w.reduce((u, m) => u + parseInt(m, 10), 0)
      ) + "px" : "100%"
    }
  }, [c, v] = ae(0), E = Y((u) => {
    v(u), requestAnimationFrame(() => {
      k.current && (k.current.scrollLeft = u), x.current && (x.current.scrollLeft = u), U.current && (U.current.scrollLeft = u);
    });
  }, []), P = Y((u) => {
    const m = u.target.scrollLeft;
    m !== c && E(m);
  }, [c, E]);
  fe(() => {
    const u = k.current, m = x.current, C = U.current;
    return u == null || u.addEventListener("scroll", P), m == null || m.addEventListener("scroll", P), C == null || C.addEventListener("scroll", P), () => {
      u == null || u.removeEventListener("scroll", P), m == null || m.removeEventListener("scroll", P), C == null || C.removeEventListener("scroll", P);
    };
  }, [P]);
  const G = (u) => {
    Q((m) => ({
      column: u,
      direction: m.column === u ? m.direction === "asc" ? "desc" : m.direction === "desc" ? null : "asc" : "asc"
    }));
  }, me = ue.useMemo(() => !d.column || !d.direction ? f : [...f].sort((u, m) => {
    const C = u[d.column], ee = m[d.column];
    if (C === ee) return 0;
    const re = C < ee ? -1 : 1;
    return d.direction === "asc" ? re : -re;
  }), [f, d.column, d.direction]).map((u) => ({
    component: ({ index: m }) => /* @__PURE__ */ y.jsx("div", { style: o.gridContainer, children: /* @__PURE__ */ y.jsx(R, { item: u, index: m }) })
  })), de = B();
  fe(() => () => {
    de.current && window.clearTimeout(de.current);
  }, []);
  const ve = {
    horizontalScroll: {
      overflowY: "hidden",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      "&::-webkit-scrollbar": {
        display: "none"
      }
    }
  };
  return /* @__PURE__ */ y.jsxs("div", { ref: h, style: o.container, children: [
    /* @__PURE__ */ y.jsx(
      "div",
      {
        ref: k,
        style: {
          ...o.headerWrapper,
          ...ve.horizontalScroll
        },
        children: /* @__PURE__ */ y.jsx("div", { style: {
          ...o.gridContainer,
          minWidth: q || void 0
        }, children: /* @__PURE__ */ y.jsx(_, { onSort: G, sortState: d }) })
      }
    ),
    /* @__PURE__ */ y.jsx(
      "div",
      {
        ref: x,
        style: o.bodyWrapper,
        children: /* @__PURE__ */ y.jsx("div", { style: {
          width: q ? `${q}px` : "100%",
          minWidth: "100%"
        }, children: /* @__PURE__ */ y.jsx(
          Rr,
          {
            items: me,
            estimatedItemHeight: j,
            overscanCount: a,
            style: {
              height: l,
              width: "100%"
            }
          }
        ) })
      }
    ),
    b && /* @__PURE__ */ y.jsx(
      "div",
      {
        ref: U,
        style: {
          ...o.footerWrapper,
          ...ve.horizontalScroll
        },
        children: /* @__PURE__ */ y.jsx("div", { style: {
          ...o.gridContainer,
          minWidth: q || void 0,
          ...O ? { display: "block" } : {}
        }, children: /* @__PURE__ */ y.jsx(b, {}) })
      }
    )
  ] });
}
function Rr({
  items: f,
  className: _ = "",
  itemClassName: b = "",
  style: R,
  itemStyle: W,
  overscanCount: N = 5,
  initialRenderCount: V = 20,
  estimatedItemHeight: D = 100
}) {
  if (!ue.useState)
    throw new Error("React hooks are not available. Ensure you are using a compatible version of React.");
  const l = B(null), j = B(/* @__PURE__ */ new Map()), [a, w] = ae({
    start: 0,
    end: V
  }), [O, A] = ae(0), H = B(0), J = B("down"), M = B(/* @__PURE__ */ new Map()), $ = Y(
    (o) => j.current.get(o) || D,
    []
  ), d = Y(() => {
    let o = 0;
    M.current.clear();
    for (let c = 0; c < f.length; c++)
      M.current.set(c, o), o += $(c);
    return o;
  }, []), Q = Y((o, c) => {
    if (!c) return;
    const v = c.getBoundingClientRect().height;
    if (v > 0 && j.current.get(o) !== v) {
      j.current.set(o, v);
      const E = d();
      A(E);
    }
  }, []), h = Y((o) => {
    let c = 0, v = f.length - 1;
    for (; c <= v; ) {
      const E = Math.floor((c + v) / 2), P = M.current.get(E) || 0, G = M.current.get(E + 1) || O;
      if (o >= P && o < G)
        return E;
      o < P ? v = E - 1 : c = E + 1;
    }
    return 0;
  }, []), k = Y(() => {
    if (!l.current) return;
    J.current = l.current.scrollTop > H.current ? "down" : "up", H.current = l.current.scrollTop;
    const c = O - (l.current.scrollTop + l.current.clientHeight) < l.current.clientHeight * 1.5, v = l.current.clientHeight, E = J.current === "up" ? v * 1.5 : v, P = c ? l.current.clientHeight * 2 : v, G = Math.max(0, h(l.current.scrollTop - E));
    let X = Math.min(
      f.length - 1,
      h(l.current.scrollTop + l.current.clientHeight + P)
    );
    c && (X = f.length - 1), X > f.length - 4 && (X = f.length - 1), w({
      start: G,
      end: X + N
    });
  }, []), x = () => {
    requestAnimationFrame(k);
  };
  fe(() => {
    j.current.clear(), d(), k();
  }, [d, f, k]);
  const U = f.slice(a.start, a.end + 1), z = M.current.get(a.start) || 0, K = Y((o, c) => {
    try {
      if (typeof o == "string")
        return /* @__PURE__ */ y.jsx("div", { dangerouslySetInnerHTML: { __html: o }, "data-testid": `item-${c}` }, `string-${a.start + c}`);
      if (ue.isValidElement(o))
        return ue.cloneElement(o, { key: `element-${a.start + c}` });
      if (typeof o == "function") {
        const v = o;
        return /* @__PURE__ */ y.jsx(ue.Fragment, { children: v({ index: a.start + c }) }, `func-${a.start + c}`);
      }
      if (o && (o.render || o.component)) {
        const v = o.render || o.component, E = o.props || {};
        return /* @__PURE__ */ y.jsx(ue.Fragment, { children: v({ ...E, index: a.start + c }) }, `complex-${a.start + c}`);
      }
      return /* @__PURE__ */ y.jsx("div", { "data-testid": `item-${c}`, children: String(o) }, `default-${a.start + c}`);
    } catch (v) {
      return console.error("Error rendering virtualization item:", v), /* @__PURE__ */ y.jsx("div", { children: "Render Error" }, `error-${a.start + c}`);
    }
  }, []), q = {
    overflow: "auto",
    ...R
  };
  return /* @__PURE__ */ y.jsx(
    "div",
    {
      ref: l,
      className: _,
      style: q,
      onScroll: x,
      children: /* @__PURE__ */ y.jsx("div", { style: { height: O }, children: /* @__PURE__ */ y.jsx("div", { style: { paddingTop: z }, children: U.map((o, c) => /* @__PURE__ */ y.jsx(
        "div",
        {
          ref: (v) => Q(a.start + c, v),
          className: b,
          style: W,
          children: K(o, c)
        },
        a.start + c
      )) }) })
    }
  );
}
export {
  Rr as Virtualization,
  _r as VirtualizationGrid,
  wr as VirtualizationTable
};
