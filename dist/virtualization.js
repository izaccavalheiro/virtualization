import r, { useRef as S, useState as T, useCallback as E, useLayoutEffect as Z, useEffect as B } from "react";
function nt({
  dimensions: a,
  estimatedColumnWidth: b = 100,
  estimatedRowHeight: m = 50,
  overscanCount: W = 2,
  renderCell: F,
  className: C = "",
  style: P,
  cellClassName: V = "",
  cellStyle: i
}) {
  const v = S(null), [l, w] = T({
    rowStart: 0,
    rowEnd: 10,
    columnStart: 0,
    columnEnd: 10
  }), M = E(() => {
    if (!v.current) return;
    const {
      scrollTop: o,
      scrollLeft: f,
      clientHeight: u,
      clientWidth: I
    } = v.current, k = Math.floor(o / m), A = Math.min(
      a.rowCount - 1,
      Math.ceil((o + u) / m)
    ), L = Math.floor(f / b), t = Math.min(
      a.columnCount - 1,
      Math.ceil((f + I) / b)
    );
    w({
      rowStart: Math.max(0, k - W),
      rowEnd: Math.min(a.rowCount - 1, A + W),
      columnStart: Math.max(0, L - W),
      columnEnd: Math.min(a.columnCount - 1, t + W)
    });
  }, [a, m, b, W]), R = E(() => {
    requestAnimationFrame(M);
  }, [M]);
  Z(() => {
    M();
  }, [M]);
  const $ = a.rowCount * m, x = a.columnCount * b, y = l.rowStart * m, z = l.columnStart * b, d = [];
  for (let o = l.rowStart; o <= l.rowEnd; o++) {
    const f = [];
    for (let u = l.columnStart; u <= l.columnEnd; u++)
      f.push(
        /* @__PURE__ */ r.createElement(
          "div",
          {
            key: `${o}-${u}`,
            className: V,
            style: {
              ...i,
              display: "inline-block",
              width: b,
              height: m,
              verticalAlign: "top"
            }
          },
          F(o, u)
        )
      );
    d.push(
      /* @__PURE__ */ r.createElement(
        "div",
        {
          key: o,
          style: {
            height: m,
            whiteSpace: "nowrap"
          }
        },
        f
      )
    );
  }
  const H = {
    overflow: "auto",
    width: "100%",
    height: "100%",
    ...P
  };
  return B(() => {
    const o = v.current;
    return o == null || o.addEventListener("scroll", R), () => {
      o == null || o.removeEventListener("scroll", R);
    };
  }, [R]), /* @__PURE__ */ r.createElement(
    "div",
    {
      ref: v,
      className: C,
      style: H,
      onScroll: R
    },
    /* @__PURE__ */ r.createElement("div", { style: { height: $, width: x } }, /* @__PURE__ */ r.createElement("div", { style: { paddingTop: y, paddingLeft: z } }, d))
  );
}
function ot({
  data: a,
  Header: b,
  Footer: m,
  Row: W,
  style: F = {},
  headerStyle: C = {},
  footerStyle: P = {},
  rowStyle: V = {},
  tableHeight: i = "400px",
  estimatedRowHeight: v = 40,
  overscanCount: l = 5,
  columnWidths: w,
  footerDistributed: M = !0,
  defaultSortColumn: R = "",
  defaultSortDirection: $ = null
}) {
  const [x] = T(0), [y, z] = T(w || []), [d, H] = T({
    column: R,
    direction: $
  }), o = S(null), f = S(null), u = S(null), I = S(null), k = E(() => {
    var O, J, K, Q;
    if (!f.current || !o.current || !w)
      return;
    const n = o.current.getBoundingClientRect().width, c = ((O = u.current) == null ? void 0 : O.offsetWidth) && ((J = u.current) == null ? void 0 : J.clientWidth) && ((K = u.current) == null ? void 0 : K.offsetWidth) - ((Q = u.current) == null ? void 0 : Q.clientWidth) || 0, h = n - c, D = w.reduce((_, j) => _ + parseInt(j, 10), 0);
    if (h > D) {
      const _ = h / D, j = w.map((X) => `${Math.floor(parseInt(X, 10) * _)}px`);
      z(j);
    } else
      z(w);
  }, []);
  B(() => {
    const n = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        k();
      });
    });
    return o.current && n.observe(o.current), () => {
      n.disconnect();
    };
  }, [k]), B(() => {
    requestAnimationFrame(() => {
      k();
    });
  }, [k]);
  const A = y.length > 0 ? y.join(" ") : `repeat(${x}, 1fr)`, L = y.reduce((n, c) => {
    const h = parseInt(c);
    return n + (isNaN(h) ? 0 : h);
  }, 0), t = {
    container: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      ...F
    },
    headerWrapper: {
      position: "relative",
      overflow: "auto",
      borderBottom: "1px solid #e2e8f0",
      backgroundColor: "#fff",
      width: "100%",
      ...C
    },
    bodyWrapper: {
      position: "relative",
      height: i,
      overflow: "auto",
      width: "100%",
      ...V
    },
    footerWrapper: {
      position: "relative",
      overflow: "auto",
      borderTop: "1px solid #e2e8f0",
      backgroundColor: "#fff",
      width: "100%",
      ...P
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: A,
      width: o.current && w ? Math.max(
        o.current.getBoundingClientRect().width,
        w.reduce((n, c) => n + parseInt(c, 10), 0)
      ) + "px" : "100%"
    }
  }, [e, s] = T(0), p = E((n) => {
    s(n), requestAnimationFrame(() => {
      f.current && (f.current.scrollLeft = n), u.current && (u.current.scrollLeft = n), I.current && (I.current.scrollLeft = n);
    });
  }, []), g = E((n) => {
    const c = n.target.scrollLeft;
    c !== e && p(c);
  }, [e, p]);
  B(() => {
    const n = f.current, c = u.current, h = I.current;
    return n == null || n.addEventListener("scroll", g), c == null || c.addEventListener("scroll", g), h == null || h.addEventListener("scroll", g), () => {
      n == null || n.removeEventListener("scroll", g), c == null || c.removeEventListener("scroll", g), h == null || h.removeEventListener("scroll", g);
    };
  }, [g]);
  const q = (n) => {
    H((c) => ({
      column: n,
      direction: c.column === n ? c.direction === "asc" ? "desc" : c.direction === "desc" ? null : "asc" : "asc"
    }));
  }, U = r.useMemo(() => !d.column || !d.direction ? a : [...a].sort((n, c) => {
    const h = n[d.column], D = c[d.column];
    if (h === D) return 0;
    const O = h < D ? -1 : 1;
    return d.direction === "asc" ? O : -O;
  }), [a, d.column, d.direction]).map((n) => ({
    component: ({ index: c }) => /* @__PURE__ */ r.createElement("div", { style: t.gridContainer }, /* @__PURE__ */ r.createElement(W, { item: n, index: c }))
  })), G = S();
  B(() => () => {
    G.current && window.clearTimeout(G.current);
  }, []);
  const Y = {
    horizontalScroll: {
      overflowY: "hidden",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      "&::-webkit-scrollbar": {
        display: "none"
      }
    }
  };
  return /* @__PURE__ */ r.createElement("div", { ref: o, style: t.container }, /* @__PURE__ */ r.createElement(
    "div",
    {
      ref: f,
      style: {
        ...t.headerWrapper,
        ...Y.horizontalScroll
      }
    },
    /* @__PURE__ */ r.createElement("div", { style: {
      ...t.gridContainer,
      minWidth: L || void 0
    } }, /* @__PURE__ */ r.createElement(b, { onSort: q, sortState: d }))
  ), /* @__PURE__ */ r.createElement(
    "div",
    {
      ref: u,
      style: t.bodyWrapper
    },
    /* @__PURE__ */ r.createElement("div", { style: {
      width: L ? `${L}px` : "100%",
      minWidth: "100%"
    } }, /* @__PURE__ */ r.createElement(
      tt,
      {
        items: U,
        estimatedItemHeight: v,
        overscanCount: l,
        style: {
          height: i,
          width: "100%"
        }
      }
    ))
  ), m && /* @__PURE__ */ r.createElement(
    "div",
    {
      ref: I,
      style: {
        ...t.footerWrapper,
        ...Y.horizontalScroll
      }
    },
    /* @__PURE__ */ r.createElement("div", { style: {
      ...t.gridContainer,
      minWidth: L || void 0,
      ...M ? { display: "block" } : {}
    } }, /* @__PURE__ */ r.createElement(m, null))
  ));
}
function tt({
  items: a,
  className: b = "",
  itemClassName: m = "",
  style: W,
  itemStyle: F,
  overscanCount: C = 5,
  initialRenderCount: P = 20,
  estimatedItemHeight: V = 100
}) {
  if (!r.useState)
    throw new Error("React hooks are not available. Ensure you are using a compatible version of React.");
  const i = S(null), v = S(/* @__PURE__ */ new Map()), [l, w] = T({
    start: 0,
    end: P
  }), [M, R] = T(0), $ = S(0), x = S("down"), y = S(/* @__PURE__ */ new Map()), z = E(
    (t) => v.current.get(t) || V,
    []
  ), d = E(() => {
    let t = 0;
    y.current.clear();
    for (let e = 0; e < a.length; e++)
      y.current.set(e, t), t += z(e);
    return t;
  }, []), H = E((t, e) => {
    if (!e) return;
    const s = e.getBoundingClientRect().height;
    if (s > 0 && v.current.get(t) !== s) {
      v.current.set(t, s);
      const p = d();
      R(p);
    }
  }, []), o = E((t) => {
    let e = 0, s = a.length - 1;
    for (; e <= s; ) {
      const p = Math.floor((e + s) / 2), g = y.current.get(p) || 0, q = y.current.get(p + 1) || M;
      if (t >= g && t < q)
        return p;
      t < g ? s = p - 1 : e = p + 1;
    }
    return 0;
  }, []), f = E(() => {
    if (!i.current) return;
    x.current = i.current.scrollTop > $.current ? "down" : "up", $.current = i.current.scrollTop;
    const e = M - (i.current.scrollTop + i.current.clientHeight) < i.current.clientHeight * 1.5, s = i.current.clientHeight, p = x.current === "up" ? s * 1.5 : s, g = e ? i.current.clientHeight * 2 : s, q = Math.max(0, o(i.current.scrollTop - p));
    let N = Math.min(
      a.length - 1,
      o(i.current.scrollTop + i.current.clientHeight + g)
    );
    e && (N = a.length - 1), N > a.length - 4 && (N = a.length - 1), w({
      start: q,
      end: N + C
    });
  }, []), u = () => {
    requestAnimationFrame(f);
  };
  B(() => {
    v.current.clear(), d(), f();
  }, [d, a, f]);
  const I = a.slice(l.start, l.end + 1), k = y.current.get(l.start) || 0, A = E((t, e) => {
    try {
      if (typeof t == "string")
        return /* @__PURE__ */ r.createElement("div", { key: `string-${l.start + e}`, dangerouslySetInnerHTML: { __html: t }, "data-testid": `item-${e}` });
      if (r.isValidElement(t))
        return r.cloneElement(t, { key: `element-${l.start + e}` });
      if (typeof t == "function") {
        const s = t;
        return /* @__PURE__ */ r.createElement(r.Fragment, { key: `func-${l.start + e}` }, s({ index: l.start + e }));
      }
      if (t && (t.render || t.component)) {
        const s = t.render || t.component, p = t.props || {};
        return /* @__PURE__ */ r.createElement(r.Fragment, { key: `complex-${l.start + e}` }, s({ ...p, index: l.start + e }));
      }
      return /* @__PURE__ */ r.createElement("div", { key: `default-${l.start + e}`, "data-testid": `item-${e}` }, String(t));
    } catch (s) {
      return console.error("Error rendering virtualization item:", s), /* @__PURE__ */ r.createElement("div", { key: `error-${l.start + e}` }, "Render Error");
    }
  }, []), L = {
    overflow: "auto",
    ...W
  };
  return /* @__PURE__ */ r.createElement(
    "div",
    {
      ref: i,
      className: b,
      style: L,
      onScroll: u
    },
    /* @__PURE__ */ r.createElement("div", { style: { height: M } }, /* @__PURE__ */ r.createElement("div", { style: { paddingTop: k } }, I.map((t, e) => /* @__PURE__ */ r.createElement(
      "div",
      {
        key: l.start + e,
        ref: (s) => H(l.start + e, s),
        className: m,
        style: F
      },
      A(t, e)
    ))))
  );
}
export {
  tt as Virtualization,
  nt as VirtualizationGrid,
  ot as VirtualizationTable
};
