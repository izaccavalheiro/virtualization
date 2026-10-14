import e, { useRef as v, useState as C, useCallback as E, useLayoutEffect as rt, useEffect as x } from "react";
function lt({
  dimensions: d,
  estimatedColumnWidth: S = 100,
  estimatedRowHeight: p = 50,
  overscanCount: b = 2,
  renderCell: q,
  className: z = "",
  style: O,
  cellClassName: B = "",
  cellStyle: u
}) {
  const y = v(null), [c, M] = C({
    rowStart: 0,
    rowEnd: 10,
    columnStart: 0,
    columnEnd: 10
  }), L = E(() => {
    if (!y.current) return;
    const {
      scrollTop: o,
      scrollLeft: m,
      clientHeight: a,
      clientWidth: W
    } = y.current, $ = Math.floor(o / p), I = Math.min(
      d.rowCount - 1,
      Math.ceil((o + a) / p)
    ), T = Math.floor(m / S), D = Math.min(
      d.columnCount - 1,
      Math.ceil((m + W) / S)
    );
    M({
      rowStart: Math.max(0, $ - b),
      rowEnd: Math.min(d.rowCount - 1, I + b),
      columnStart: Math.max(0, T - b),
      columnEnd: Math.min(d.columnCount - 1, D + b)
    });
  }, [d, p, S, b]), R = E(() => {
    requestAnimationFrame(L);
  }, [L]);
  rt(() => {
    L();
  }, [L]);
  const F = d.rowCount * p, P = d.columnCount * S, w = c.rowStart * p, k = c.columnStart * S, s = [];
  for (let o = c.rowStart; o <= c.rowEnd; o++) {
    const m = [];
    for (let a = c.columnStart; a <= c.columnEnd; a++)
      m.push(
        /* @__PURE__ */ e.createElement(
          "div",
          {
            key: `${o}-${a}`,
            className: B,
            style: {
              ...u,
              display: "inline-block",
              width: S,
              height: p,
              verticalAlign: "top"
            }
          },
          q(o, a)
        )
      );
    s.push(
      /* @__PURE__ */ e.createElement(
        "div",
        {
          key: o,
          style: {
            height: p,
            whiteSpace: "nowrap"
          }
        },
        m
      )
    );
  }
  const V = {
    overflow: "auto",
    width: "100%",
    height: "100%",
    ...O
  };
  return x(() => {
    const o = y.current;
    return o == null || o.addEventListener("scroll", R), () => {
      o == null || o.removeEventListener("scroll", R);
    };
  }, [R]), /* @__PURE__ */ e.createElement(
    "div",
    {
      ref: y,
      className: z,
      style: V,
      onScroll: R
    },
    /* @__PURE__ */ e.createElement("div", { style: { height: F, width: P } }, /* @__PURE__ */ e.createElement("div", { style: { paddingTop: w, paddingLeft: k } }, s))
  );
}
function st({
  data: d,
  Header: S,
  Footer: p,
  Row: b,
  style: q = {},
  headerStyle: z = {},
  footerStyle: O = {},
  rowStyle: B = {},
  tableHeight: u = "400px",
  estimatedRowHeight: y = 40,
  overscanCount: c = 5,
  columnWidths: M,
  footerDistributed: L = !0,
  defaultSortColumn: R = "",
  defaultSortDirection: F = null
}) {
  const [P] = C(0), [w, k] = C(M || []), [s, V] = C({
    column: R,
    direction: F
  }), o = v(null), m = v(null), a = v(null), W = v(null), $ = M ? JSON.stringify(M) : "", I = e.useMemo(
    () => $ ? JSON.parse($) : void 0,
    [$]
  ), T = E(() => {
    var Q, U, X, Z;
    const n = (N) => {
      k((A) => A.join(" ") === N.join(" ") ? A : N);
    };
    if (!I) {
      n([]);
      return;
    }
    if (!m.current || !o.current)
      return;
    const l = o.current.getBoundingClientRect().width, h = ((Q = a.current) == null ? void 0 : Q.offsetWidth) && ((U = a.current) == null ? void 0 : U.clientWidth) && ((X = a.current) == null ? void 0 : X.offsetWidth) - ((Z = a.current) == null ? void 0 : Z.clientWidth) || 0, _ = l - h, G = I.reduce((N, A) => N + parseInt(A, 10), 0);
    if (_ > G) {
      const N = _ / G, A = I.map((et) => `${Math.floor(parseInt(et, 10) * N)}px`);
      n(A);
    } else
      n(I);
  }, [I]);
  x(() => {
    const n = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        T();
      });
    });
    return o.current && n.observe(o.current), () => {
      n.disconnect();
    };
  }, [T]), x(() => {
    requestAnimationFrame(() => {
      T();
    });
  }, [T]);
  const D = w.length > 0 ? w.join(" ") : `repeat(${P}, 1fr)`, H = w.reduce((n, l) => {
    const h = parseInt(l);
    return n + (isNaN(h) ? 0 : h);
  }, 0), t = {
    container: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      ...q
    },
    headerWrapper: {
      position: "relative",
      overflow: "auto",
      borderBottom: "1px solid #e2e8f0",
      backgroundColor: "#fff",
      width: "100%",
      ...z
    },
    bodyWrapper: {
      position: "relative",
      height: u,
      overflow: "auto",
      width: "100%",
      ...B
    },
    footerWrapper: {
      position: "relative",
      overflow: "auto",
      borderTop: "1px solid #e2e8f0",
      backgroundColor: "#fff",
      width: "100%",
      ...O
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: D,
      width: o.current && M ? Math.max(
        o.current.getBoundingClientRect().width,
        M.reduce((n, l) => n + parseInt(l, 10), 0)
      ) + "px" : "100%"
    }
  }, [r, i] = C(0), f = E((n) => {
    i(n), requestAnimationFrame(() => {
      m.current && (m.current.scrollLeft = n), a.current && (a.current.scrollLeft = n), W.current && (W.current.scrollLeft = n);
    });
  }, []), g = E((n) => {
    const l = n.target.scrollLeft;
    l !== r && f(l);
  }, [r, f]);
  x(() => {
    const n = m.current, l = a.current, h = W.current;
    return n == null || n.addEventListener("scroll", g), l == null || l.addEventListener("scroll", g), h == null || h.addEventListener("scroll", g), () => {
      n == null || n.removeEventListener("scroll", g), l == null || l.removeEventListener("scroll", g), h == null || h.removeEventListener("scroll", g);
    };
  }, [g]);
  const j = (n) => {
    V((l) => ({
      column: n,
      direction: l.column === n ? l.direction === "asc" ? "desc" : l.direction === "desc" ? null : "asc" : "asc"
    }));
  }, tt = e.useMemo(() => !s.column || !s.direction ? d : [...d].sort((n, l) => {
    const h = n[s.column], _ = l[s.column];
    if (h === _) return 0;
    const G = h < _ ? -1 : 1;
    return s.direction === "asc" ? G : -G;
  }), [d, s.column, s.direction]).map((n) => ({
    component: ({ index: l }) => /* @__PURE__ */ e.createElement("div", { style: t.gridContainer }, /* @__PURE__ */ e.createElement(b, { item: n, index: l }))
  })), K = v();
  x(() => () => {
    K.current && window.clearTimeout(K.current);
  }, []);
  const Y = {
    horizontalScroll: {
      overflowY: "hidden",
      scrollbarWidth: "none",
      msOverflowStyle: "none"
    }
  };
  return /* @__PURE__ */ e.createElement("div", { ref: o, style: t.container }, /* @__PURE__ */ e.createElement(
    "div",
    {
      ref: m,
      style: {
        ...t.headerWrapper,
        ...Y.horizontalScroll
      }
    },
    /* @__PURE__ */ e.createElement("div", { style: {
      ...t.gridContainer,
      minWidth: H || void 0
    } }, /* @__PURE__ */ e.createElement(S, { onSort: j, sortState: s }))
  ), /* @__PURE__ */ e.createElement(
    "div",
    {
      ref: a,
      style: t.bodyWrapper
    },
    /* @__PURE__ */ e.createElement("div", { style: {
      width: H ? `${H}px` : "100%",
      minWidth: "100%"
    } }, /* @__PURE__ */ e.createElement(
      nt,
      {
        items: tt,
        estimatedItemHeight: y,
        overscanCount: c,
        style: {
          height: u,
          width: "100%"
        }
      }
    ))
  ), p && /* @__PURE__ */ e.createElement(
    "div",
    {
      ref: W,
      style: {
        ...t.footerWrapper,
        ...Y.horizontalScroll
      }
    },
    /* @__PURE__ */ e.createElement("div", { style: {
      ...t.gridContainer,
      minWidth: H || void 0,
      ...L ? { display: "block" } : {}
    } }, /* @__PURE__ */ e.createElement(p, null))
  ));
}
function nt({
  items: d,
  className: S = "",
  itemClassName: p = "",
  style: b,
  itemStyle: q,
  overscanCount: z = 5,
  initialRenderCount: O = 20,
  estimatedItemHeight: B = 100
}) {
  if (!e.useState)
    throw new Error("React hooks are not available. Ensure you are using a compatible version of React.");
  const u = v(null), y = v(/* @__PURE__ */ new Map()), [c, M] = C({
    start: 0,
    end: O
  }), [L, R] = C(0), F = v(0), P = v("down"), w = v(/* @__PURE__ */ new Map()), k = v(0), s = d.length, V = E(
    (t) => y.current.get(t) || B,
    [B]
  ), o = E(() => {
    let t = 0;
    w.current.clear();
    for (let r = 0; r < s; r++)
      w.current.set(r, t), t += V(r);
    return k.current = t, t;
  }, [s, V]), m = E((t, r) => {
    if (!r) return;
    const i = r.getBoundingClientRect().height;
    if (i > 0 && y.current.get(t) !== i) {
      y.current.set(t, i);
      const f = o();
      R(f);
    }
  }, [o]), a = E((t) => {
    let r = 0, i = s - 1;
    for (; r <= i; ) {
      const f = Math.floor((r + i) / 2), g = w.current.get(f) || 0, j = w.current.get(f + 1) || k.current;
      if (t >= g && t < j)
        return f;
      t < g ? i = f - 1 : r = f + 1;
    }
    return 0;
  }, [s]), W = E(() => {
    if (!u.current) return;
    P.current = u.current.scrollTop > F.current ? "down" : "up", F.current = u.current.scrollTop;
    const r = k.current - (u.current.scrollTop + u.current.clientHeight) < u.current.clientHeight * 1.5, i = u.current.clientHeight, f = P.current === "up" ? i * 1.5 : i, g = r ? u.current.clientHeight * 2 : i, j = Math.max(0, a(u.current.scrollTop - f));
    let J = Math.min(
      s - 1,
      a(u.current.scrollTop + u.current.clientHeight + g)
    );
    r && (J = s - 1), J > s - 4 && (J = s - 1), M({
      start: j,
      end: J + z
    });
  }, [s, a, z]), $ = () => {
    requestAnimationFrame(W);
  };
  x(() => {
    y.current.clear();
  }, [d]), x(() => {
    R(o()), W();
  }, [o, d, W]);
  const I = d.slice(c.start, c.end + 1), T = w.current.get(c.start) || 0, D = E((t, r) => {
    try {
      if (typeof t == "string")
        return /* @__PURE__ */ e.createElement("div", { key: `string-${c.start + r}`, dangerouslySetInnerHTML: { __html: t }, "data-testid": `item-${r}` });
      if (e.isValidElement(t))
        return e.cloneElement(t, { key: `element-${c.start + r}` });
      if (typeof t == "function") {
        const i = t;
        return /* @__PURE__ */ e.createElement(e.Fragment, { key: `func-${c.start + r}` }, i({ index: c.start + r }));
      }
      if (t && (t.render || t.component)) {
        const i = t.render || t.component, f = t.props || {};
        return /* @__PURE__ */ e.createElement(e.Fragment, { key: `complex-${c.start + r}` }, i({ ...f, index: c.start + r }));
      }
      return /* @__PURE__ */ e.createElement("div", { key: `default-${c.start + r}`, "data-testid": `item-${r}` }, String(t));
    } catch (i) {
      return console.error("Error rendering virtualization item:", i), /* @__PURE__ */ e.createElement("div", { key: `error-${c.start + r}` }, "Render Error");
    }
  }, [c.start]), H = {
    overflow: "auto",
    ...b
  };
  return /* @__PURE__ */ e.createElement(
    "div",
    {
      ref: u,
      className: S,
      style: H,
      onScroll: $
    },
    /* @__PURE__ */ e.createElement("div", { style: { height: L } }, /* @__PURE__ */ e.createElement("div", { style: { paddingTop: T } }, I.map((t, r) => /* @__PURE__ */ e.createElement(
      "div",
      {
        key: c.start + r,
        ref: (i) => m(c.start + r, i),
        className: p,
        style: q
      },
      D(t, r)
    ))))
  );
}
export {
  nt as Virtualization,
  lt as VirtualizationGrid,
  st as VirtualizationTable
};
