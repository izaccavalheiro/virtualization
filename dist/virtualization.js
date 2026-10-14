import r, { useRef as I, useState as V, useMemo as tt, useCallback as A, useLayoutEffect as ot, useEffect as N } from "react";
function et(u, g) {
  if (typeof g == "number")
    return {
      total: u * g,
      offsetOf: (o) => o * g,
      sizeOf: () => g,
      startIndexAt: (o) => Math.floor(o / g),
      endIndexAt: (o) => Math.ceil(o / g)
    };
  const m = new Float64Array(u + 1);
  for (let o = 0; o < u; o++)
    m[o + 1] = m[o] + (Math.max(0, g(o)) || 0);
  const L = (o) => Math.min(Math.max(o, 0), u);
  return {
    total: m[u],
    offsetOf: (o) => m[L(o)],
    sizeOf: (o) => m[L(o + 1)] - m[L(o)],
    startIndexAt: (o) => {
      let a = 0, W = u;
      for (; a < W; ) {
        const w = Math.ceil((a + W) / 2);
        m[w] <= o ? a = w : W = w - 1;
      }
      return a;
    },
    endIndexAt: (o) => {
      let a = 0, W = u;
      for (; a < W; ) {
        const w = Math.floor((a + W) / 2);
        m[w] >= o ? W = w : a = w + 1;
      }
      return a;
    }
  };
}
function it({
  dimensions: u,
  estimatedColumnWidth: g = 100,
  estimatedRowHeight: m = 50,
  getColumnWidth: L,
  getRowHeight: o,
  overscanCount: a = 2,
  renderCell: W,
  className: w = "",
  style: f,
  cellClassName: B = "",
  cellStyle: d
}) {
  const M = I(null), [T, q] = V({
    rowStart: 0,
    rowEnd: 10,
    columnStart: 0,
    columnEnd: 10
  }), { rowCount: R, columnCount: x } = u, h = tt(
    () => et(R, o ?? m),
    [R, o, m]
  ), b = tt(
    () => et(x, L ?? g),
    [x, L, g]
  ), s = A(() => {
    if (!M.current) return;
    const {
      scrollTop: l,
      scrollLeft: t,
      clientHeight: e,
      clientWidth: c
    } = M.current, p = h.startIndexAt(l), E = Math.min(
      R - 1,
      h.endIndexAt(l + e)
    ), z = b.startIndexAt(t), P = Math.min(
      x - 1,
      b.endIndexAt(t + c)
    );
    q({
      rowStart: Math.max(0, p - a),
      rowEnd: Math.min(R - 1, E + a),
      columnStart: Math.max(0, z - a),
      columnEnd: Math.min(x - 1, P + a)
    });
  }, [h, b, R, x, a]), O = A(() => {
    requestAnimationFrame(s);
  }, [s]);
  ot(() => {
    s();
  }, [s]);
  const v = h.total, $ = b.total, y = h.offsetOf(T.rowStart), k = b.offsetOf(T.columnStart), F = Math.min(T.rowEnd, R - 1), C = Math.min(T.columnEnd, x - 1), H = [];
  for (let l = T.rowStart; l <= F; l++) {
    const t = [], e = h.sizeOf(l);
    for (let c = T.columnStart; c <= C; c++)
      t.push(
        /* @__PURE__ */ r.createElement(
          "div",
          {
            key: `${l}-${c}`,
            className: B,
            style: {
              ...d,
              display: "inline-block",
              width: b.sizeOf(c),
              height: e,
              verticalAlign: "top"
            }
          },
          W(l, c)
        )
      );
    H.push(
      /* @__PURE__ */ r.createElement(
        "div",
        {
          key: l,
          style: {
            height: e,
            whiteSpace: "nowrap"
          }
        },
        t
      )
    );
  }
  const G = {
    overflow: "auto",
    width: "100%",
    height: "100%",
    ...f
  };
  return N(() => {
    const l = M.current;
    return l == null || l.addEventListener("scroll", O), () => {
      l == null || l.removeEventListener("scroll", O);
    };
  }, [O]), /* @__PURE__ */ r.createElement(
    "div",
    {
      ref: M,
      className: w,
      style: G,
      onScroll: O
    },
    /* @__PURE__ */ r.createElement("div", { style: { height: v, width: $ } }, /* @__PURE__ */ r.createElement("div", { style: { paddingTop: y, paddingLeft: k } }, H))
  );
}
function at({
  data: u,
  Header: g,
  Footer: m,
  Row: L,
  style: o = {},
  headerStyle: a = {},
  footerStyle: W = {},
  rowStyle: w = {},
  tableHeight: f = "400px",
  estimatedRowHeight: B = 40,
  overscanCount: d = 5,
  columnWidths: M,
  footerDistributed: T = !0,
  defaultSortColumn: q = "",
  defaultSortDirection: R = null
}) {
  const [x] = V(0), [h, b] = V(M || []), [s, O] = V({
    column: q,
    direction: R
  }), v = I(null), $ = I(null), y = I(null), k = I(null), F = M ? JSON.stringify(M) : "", C = r.useMemo(
    () => F ? JSON.parse(F) : void 0,
    [F]
  ), H = A(() => {
    var Q, U, X, Z;
    const n = (D) => {
      b((j) => j.join(" ") === D.join(" ") ? j : D);
    };
    if (!C) {
      n([]);
      return;
    }
    if (!$.current || !v.current)
      return;
    const i = v.current.getBoundingClientRect().width, S = ((Q = y.current) == null ? void 0 : Q.offsetWidth) && ((U = y.current) == null ? void 0 : U.clientWidth) && ((X = y.current) == null ? void 0 : X.offsetWidth) - ((Z = y.current) == null ? void 0 : Z.clientWidth) || 0, J = i - S, _ = C.reduce((D, j) => D + parseInt(j, 10), 0);
    if (J > _) {
      const D = J / _, j = C.map((nt) => `${Math.floor(parseInt(nt, 10) * D)}px`);
      n(j);
    } else
      n(C);
  }, [C]);
  N(() => {
    const n = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        H();
      });
    });
    return v.current && n.observe(v.current), () => {
      n.disconnect();
    };
  }, [H]), N(() => {
    requestAnimationFrame(() => {
      H();
    });
  }, [H]);
  const G = h.length > 0 ? h.join(" ") : `repeat(${x}, 1fr)`, l = h.reduce((n, i) => {
    const S = parseInt(i);
    return n + (isNaN(S) ? 0 : S);
  }, 0), t = {
    container: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      ...o
    },
    headerWrapper: {
      position: "relative",
      overflow: "auto",
      borderBottom: "1px solid #e2e8f0",
      backgroundColor: "#fff",
      width: "100%",
      ...a
    },
    bodyWrapper: {
      position: "relative",
      height: f,
      overflow: "auto",
      width: "100%",
      ...w
    },
    footerWrapper: {
      position: "relative",
      overflow: "auto",
      borderTop: "1px solid #e2e8f0",
      backgroundColor: "#fff",
      width: "100%",
      ...W
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: G,
      width: v.current && M ? Math.max(
        v.current.getBoundingClientRect().width,
        M.reduce((n, i) => n + parseInt(i, 10), 0)
      ) + "px" : "100%"
    }
  }, [e, c] = V(0), p = A((n) => {
    c(n), requestAnimationFrame(() => {
      $.current && ($.current.scrollLeft = n), y.current && (y.current.scrollLeft = n), k.current && (k.current.scrollLeft = n);
    });
  }, []), E = A((n) => {
    const i = n.target.scrollLeft;
    i !== e && p(i);
  }, [e, p]);
  N(() => {
    const n = $.current, i = y.current, S = k.current;
    return n == null || n.addEventListener("scroll", E), i == null || i.addEventListener("scroll", E), S == null || S.addEventListener("scroll", E), () => {
      n == null || n.removeEventListener("scroll", E), i == null || i.removeEventListener("scroll", E), S == null || S.removeEventListener("scroll", E);
    };
  }, [E]);
  const z = (n) => {
    O((i) => ({
      column: n,
      direction: i.column === n ? i.direction === "asc" ? "desc" : i.direction === "desc" ? null : "asc" : "asc"
    }));
  }, rt = r.useMemo(() => !s.column || !s.direction ? u : [...u].sort((n, i) => {
    const S = n[s.column], J = i[s.column];
    if (S === J) return 0;
    const _ = S < J ? -1 : 1;
    return s.direction === "asc" ? _ : -_;
  }), [u, s.column, s.direction]).map((n) => ({
    component: ({ index: i }) => /* @__PURE__ */ r.createElement("div", { style: t.gridContainer }, /* @__PURE__ */ r.createElement(L, { item: n, index: i }))
  })), K = I();
  N(() => () => {
    K.current && window.clearTimeout(K.current);
  }, []);
  const Y = {
    horizontalScroll: {
      overflowY: "hidden",
      scrollbarWidth: "none",
      msOverflowStyle: "none"
    }
  };
  return /* @__PURE__ */ r.createElement("div", { ref: v, style: t.container }, /* @__PURE__ */ r.createElement(
    "div",
    {
      ref: $,
      style: {
        ...t.headerWrapper,
        ...Y.horizontalScroll
      }
    },
    /* @__PURE__ */ r.createElement("div", { style: {
      ...t.gridContainer,
      minWidth: l || void 0
    } }, /* @__PURE__ */ r.createElement(g, { onSort: z, sortState: s }))
  ), /* @__PURE__ */ r.createElement(
    "div",
    {
      ref: y,
      style: t.bodyWrapper
    },
    /* @__PURE__ */ r.createElement("div", { style: {
      width: l ? `${l}px` : "100%",
      minWidth: "100%"
    } }, /* @__PURE__ */ r.createElement(
      ct,
      {
        items: rt,
        estimatedItemHeight: B,
        overscanCount: d,
        style: {
          height: f,
          width: "100%"
        }
      }
    ))
  ), m && /* @__PURE__ */ r.createElement(
    "div",
    {
      ref: k,
      style: {
        ...t.footerWrapper,
        ...Y.horizontalScroll
      }
    },
    /* @__PURE__ */ r.createElement("div", { style: {
      ...t.gridContainer,
      minWidth: l || void 0,
      ...T ? { display: "block" } : {}
    } }, /* @__PURE__ */ r.createElement(m, null))
  ));
}
function ct({
  items: u,
  className: g = "",
  itemClassName: m = "",
  style: L,
  itemStyle: o,
  overscanCount: a = 5,
  initialRenderCount: W = 20,
  estimatedItemHeight: w = 100
}) {
  if (!r.useState)
    throw new Error("React hooks are not available. Ensure you are using a compatible version of React.");
  const f = I(null), B = I(/* @__PURE__ */ new Map()), [d, M] = V({
    start: 0,
    end: W
  }), [T, q] = V(0), R = I(0), x = I("down"), h = I(/* @__PURE__ */ new Map()), b = I(0), s = u.length, O = A(
    (t) => B.current.get(t) || w,
    [w]
  ), v = A(() => {
    let t = 0;
    h.current.clear();
    for (let e = 0; e < s; e++)
      h.current.set(e, t), t += O(e);
    return b.current = t, t;
  }, [s, O]), $ = A((t, e) => {
    if (!e) return;
    const c = e.getBoundingClientRect().height;
    if (c > 0 && B.current.get(t) !== c) {
      B.current.set(t, c);
      const p = v();
      q(p);
    }
  }, [v]), y = A((t) => {
    let e = 0, c = s - 1;
    for (; e <= c; ) {
      const p = Math.floor((e + c) / 2), E = h.current.get(p) || 0, z = h.current.get(p + 1) || b.current;
      if (t >= E && t < z)
        return p;
      t < E ? c = p - 1 : e = p + 1;
    }
    return 0;
  }, [s]), k = A(() => {
    if (!f.current) return;
    x.current = f.current.scrollTop > R.current ? "down" : "up", R.current = f.current.scrollTop;
    const e = b.current - (f.current.scrollTop + f.current.clientHeight) < f.current.clientHeight * 1.5, c = f.current.clientHeight, p = x.current === "up" ? c * 1.5 : c, E = e ? f.current.clientHeight * 2 : c, z = Math.max(0, y(f.current.scrollTop - p));
    let P = Math.min(
      s - 1,
      y(f.current.scrollTop + f.current.clientHeight + E)
    );
    e && (P = s - 1), P > s - 4 && (P = s - 1), M({
      start: z,
      end: P + a
    });
  }, [s, y, a]), F = () => {
    requestAnimationFrame(k);
  };
  N(() => {
    B.current.clear();
  }, [u]), N(() => {
    q(v()), k();
  }, [v, u, k]);
  const C = u.slice(d.start, d.end + 1), H = h.current.get(d.start) || 0, G = A((t, e) => {
    try {
      if (typeof t == "string")
        return /* @__PURE__ */ r.createElement("div", { key: `string-${d.start + e}`, dangerouslySetInnerHTML: { __html: t }, "data-testid": `item-${e}` });
      if (r.isValidElement(t))
        return r.cloneElement(t, { key: `element-${d.start + e}` });
      if (typeof t == "function") {
        const c = t;
        return /* @__PURE__ */ r.createElement(r.Fragment, { key: `func-${d.start + e}` }, c({ index: d.start + e }));
      }
      if (t && (t.render || t.component)) {
        const c = t.render || t.component, p = t.props || {};
        return /* @__PURE__ */ r.createElement(r.Fragment, { key: `complex-${d.start + e}` }, c({ ...p, index: d.start + e }));
      }
      return /* @__PURE__ */ r.createElement("div", { key: `default-${d.start + e}`, "data-testid": `item-${e}` }, String(t));
    } catch (c) {
      return console.error("Error rendering virtualization item:", c), /* @__PURE__ */ r.createElement("div", { key: `error-${d.start + e}` }, "Render Error");
    }
  }, [d.start]), l = {
    overflow: "auto",
    ...L
  };
  return /* @__PURE__ */ r.createElement(
    "div",
    {
      ref: f,
      className: g,
      style: l,
      onScroll: F
    },
    /* @__PURE__ */ r.createElement("div", { style: { height: T } }, /* @__PURE__ */ r.createElement("div", { style: { paddingTop: H } }, C.map((t, e) => /* @__PURE__ */ r.createElement(
      "div",
      {
        key: d.start + e,
        ref: (c) => $(d.start + e, c),
        className: m,
        style: o
      },
      G(t, e)
    ))))
  );
}
export {
  ct as Virtualization,
  it as VirtualizationGrid,
  at as VirtualizationTable
};
