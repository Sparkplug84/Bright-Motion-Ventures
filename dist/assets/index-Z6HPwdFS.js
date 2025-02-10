;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r)
  new MutationObserver((r) => {
    for (const i of r)
      if (i.type === 'childList')
        for (const o of i.addedNodes) o.tagName === 'LINK' && o.rel === 'modulepreload' && s(o)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(r) {
    const i = {}
    return (
      r.integrity && (i.integrity = r.integrity),
      r.referrerPolicy && (i.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : r.crossOrigin === 'anonymous'
          ? (i.credentials = 'omit')
          : (i.credentials = 'same-origin'),
      i
    )
  }
  function s(r) {
    if (r.ep) return
    r.ep = !0
    const i = n(r)
    fetch(r.href, i)
  }
})()
/**
 * @vue/shared v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function ns(e) {
  const t = Object.create(null)
  for (const n of e.split(',')) t[n] = 1
  return (n) => n in t
}
const Z = {},
  wt = [],
  He = () => {},
  $i = () => !1,
  vn = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  ss = (e) => e.startsWith('onUpdate:'),
  fe = Object.assign,
  rs = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  Hi = Object.prototype.hasOwnProperty,
  W = (e, t) => Hi.call(e, t),
  $ = Array.isArray,
  Lt = (e) => yn(e) === '[object Map]',
  Bi = (e) => yn(e) === '[object Set]',
  B = (e) => typeof e == 'function',
  ie = (e) => typeof e == 'string',
  At = (e) => typeof e == 'symbol',
  se = (e) => e !== null && typeof e == 'object',
  xr = (e) => (se(e) || B(e)) && B(e.then) && B(e.catch),
  Ui = Object.prototype.toString,
  yn = (e) => Ui.call(e),
  Vi = (e) => yn(e).slice(8, -1),
  Ki = (e) => yn(e) === '[object Object]',
  is = (e) => ie(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  Nt = ns(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
  ),
  xn = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  ki = /-(\w)/g,
  ot = xn((e) => e.replace(ki, (t, n) => (n ? n.toUpperCase() : ''))),
  Wi = /\B([A-Z])/g,
  gt = xn((e) => e.replace(Wi, '-$1').toLowerCase()),
  wr = xn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  On = xn((e) => (e ? `on${wr(e)}` : '')),
  it = (e, t) => !Object.is(e, t),
  Tn = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t)
  },
  Er = (e, t, n, s = !1) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, writable: s, value: n })
  },
  qi = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  }
let Os
const wn = () =>
  Os ||
  (Os =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : {})
function os(e) {
  if ($(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = ie(s) ? Yi(s) : os(s)
      if (r) for (const i in r) t[i] = r[i]
    }
    return t
  } else if (ie(e) || se(e)) return e
}
const Gi = /;(?![^(]*\))/g,
  zi = /:([^]+)/,
  Qi = /\/\*[^]*?\*\//g
function Yi(e) {
  const t = {}
  return (
    e
      .replace(Qi, '')
      .split(Gi)
      .forEach((n) => {
        if (n) {
          const s = n.split(zi)
          s.length > 1 && (t[s[0].trim()] = s[1].trim())
        }
      }),
    t
  )
}
function ve(e) {
  let t = ''
  if (ie(e)) t = e
  else if ($(e))
    for (let n = 0; n < e.length; n++) {
      const s = ve(e[n])
      s && (t += s + ' ')
    }
  else if (se(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const Ji = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  Xi = ns(Ji)
function Sr(e) {
  return !!e || e === ''
}
/**
 * @vue/reactivity v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let ye
class Rr {
  constructor(t = !1) {
    ;(this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this._isPaused = !1),
      (this.parent = ye),
      !t && ye && (this.index = (ye.scopes || (ye.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  pause() {
    if (this._active) {
      this._isPaused = !0
      let t, n
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause()
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause()
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1
      let t, n
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume()
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume()
    }
  }
  run(t) {
    if (this._active) {
      const n = ye
      try {
        return (ye = this), t()
      } finally {
        ye = n
      }
    }
  }
  on() {
    ye = this
  }
  off() {
    ye = this.parent
  }
  stop(t) {
    if (this._active) {
      this._active = !1
      let n, s
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop()
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]()
      if (((this.cleanups.length = 0), this.scopes)) {
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0)
        this.scopes.length = 0
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop()
        r && r !== this && ((this.parent.scopes[this.index] = r), (r.index = this.index))
      }
      this.parent = void 0
    }
  }
}
function Zi(e) {
  return new Rr(e)
}
function eo() {
  return ye
}
let X
const In = new WeakSet()
class Pr {
  constructor(t) {
    ;(this.fn = t),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      ye && ye.active && ye.effects.push(this)
  }
  pause() {
    this.flags |= 64
  }
  resume() {
    this.flags & 64 && ((this.flags &= -65), In.has(this) && (In.delete(this), this.trigger()))
  }
  notify() {
    ;(this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || Ar(this)
  }
  run() {
    if (!(this.flags & 1)) return this.fn()
    ;(this.flags |= 2), Ts(this), Or(this)
    const t = X,
      n = Se
    ;(X = this), (Se = !0)
    try {
      return this.fn()
    } finally {
      Tr(this), (X = t), (Se = n), (this.flags &= -3)
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) fs(t)
      ;(this.deps = this.depsTail = void 0),
        Ts(this),
        this.onStop && this.onStop(),
        (this.flags &= -2)
    }
  }
  trigger() {
    this.flags & 64 ? In.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty()
  }
  runIfDirty() {
    Vn(this) && this.run()
  }
  get dirty() {
    return Vn(this)
  }
}
let Cr = 0,
  Dt,
  $t
function Ar(e, t = !1) {
  if (((e.flags |= 8), t)) {
    ;(e.next = $t), ($t = e)
    return
  }
  ;(e.next = Dt), (Dt = e)
}
function ls() {
  Cr++
}
function cs() {
  if (--Cr > 0) return
  if ($t) {
    let t = $t
    for ($t = void 0; t; ) {
      const n = t.next
      ;(t.next = void 0), (t.flags &= -9), (t = n)
    }
  }
  let e
  for (; Dt; ) {
    let t = Dt
    for (Dt = void 0; t; ) {
      const n = t.next
      if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
        try {
          t.trigger()
        } catch (s) {
          e || (e = s)
        }
      t = n
    }
  }
  if (e) throw e
}
function Or(e) {
  for (let t = e.deps; t; t = t.nextDep)
    (t.version = -1), (t.prevActiveLink = t.dep.activeLink), (t.dep.activeLink = t)
}
function Tr(e) {
  let t,
    n = e.depsTail,
    s = n
  for (; s; ) {
    const r = s.prevDep
    s.version === -1 ? (s === n && (n = r), fs(s), to(s)) : (t = s),
      (s.dep.activeLink = s.prevActiveLink),
      (s.prevActiveLink = void 0),
      (s = r)
  }
  ;(e.deps = t), (e.depsTail = n)
}
function Vn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (
      t.dep.version !== t.version ||
      (t.dep.computed && (Ir(t.dep.computed) || t.dep.version !== t.version))
    )
      return !0
  return !!e._dirty
}
function Ir(e) {
  if ((e.flags & 4 && !(e.flags & 16)) || ((e.flags &= -17), e.globalVersion === Wt)) return
  e.globalVersion = Wt
  const t = e.dep
  if (((e.flags |= 2), t.version > 0 && !e.isSSR && e.deps && !Vn(e))) {
    e.flags &= -3
    return
  }
  const n = X,
    s = Se
  ;(X = e), (Se = !0)
  try {
    Or(e)
    const r = e.fn(e._value)
    ;(t.version === 0 || it(r, e._value)) && ((e._value = r), t.version++)
  } catch (r) {
    throw (t.version++, r)
  } finally {
    ;(X = n), (Se = s), Tr(e), (e.flags &= -3)
  }
}
function fs(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e
  if (
    (s && ((s.nextSub = r), (e.prevSub = void 0)),
    r && ((r.prevSub = s), (e.nextSub = void 0)),
    n.subs === e && ((n.subs = s), !s && n.computed))
  ) {
    n.computed.flags &= -5
    for (let i = n.computed.deps; i; i = i.nextDep) fs(i, !0)
  }
  !t && !--n.sc && n.map && n.map.delete(n.key)
}
function to(e) {
  const { prevDep: t, nextDep: n } = e
  t && ((t.nextDep = n), (e.prevDep = void 0)), n && ((n.prevDep = t), (e.nextDep = void 0))
}
let Se = !0
const Mr = []
function lt() {
  Mr.push(Se), (Se = !1)
}
function ct() {
  const e = Mr.pop()
  Se = e === void 0 ? !0 : e
}
function Ts(e) {
  const { cleanup: t } = e
  if (((e.cleanup = void 0), t)) {
    const n = X
    X = void 0
    try {
      t()
    } finally {
      X = n
    }
  }
}
let Wt = 0
class no {
  constructor(t, n) {
    ;(this.sub = t),
      (this.dep = n),
      (this.version = n.version),
      (this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0)
  }
}
class us {
  constructor(t) {
    ;(this.computed = t),
      (this.version = 0),
      (this.activeLink = void 0),
      (this.subs = void 0),
      (this.map = void 0),
      (this.key = void 0),
      (this.sc = 0)
  }
  track(t) {
    if (!X || !Se || X === this.computed) return
    let n = this.activeLink
    if (n === void 0 || n.sub !== X)
      (n = this.activeLink = new no(X, this)),
        X.deps
          ? ((n.prevDep = X.depsTail), (X.depsTail.nextDep = n), (X.depsTail = n))
          : (X.deps = X.depsTail = n),
        Fr(n)
    else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
      const s = n.nextDep
      ;(s.prevDep = n.prevDep),
        n.prevDep && (n.prevDep.nextDep = s),
        (n.prevDep = X.depsTail),
        (n.nextDep = void 0),
        (X.depsTail.nextDep = n),
        (X.depsTail = n),
        X.deps === n && (X.deps = s)
    }
    return n
  }
  trigger(t) {
    this.version++, Wt++, this.notify(t)
  }
  notify(t) {
    ls()
    try {
      for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify()
    } finally {
      cs()
    }
  }
}
function Fr(e) {
  if ((e.dep.sc++, e.sub.flags & 4)) {
    const t = e.dep.computed
    if (t && !e.dep.subs) {
      t.flags |= 20
      for (let s = t.deps; s; s = s.nextDep) Fr(s)
    }
    const n = e.dep.subs
    n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e)
  }
}
const Kn = new WeakMap(),
  ht = Symbol(''),
  kn = Symbol(''),
  qt = Symbol('')
function le(e, t, n) {
  if (Se && X) {
    let s = Kn.get(e)
    s || Kn.set(e, (s = new Map()))
    let r = s.get(n)
    r || (s.set(n, (r = new us())), (r.map = s), (r.key = n)), r.track()
  }
}
function Qe(e, t, n, s, r, i) {
  const o = Kn.get(e)
  if (!o) {
    Wt++
    return
  }
  const c = (l) => {
    l && l.trigger()
  }
  if ((ls(), t === 'clear')) o.forEach(c)
  else {
    const l = $(e),
      h = l && is(n)
    if (l && n === 'length') {
      const a = Number(s)
      o.forEach((d, g) => {
        ;(g === 'length' || g === qt || (!At(g) && g >= a)) && c(d)
      })
    } else
      switch (((n !== void 0 || o.has(void 0)) && c(o.get(n)), h && c(o.get(qt)), t)) {
        case 'add':
          l ? h && c(o.get('length')) : (c(o.get(ht)), Lt(e) && c(o.get(kn)))
          break
        case 'delete':
          l || (c(o.get(ht)), Lt(e) && c(o.get(kn)))
          break
        case 'set':
          Lt(e) && c(o.get(ht))
          break
      }
  }
  cs()
}
function vt(e) {
  const t = k(e)
  return t === e ? t : (le(t, 'iterate', qt), Re(e) ? t : t.map(ae))
}
function as(e) {
  return le((e = k(e)), 'iterate', qt), e
}
const so = {
  __proto__: null,
  [Symbol.iterator]() {
    return Mn(this, Symbol.iterator, ae)
  },
  concat(...e) {
    return vt(this).concat(...e.map((t) => ($(t) ? vt(t) : t)))
  },
  entries() {
    return Mn(this, 'entries', (e) => ((e[1] = ae(e[1])), e))
  },
  every(e, t) {
    return Ke(this, 'every', e, t, void 0, arguments)
  },
  filter(e, t) {
    return Ke(this, 'filter', e, t, (n) => n.map(ae), arguments)
  },
  find(e, t) {
    return Ke(this, 'find', e, t, ae, arguments)
  },
  findIndex(e, t) {
    return Ke(this, 'findIndex', e, t, void 0, arguments)
  },
  findLast(e, t) {
    return Ke(this, 'findLast', e, t, ae, arguments)
  },
  findLastIndex(e, t) {
    return Ke(this, 'findLastIndex', e, t, void 0, arguments)
  },
  forEach(e, t) {
    return Ke(this, 'forEach', e, t, void 0, arguments)
  },
  includes(...e) {
    return Fn(this, 'includes', e)
  },
  indexOf(...e) {
    return Fn(this, 'indexOf', e)
  },
  join(e) {
    return vt(this).join(e)
  },
  lastIndexOf(...e) {
    return Fn(this, 'lastIndexOf', e)
  },
  map(e, t) {
    return Ke(this, 'map', e, t, void 0, arguments)
  },
  pop() {
    return It(this, 'pop')
  },
  push(...e) {
    return It(this, 'push', e)
  },
  reduce(e, ...t) {
    return Is(this, 'reduce', e, t)
  },
  reduceRight(e, ...t) {
    return Is(this, 'reduceRight', e, t)
  },
  shift() {
    return It(this, 'shift')
  },
  some(e, t) {
    return Ke(this, 'some', e, t, void 0, arguments)
  },
  splice(...e) {
    return It(this, 'splice', e)
  },
  toReversed() {
    return vt(this).toReversed()
  },
  toSorted(e) {
    return vt(this).toSorted(e)
  },
  toSpliced(...e) {
    return vt(this).toSpliced(...e)
  },
  unshift(...e) {
    return It(this, 'unshift', e)
  },
  values() {
    return Mn(this, 'values', ae)
  },
}
function Mn(e, t, n) {
  const s = as(e),
    r = s[t]()
  return (
    s !== e &&
      !Re(e) &&
      ((r._next = r.next),
      (r.next = () => {
        const i = r._next()
        return i.value && (i.value = n(i.value)), i
      })),
    r
  )
}
const ro = Array.prototype
function Ke(e, t, n, s, r, i) {
  const o = as(e),
    c = o !== e && !Re(e),
    l = o[t]
  if (l !== ro[t]) {
    const d = l.apply(e, i)
    return c ? ae(d) : d
  }
  let h = n
  o !== e &&
    (c
      ? (h = function (d, g) {
          return n.call(this, ae(d), g, e)
        })
      : n.length > 2 &&
        (h = function (d, g) {
          return n.call(this, d, g, e)
        }))
  const a = l.call(o, h, s)
  return c && r ? r(a) : a
}
function Is(e, t, n, s) {
  const r = as(e)
  let i = n
  return (
    r !== e &&
      (Re(e)
        ? n.length > 3 &&
          (i = function (o, c, l) {
            return n.call(this, o, c, l, e)
          })
        : (i = function (o, c, l) {
            return n.call(this, o, ae(c), l, e)
          })),
    r[t](i, ...s)
  )
}
function Fn(e, t, n) {
  const s = k(e)
  le(s, 'iterate', qt)
  const r = s[t](...n)
  return (r === -1 || r === !1) && ps(n[0]) ? ((n[0] = k(n[0])), s[t](...n)) : r
}
function It(e, t, n = []) {
  lt(), ls()
  const s = k(e)[t].apply(e, n)
  return cs(), ct(), s
}
const io = ns('__proto__,__v_isRef,__isVue'),
  jr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(At),
  )
function oo(e) {
  At(e) || (e = String(e))
  const t = k(this)
  return le(t, 'has', e), t.hasOwnProperty(e)
}
class Lr {
  constructor(t = !1, n = !1) {
    ;(this._isReadonly = t), (this._isShallow = n)
  }
  get(t, n, s) {
    if (n === '__v_skip') return t.__v_skip
    const r = this._isReadonly,
      i = this._isShallow
    if (n === '__v_isReactive') return !r
    if (n === '__v_isReadonly') return r
    if (n === '__v_isShallow') return i
    if (n === '__v_raw')
      return s === (r ? (i ? bo : Hr) : i ? $r : Dr).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(s)
        ? t
        : void 0
    const o = $(t)
    if (!r) {
      let l
      if (o && (l = so[n])) return l
      if (n === 'hasOwnProperty') return oo
    }
    const c = Reflect.get(t, n, ce(t) ? t : s)
    return (At(n) ? jr.has(n) : io(n)) || (r || le(t, 'get', n), i)
      ? c
      : ce(c)
        ? o && is(n)
          ? c
          : c.value
        : se(c)
          ? r
            ? Ur(c)
            : En(c)
          : c
  }
}
class Nr extends Lr {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, n, s, r) {
    let i = t[n]
    if (!this._isShallow) {
      const l = pt(i)
      if ((!Re(s) && !pt(s) && ((i = k(i)), (s = k(s))), !$(t) && ce(i) && !ce(s)))
        return l ? !1 : ((i.value = s), !0)
    }
    const o = $(t) && is(n) ? Number(n) < t.length : W(t, n),
      c = Reflect.set(t, n, s, ce(t) ? t : r)
    return t === k(r) && (o ? it(s, i) && Qe(t, 'set', n, s) : Qe(t, 'add', n, s)), c
  }
  deleteProperty(t, n) {
    const s = W(t, n)
    t[n]
    const r = Reflect.deleteProperty(t, n)
    return r && s && Qe(t, 'delete', n, void 0), r
  }
  has(t, n) {
    const s = Reflect.has(t, n)
    return (!At(n) || !jr.has(n)) && le(t, 'has', n), s
  }
  ownKeys(t) {
    return le(t, 'iterate', $(t) ? 'length' : ht), Reflect.ownKeys(t)
  }
}
class lo extends Lr {
  constructor(t = !1) {
    super(!0, t)
  }
  set(t, n) {
    return !0
  }
  deleteProperty(t, n) {
    return !0
  }
}
const co = new Nr(),
  fo = new lo(),
  uo = new Nr(!0)
const Wn = (e) => e,
  sn = (e) => Reflect.getPrototypeOf(e)
function ao(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      i = k(r),
      o = Lt(i),
      c = e === 'entries' || (e === Symbol.iterator && o),
      l = e === 'keys' && o,
      h = r[e](...s),
      a = n ? Wn : t ? qn : ae
    return (
      !t && le(i, 'iterate', l ? kn : ht),
      {
        next() {
          const { value: d, done: g } = h.next()
          return g ? { value: d, done: g } : { value: c ? [a(d[0]), a(d[1])] : a(d), done: g }
        },
        [Symbol.iterator]() {
          return this
        },
      }
    )
  }
}
function rn(e) {
  return function (...t) {
    return e === 'delete' ? !1 : e === 'clear' ? void 0 : this
  }
}
function ho(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw,
        o = k(i),
        c = k(r)
      e || (it(r, c) && le(o, 'get', r), le(o, 'get', c))
      const { has: l } = sn(o),
        h = t ? Wn : e ? qn : ae
      if (l.call(o, r)) return h(i.get(r))
      if (l.call(o, c)) return h(i.get(c))
      i !== o && i.get(r)
    },
    get size() {
      const r = this.__v_raw
      return !e && le(k(r), 'iterate', ht), Reflect.get(r, 'size', r)
    },
    has(r) {
      const i = this.__v_raw,
        o = k(i),
        c = k(r)
      return (
        e || (it(r, c) && le(o, 'has', r), le(o, 'has', c)),
        r === c ? i.has(r) : i.has(r) || i.has(c)
      )
    },
    forEach(r, i) {
      const o = this,
        c = o.__v_raw,
        l = k(c),
        h = t ? Wn : e ? qn : ae
      return !e && le(l, 'iterate', ht), c.forEach((a, d) => r.call(i, h(a), h(d), o))
    },
  }
  return (
    fe(
      n,
      e
        ? { add: rn('add'), set: rn('set'), delete: rn('delete'), clear: rn('clear') }
        : {
            add(r) {
              !t && !Re(r) && !pt(r) && (r = k(r))
              const i = k(this)
              return sn(i).has.call(i, r) || (i.add(r), Qe(i, 'add', r, r)), this
            },
            set(r, i) {
              !t && !Re(i) && !pt(i) && (i = k(i))
              const o = k(this),
                { has: c, get: l } = sn(o)
              let h = c.call(o, r)
              h || ((r = k(r)), (h = c.call(o, r)))
              const a = l.call(o, r)
              return o.set(r, i), h ? it(i, a) && Qe(o, 'set', r, i) : Qe(o, 'add', r, i), this
            },
            delete(r) {
              const i = k(this),
                { has: o, get: c } = sn(i)
              let l = o.call(i, r)
              l || ((r = k(r)), (l = o.call(i, r))), c && c.call(i, r)
              const h = i.delete(r)
              return l && Qe(i, 'delete', r, void 0), h
            },
            clear() {
              const r = k(this),
                i = r.size !== 0,
                o = r.clear()
              return i && Qe(r, 'clear', void 0, void 0), o
            },
          },
    ),
    ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
      n[r] = ao(r, e, t)
    }),
    n
  )
}
function ds(e, t) {
  const n = ho(e, t)
  return (s, r, i) =>
    r === '__v_isReactive'
      ? !e
      : r === '__v_isReadonly'
        ? e
        : r === '__v_raw'
          ? s
          : Reflect.get(W(n, r) && r in s ? n : s, r, i)
}
const po = { get: ds(!1, !1) },
  go = { get: ds(!1, !0) },
  mo = { get: ds(!0, !1) }
const Dr = new WeakMap(),
  $r = new WeakMap(),
  Hr = new WeakMap(),
  bo = new WeakMap()
function _o(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2
    default:
      return 0
  }
}
function vo(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : _o(Vi(e))
}
function En(e) {
  return pt(e) ? e : hs(e, !1, co, po, Dr)
}
function Br(e) {
  return hs(e, !1, uo, go, $r)
}
function Ur(e) {
  return hs(e, !0, fo, mo, Hr)
}
function hs(e, t, n, s, r) {
  if (!se(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const i = r.get(e)
  if (i) return i
  const o = vo(e)
  if (o === 0) return e
  const c = new Proxy(e, o === 2 ? s : n)
  return r.set(e, c), c
}
function Ht(e) {
  return pt(e) ? Ht(e.__v_raw) : !!(e && e.__v_isReactive)
}
function pt(e) {
  return !!(e && e.__v_isReadonly)
}
function Re(e) {
  return !!(e && e.__v_isShallow)
}
function ps(e) {
  return e ? !!e.__v_raw : !1
}
function k(e) {
  const t = e && e.__v_raw
  return t ? k(t) : e
}
function Vr(e) {
  return !W(e, '__v_skip') && Object.isExtensible(e) && Er(e, '__v_skip', !0), e
}
const ae = (e) => (se(e) ? En(e) : e),
  qn = (e) => (se(e) ? Ur(e) : e)
function ce(e) {
  return e ? e.__v_isRef === !0 : !1
}
function gs(e) {
  return Kr(e, !1)
}
function yo(e) {
  return Kr(e, !0)
}
function Kr(e, t) {
  return ce(e) ? e : new xo(e, t)
}
class xo {
  constructor(t, n) {
    ;(this.dep = new us()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = n ? t : k(t)),
      (this._value = n ? t : ae(t)),
      (this.__v_isShallow = n)
  }
  get value() {
    return this.dep.track(), this._value
  }
  set value(t) {
    const n = this._rawValue,
      s = this.__v_isShallow || Re(t) || pt(t)
    ;(t = s ? t : k(t)),
      it(t, n) && ((this._rawValue = t), (this._value = s ? t : ae(t)), this.dep.trigger())
  }
}
function te(e) {
  return ce(e) ? e.value : e
}
const wo = {
  get: (e, t, n) => (t === '__v_raw' ? e : te(Reflect.get(e, t, n))),
  set: (e, t, n, s) => {
    const r = e[t]
    return ce(r) && !ce(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s)
  },
}
function kr(e) {
  return Ht(e) ? e : new Proxy(e, wo)
}
class Eo {
  constructor(t, n, s) {
    ;(this.fn = t),
      (this.setter = n),
      (this._value = void 0),
      (this.dep = new us(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = Wt - 1),
      (this.next = void 0),
      (this.effect = this),
      (this.__v_isReadonly = !n),
      (this.isSSR = s)
  }
  notify() {
    if (((this.flags |= 16), !(this.flags & 8) && X !== this)) return Ar(this, !0), !0
  }
  get value() {
    const t = this.dep.track()
    return Ir(this), t && (t.version = this.dep.version), this._value
  }
  set value(t) {
    this.setter && this.setter(t)
  }
}
function So(e, t, n = !1) {
  let s, r
  return B(e) ? (s = e) : ((s = e.get), (r = e.set)), new Eo(s, r, n)
}
const on = {},
  dn = new WeakMap()
let dt
function Ro(e, t = !1, n = dt) {
  if (n) {
    let s = dn.get(n)
    s || dn.set(n, (s = [])), s.push(e)
  }
}
function Po(e, t, n = Z) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: c, call: l } = n,
    h = (T) => (r ? T : Re(T) || r === !1 || r === 0 ? rt(T, 1) : rt(T))
  let a,
    d,
    g,
    m,
    A = !1,
    O = !1
  if (
    (ce(e)
      ? ((d = () => e.value), (A = Re(e)))
      : Ht(e)
        ? ((d = () => h(e)), (A = !0))
        : $(e)
          ? ((O = !0),
            (A = e.some((T) => Ht(T) || Re(T))),
            (d = () =>
              e.map((T) => {
                if (ce(T)) return T.value
                if (Ht(T)) return h(T)
                if (B(T)) return l ? l(T, 2) : T()
              })))
          : B(e)
            ? t
              ? (d = l ? () => l(e, 2) : e)
              : (d = () => {
                  if (g) {
                    lt()
                    try {
                      g()
                    } finally {
                      ct()
                    }
                  }
                  const T = dt
                  dt = a
                  try {
                    return l ? l(e, 3, [m]) : e(m)
                  } finally {
                    dt = T
                  }
                })
            : (d = He),
    t && r)
  ) {
    const T = d,
      z = r === !0 ? 1 / 0 : r
    d = () => rt(T(), z)
  }
  const H = eo(),
    j = () => {
      a.stop(), H && H.active && rs(H.effects, a)
    }
  if (i && t) {
    const T = t
    t = (...z) => {
      T(...z), j()
    }
  }
  let M = O ? new Array(e.length).fill(on) : on
  const L = (T) => {
    if (!(!(a.flags & 1) || (!a.dirty && !T)))
      if (t) {
        const z = a.run()
        if (r || A || (O ? z.some((oe, ee) => it(oe, M[ee])) : it(z, M))) {
          g && g()
          const oe = dt
          dt = a
          try {
            const ee = [z, M === on ? void 0 : O && M[0] === on ? [] : M, m]
            l ? l(t, 3, ee) : t(...ee), (M = z)
          } finally {
            dt = oe
          }
        }
      } else a.run()
  }
  return (
    c && c(L),
    (a = new Pr(d)),
    (a.scheduler = o ? () => o(L, !1) : L),
    (m = (T) => Ro(T, !1, a)),
    (g = a.onStop =
      () => {
        const T = dn.get(a)
        if (T) {
          if (l) l(T, 4)
          else for (const z of T) z()
          dn.delete(a)
        }
      }),
    t ? (s ? L(!0) : (M = a.run())) : o ? o(L.bind(null, !0), !0) : a.run(),
    (j.pause = a.pause.bind(a)),
    (j.resume = a.resume.bind(a)),
    (j.stop = j),
    j
  )
}
function rt(e, t = 1 / 0, n) {
  if (t <= 0 || !se(e) || e.__v_skip || ((n = n || new Set()), n.has(e))) return e
  if ((n.add(e), t--, ce(e))) rt(e.value, t, n)
  else if ($(e)) for (let s = 0; s < e.length; s++) rt(e[s], t, n)
  else if (Bi(e) || Lt(e))
    e.forEach((s) => {
      rt(s, t, n)
    })
  else if (Ki(e)) {
    for (const s in e) rt(e[s], t, n)
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && rt(e[s], t, n)
  }
  return e
}
/**
 * @vue/runtime-core v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Zt(e, t, n, s) {
  try {
    return s ? e(...s) : e()
  } catch (r) {
    Sn(r, t, n)
  }
}
function Ue(e, t, n, s) {
  if (B(e)) {
    const r = Zt(e, t, n, s)
    return (
      r &&
        xr(r) &&
        r.catch((i) => {
          Sn(i, t, n)
        }),
      r
    )
  }
  if ($(e)) {
    const r = []
    for (let i = 0; i < e.length; i++) r.push(Ue(e[i], t, n, s))
    return r
  }
}
function Sn(e, t, n, s = !0) {
  const r = t ? t.vnode : null,
    { errorHandler: i, throwUnhandledErrorInProduction: o } = (t && t.appContext.config) || Z
  if (t) {
    let c = t.parent
    const l = t.proxy,
      h = `https://vuejs.org/error-reference/#runtime-${n}`
    for (; c; ) {
      const a = c.ec
      if (a) {
        for (let d = 0; d < a.length; d++) if (a[d](e, l, h) === !1) return
      }
      c = c.parent
    }
    if (i) {
      lt(), Zt(i, null, 10, [e, l, h]), ct()
      return
    }
  }
  Co(e, n, r, s, o)
}
function Co(e, t, n, s = !0, r = !1) {
  if (r) throw e
  console.error(e)
}
const de = []
let Le = -1
const Et = []
let tt = null,
  yt = 0
const Wr = Promise.resolve()
let hn = null
function qr(e) {
  const t = hn || Wr
  return e ? t.then(this ? e.bind(this) : e) : t
}
function Ao(e) {
  let t = Le + 1,
    n = de.length
  for (; t < n; ) {
    const s = (t + n) >>> 1,
      r = de[s],
      i = Gt(r)
    i < e || (i === e && r.flags & 2) ? (t = s + 1) : (n = s)
  }
  return t
}
function ms(e) {
  if (!(e.flags & 1)) {
    const t = Gt(e),
      n = de[de.length - 1]
    !n || (!(e.flags & 2) && t >= Gt(n)) ? de.push(e) : de.splice(Ao(t), 0, e), (e.flags |= 1), Gr()
  }
}
function Gr() {
  hn || (hn = Wr.then(Qr))
}
function Oo(e) {
  $(e)
    ? Et.push(...e)
    : tt && e.id === -1
      ? tt.splice(yt + 1, 0, e)
      : e.flags & 1 || (Et.push(e), (e.flags |= 1)),
    Gr()
}
function Ms(e, t, n = Le + 1) {
  for (; n < de.length; n++) {
    const s = de[n]
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid) continue
      de.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2)
    }
  }
}
function zr(e) {
  if (Et.length) {
    const t = [...new Set(Et)].sort((n, s) => Gt(n) - Gt(s))
    if (((Et.length = 0), tt)) {
      tt.push(...t)
      return
    }
    for (tt = t, yt = 0; yt < tt.length; yt++) {
      const n = tt[yt]
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2)
    }
    ;(tt = null), (yt = 0)
  }
}
const Gt = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id)
function Qr(e) {
  try {
    for (Le = 0; Le < de.length; Le++) {
      const t = de[Le]
      t &&
        !(t.flags & 8) &&
        (t.flags & 4 && (t.flags &= -2), Zt(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2))
    }
  } finally {
    for (; Le < de.length; Le++) {
      const t = de[Le]
      t && (t.flags &= -2)
    }
    ;(Le = -1), (de.length = 0), zr(), (hn = null), (de.length || Et.length) && Qr()
  }
}
let $e = null,
  Yr = null
function pn(e) {
  const t = $e
  return ($e = e), (Yr = (e && e.type.__scopeId) || null), t
}
function We(e, t = $e, n) {
  if (!t || e._n) return e
  const s = (...r) => {
    s._d && Us(-1)
    const i = pn(t)
    let o
    try {
      o = e(...r)
    } finally {
      pn(i), s._d && Us(1)
    }
    return o
  }
  return (s._n = !0), (s._c = !0), (s._d = !0), s
}
function ut(e, t, n, s) {
  const r = e.dirs,
    i = t && t.dirs
  for (let o = 0; o < r.length; o++) {
    const c = r[o]
    i && (c.oldValue = i[o].value)
    let l = c.dir[s]
    l && (lt(), Ue(l, n, 8, [e.el, c, e, t]), ct())
  }
}
const To = Symbol('_vte'),
  Io = (e) => e.__isTeleport
function bs(e, t) {
  e.shapeFlag & 6 && e.component
    ? ((e.transition = t), bs(e.component.subTree, t))
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t)
}
/*! #__NO_SIDE_EFFECTS__ */ function en(e, t) {
  return B(e) ? fe({ name: e.name }, t, { setup: e }) : e
}
function Jr(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + '-', 0, 0]
}
function gn(e, t, n, s, r = !1) {
  if ($(e)) {
    e.forEach((A, O) => gn(A, t && ($(t) ? t[O] : t), n, s, r))
    return
  }
  if (Bt(s) && !r) {
    s.shapeFlag & 512 &&
      s.type.__asyncResolved &&
      s.component.subTree.component &&
      gn(e, t, n, s.component.subTree)
    return
  }
  const i = s.shapeFlag & 4 ? ws(s.component) : s.el,
    o = r ? null : i,
    { i: c, r: l } = e,
    h = t && t.r,
    a = c.refs === Z ? (c.refs = {}) : c.refs,
    d = c.setupState,
    g = k(d),
    m = d === Z ? () => !1 : (A) => W(g, A)
  if (
    (h != null &&
      h !== l &&
      (ie(h) ? ((a[h] = null), m(h) && (d[h] = null)) : ce(h) && (h.value = null)),
    B(l))
  )
    Zt(l, c, 12, [o, a])
  else {
    const A = ie(l),
      O = ce(l)
    if (A || O) {
      const H = () => {
        if (e.f) {
          const j = A ? (m(l) ? d[l] : a[l]) : l.value
          r
            ? $(j) && rs(j, i)
            : $(j)
              ? j.includes(i) || j.push(i)
              : A
                ? ((a[l] = [i]), m(l) && (d[l] = a[l]))
                : ((l.value = [i]), e.k && (a[e.k] = l.value))
        } else A ? ((a[l] = o), m(l) && (d[l] = o)) : O && ((l.value = o), e.k && (a[e.k] = o))
      }
      o ? ((H.id = -1), _e(H, n)) : H()
    }
  }
}
wn().requestIdleCallback
wn().cancelIdleCallback
const Bt = (e) => !!e.type.__asyncLoader,
  Xr = (e) => e.type.__isKeepAlive
function Mo(e, t) {
  Zr(e, 'a', t)
}
function Fo(e, t) {
  Zr(e, 'da', t)
}
function Zr(e, t, n = he) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n
      for (; r; ) {
        if (r.isDeactivated) return
        r = r.parent
      }
      return e()
    })
  if ((Rn(t, s, n), n)) {
    let r = n.parent
    for (; r && r.parent; ) Xr(r.parent.vnode) && jo(s, t, n, r), (r = r.parent)
  }
}
function jo(e, t, n, s) {
  const r = Rn(t, e, s, !0)
  ei(() => {
    rs(s[t], r)
  }, n)
}
function Rn(e, t, n = he, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...o) => {
          lt()
          const c = tn(n),
            l = Ue(t, n, e, o)
          return c(), ct(), l
        })
    return s ? r.unshift(i) : r.push(i), i
  }
}
const Ye =
    (e) =>
    (t, n = he) => {
      ;(!Yt || e === 'sp') && Rn(e, (...s) => t(...s), n)
    },
  Lo = Ye('bm'),
  No = Ye('m'),
  Do = Ye('bu'),
  $o = Ye('u'),
  Ho = Ye('bum'),
  ei = Ye('um'),
  Bo = Ye('sp'),
  Uo = Ye('rtg'),
  Vo = Ye('rtc')
function Ko(e, t = he) {
  Rn('ec', e, t)
}
const ko = Symbol.for('v-ndc'),
  Gn = (e) => (e ? (yi(e) ? ws(e) : Gn(e.parent)) : null),
  Ut = fe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Gn(e.parent),
    $root: (e) => Gn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ni(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        ms(e.update)
      }),
    $nextTick: (e) => e.n || (e.n = qr.bind(e.proxy)),
    $watch: (e) => al.bind(e),
  }),
  jn = (e, t) => e !== Z && !e.__isScriptSetup && W(e, t),
  Wo = {
    get({ _: e }, t) {
      if (t === '__v_skip') return !0
      const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: c, appContext: l } = e
      let h
      if (t[0] !== '$') {
        const m = o[t]
        if (m !== void 0)
          switch (m) {
            case 1:
              return s[t]
            case 2:
              return r[t]
            case 4:
              return n[t]
            case 3:
              return i[t]
          }
        else {
          if (jn(s, t)) return (o[t] = 1), s[t]
          if (r !== Z && W(r, t)) return (o[t] = 2), r[t]
          if ((h = e.propsOptions[0]) && W(h, t)) return (o[t] = 3), i[t]
          if (n !== Z && W(n, t)) return (o[t] = 4), n[t]
          zn && (o[t] = 0)
        }
      }
      const a = Ut[t]
      let d, g
      if (a) return t === '$attrs' && le(e.attrs, 'get', ''), a(e)
      if ((d = c.__cssModules) && (d = d[t])) return d
      if (n !== Z && W(n, t)) return (o[t] = 4), n[t]
      if (((g = l.config.globalProperties), W(g, t))) return g[t]
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: i } = e
      return jn(r, t)
        ? ((r[t] = n), !0)
        : s !== Z && W(s, t)
          ? ((s[t] = n), !0)
          : W(e.props, t) || (t[0] === '$' && t.slice(1) in e)
            ? !1
            : ((i[t] = n), !0)
    },
    has(
      { _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i } },
      o,
    ) {
      let c
      return (
        !!n[o] ||
        (e !== Z && W(e, o)) ||
        jn(t, o) ||
        ((c = i[0]) && W(c, o)) ||
        W(s, o) ||
        W(Ut, o) ||
        W(r.config.globalProperties, o)
      )
    },
    defineProperty(e, t, n) {
      return (
        n.get != null ? (e._.accessCache[t] = 0) : W(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      )
    },
  }
function Fs(e) {
  return $(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e
}
let zn = !0
function qo(e) {
  const t = ni(e),
    n = e.proxy,
    s = e.ctx
  ;(zn = !1), t.beforeCreate && js(t.beforeCreate, e, 'bc')
  const {
    data: r,
    computed: i,
    methods: o,
    watch: c,
    provide: l,
    inject: h,
    created: a,
    beforeMount: d,
    mounted: g,
    beforeUpdate: m,
    updated: A,
    activated: O,
    deactivated: H,
    beforeDestroy: j,
    beforeUnmount: M,
    destroyed: L,
    unmounted: T,
    render: z,
    renderTracked: oe,
    renderTriggered: ee,
    errorCaptured: Ce,
    serverPrefetch: Je,
    expose: Ae,
    inheritAttrs: Xe,
    components: ft,
    directives: Oe,
    filters: Ot,
  } = t
  if ((h && Go(h, s, null), o))
    for (const G in o) {
      const V = o[G]
      B(V) && (s[G] = V.bind(n))
    }
  if (r) {
    const G = r.call(n, n)
    se(G) && (e.data = En(G))
  }
  if (((zn = !0), i))
    for (const G in i) {
      const V = i[G],
        Ve = B(V) ? V.bind(n, n) : B(V.get) ? V.get.bind(n, n) : He,
        Ze = !B(V) && B(V.set) ? V.set.bind(n) : He,
        Te = Ee({ get: Ve, set: Ze })
      Object.defineProperty(s, G, {
        enumerable: !0,
        configurable: !0,
        get: () => Te.value,
        set: (pe) => (Te.value = pe),
      })
    }
  if (c) for (const G in c) ti(c[G], s, n, G)
  if (l) {
    const G = B(l) ? l.call(n) : l
    Reflect.ownKeys(G).forEach((V) => {
      ln(V, G[V])
    })
  }
  a && js(a, e, 'c')
  function re(G, V) {
    $(V) ? V.forEach((Ve) => G(Ve.bind(n))) : V && G(V.bind(n))
  }
  if (
    (re(Lo, d),
    re(No, g),
    re(Do, m),
    re($o, A),
    re(Mo, O),
    re(Fo, H),
    re(Ko, Ce),
    re(Vo, oe),
    re(Uo, ee),
    re(Ho, M),
    re(ei, T),
    re(Bo, Je),
    $(Ae))
  )
    if (Ae.length) {
      const G = e.exposed || (e.exposed = {})
      Ae.forEach((V) => {
        Object.defineProperty(G, V, { get: () => n[V], set: (Ve) => (n[V] = Ve) })
      })
    } else e.exposed || (e.exposed = {})
  z && e.render === He && (e.render = z),
    Xe != null && (e.inheritAttrs = Xe),
    ft && (e.components = ft),
    Oe && (e.directives = Oe),
    Je && Jr(e)
}
function Go(e, t, n = He) {
  $(e) && (e = Qn(e))
  for (const s in e) {
    const r = e[s]
    let i
    se(r)
      ? 'default' in r
        ? (i = Be(r.from || s, r.default, !0))
        : (i = Be(r.from || s))
      : (i = Be(r)),
      ce(i)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (o) => (i.value = o),
          })
        : (t[s] = i)
  }
}
function js(e, t, n) {
  Ue($(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function ti(e, t, n, s) {
  let r = s.includes('.') ? mi(n, s) : () => n[s]
  if (ie(e)) {
    const i = t[e]
    B(i) && cn(r, i)
  } else if (B(e)) cn(r, e.bind(n))
  else if (se(e))
    if ($(e)) e.forEach((i) => ti(i, t, n, s))
    else {
      const i = B(e.handler) ? e.handler.bind(n) : t[e.handler]
      B(i) && cn(r, i, e)
    }
}
function ni(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: i,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    c = i.get(t)
  let l
  return (
    c
      ? (l = c)
      : !r.length && !n && !s
        ? (l = t)
        : ((l = {}), r.length && r.forEach((h) => mn(l, h, o, !0)), mn(l, t, o)),
    se(t) && i.set(t, l),
    l
  )
}
function mn(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t
  i && mn(e, i, n, !0), r && r.forEach((o) => mn(e, o, n, !0))
  for (const o in t)
    if (!(s && o === 'expose')) {
      const c = zo[o] || (n && n[o])
      e[o] = c ? c(e[o], t[o]) : t[o]
    }
  return e
}
const zo = {
  data: Ls,
  props: Ns,
  emits: Ns,
  methods: jt,
  computed: jt,
  beforeCreate: ue,
  created: ue,
  beforeMount: ue,
  mounted: ue,
  beforeUpdate: ue,
  updated: ue,
  beforeDestroy: ue,
  beforeUnmount: ue,
  destroyed: ue,
  unmounted: ue,
  activated: ue,
  deactivated: ue,
  errorCaptured: ue,
  serverPrefetch: ue,
  components: jt,
  directives: jt,
  watch: Yo,
  provide: Ls,
  inject: Qo,
}
function Ls(e, t) {
  return t
    ? e
      ? function () {
          return fe(B(e) ? e.call(this, this) : e, B(t) ? t.call(this, this) : t)
        }
      : t
    : e
}
function Qo(e, t) {
  return jt(Qn(e), Qn(t))
}
function Qn(e) {
  if ($(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function ue(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function jt(e, t) {
  return e ? fe(Object.create(null), e, t) : t
}
function Ns(e, t) {
  return e
    ? $(e) && $(t)
      ? [...new Set([...e, ...t])]
      : fe(Object.create(null), Fs(e), Fs(t ?? {}))
    : t
}
function Yo(e, t) {
  if (!e) return t
  if (!t) return e
  const n = fe(Object.create(null), e)
  for (const s in t) n[s] = ue(e[s], t[s])
  return n
}
function si() {
  return {
    app: null,
    config: {
      isNativeTag: $i,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  }
}
let Jo = 0
function Xo(e, t) {
  return function (s, r = null) {
    B(s) || (s = fe({}, s)), r != null && !se(r) && (r = null)
    const i = si(),
      o = new WeakSet(),
      c = []
    let l = !1
    const h = (i.app = {
      _uid: Jo++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: Fl,
      get config() {
        return i.config
      },
      set config(a) {},
      use(a, ...d) {
        return (
          o.has(a) ||
            (a && B(a.install) ? (o.add(a), a.install(h, ...d)) : B(a) && (o.add(a), a(h, ...d))),
          h
        )
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), h
      },
      component(a, d) {
        return d ? ((i.components[a] = d), h) : i.components[a]
      },
      directive(a, d) {
        return d ? ((i.directives[a] = d), h) : i.directives[a]
      },
      mount(a, d, g) {
        if (!l) {
          const m = h._ceVNode || ne(s, r)
          return (
            (m.appContext = i),
            g === !0 ? (g = 'svg') : g === !1 && (g = void 0),
            e(m, a, g),
            (l = !0),
            (h._container = a),
            (a.__vue_app__ = h),
            ws(m.component)
          )
        }
      },
      onUnmount(a) {
        c.push(a)
      },
      unmount() {
        l && (Ue(c, h._instance, 16), e(null, h._container), delete h._container.__vue_app__)
      },
      provide(a, d) {
        return (i.provides[a] = d), h
      },
      runWithContext(a) {
        const d = St
        St = h
        try {
          return a()
        } finally {
          St = d
        }
      },
    })
    return h
  }
}
let St = null
function ln(e, t) {
  if (he) {
    let n = he.provides
    const s = he.parent && he.parent.provides
    s === n && (n = he.provides = Object.create(s)), (n[e] = t)
  }
}
function Be(e, t, n = !1) {
  const s = he || $e
  if (s || St) {
    const r = St
      ? St._context.provides
      : s
        ? s.parent == null
          ? s.vnode.appContext && s.vnode.appContext.provides
          : s.parent.provides
        : void 0
    if (r && e in r) return r[e]
    if (arguments.length > 1) return n && B(t) ? t.call(s && s.proxy) : t
  }
}
const ri = {},
  ii = () => Object.create(ri),
  oi = (e) => Object.getPrototypeOf(e) === ri
function Zo(e, t, n, s = !1) {
  const r = {},
    i = ii()
  ;(e.propsDefaults = Object.create(null)), li(e, t, r, i)
  for (const o in e.propsOptions[0]) o in r || (r[o] = void 0)
  n ? (e.props = s ? r : Br(r)) : e.type.props ? (e.props = r) : (e.props = i), (e.attrs = i)
}
function el(e, t, n, s) {
  const {
      props: r,
      attrs: i,
      vnode: { patchFlag: o },
    } = e,
    c = k(r),
    [l] = e.propsOptions
  let h = !1
  if ((s || o > 0) && !(o & 16)) {
    if (o & 8) {
      const a = e.vnode.dynamicProps
      for (let d = 0; d < a.length; d++) {
        let g = a[d]
        if (Pn(e.emitsOptions, g)) continue
        const m = t[g]
        if (l)
          if (W(i, g)) m !== i[g] && ((i[g] = m), (h = !0))
          else {
            const A = ot(g)
            r[A] = Yn(l, c, A, m, e, !1)
          }
        else m !== i[g] && ((i[g] = m), (h = !0))
      }
    }
  } else {
    li(e, t, r, i) && (h = !0)
    let a
    for (const d in c)
      (!t || (!W(t, d) && ((a = gt(d)) === d || !W(t, a)))) &&
        (l
          ? n && (n[d] !== void 0 || n[a] !== void 0) && (r[d] = Yn(l, c, d, void 0, e, !0))
          : delete r[d])
    if (i !== c) for (const d in i) (!t || !W(t, d)) && (delete i[d], (h = !0))
  }
  h && Qe(e.attrs, 'set', '')
}
function li(e, t, n, s) {
  const [r, i] = e.propsOptions
  let o = !1,
    c
  if (t)
    for (let l in t) {
      if (Nt(l)) continue
      const h = t[l]
      let a
      r && W(r, (a = ot(l)))
        ? !i || !i.includes(a)
          ? (n[a] = h)
          : ((c || (c = {}))[a] = h)
        : Pn(e.emitsOptions, l) || ((!(l in s) || h !== s[l]) && ((s[l] = h), (o = !0)))
    }
  if (i) {
    const l = k(n),
      h = c || Z
    for (let a = 0; a < i.length; a++) {
      const d = i[a]
      n[d] = Yn(r, l, d, h[d], e, !W(h, d))
    }
  }
  return o
}
function Yn(e, t, n, s, r, i) {
  const o = e[n]
  if (o != null) {
    const c = W(o, 'default')
    if (c && s === void 0) {
      const l = o.default
      if (o.type !== Function && !o.skipFactory && B(l)) {
        const { propsDefaults: h } = r
        if (n in h) s = h[n]
        else {
          const a = tn(r)
          ;(s = h[n] = l.call(null, t)), a()
        }
      } else s = l
      r.ce && r.ce._setProp(n, s)
    }
    o[0] && (i && !c ? (s = !1) : o[1] && (s === '' || s === gt(n)) && (s = !0))
  }
  return s
}
const tl = new WeakMap()
function ci(e, t, n = !1) {
  const s = n ? tl : t.propsCache,
    r = s.get(e)
  if (r) return r
  const i = e.props,
    o = {},
    c = []
  let l = !1
  if (!B(e)) {
    const a = (d) => {
      l = !0
      const [g, m] = ci(d, t, !0)
      fe(o, g), m && c.push(...m)
    }
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a)
  }
  if (!i && !l) return se(e) && s.set(e, wt), wt
  if ($(i))
    for (let a = 0; a < i.length; a++) {
      const d = ot(i[a])
      Ds(d) && (o[d] = Z)
    }
  else if (i)
    for (const a in i) {
      const d = ot(a)
      if (Ds(d)) {
        const g = i[a],
          m = (o[d] = $(g) || B(g) ? { type: g } : fe({}, g)),
          A = m.type
        let O = !1,
          H = !0
        if ($(A))
          for (let j = 0; j < A.length; ++j) {
            const M = A[j],
              L = B(M) && M.name
            if (L === 'Boolean') {
              O = !0
              break
            } else L === 'String' && (H = !1)
          }
        else O = B(A) && A.name === 'Boolean'
        ;(m[0] = O), (m[1] = H), (O || W(m, 'default')) && c.push(d)
      }
    }
  const h = [o, c]
  return se(e) && s.set(e, h), h
}
function Ds(e) {
  return e[0] !== '$' && !Nt(e)
}
const fi = (e) => e[0] === '_' || e === '$stable',
  _s = (e) => ($(e) ? e.map(De) : [De(e)]),
  nl = (e, t, n) => {
    if (t._n) return t
    const s = We((...r) => _s(t(...r)), n)
    return (s._c = !1), s
  },
  ui = (e, t, n) => {
    const s = e._ctx
    for (const r in e) {
      if (fi(r)) continue
      const i = e[r]
      if (B(i)) t[r] = nl(r, i, s)
      else if (i != null) {
        const o = _s(i)
        t[r] = () => o
      }
    }
  },
  ai = (e, t) => {
    const n = _s(t)
    e.slots.default = () => n
  },
  di = (e, t, n) => {
    for (const s in t) (n || s !== '_') && (e[s] = t[s])
  },
  sl = (e, t, n) => {
    const s = (e.slots = ii())
    if (e.vnode.shapeFlag & 32) {
      const r = t._
      r ? (di(s, t, n), n && Er(s, '_', r, !0)) : ui(t, s)
    } else t && ai(e, t)
  },
  rl = (e, t, n) => {
    const { vnode: s, slots: r } = e
    let i = !0,
      o = Z
    if (s.shapeFlag & 32) {
      const c = t._
      c ? (n && c === 1 ? (i = !1) : di(r, t, n)) : ((i = !t.$stable), ui(t, r)), (o = t)
    } else t && (ai(e, t), (o = { default: 1 }))
    if (i) for (const c in r) !fi(c) && o[c] == null && delete r[c]
  },
  _e = _l
function il(e) {
  return ol(e)
}
function ol(e, t) {
  const n = wn()
  n.__VUE__ = !0
  const {
      insert: s,
      remove: r,
      patchProp: i,
      createElement: o,
      createText: c,
      createComment: l,
      setText: h,
      setElementText: a,
      parentNode: d,
      nextSibling: g,
      setScopeId: m = He,
      insertStaticContent: A,
    } = e,
    O = (f, u, p, b = null, y = null, v = null, S = void 0, E = null, w = !!u.dynamicChildren) => {
      if (f === u) return
      f && !Mt(f, u) && ((b = _(f)), pe(f, y, v, !0), (f = null)),
        u.patchFlag === -2 && ((w = !1), (u.dynamicChildren = null))
      const { type: x, ref: N, shapeFlag: P } = u
      switch (x) {
        case Cn:
          H(f, u, p, b)
          break
        case zt:
          j(f, u, p, b)
          break
        case fn:
          f == null && M(u, p, b, S)
          break
        case Ne:
          ft(f, u, p, b, y, v, S, E, w)
          break
        default:
          P & 1
            ? z(f, u, p, b, y, v, S, E, w)
            : P & 6
              ? Oe(f, u, p, b, y, v, S, E, w)
              : (P & 64 || P & 128) && x.process(f, u, p, b, y, v, S, E, w, I)
      }
      N != null && y && gn(N, f && f.ref, v, u || f, !u)
    },
    H = (f, u, p, b) => {
      if (f == null) s((u.el = c(u.children)), p, b)
      else {
        const y = (u.el = f.el)
        u.children !== f.children && h(y, u.children)
      }
    },
    j = (f, u, p, b) => {
      f == null ? s((u.el = l(u.children || '')), p, b) : (u.el = f.el)
    },
    M = (f, u, p, b) => {
      ;[f.el, f.anchor] = A(f.children, u, p, b, f.el, f.anchor)
    },
    L = ({ el: f, anchor: u }, p, b) => {
      let y
      for (; f && f !== u; ) (y = g(f)), s(f, p, b), (f = y)
      s(u, p, b)
    },
    T = ({ el: f, anchor: u }) => {
      let p
      for (; f && f !== u; ) (p = g(f)), r(f), (f = p)
      r(u)
    },
    z = (f, u, p, b, y, v, S, E, w) => {
      u.type === 'svg' ? (S = 'svg') : u.type === 'math' && (S = 'mathml'),
        f == null ? oe(u, p, b, y, v, S, E, w) : Je(f, u, y, v, S, E, w)
    },
    oe = (f, u, p, b, y, v, S, E) => {
      let w, x
      const { props: N, shapeFlag: P, transition: F, dirs: D } = f
      if (
        ((w = f.el = o(f.type, v, N && N.is, N)),
        P & 8 ? a(w, f.children) : P & 16 && Ce(f.children, w, null, b, y, Ln(f, v), S, E),
        D && ut(f, null, b, 'created'),
        ee(w, f, f.scopeId, S, b),
        N)
      ) {
        for (const J in N) J !== 'value' && !Nt(J) && i(w, J, null, N[J], v, b)
        'value' in N && i(w, 'value', null, N.value, v), (x = N.onVnodeBeforeMount) && je(x, b, f)
      }
      D && ut(f, null, b, 'beforeMount')
      const U = ll(y, F)
      U && F.beforeEnter(w),
        s(w, u, p),
        ((x = N && N.onVnodeMounted) || U || D) &&
          _e(() => {
            x && je(x, b, f), U && F.enter(w), D && ut(f, null, b, 'mounted')
          }, y)
    },
    ee = (f, u, p, b, y) => {
      if ((p && m(f, p), b)) for (let v = 0; v < b.length; v++) m(f, b[v])
      if (y) {
        let v = y.subTree
        if (u === v || (_i(v.type) && (v.ssContent === u || v.ssFallback === u))) {
          const S = y.vnode
          ee(f, S, S.scopeId, S.slotScopeIds, y.parent)
        }
      }
    },
    Ce = (f, u, p, b, y, v, S, E, w = 0) => {
      for (let x = w; x < f.length; x++) {
        const N = (f[x] = E ? nt(f[x]) : De(f[x]))
        O(null, N, u, p, b, y, v, S, E)
      }
    },
    Je = (f, u, p, b, y, v, S) => {
      const E = (u.el = f.el)
      let { patchFlag: w, dynamicChildren: x, dirs: N } = u
      w |= f.patchFlag & 16
      const P = f.props || Z,
        F = u.props || Z
      let D
      if (
        (p && at(p, !1),
        (D = F.onVnodeBeforeUpdate) && je(D, p, u, f),
        N && ut(u, f, p, 'beforeUpdate'),
        p && at(p, !0),
        ((P.innerHTML && F.innerHTML == null) || (P.textContent && F.textContent == null)) &&
          a(E, ''),
        x
          ? Ae(f.dynamicChildren, x, E, p, b, Ln(u, y), v)
          : S || V(f, u, E, null, p, b, Ln(u, y), v, !1),
        w > 0)
      ) {
        if (w & 16) Xe(E, P, F, p, y)
        else if (
          (w & 2 && P.class !== F.class && i(E, 'class', null, F.class, y),
          w & 4 && i(E, 'style', P.style, F.style, y),
          w & 8)
        ) {
          const U = u.dynamicProps
          for (let J = 0; J < U.length; J++) {
            const q = U[J],
              me = P[q],
              ge = F[q]
            ;(ge !== me || q === 'value') && i(E, q, me, ge, y, p)
          }
        }
        w & 1 && f.children !== u.children && a(E, u.children)
      } else !S && x == null && Xe(E, P, F, p, y)
      ;((D = F.onVnodeUpdated) || N) &&
        _e(() => {
          D && je(D, p, u, f), N && ut(u, f, p, 'updated')
        }, b)
    },
    Ae = (f, u, p, b, y, v, S) => {
      for (let E = 0; E < u.length; E++) {
        const w = f[E],
          x = u[E],
          N = w.el && (w.type === Ne || !Mt(w, x) || w.shapeFlag & 70) ? d(w.el) : p
        O(w, x, N, null, b, y, v, S, !0)
      }
    },
    Xe = (f, u, p, b, y) => {
      if (u !== p) {
        if (u !== Z) for (const v in u) !Nt(v) && !(v in p) && i(f, v, u[v], null, y, b)
        for (const v in p) {
          if (Nt(v)) continue
          const S = p[v],
            E = u[v]
          S !== E && v !== 'value' && i(f, v, E, S, y, b)
        }
        'value' in p && i(f, 'value', u.value, p.value, y)
      }
    },
    ft = (f, u, p, b, y, v, S, E, w) => {
      const x = (u.el = f ? f.el : c('')),
        N = (u.anchor = f ? f.anchor : c(''))
      let { patchFlag: P, dynamicChildren: F, slotScopeIds: D } = u
      D && (E = E ? E.concat(D) : D),
        f == null
          ? (s(x, p, b), s(N, p, b), Ce(u.children || [], p, N, y, v, S, E, w))
          : P > 0 && P & 64 && F && f.dynamicChildren
            ? (Ae(f.dynamicChildren, F, p, y, v, S, E),
              (u.key != null || (y && u === y.subTree)) && hi(f, u, !0))
            : V(f, u, p, N, y, v, S, E, w)
    },
    Oe = (f, u, p, b, y, v, S, E, w) => {
      ;(u.slotScopeIds = E),
        f == null
          ? u.shapeFlag & 512
            ? y.ctx.activate(u, p, b, S, w)
            : Ot(u, p, b, y, v, S, w)
          : mt(f, u, w)
    },
    Ot = (f, u, p, b, y, v, S) => {
      const E = (f.component = Cl(f, b, y))
      if ((Xr(f) && (E.ctx.renderer = I), Al(E, !1, S), E.asyncDep)) {
        if ((y && y.registerDep(E, re, S), !f.el)) {
          const w = (E.subTree = ne(zt))
          j(null, w, u, p)
        }
      } else re(E, f, u, p, y, v, S)
    },
    mt = (f, u, p) => {
      const b = (u.component = f.component)
      if (ml(f, u, p))
        if (b.asyncDep && !b.asyncResolved) {
          G(b, u, p)
          return
        } else (b.next = u), b.update()
      else (u.el = f.el), (b.vnode = u)
    },
    re = (f, u, p, b, y, v, S) => {
      const E = () => {
        if (f.isMounted) {
          let { next: P, bu: F, u: D, parent: U, vnode: J } = f
          {
            const Me = pi(f)
            if (Me) {
              P && ((P.el = J.el), G(f, P, S)),
                Me.asyncDep.then(() => {
                  f.isUnmounted || E()
                })
              return
            }
          }
          let q = P,
            me
          at(f, !1),
            P ? ((P.el = J.el), G(f, P, S)) : (P = J),
            F && Tn(F),
            (me = P.props && P.props.onVnodeBeforeUpdate) && je(me, U, P, J),
            at(f, !0)
          const ge = Hs(f),
            Ie = f.subTree
          ;(f.subTree = ge),
            O(Ie, ge, d(Ie.el), _(Ie), f, y, v),
            (P.el = ge.el),
            q === null && bl(f, ge.el),
            D && _e(D, y),
            (me = P.props && P.props.onVnodeUpdated) && _e(() => je(me, U, P, J), y)
        } else {
          let P
          const { el: F, props: D } = u,
            { bm: U, m: J, parent: q, root: me, type: ge } = f,
            Ie = Bt(u)
          at(f, !1), U && Tn(U), !Ie && (P = D && D.onVnodeBeforeMount) && je(P, q, u), at(f, !0)
          {
            me.ce && me.ce._injectChildStyle(ge)
            const Me = (f.subTree = Hs(f))
            O(null, Me, p, b, f, y, v), (u.el = Me.el)
          }
          if ((J && _e(J, y), !Ie && (P = D && D.onVnodeMounted))) {
            const Me = u
            _e(() => je(P, q, Me), y)
          }
          ;(u.shapeFlag & 256 || (q && Bt(q.vnode) && q.vnode.shapeFlag & 256)) &&
            f.a &&
            _e(f.a, y),
            (f.isMounted = !0),
            (u = p = b = null)
        }
      }
      f.scope.on()
      const w = (f.effect = new Pr(E))
      f.scope.off()
      const x = (f.update = w.run.bind(w)),
        N = (f.job = w.runIfDirty.bind(w))
      ;(N.i = f), (N.id = f.uid), (w.scheduler = () => ms(N)), at(f, !0), x()
    },
    G = (f, u, p) => {
      u.component = f
      const b = f.vnode.props
      ;(f.vnode = u), (f.next = null), el(f, u.props, b, p), rl(f, u.children, p), lt(), Ms(f), ct()
    },
    V = (f, u, p, b, y, v, S, E, w = !1) => {
      const x = f && f.children,
        N = f ? f.shapeFlag : 0,
        P = u.children,
        { patchFlag: F, shapeFlag: D } = u
      if (F > 0) {
        if (F & 128) {
          Ze(x, P, p, b, y, v, S, E, w)
          return
        } else if (F & 256) {
          Ve(x, P, p, b, y, v, S, E, w)
          return
        }
      }
      D & 8
        ? (N & 16 && we(x, y, v), P !== x && a(p, P))
        : N & 16
          ? D & 16
            ? Ze(x, P, p, b, y, v, S, E, w)
            : we(x, y, v, !0)
          : (N & 8 && a(p, ''), D & 16 && Ce(P, p, b, y, v, S, E, w))
    },
    Ve = (f, u, p, b, y, v, S, E, w) => {
      ;(f = f || wt), (u = u || wt)
      const x = f.length,
        N = u.length,
        P = Math.min(x, N)
      let F
      for (F = 0; F < P; F++) {
        const D = (u[F] = w ? nt(u[F]) : De(u[F]))
        O(f[F], D, p, null, y, v, S, E, w)
      }
      x > N ? we(f, y, v, !0, !1, P) : Ce(u, p, b, y, v, S, E, w, P)
    },
    Ze = (f, u, p, b, y, v, S, E, w) => {
      let x = 0
      const N = u.length
      let P = f.length - 1,
        F = N - 1
      for (; x <= P && x <= F; ) {
        const D = f[x],
          U = (u[x] = w ? nt(u[x]) : De(u[x]))
        if (Mt(D, U)) O(D, U, p, null, y, v, S, E, w)
        else break
        x++
      }
      for (; x <= P && x <= F; ) {
        const D = f[P],
          U = (u[F] = w ? nt(u[F]) : De(u[F]))
        if (Mt(D, U)) O(D, U, p, null, y, v, S, E, w)
        else break
        P--, F--
      }
      if (x > P) {
        if (x <= F) {
          const D = F + 1,
            U = D < N ? u[D].el : b
          for (; x <= F; ) O(null, (u[x] = w ? nt(u[x]) : De(u[x])), p, U, y, v, S, E, w), x++
        }
      } else if (x > F) for (; x <= P; ) pe(f[x], y, v, !0), x++
      else {
        const D = x,
          U = x,
          J = new Map()
        for (x = U; x <= F; x++) {
          const be = (u[x] = w ? nt(u[x]) : De(u[x]))
          be.key != null && J.set(be.key, x)
        }
        let q,
          me = 0
        const ge = F - U + 1
        let Ie = !1,
          Me = 0
        const Tt = new Array(ge)
        for (x = 0; x < ge; x++) Tt[x] = 0
        for (x = D; x <= P; x++) {
          const be = f[x]
          if (me >= ge) {
            pe(be, y, v, !0)
            continue
          }
          let Fe
          if (be.key != null) Fe = J.get(be.key)
          else
            for (q = U; q <= F; q++)
              if (Tt[q - U] === 0 && Mt(be, u[q])) {
                Fe = q
                break
              }
          Fe === void 0
            ? pe(be, y, v, !0)
            : ((Tt[Fe - U] = x + 1),
              Fe >= Me ? (Me = Fe) : (Ie = !0),
              O(be, u[Fe], p, null, y, v, S, E, w),
              me++)
        }
        const Cs = Ie ? cl(Tt) : wt
        for (q = Cs.length - 1, x = ge - 1; x >= 0; x--) {
          const be = U + x,
            Fe = u[be],
            As = be + 1 < N ? u[be + 1].el : b
          Tt[x] === 0
            ? O(null, Fe, p, As, y, v, S, E, w)
            : Ie && (q < 0 || x !== Cs[q] ? Te(Fe, p, As, 2) : q--)
        }
      }
    },
    Te = (f, u, p, b, y = null) => {
      const { el: v, type: S, transition: E, children: w, shapeFlag: x } = f
      if (x & 6) {
        Te(f.component.subTree, u, p, b)
        return
      }
      if (x & 128) {
        f.suspense.move(u, p, b)
        return
      }
      if (x & 64) {
        S.move(f, u, p, I)
        return
      }
      if (S === Ne) {
        s(v, u, p)
        for (let P = 0; P < w.length; P++) Te(w[P], u, p, b)
        s(f.anchor, u, p)
        return
      }
      if (S === fn) {
        L(f, u, p)
        return
      }
      if (b !== 2 && x & 1 && E)
        if (b === 0) E.beforeEnter(v), s(v, u, p), _e(() => E.enter(v), y)
        else {
          const { leave: P, delayLeave: F, afterLeave: D } = E,
            U = () => s(v, u, p),
            J = () => {
              P(v, () => {
                U(), D && D()
              })
            }
          F ? F(v, U, J) : J()
        }
      else s(v, u, p)
    },
    pe = (f, u, p, b = !1, y = !1) => {
      const {
        type: v,
        props: S,
        ref: E,
        children: w,
        dynamicChildren: x,
        shapeFlag: N,
        patchFlag: P,
        dirs: F,
        cacheIndex: D,
      } = f
      if (
        (P === -2 && (y = !1),
        E != null && gn(E, null, p, f, !0),
        D != null && (u.renderCache[D] = void 0),
        N & 256)
      ) {
        u.ctx.deactivate(f)
        return
      }
      const U = N & 1 && F,
        J = !Bt(f)
      let q
      if ((J && (q = S && S.onVnodeBeforeUnmount) && je(q, u, f), N & 6)) nn(f.component, p, b)
      else {
        if (N & 128) {
          f.suspense.unmount(p, b)
          return
        }
        U && ut(f, null, u, 'beforeUnmount'),
          N & 64
            ? f.type.remove(f, u, p, I, b)
            : x && !x.hasOnce && (v !== Ne || (P > 0 && P & 64))
              ? we(x, u, p, !1, !0)
              : ((v === Ne && P & 384) || (!y && N & 16)) && we(w, u, p),
          b && bt(f)
      }
      ;((J && (q = S && S.onVnodeUnmounted)) || U) &&
        _e(() => {
          q && je(q, u, f), U && ut(f, null, u, 'unmounted')
        }, p)
    },
    bt = (f) => {
      const { type: u, el: p, anchor: b, transition: y } = f
      if (u === Ne) {
        _t(p, b)
        return
      }
      if (u === fn) {
        T(f)
        return
      }
      const v = () => {
        r(p), y && !y.persisted && y.afterLeave && y.afterLeave()
      }
      if (f.shapeFlag & 1 && y && !y.persisted) {
        const { leave: S, delayLeave: E } = y,
          w = () => S(p, v)
        E ? E(f.el, v, w) : w()
      } else v()
    },
    _t = (f, u) => {
      let p
      for (; f !== u; ) (p = g(f)), r(f), (f = p)
      r(u)
    },
    nn = (f, u, p) => {
      const { bum: b, scope: y, job: v, subTree: S, um: E, m: w, a: x } = f
      $s(w),
        $s(x),
        b && Tn(b),
        y.stop(),
        v && ((v.flags |= 8), pe(S, f, u, p)),
        E && _e(E, u),
        _e(() => {
          f.isUnmounted = !0
        }, u),
        u &&
          u.pendingBranch &&
          !u.isUnmounted &&
          f.asyncDep &&
          !f.asyncResolved &&
          f.suspenseId === u.pendingId &&
          (u.deps--, u.deps === 0 && u.resolve())
    },
    we = (f, u, p, b = !1, y = !1, v = 0) => {
      for (let S = v; S < f.length; S++) pe(f[S], u, p, b, y)
    },
    _ = (f) => {
      if (f.shapeFlag & 6) return _(f.component.subTree)
      if (f.shapeFlag & 128) return f.suspense.next()
      const u = g(f.anchor || f.el),
        p = u && u[To]
      return p ? g(p) : u
    }
  let C = !1
  const R = (f, u, p) => {
      f == null
        ? u._vnode && pe(u._vnode, null, null, !0)
        : O(u._vnode || null, f, u, null, null, null, p),
        (u._vnode = f),
        C || ((C = !0), Ms(), zr(), (C = !1))
    },
    I = { p: O, um: pe, m: Te, r: bt, mt: Ot, mc: Ce, pc: V, pbc: Ae, n: _, o: e }
  return { render: R, hydrate: void 0, createApp: Xo(R) }
}
function Ln({ type: e, props: t }, n) {
  return (n === 'svg' && e === 'foreignObject') ||
    (n === 'mathml' && e === 'annotation-xml' && t && t.encoding && t.encoding.includes('html'))
    ? void 0
    : n
}
function at({ effect: e, job: t }, n) {
  n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5))
}
function ll(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted
}
function hi(e, t, n = !1) {
  const s = e.children,
    r = t.children
  if ($(s) && $(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i]
      let c = r[i]
      c.shapeFlag & 1 &&
        !c.dynamicChildren &&
        ((c.patchFlag <= 0 || c.patchFlag === 32) && ((c = r[i] = nt(r[i])), (c.el = o.el)),
        !n && c.patchFlag !== -2 && hi(o, c)),
        c.type === Cn && (c.el = o.el)
    }
}
function cl(e) {
  const t = e.slice(),
    n = [0]
  let s, r, i, o, c
  const l = e.length
  for (s = 0; s < l; s++) {
    const h = e[s]
    if (h !== 0) {
      if (((r = n[n.length - 1]), e[r] < h)) {
        ;(t[s] = r), n.push(s)
        continue
      }
      for (i = 0, o = n.length - 1; i < o; ) (c = (i + o) >> 1), e[n[c]] < h ? (i = c + 1) : (o = c)
      h < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), (n[i] = s))
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; ) (n[i] = o), (o = t[o])
  return n
}
function pi(e) {
  const t = e.subTree.component
  if (t) return t.asyncDep && !t.asyncResolved ? t : pi(t)
}
function $s(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8
}
const fl = Symbol.for('v-scx'),
  ul = () => Be(fl)
function cn(e, t, n) {
  return gi(e, t, n)
}
function gi(e, t, n = Z) {
  const { immediate: s, deep: r, flush: i, once: o } = n,
    c = fe({}, n),
    l = (t && s) || (!t && i !== 'post')
  let h
  if (Yt) {
    if (i === 'sync') {
      const m = ul()
      h = m.__watcherHandles || (m.__watcherHandles = [])
    } else if (!l) {
      const m = () => {}
      return (m.stop = He), (m.resume = He), (m.pause = He), m
    }
  }
  const a = he
  c.call = (m, A, O) => Ue(m, a, A, O)
  let d = !1
  i === 'post'
    ? (c.scheduler = (m) => {
        _e(m, a && a.suspense)
      })
    : i !== 'sync' &&
      ((d = !0),
      (c.scheduler = (m, A) => {
        A ? m() : ms(m)
      })),
    (c.augmentJob = (m) => {
      t && (m.flags |= 4), d && ((m.flags |= 2), a && ((m.id = a.uid), (m.i = a)))
    })
  const g = Po(e, t, c)
  return Yt && (h ? h.push(g) : l && g()), g
}
function al(e, t, n) {
  const s = this.proxy,
    r = ie(e) ? (e.includes('.') ? mi(s, e) : () => s[e]) : e.bind(s, s)
  let i
  B(t) ? (i = t) : ((i = t.handler), (n = t))
  const o = tn(this),
    c = gi(r, i.bind(s), n)
  return o(), c
}
function mi(e, t) {
  const n = t.split('.')
  return () => {
    let s = e
    for (let r = 0; r < n.length && s; r++) s = s[n[r]]
    return s
  }
}
const dl = (e, t) =>
  t === 'modelValue' || t === 'model-value'
    ? e.modelModifiers
    : e[`${t}Modifiers`] || e[`${ot(t)}Modifiers`] || e[`${gt(t)}Modifiers`]
function hl(e, t, ...n) {
  if (e.isUnmounted) return
  const s = e.vnode.props || Z
  let r = n
  const i = t.startsWith('update:'),
    o = i && dl(s, t.slice(7))
  o && (o.trim && (r = n.map((a) => (ie(a) ? a.trim() : a))), o.number && (r = n.map(qi)))
  let c,
    l = s[(c = On(t))] || s[(c = On(ot(t)))]
  !l && i && (l = s[(c = On(gt(t)))]), l && Ue(l, e, 6, r)
  const h = s[c + 'Once']
  if (h) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[c]) return
    ;(e.emitted[c] = !0), Ue(h, e, 6, r)
  }
}
function bi(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e)
  if (r !== void 0) return r
  const i = e.emits
  let o = {},
    c = !1
  if (!B(e)) {
    const l = (h) => {
      const a = bi(h, t, !0)
      a && ((c = !0), fe(o, a))
    }
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l)
  }
  return !i && !c
    ? (se(e) && s.set(e, null), null)
    : ($(i) ? i.forEach((l) => (o[l] = null)) : fe(o, i), se(e) && s.set(e, o), o)
}
function Pn(e, t) {
  return !e || !vn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      W(e, t[0].toLowerCase() + t.slice(1)) || W(e, gt(t)) || W(e, t))
}
function Hs(e) {
  const {
      type: t,
      vnode: n,
      proxy: s,
      withProxy: r,
      propsOptions: [i],
      slots: o,
      attrs: c,
      emit: l,
      render: h,
      renderCache: a,
      props: d,
      data: g,
      setupState: m,
      ctx: A,
      inheritAttrs: O,
    } = e,
    H = pn(e)
  let j, M
  try {
    if (n.shapeFlag & 4) {
      const T = r || s,
        z = T
      ;(j = De(h.call(z, T, a, d, m, g, A))), (M = c)
    } else {
      const T = t
      ;(j = De(T.length > 1 ? T(d, { attrs: c, slots: o, emit: l }) : T(d, null))),
        (M = t.props ? c : pl(c))
    }
  } catch (T) {
    ;(Vt.length = 0), Sn(T, e, 1), (j = ne(zt))
  }
  let L = j
  if (M && O !== !1) {
    const T = Object.keys(M),
      { shapeFlag: z } = L
    T.length && z & 7 && (i && T.some(ss) && (M = gl(M, i)), (L = Rt(L, M, !1, !0)))
  }
  return (
    n.dirs && ((L = Rt(L, null, !1, !0)), (L.dirs = L.dirs ? L.dirs.concat(n.dirs) : n.dirs)),
    n.transition && bs(L, n.transition),
    (j = L),
    pn(H),
    j
  )
}
const pl = (e) => {
    let t
    for (const n in e) (n === 'class' || n === 'style' || vn(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  gl = (e, t) => {
    const n = {}
    for (const s in e) (!ss(s) || !(s.slice(9) in t)) && (n[s] = e[s])
    return n
  }
function ml(e, t, n) {
  const { props: s, children: r, component: i } = e,
    { props: o, children: c, patchFlag: l } = t,
    h = i.emitsOptions
  if (t.dirs || t.transition) return !0
  if (n && l >= 0) {
    if (l & 1024) return !0
    if (l & 16) return s ? Bs(s, o, h) : !!o
    if (l & 8) {
      const a = t.dynamicProps
      for (let d = 0; d < a.length; d++) {
        const g = a[d]
        if (o[g] !== s[g] && !Pn(h, g)) return !0
      }
    }
  } else
    return (r || c) && (!c || !c.$stable) ? !0 : s === o ? !1 : s ? (o ? Bs(s, o, h) : !0) : !!o
  return !1
}
function Bs(e, t, n) {
  const s = Object.keys(t)
  if (s.length !== Object.keys(e).length) return !0
  for (let r = 0; r < s.length; r++) {
    const i = s[r]
    if (t[i] !== e[i] && !Pn(n, i)) return !0
  }
  return !1
}
function bl({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree
    if ((s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e))
      ((e = t.vnode).el = n), (t = t.parent)
    else break
  }
}
const _i = (e) => e.__isSuspense
function _l(e, t) {
  t && t.pendingBranch ? ($(e) ? t.effects.push(...e) : t.effects.push(e)) : Oo(e)
}
const Ne = Symbol.for('v-fgt'),
  Cn = Symbol.for('v-txt'),
  zt = Symbol.for('v-cmt'),
  fn = Symbol.for('v-stc'),
  Vt = []
let xe = null
function vs(e = !1) {
  Vt.push((xe = e ? null : []))
}
function vl() {
  Vt.pop(), (xe = Vt[Vt.length - 1] || null)
}
let Qt = 1
function Us(e, t = !1) {
  ;(Qt += e), e < 0 && xe && t && (xe.hasOnce = !0)
}
function yl(e) {
  return (e.dynamicChildren = Qt > 0 ? xe || wt : null), vl(), Qt > 0 && xe && xe.push(e), e
}
function ys(e, t, n, s, r, i) {
  return yl(Y(e, t, n, s, r, i, !0))
}
function bn(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function Mt(e, t) {
  return e.type === t.type && e.key === t.key
}
const vi = ({ key: e }) => e ?? null,
  un = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null ? (ie(e) || ce(e) || B(e) ? { i: $e, r: e, k: t, f: !!n } : e) : null
  )
function Y(e, t = null, n = null, s = 0, r = null, i = e === Ne ? 0 : 1, o = !1, c = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && vi(t),
    ref: t && un(t),
    scopeId: Yr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: $e,
  }
  return (
    c ? (xs(l, n), i & 128 && e.normalize(l)) : n && (l.shapeFlag |= ie(n) ? 8 : 16),
    Qt > 0 && !o && xe && (l.patchFlag > 0 || i & 6) && l.patchFlag !== 32 && xe.push(l),
    l
  )
}
const ne = xl
function xl(e, t = null, n = null, s = 0, r = null, i = !1) {
  if (((!e || e === ko) && (e = zt), bn(e))) {
    const c = Rt(e, t, !0)
    return (
      n && xs(c, n),
      Qt > 0 && !i && xe && (c.shapeFlag & 6 ? (xe[xe.indexOf(e)] = c) : xe.push(c)),
      (c.patchFlag = -2),
      c
    )
  }
  if ((Ml(e) && (e = e.__vccOpts), t)) {
    t = wl(t)
    let { class: c, style: l } = t
    c && !ie(c) && (t.class = ve(c)),
      se(l) && (ps(l) && !$(l) && (l = fe({}, l)), (t.style = os(l)))
  }
  const o = ie(e) ? 1 : _i(e) ? 128 : Io(e) ? 64 : se(e) ? 4 : B(e) ? 2 : 0
  return Y(e, t, n, s, r, o, i, !0)
}
function wl(e) {
  return e ? (ps(e) || oi(e) ? fe({}, e) : e) : null
}
function Rt(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: c, transition: l } = e,
    h = t ? Sl(r || {}, t) : r,
    a = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: h,
      key: h && vi(h),
      ref: t && t.ref ? (n && i ? ($(i) ? i.concat(un(t)) : [i, un(t)]) : un(t)) : i,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: c,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Ne ? (o === -1 ? 16 : o | 16) : o,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: l,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && Rt(e.ssContent),
      ssFallback: e.ssFallback && Rt(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
    }
  return l && s && bs(a, l.clone(a)), a
}
function qe(e = ' ', t = 0) {
  return ne(Cn, null, e, t)
}
function El(e, t) {
  const n = ne(fn, null, e)
  return (n.staticCount = t), n
}
function De(e) {
  return e == null || typeof e == 'boolean'
    ? ne(zt)
    : $(e)
      ? ne(Ne, null, e.slice())
      : bn(e)
        ? nt(e)
        : ne(Cn, null, String(e))
}
function nt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Rt(e)
}
function xs(e, t) {
  let n = 0
  const { shapeFlag: s } = e
  if (t == null) t = null
  else if ($(t)) n = 16
  else if (typeof t == 'object')
    if (s & 65) {
      const r = t.default
      r && (r._c && (r._d = !1), xs(e, r()), r._c && (r._d = !0))
      return
    } else {
      n = 32
      const r = t._
      !r && !oi(t)
        ? (t._ctx = $e)
        : r === 3 && $e && ($e.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    B(t)
      ? ((t = { default: t, _ctx: $e }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [qe(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function Sl(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const s = e[n]
    for (const r in s)
      if (r === 'class') t.class !== s.class && (t.class = ve([t.class, s.class]))
      else if (r === 'style') t.style = os([t.style, s.style])
      else if (vn(r)) {
        const i = t[r],
          o = s[r]
        o && i !== o && !($(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o)
      } else r !== '' && (t[r] = s[r])
  }
  return t
}
function je(e, t, n, s = null) {
  Ue(e, t, 7, [n, s])
}
const Rl = si()
let Pl = 0
function Cl(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || Rl,
    i = {
      uid: Pl++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new Rr(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      ids: t ? t.ids : ['', 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: ci(s, r),
      emitsOptions: bi(s, r),
      emit: null,
      emitted: null,
      propsDefaults: Z,
      inheritAttrs: s.inheritAttrs,
      ctx: Z,
      data: Z,
      props: Z,
      attrs: Z,
      slots: Z,
      refs: Z,
      setupState: Z,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    }
  return (
    (i.ctx = { _: i }), (i.root = t ? t.root : i), (i.emit = hl.bind(null, i)), e.ce && e.ce(i), i
  )
}
let he = null,
  _n,
  Jn
{
  const e = wn(),
    t = (n, s) => {
      let r
      return (
        (r = e[n]) || (r = e[n] = []),
        r.push(s),
        (i) => {
          r.length > 1 ? r.forEach((o) => o(i)) : r[0](i)
        }
      )
    }
  ;(_n = t('__VUE_INSTANCE_SETTERS__', (n) => (he = n))),
    (Jn = t('__VUE_SSR_SETTERS__', (n) => (Yt = n)))
}
const tn = (e) => {
    const t = he
    return (
      _n(e),
      e.scope.on(),
      () => {
        e.scope.off(), _n(t)
      }
    )
  },
  Vs = () => {
    he && he.scope.off(), _n(null)
  }
function yi(e) {
  return e.vnode.shapeFlag & 4
}
let Yt = !1
function Al(e, t = !1, n = !1) {
  t && Jn(t)
  const { props: s, children: r } = e.vnode,
    i = yi(e)
  Zo(e, s, i, t), sl(e, r, n)
  const o = i ? Ol(e, t) : void 0
  return t && Jn(!1), o
}
function Ol(e, t) {
  const n = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Wo))
  const { setup: s } = n
  if (s) {
    lt()
    const r = (e.setupContext = s.length > 1 ? Il(e) : null),
      i = tn(e),
      o = Zt(s, e, 0, [e.props, r]),
      c = xr(o)
    if ((ct(), i(), (c || e.sp) && !Bt(e) && Jr(e), c)) {
      if ((o.then(Vs, Vs), t))
        return o
          .then((l) => {
            Ks(e, l)
          })
          .catch((l) => {
            Sn(l, e, 0)
          })
      e.asyncDep = o
    } else Ks(e, o)
  } else xi(e)
}
function Ks(e, t, n) {
  B(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : se(t) && (e.setupState = kr(t)),
    xi(e)
}
function xi(e, t, n) {
  const s = e.type
  e.render || (e.render = s.render || He)
  {
    const r = tn(e)
    lt()
    try {
      qo(e)
    } finally {
      ct(), r()
    }
  }
}
const Tl = {
  get(e, t) {
    return le(e, 'get', ''), e[t]
  },
}
function Il(e) {
  const t = (n) => {
    e.exposed = n || {}
  }
  return { attrs: new Proxy(e.attrs, Tl), slots: e.slots, emit: e.emit, expose: t }
}
function ws(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(kr(Vr(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n]
            if (n in Ut) return Ut[n](e)
          },
          has(t, n) {
            return n in t || n in Ut
          },
        }))
    : e.proxy
}
function Ml(e) {
  return B(e) && '__vccOpts' in e
}
const Ee = (e, t) => So(e, t, Yt)
function wi(e, t, n) {
  const s = arguments.length
  return s === 2
    ? se(t) && !$(t)
      ? bn(t)
        ? ne(e, null, [t])
        : ne(e, t)
      : ne(e, null, t)
    : (s > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : s === 3 && bn(n) && (n = [n]),
      ne(e, t, n))
}
const Fl = '3.5.13'
/**
 * @vue/runtime-dom v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Xn
const ks = typeof window < 'u' && window.trustedTypes
if (ks)
  try {
    Xn = ks.createPolicy('vue', { createHTML: (e) => e })
  } catch {}
const Ei = Xn ? (e) => Xn.createHTML(e) : (e) => e,
  jl = 'http://www.w3.org/2000/svg',
  Ll = 'http://www.w3.org/1998/Math/MathML',
  ze = typeof document < 'u' ? document : null,
  Ws = ze && ze.createElement('template'),
  Nl = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, s) => {
      const r =
        t === 'svg'
          ? ze.createElementNS(jl, e)
          : t === 'mathml'
            ? ze.createElementNS(Ll, e)
            : n
              ? ze.createElement(e, { is: n })
              : ze.createElement(e)
      return e === 'select' && s && s.multiple != null && r.setAttribute('multiple', s.multiple), r
    },
    createText: (e) => ze.createTextNode(e),
    createComment: (e) => ze.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => ze.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    insertStaticContent(e, t, n, s, r, i) {
      const o = n ? n.previousSibling : t.lastChild
      if (r && (r === i || r.nextSibling))
        for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)); );
      else {
        Ws.innerHTML = Ei(
          s === 'svg' ? `<svg>${e}</svg>` : s === 'mathml' ? `<math>${e}</math>` : e,
        )
        const c = Ws.content
        if (s === 'svg' || s === 'mathml') {
          const l = c.firstChild
          for (; l.firstChild; ) c.appendChild(l.firstChild)
          c.removeChild(l)
        }
        t.insertBefore(c, n)
      }
      return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    },
  },
  Dl = Symbol('_vtc')
function $l(e, t, n) {
  const s = e[Dl]
  s && (t = (t ? [t, ...s] : [...s]).join(' ')),
    t == null ? e.removeAttribute('class') : n ? e.setAttribute('class', t) : (e.className = t)
}
const qs = Symbol('_vod'),
  Hl = Symbol('_vsh'),
  Bl = Symbol(''),
  Ul = /(^|;)\s*display\s*:/
function Vl(e, t, n) {
  const s = e.style,
    r = ie(n)
  let i = !1
  if (n && !r) {
    if (t)
      if (ie(t))
        for (const o of t.split(';')) {
          const c = o.slice(0, o.indexOf(':')).trim()
          n[c] == null && an(s, c, '')
        }
      else for (const o in t) n[o] == null && an(s, o, '')
    for (const o in n) o === 'display' && (i = !0), an(s, o, n[o])
  } else if (r) {
    if (t !== n) {
      const o = s[Bl]
      o && (n += ';' + o), (s.cssText = n), (i = Ul.test(n))
    }
  } else t && e.removeAttribute('style')
  qs in e && ((e[qs] = i ? s.display : ''), e[Hl] && (s.display = 'none'))
}
const Gs = /\s*!important$/
function an(e, t, n) {
  if ($(n)) n.forEach((s) => an(e, t, s))
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n)
  else {
    const s = Kl(e, t)
    Gs.test(n) ? e.setProperty(gt(s), n.replace(Gs, ''), 'important') : (e[s] = n)
  }
}
const zs = ['Webkit', 'Moz', 'ms'],
  Nn = {}
function Kl(e, t) {
  const n = Nn[t]
  if (n) return n
  let s = ot(t)
  if (s !== 'filter' && s in e) return (Nn[t] = s)
  s = wr(s)
  for (let r = 0; r < zs.length; r++) {
    const i = zs[r] + s
    if (i in e) return (Nn[t] = i)
  }
  return t
}
const Qs = 'http://www.w3.org/1999/xlink'
function Ys(e, t, n, s, r, i = Xi(t)) {
  s && t.startsWith('xlink:')
    ? n == null
      ? e.removeAttributeNS(Qs, t.slice(6, t.length))
      : e.setAttributeNS(Qs, t, n)
    : n == null || (i && !Sr(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? '' : At(n) ? String(n) : n)
}
function Js(e, t, n, s, r) {
  if (t === 'innerHTML' || t === 'textContent') {
    n != null && (e[t] = t === 'innerHTML' ? Ei(n) : n)
    return
  }
  const i = e.tagName
  if (t === 'value' && i !== 'PROGRESS' && !i.includes('-')) {
    const c = i === 'OPTION' ? e.getAttribute('value') || '' : e.value,
      l = n == null ? (e.type === 'checkbox' ? 'on' : '') : String(n)
    ;(c !== l || !('_value' in e)) && (e.value = l),
      n == null && e.removeAttribute(t),
      (e._value = n)
    return
  }
  let o = !1
  if (n === '' || n == null) {
    const c = typeof e[t]
    c === 'boolean'
      ? (n = Sr(n))
      : n == null && c === 'string'
        ? ((n = ''), (o = !0))
        : c === 'number' && ((n = 0), (o = !0))
  }
  try {
    e[t] = n
  } catch {}
  o && e.removeAttribute(r || t)
}
function kl(e, t, n, s) {
  e.addEventListener(t, n, s)
}
function Wl(e, t, n, s) {
  e.removeEventListener(t, n, s)
}
const Xs = Symbol('_vei')
function ql(e, t, n, s, r = null) {
  const i = e[Xs] || (e[Xs] = {}),
    o = i[t]
  if (s && o) o.value = s
  else {
    const [c, l] = Gl(t)
    if (s) {
      const h = (i[t] = Yl(s, r))
      kl(e, c, h, l)
    } else o && (Wl(e, c, o, l), (i[t] = void 0))
  }
}
const Zs = /(?:Once|Passive|Capture)$/
function Gl(e) {
  let t
  if (Zs.test(e)) {
    t = {}
    let s
    for (; (s = e.match(Zs)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0)
  }
  return [e[2] === ':' ? e.slice(3) : gt(e.slice(2)), t]
}
let Dn = 0
const zl = Promise.resolve(),
  Ql = () => Dn || (zl.then(() => (Dn = 0)), (Dn = Date.now()))
function Yl(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now()
    else if (s._vts <= n.attached) return
    Ue(Jl(s, n.value), t, 5, [s])
  }
  return (n.value = e), (n.attached = Ql()), n
}
function Jl(e, t) {
  if ($(t)) {
    const n = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0)
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    )
  } else return t
}
const er = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  Xl = (e, t, n, s, r, i) => {
    const o = r === 'svg'
    t === 'class'
      ? $l(e, s, o)
      : t === 'style'
        ? Vl(e, n, s)
        : vn(t)
          ? ss(t) || ql(e, t, n, s, i)
          : (
                t[0] === '.'
                  ? ((t = t.slice(1)), !0)
                  : t[0] === '^'
                    ? ((t = t.slice(1)), !1)
                    : Zl(e, t, s, o)
              )
            ? (Js(e, t, s),
              !e.tagName.includes('-') &&
                (t === 'value' || t === 'checked' || t === 'selected') &&
                Ys(e, t, s, o, i, t !== 'value'))
            : e._isVueCE && (/[A-Z]/.test(t) || !ie(s))
              ? Js(e, ot(t), s, i, t)
              : (t === 'true-value'
                  ? (e._trueValue = s)
                  : t === 'false-value' && (e._falseValue = s),
                Ys(e, t, s, o))
  }
function Zl(e, t, n, s) {
  if (s) return !!(t === 'innerHTML' || t === 'textContent' || (t in e && er(t) && B(n)))
  if (
    t === 'spellcheck' ||
    t === 'draggable' ||
    t === 'translate' ||
    t === 'form' ||
    (t === 'list' && e.tagName === 'INPUT') ||
    (t === 'type' && e.tagName === 'TEXTAREA')
  )
    return !1
  if (t === 'width' || t === 'height') {
    const r = e.tagName
    if (r === 'IMG' || r === 'VIDEO' || r === 'CANVAS' || r === 'SOURCE') return !1
  }
  return er(t) && ie(n) ? !1 : t in e
}
const ec = fe({ patchProp: Xl }, Nl)
let tr
function tc() {
  return tr || (tr = il(ec))
}
const nc = (...e) => {
  const t = tc().createApp(...e),
    { mount: n } = t
  return (
    (t.mount = (s) => {
      const r = rc(s)
      if (!r) return
      const i = t._component
      !B(i) && !i.render && !i.template && (i.template = r.innerHTML),
        r.nodeType === 1 && (r.textContent = '')
      const o = n(r, !1, sc(r))
      return (
        r instanceof Element && (r.removeAttribute('v-cloak'), r.setAttribute('data-v-app', '')), o
      )
    }),
    t
  )
}
function sc(e) {
  if (e instanceof SVGElement) return 'svg'
  if (typeof MathMLElement == 'function' && e instanceof MathMLElement) return 'mathml'
}
function rc(e) {
  return ie(e) ? document.querySelector(e) : e
}
/*!
 * pinia v2.3.0
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */ const ic = Symbol()
var nr
;(function (e) {
  ;(e.direct = 'direct'), (e.patchObject = 'patch object'), (e.patchFunction = 'patch function')
})(nr || (nr = {}))
function oc() {
  const e = Zi(!0),
    t = e.run(() => gs({}))
  let n = [],
    s = []
  const r = Vr({
    install(i) {
      ;(r._a = i),
        i.provide(ic, r),
        (i.config.globalProperties.$pinia = r),
        s.forEach((o) => n.push(o)),
        (s = [])
    },
    use(i) {
      return this._a ? n.push(i) : s.push(i), this
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  })
  return r
}
/*!
 * vue-router v4.5.0
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */ const xt = typeof document < 'u'
function Si(e) {
  return typeof e == 'object' || 'displayName' in e || 'props' in e || '__vccOpts' in e
}
function lc(e) {
  return e.__esModule || e[Symbol.toStringTag] === 'Module' || (e.default && Si(e.default))
}
const K = Object.assign
function $n(e, t) {
  const n = {}
  for (const s in t) {
    const r = t[s]
    n[s] = Pe(r) ? r.map(e) : e(r)
  }
  return n
}
const Kt = () => {},
  Pe = Array.isArray,
  Ri = /#/g,
  cc = /&/g,
  fc = /\//g,
  uc = /=/g,
  ac = /\?/g,
  Pi = /\+/g,
  dc = /%5B/g,
  hc = /%5D/g,
  Ci = /%5E/g,
  pc = /%60/g,
  Ai = /%7B/g,
  gc = /%7C/g,
  Oi = /%7D/g,
  mc = /%20/g
function Es(e) {
  return encodeURI('' + e)
    .replace(gc, '|')
    .replace(dc, '[')
    .replace(hc, ']')
}
function bc(e) {
  return Es(e).replace(Ai, '{').replace(Oi, '}').replace(Ci, '^')
}
function Zn(e) {
  return Es(e)
    .replace(Pi, '%2B')
    .replace(mc, '+')
    .replace(Ri, '%23')
    .replace(cc, '%26')
    .replace(pc, '`')
    .replace(Ai, '{')
    .replace(Oi, '}')
    .replace(Ci, '^')
}
function _c(e) {
  return Zn(e).replace(uc, '%3D')
}
function vc(e) {
  return Es(e).replace(Ri, '%23').replace(ac, '%3F')
}
function yc(e) {
  return e == null ? '' : vc(e).replace(fc, '%2F')
}
function Jt(e) {
  try {
    return decodeURIComponent('' + e)
  } catch {}
  return '' + e
}
const xc = /\/$/,
  wc = (e) => e.replace(xc, '')
function Hn(e, t, n = '/') {
  let s,
    r = {},
    i = '',
    o = ''
  const c = t.indexOf('#')
  let l = t.indexOf('?')
  return (
    c < l && c >= 0 && (l = -1),
    l > -1 && ((s = t.slice(0, l)), (i = t.slice(l + 1, c > -1 ? c : t.length)), (r = e(i))),
    c > -1 && ((s = s || t.slice(0, c)), (o = t.slice(c, t.length))),
    (s = Pc(s ?? t, n)),
    { fullPath: s + (i && '?') + i + o, path: s, query: r, hash: Jt(o) }
  )
}
function Ec(e, t) {
  const n = t.query ? e(t.query) : ''
  return t.path + (n && '?') + n + (t.hash || '')
}
function sr(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || '/'
}
function Sc(e, t, n) {
  const s = t.matched.length - 1,
    r = n.matched.length - 1
  return (
    s > -1 &&
    s === r &&
    Pt(t.matched[s], n.matched[r]) &&
    Ti(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  )
}
function Pt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}
function Ti(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1
  for (const n in e) if (!Rc(e[n], t[n])) return !1
  return !0
}
function Rc(e, t) {
  return Pe(e) ? rr(e, t) : Pe(t) ? rr(t, e) : e === t
}
function rr(e, t) {
  return Pe(t)
    ? e.length === t.length && e.every((n, s) => n === t[s])
    : e.length === 1 && e[0] === t
}
function Pc(e, t) {
  if (e.startsWith('/')) return e
  if (!e) return t
  const n = t.split('/'),
    s = e.split('/'),
    r = s[s.length - 1]
  ;(r === '..' || r === '.') && s.push('')
  let i = n.length - 1,
    o,
    c
  for (o = 0; o < s.length; o++)
    if (((c = s[o]), c !== '.'))
      if (c === '..') i > 1 && i--
      else break
  return n.slice(0, i).join('/') + '/' + s.slice(o).join('/')
}
const et = {
  path: '/',
  name: void 0,
  params: {},
  query: {},
  hash: '',
  fullPath: '/',
  matched: [],
  meta: {},
  redirectedFrom: void 0,
}
var Xt
;(function (e) {
  ;(e.pop = 'pop'), (e.push = 'push')
})(Xt || (Xt = {}))
var kt
;(function (e) {
  ;(e.back = 'back'), (e.forward = 'forward'), (e.unknown = '')
})(kt || (kt = {}))
function Cc(e) {
  if (!e)
    if (xt) {
      const t = document.querySelector('base')
      ;(e = (t && t.getAttribute('href')) || '/'), (e = e.replace(/^\w+:\/\/[^\/]+/, ''))
    } else e = '/'
  return e[0] !== '/' && e[0] !== '#' && (e = '/' + e), wc(e)
}
const Ac = /^[^#]+#/
function Oc(e, t) {
  return e.replace(Ac, '#') + t
}
function Tc(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    s = e.getBoundingClientRect()
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0),
  }
}
const An = () => ({ left: window.scrollX, top: window.scrollY })
function Ic(e) {
  let t
  if ('el' in e) {
    const n = e.el,
      s = typeof n == 'string' && n.startsWith('#'),
      r =
        typeof n == 'string'
          ? s
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n
    if (!r) return
    t = Tc(r, e)
  } else t = e
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.scrollX,
        t.top != null ? t.top : window.scrollY,
      )
}
function ir(e, t) {
  return (history.state ? history.state.position - t : -1) + e
}
const es = new Map()
function Mc(e, t) {
  es.set(e, t)
}
function Fc(e) {
  const t = es.get(e)
  return es.delete(e), t
}
let jc = () => location.protocol + '//' + location.host
function Ii(e, t) {
  const { pathname: n, search: s, hash: r } = t,
    i = e.indexOf('#')
  if (i > -1) {
    let c = r.includes(e.slice(i)) ? e.slice(i).length : 1,
      l = r.slice(c)
    return l[0] !== '/' && (l = '/' + l), sr(l, '')
  }
  return sr(n, e) + s + r
}
function Lc(e, t, n, s) {
  let r = [],
    i = [],
    o = null
  const c = ({ state: g }) => {
    const m = Ii(e, location),
      A = n.value,
      O = t.value
    let H = 0
    if (g) {
      if (((n.value = m), (t.value = g), o && o === A)) {
        o = null
        return
      }
      H = O ? g.position - O.position : 0
    } else s(m)
    r.forEach((j) => {
      j(n.value, A, {
        delta: H,
        type: Xt.pop,
        direction: H ? (H > 0 ? kt.forward : kt.back) : kt.unknown,
      })
    })
  }
  function l() {
    o = n.value
  }
  function h(g) {
    r.push(g)
    const m = () => {
      const A = r.indexOf(g)
      A > -1 && r.splice(A, 1)
    }
    return i.push(m), m
  }
  function a() {
    const { history: g } = window
    g.state && g.replaceState(K({}, g.state, { scroll: An() }), '')
  }
  function d() {
    for (const g of i) g()
    ;(i = []),
      window.removeEventListener('popstate', c),
      window.removeEventListener('beforeunload', a)
  }
  return (
    window.addEventListener('popstate', c),
    window.addEventListener('beforeunload', a, { passive: !0 }),
    { pauseListeners: l, listen: h, destroy: d }
  )
}
function or(e, t, n, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: r ? An() : null,
  }
}
function Nc(e) {
  const { history: t, location: n } = window,
    s = { value: Ii(e, n) },
    r = { value: t.state }
  r.value ||
    i(
      s.value,
      {
        back: null,
        current: s.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0,
    )
  function i(l, h, a) {
    const d = e.indexOf('#'),
      g = d > -1 ? (n.host && document.querySelector('base') ? e : e.slice(d)) + l : jc() + e + l
    try {
      t[a ? 'replaceState' : 'pushState'](h, '', g), (r.value = h)
    } catch (m) {
      console.error(m), n[a ? 'replace' : 'assign'](g)
    }
  }
  function o(l, h) {
    const a = K({}, t.state, or(r.value.back, l, r.value.forward, !0), h, {
      position: r.value.position,
    })
    i(l, a, !0), (s.value = l)
  }
  function c(l, h) {
    const a = K({}, r.value, t.state, { forward: l, scroll: An() })
    i(a.current, a, !0)
    const d = K({}, or(s.value, l, null), { position: a.position + 1 }, h)
    i(l, d, !1), (s.value = l)
  }
  return { location: s, state: r, push: c, replace: o }
}
function Dc(e) {
  e = Cc(e)
  const t = Nc(e),
    n = Lc(e, t.state, t.location, t.replace)
  function s(i, o = !0) {
    o || n.pauseListeners(), history.go(i)
  }
  const r = K({ location: '', base: e, go: s, createHref: Oc.bind(null, e) }, t, n)
  return (
    Object.defineProperty(r, 'location', { enumerable: !0, get: () => t.location.value }),
    Object.defineProperty(r, 'state', { enumerable: !0, get: () => t.state.value }),
    r
  )
}
function $c(e) {
  return typeof e == 'string' || (e && typeof e == 'object')
}
function Mi(e) {
  return typeof e == 'string' || typeof e == 'symbol'
}
const Fi = Symbol('')
var lr
;(function (e) {
  ;(e[(e.aborted = 4)] = 'aborted'),
    (e[(e.cancelled = 8)] = 'cancelled'),
    (e[(e.duplicated = 16)] = 'duplicated')
})(lr || (lr = {}))
function Ct(e, t) {
  return K(new Error(), { type: e, [Fi]: !0 }, t)
}
function ke(e, t) {
  return e instanceof Error && Fi in e && (t == null || !!(e.type & t))
}
const cr = '[^/]+?',
  Hc = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Bc = /[.+*?^${}()[\]/\\]/g
function Uc(e, t) {
  const n = K({}, Hc, t),
    s = []
  let r = n.start ? '^' : ''
  const i = []
  for (const h of e) {
    const a = h.length ? [] : [90]
    n.strict && !h.length && (r += '/')
    for (let d = 0; d < h.length; d++) {
      const g = h[d]
      let m = 40 + (n.sensitive ? 0.25 : 0)
      if (g.type === 0) d || (r += '/'), (r += g.value.replace(Bc, '\\$&')), (m += 40)
      else if (g.type === 1) {
        const { value: A, repeatable: O, optional: H, regexp: j } = g
        i.push({ name: A, repeatable: O, optional: H })
        const M = j || cr
        if (M !== cr) {
          m += 10
          try {
            new RegExp(`(${M})`)
          } catch (T) {
            throw new Error(`Invalid custom RegExp for param "${A}" (${M}): ` + T.message)
          }
        }
        let L = O ? `((?:${M})(?:/(?:${M}))*)` : `(${M})`
        d || (L = H && h.length < 2 ? `(?:/${L})` : '/' + L),
          H && (L += '?'),
          (r += L),
          (m += 20),
          H && (m += -8),
          O && (m += -20),
          M === '.*' && (m += -50)
      }
      a.push(m)
    }
    s.push(a)
  }
  if (n.strict && n.end) {
    const h = s.length - 1
    s[h][s[h].length - 1] += 0.7000000000000001
  }
  n.strict || (r += '/?'), n.end ? (r += '$') : n.strict && !r.endsWith('/') && (r += '(?:/|$)')
  const o = new RegExp(r, n.sensitive ? '' : 'i')
  function c(h) {
    const a = h.match(o),
      d = {}
    if (!a) return null
    for (let g = 1; g < a.length; g++) {
      const m = a[g] || '',
        A = i[g - 1]
      d[A.name] = m && A.repeatable ? m.split('/') : m
    }
    return d
  }
  function l(h) {
    let a = '',
      d = !1
    for (const g of e) {
      ;(!d || !a.endsWith('/')) && (a += '/'), (d = !1)
      for (const m of g)
        if (m.type === 0) a += m.value
        else if (m.type === 1) {
          const { value: A, repeatable: O, optional: H } = m,
            j = A in h ? h[A] : ''
          if (Pe(j) && !O)
            throw new Error(
              `Provided param "${A}" is an array but it is not repeatable (* or + modifiers)`,
            )
          const M = Pe(j) ? j.join('/') : j
          if (!M)
            if (H) g.length < 2 && (a.endsWith('/') ? (a = a.slice(0, -1)) : (d = !0))
            else throw new Error(`Missing required param "${A}"`)
          a += M
        }
    }
    return a || '/'
  }
  return { re: o, score: s, keys: i, parse: c, stringify: l }
}
function Vc(e, t) {
  let n = 0
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n]
    if (s) return s
    n++
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 80
      ? -1
      : 1
    : e.length > t.length
      ? t.length === 1 && t[0] === 80
        ? 1
        : -1
      : 0
}
function ji(e, t) {
  let n = 0
  const s = e.score,
    r = t.score
  for (; n < s.length && n < r.length; ) {
    const i = Vc(s[n], r[n])
    if (i) return i
    n++
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (fr(s)) return 1
    if (fr(r)) return -1
  }
  return r.length - s.length
}
function fr(e) {
  const t = e[e.length - 1]
  return e.length > 0 && t[t.length - 1] < 0
}
const Kc = { type: 0, value: '' },
  kc = /[a-zA-Z0-9_]/
function Wc(e) {
  if (!e) return [[]]
  if (e === '/') return [[Kc]]
  if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`)
  function t(m) {
    throw new Error(`ERR (${n})/"${h}": ${m}`)
  }
  let n = 0,
    s = n
  const r = []
  let i
  function o() {
    i && r.push(i), (i = [])
  }
  let c = 0,
    l,
    h = '',
    a = ''
  function d() {
    h &&
      (n === 0
        ? i.push({ type: 0, value: h })
        : n === 1 || n === 2 || n === 3
          ? (i.length > 1 &&
              (l === '*' || l === '+') &&
              t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`),
            i.push({
              type: 1,
              value: h,
              regexp: a,
              repeatable: l === '*' || l === '+',
              optional: l === '*' || l === '?',
            }))
          : t('Invalid state to consume buffer'),
      (h = ''))
  }
  function g() {
    h += l
  }
  for (; c < e.length; ) {
    if (((l = e[c++]), l === '\\' && n !== 2)) {
      ;(s = n), (n = 4)
      continue
    }
    switch (n) {
      case 0:
        l === '/' ? (h && d(), o()) : l === ':' ? (d(), (n = 1)) : g()
        break
      case 4:
        g(), (n = s)
        break
      case 1:
        l === '('
          ? (n = 2)
          : kc.test(l)
            ? g()
            : (d(), (n = 0), l !== '*' && l !== '?' && l !== '+' && c--)
        break
      case 2:
        l === ')' ? (a[a.length - 1] == '\\' ? (a = a.slice(0, -1) + l) : (n = 3)) : (a += l)
        break
      case 3:
        d(), (n = 0), l !== '*' && l !== '?' && l !== '+' && c--, (a = '')
        break
      default:
        t('Unknown state')
        break
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), d(), o(), r
}
function qc(e, t, n) {
  const s = Uc(Wc(e.path), n),
    r = K(s, { record: e, parent: t, children: [], alias: [] })
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r
}
function Gc(e, t) {
  const n = [],
    s = new Map()
  t = hr({ strict: !1, end: !0, sensitive: !1 }, t)
  function r(d) {
    return s.get(d)
  }
  function i(d, g, m) {
    const A = !m,
      O = ar(d)
    O.aliasOf = m && m.record
    const H = hr(t, d),
      j = [O]
    if ('alias' in d) {
      const T = typeof d.alias == 'string' ? [d.alias] : d.alias
      for (const z of T)
        j.push(
          ar(
            K({}, O, {
              components: m ? m.record.components : O.components,
              path: z,
              aliasOf: m ? m.record : O,
            }),
          ),
        )
    }
    let M, L
    for (const T of j) {
      const { path: z } = T
      if (g && z[0] !== '/') {
        const oe = g.record.path,
          ee = oe[oe.length - 1] === '/' ? '' : '/'
        T.path = g.record.path + (z && ee + z)
      }
      if (
        ((M = qc(T, g, H)),
        m
          ? m.alias.push(M)
          : ((L = L || M), L !== M && L.alias.push(M), A && d.name && !dr(M) && o(d.name)),
        Li(M) && l(M),
        O.children)
      ) {
        const oe = O.children
        for (let ee = 0; ee < oe.length; ee++) i(oe[ee], M, m && m.children[ee])
      }
      m = m || M
    }
    return L
      ? () => {
          o(L)
        }
      : Kt
  }
  function o(d) {
    if (Mi(d)) {
      const g = s.get(d)
      g && (s.delete(d), n.splice(n.indexOf(g), 1), g.children.forEach(o), g.alias.forEach(o))
    } else {
      const g = n.indexOf(d)
      g > -1 &&
        (n.splice(g, 1),
        d.record.name && s.delete(d.record.name),
        d.children.forEach(o),
        d.alias.forEach(o))
    }
  }
  function c() {
    return n
  }
  function l(d) {
    const g = Yc(d, n)
    n.splice(g, 0, d), d.record.name && !dr(d) && s.set(d.record.name, d)
  }
  function h(d, g) {
    let m,
      A = {},
      O,
      H
    if ('name' in d && d.name) {
      if (((m = s.get(d.name)), !m)) throw Ct(1, { location: d })
      ;(H = m.record.name),
        (A = K(
          ur(
            g.params,
            m.keys
              .filter((L) => !L.optional)
              .concat(m.parent ? m.parent.keys.filter((L) => L.optional) : [])
              .map((L) => L.name),
          ),
          d.params &&
            ur(
              d.params,
              m.keys.map((L) => L.name),
            ),
        )),
        (O = m.stringify(A))
    } else if (d.path != null)
      (O = d.path), (m = n.find((L) => L.re.test(O))), m && ((A = m.parse(O)), (H = m.record.name))
    else {
      if (((m = g.name ? s.get(g.name) : n.find((L) => L.re.test(g.path))), !m))
        throw Ct(1, { location: d, currentLocation: g })
      ;(H = m.record.name), (A = K({}, g.params, d.params)), (O = m.stringify(A))
    }
    const j = []
    let M = m
    for (; M; ) j.unshift(M.record), (M = M.parent)
    return { name: H, path: O, params: A, matched: j, meta: Qc(j) }
  }
  e.forEach((d) => i(d))
  function a() {
    ;(n.length = 0), s.clear()
  }
  return {
    addRoute: i,
    resolve: h,
    removeRoute: o,
    clearRoutes: a,
    getRoutes: c,
    getRecordMatcher: r,
  }
}
function ur(e, t) {
  const n = {}
  for (const s of t) s in e && (n[s] = e[s])
  return n
}
function ar(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: zc(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components: 'components' in e ? e.components || null : e.component && { default: e.component },
  }
  return Object.defineProperty(t, 'mods', { value: {} }), t
}
function zc(e) {
  const t = {},
    n = e.props || !1
  if ('component' in e) t.default = n
  else for (const s in e.components) t[s] = typeof n == 'object' ? n[s] : n
  return t
}
function dr(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0
    e = e.parent
  }
  return !1
}
function Qc(e) {
  return e.reduce((t, n) => K(t, n.meta), {})
}
function hr(e, t) {
  const n = {}
  for (const s in e) n[s] = s in t ? t[s] : e[s]
  return n
}
function Yc(e, t) {
  let n = 0,
    s = t.length
  for (; n !== s; ) {
    const i = (n + s) >> 1
    ji(e, t[i]) < 0 ? (s = i) : (n = i + 1)
  }
  const r = Jc(e)
  return r && (s = t.lastIndexOf(r, s - 1)), s
}
function Jc(e) {
  let t = e
  for (; (t = t.parent); ) if (Li(t) && ji(e, t) === 0) return t
}
function Li({ record: e }) {
  return !!(e.name || (e.components && Object.keys(e.components).length) || e.redirect)
}
function Xc(e) {
  const t = {}
  if (e === '' || e === '?') return t
  const s = (e[0] === '?' ? e.slice(1) : e).split('&')
  for (let r = 0; r < s.length; ++r) {
    const i = s[r].replace(Pi, ' '),
      o = i.indexOf('='),
      c = Jt(o < 0 ? i : i.slice(0, o)),
      l = o < 0 ? null : Jt(i.slice(o + 1))
    if (c in t) {
      let h = t[c]
      Pe(h) || (h = t[c] = [h]), h.push(l)
    } else t[c] = l
  }
  return t
}
function pr(e) {
  let t = ''
  for (let n in e) {
    const s = e[n]
    if (((n = _c(n)), s == null)) {
      s !== void 0 && (t += (t.length ? '&' : '') + n)
      continue
    }
    ;(Pe(s) ? s.map((i) => i && Zn(i)) : [s && Zn(s)]).forEach((i) => {
      i !== void 0 && ((t += (t.length ? '&' : '') + n), i != null && (t += '=' + i))
    })
  }
  return t
}
function Zc(e) {
  const t = {}
  for (const n in e) {
    const s = e[n]
    s !== void 0 &&
      (t[n] = Pe(s) ? s.map((r) => (r == null ? null : '' + r)) : s == null ? s : '' + s)
  }
  return t
}
const ef = Symbol(''),
  gr = Symbol(''),
  Ss = Symbol(''),
  Rs = Symbol(''),
  ts = Symbol('')
function Ft() {
  let e = []
  function t(s) {
    return (
      e.push(s),
      () => {
        const r = e.indexOf(s)
        r > -1 && e.splice(r, 1)
      }
    )
  }
  function n() {
    e = []
  }
  return { add: t, list: () => e.slice(), reset: n }
}
function st(e, t, n, s, r, i = (o) => o()) {
  const o = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || [])
  return () =>
    new Promise((c, l) => {
      const h = (g) => {
          g === !1
            ? l(Ct(4, { from: n, to: t }))
            : g instanceof Error
              ? l(g)
              : $c(g)
                ? l(Ct(2, { from: t, to: g }))
                : (o && s.enterCallbacks[r] === o && typeof g == 'function' && o.push(g), c())
        },
        a = i(() => e.call(s && s.instances[r], t, n, h))
      let d = Promise.resolve(a)
      e.length < 3 && (d = d.then(h)), d.catch((g) => l(g))
    })
}
function Bn(e, t, n, s, r = (i) => i()) {
  const i = []
  for (const o of e)
    for (const c in o.components) {
      let l = o.components[c]
      if (!(t !== 'beforeRouteEnter' && !o.instances[c]))
        if (Si(l)) {
          const a = (l.__vccOpts || l)[t]
          a && i.push(st(a, n, s, o, c, r))
        } else {
          let h = l()
          i.push(() =>
            h.then((a) => {
              if (!a) throw new Error(`Couldn't resolve component "${c}" at "${o.path}"`)
              const d = lc(a) ? a.default : a
              ;(o.mods[c] = a), (o.components[c] = d)
              const m = (d.__vccOpts || d)[t]
              return m && st(m, n, s, o, c, r)()
            }),
          )
        }
    }
  return i
}
function mr(e) {
  const t = Be(Ss),
    n = Be(Rs),
    s = Ee(() => {
      const l = te(e.to)
      return t.resolve(l)
    }),
    r = Ee(() => {
      const { matched: l } = s.value,
        { length: h } = l,
        a = l[h - 1],
        d = n.matched
      if (!a || !d.length) return -1
      const g = d.findIndex(Pt.bind(null, a))
      if (g > -1) return g
      const m = br(l[h - 2])
      return h > 1 && br(a) === m && d[d.length - 1].path !== m
        ? d.findIndex(Pt.bind(null, l[h - 2]))
        : g
    }),
    i = Ee(() => r.value > -1 && rf(n.params, s.value.params)),
    o = Ee(() => r.value > -1 && r.value === n.matched.length - 1 && Ti(n.params, s.value.params))
  function c(l = {}) {
    if (sf(l)) {
      const h = t[te(e.replace) ? 'replace' : 'push'](te(e.to)).catch(Kt)
      return (
        e.viewTransition &&
          typeof document < 'u' &&
          'startViewTransition' in document &&
          document.startViewTransition(() => h),
        h
      )
    }
    return Promise.resolve()
  }
  return { route: s, href: Ee(() => s.value.href), isActive: i, isExactActive: o, navigate: c }
}
function tf(e) {
  return e.length === 1 ? e[0] : e
}
const nf = en({
    name: 'RouterLink',
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: 'page' },
    },
    useLink: mr,
    setup(e, { slots: t }) {
      const n = En(mr(e)),
        { options: s } = Be(Ss),
        r = Ee(() => ({
          [_r(e.activeClass, s.linkActiveClass, 'router-link-active')]: n.isActive,
          [_r(e.exactActiveClass, s.linkExactActiveClass, 'router-link-exact-active')]:
            n.isExactActive,
        }))
      return () => {
        const i = t.default && tf(t.default(n))
        return e.custom
          ? i
          : wi(
              'a',
              {
                'aria-current': n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: r.value,
              },
              i,
            )
      }
    },
  }),
  Ge = nf
function sf(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute('target')
      if (/\b_blank\b/i.test(t)) return
    }
    return e.preventDefault && e.preventDefault(), !0
  }
}
function rf(e, t) {
  for (const n in t) {
    const s = t[n],
      r = e[n]
    if (typeof s == 'string') {
      if (s !== r) return !1
    } else if (!Pe(r) || r.length !== s.length || s.some((i, o) => i !== r[o])) return !1
  }
  return !0
}
function br(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : ''
}
const _r = (e, t, n) => e ?? t ?? n,
  of = en({
    name: 'RouterView',
    inheritAttrs: !1,
    props: { name: { type: String, default: 'default' }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const s = Be(ts),
        r = Ee(() => e.route || s.value),
        i = Be(gr, 0),
        o = Ee(() => {
          let h = te(i)
          const { matched: a } = r.value
          let d
          for (; (d = a[h]) && !d.components; ) h++
          return h
        }),
        c = Ee(() => r.value.matched[o.value])
      ln(
        gr,
        Ee(() => o.value + 1),
      ),
        ln(ef, c),
        ln(ts, r)
      const l = gs()
      return (
        cn(
          () => [l.value, c.value, e.name],
          ([h, a, d], [g, m, A]) => {
            a &&
              ((a.instances[d] = h),
              m &&
                m !== a &&
                h &&
                h === g &&
                (a.leaveGuards.size || (a.leaveGuards = m.leaveGuards),
                a.updateGuards.size || (a.updateGuards = m.updateGuards))),
              h && a && (!m || !Pt(a, m) || !g) && (a.enterCallbacks[d] || []).forEach((O) => O(h))
          },
          { flush: 'post' },
        ),
        () => {
          const h = r.value,
            a = e.name,
            d = c.value,
            g = d && d.components[a]
          if (!g) return vr(n.default, { Component: g, route: h })
          const m = d.props[a],
            A = m ? (m === !0 ? h.params : typeof m == 'function' ? m(h) : m) : null,
            H = wi(
              g,
              K({}, A, t, {
                onVnodeUnmounted: (j) => {
                  j.component.isUnmounted && (d.instances[a] = null)
                },
                ref: l,
              }),
            )
          return vr(n.default, { Component: H, route: h }) || H
        }
      )
    },
  })
function vr(e, t) {
  if (!e) return null
  const n = e(t)
  return n.length === 1 ? n[0] : n
}
const Ni = of
function lf(e) {
  const t = Gc(e.routes, e),
    n = e.parseQuery || Xc,
    s = e.stringifyQuery || pr,
    r = e.history,
    i = Ft(),
    o = Ft(),
    c = Ft(),
    l = yo(et)
  let h = et
  xt && e.scrollBehavior && 'scrollRestoration' in history && (history.scrollRestoration = 'manual')
  const a = $n.bind(null, (_) => '' + _),
    d = $n.bind(null, yc),
    g = $n.bind(null, Jt)
  function m(_, C) {
    let R, I
    return Mi(_) ? ((R = t.getRecordMatcher(_)), (I = C)) : (I = _), t.addRoute(I, R)
  }
  function A(_) {
    const C = t.getRecordMatcher(_)
    C && t.removeRoute(C)
  }
  function O() {
    return t.getRoutes().map((_) => _.record)
  }
  function H(_) {
    return !!t.getRecordMatcher(_)
  }
  function j(_, C) {
    if (((C = K({}, C || l.value)), typeof _ == 'string')) {
      const p = Hn(n, _, C.path),
        b = t.resolve({ path: p.path }, C),
        y = r.createHref(p.fullPath)
      return K(p, b, { params: g(b.params), hash: Jt(p.hash), redirectedFrom: void 0, href: y })
    }
    let R
    if (_.path != null) R = K({}, _, { path: Hn(n, _.path, C.path).path })
    else {
      const p = K({}, _.params)
      for (const b in p) p[b] == null && delete p[b]
      ;(R = K({}, _, { params: d(p) })), (C.params = d(C.params))
    }
    const I = t.resolve(R, C),
      Q = _.hash || ''
    I.params = a(g(I.params))
    const f = Ec(s, K({}, _, { hash: bc(Q), path: I.path })),
      u = r.createHref(f)
    return K({ fullPath: f, hash: Q, query: s === pr ? Zc(_.query) : _.query || {} }, I, {
      redirectedFrom: void 0,
      href: u,
    })
  }
  function M(_) {
    return typeof _ == 'string' ? Hn(n, _, l.value.path) : K({}, _)
  }
  function L(_, C) {
    if (h !== _) return Ct(8, { from: C, to: _ })
  }
  function T(_) {
    return ee(_)
  }
  function z(_) {
    return T(K(M(_), { replace: !0 }))
  }
  function oe(_) {
    const C = _.matched[_.matched.length - 1]
    if (C && C.redirect) {
      const { redirect: R } = C
      let I = typeof R == 'function' ? R(_) : R
      return (
        typeof I == 'string' &&
          ((I = I.includes('?') || I.includes('#') ? (I = M(I)) : { path: I }), (I.params = {})),
        K({ query: _.query, hash: _.hash, params: I.path != null ? {} : _.params }, I)
      )
    }
  }
  function ee(_, C) {
    const R = (h = j(_)),
      I = l.value,
      Q = _.state,
      f = _.force,
      u = _.replace === !0,
      p = oe(R)
    if (p)
      return ee(
        K(M(p), { state: typeof p == 'object' ? K({}, Q, p.state) : Q, force: f, replace: u }),
        C || R,
      )
    const b = R
    b.redirectedFrom = C
    let y
    return (
      !f && Sc(s, I, R) && ((y = Ct(16, { to: b, from: I })), Te(I, I, !0, !1)),
      (y ? Promise.resolve(y) : Ae(b, I))
        .catch((v) => (ke(v) ? (ke(v, 2) ? v : Ze(v)) : V(v, b, I)))
        .then((v) => {
          if (v) {
            if (ke(v, 2))
              return ee(
                K({ replace: u }, M(v.to), {
                  state: typeof v.to == 'object' ? K({}, Q, v.to.state) : Q,
                  force: f,
                }),
                C || b,
              )
          } else v = ft(b, I, !0, u, Q)
          return Xe(b, I, v), v
        })
    )
  }
  function Ce(_, C) {
    const R = L(_, C)
    return R ? Promise.reject(R) : Promise.resolve()
  }
  function Je(_) {
    const C = _t.values().next().value
    return C && typeof C.runWithContext == 'function' ? C.runWithContext(_) : _()
  }
  function Ae(_, C) {
    let R
    const [I, Q, f] = cf(_, C)
    R = Bn(I.reverse(), 'beforeRouteLeave', _, C)
    for (const p of I)
      p.leaveGuards.forEach((b) => {
        R.push(st(b, _, C))
      })
    const u = Ce.bind(null, _, C)
    return (
      R.push(u),
      we(R)
        .then(() => {
          R = []
          for (const p of i.list()) R.push(st(p, _, C))
          return R.push(u), we(R)
        })
        .then(() => {
          R = Bn(Q, 'beforeRouteUpdate', _, C)
          for (const p of Q)
            p.updateGuards.forEach((b) => {
              R.push(st(b, _, C))
            })
          return R.push(u), we(R)
        })
        .then(() => {
          R = []
          for (const p of f)
            if (p.beforeEnter)
              if (Pe(p.beforeEnter)) for (const b of p.beforeEnter) R.push(st(b, _, C))
              else R.push(st(p.beforeEnter, _, C))
          return R.push(u), we(R)
        })
        .then(
          () => (
            _.matched.forEach((p) => (p.enterCallbacks = {})),
            (R = Bn(f, 'beforeRouteEnter', _, C, Je)),
            R.push(u),
            we(R)
          ),
        )
        .then(() => {
          R = []
          for (const p of o.list()) R.push(st(p, _, C))
          return R.push(u), we(R)
        })
        .catch((p) => (ke(p, 8) ? p : Promise.reject(p)))
    )
  }
  function Xe(_, C, R) {
    c.list().forEach((I) => Je(() => I(_, C, R)))
  }
  function ft(_, C, R, I, Q) {
    const f = L(_, C)
    if (f) return f
    const u = C === et,
      p = xt ? history.state : {}
    R &&
      (I || u
        ? r.replace(_.fullPath, K({ scroll: u && p && p.scroll }, Q))
        : r.push(_.fullPath, Q)),
      (l.value = _),
      Te(_, C, R, u),
      Ze()
  }
  let Oe
  function Ot() {
    Oe ||
      (Oe = r.listen((_, C, R) => {
        if (!nn.listening) return
        const I = j(_),
          Q = oe(I)
        if (Q) {
          ee(K(Q, { replace: !0, force: !0 }), I).catch(Kt)
          return
        }
        h = I
        const f = l.value
        xt && Mc(ir(f.fullPath, R.delta), An()),
          Ae(I, f)
            .catch((u) =>
              ke(u, 12)
                ? u
                : ke(u, 2)
                  ? (ee(K(M(u.to), { force: !0 }), I)
                      .then((p) => {
                        ke(p, 20) && !R.delta && R.type === Xt.pop && r.go(-1, !1)
                      })
                      .catch(Kt),
                    Promise.reject())
                  : (R.delta && r.go(-R.delta, !1), V(u, I, f)),
            )
            .then((u) => {
              ;(u = u || ft(I, f, !1)),
                u &&
                  (R.delta && !ke(u, 8)
                    ? r.go(-R.delta, !1)
                    : R.type === Xt.pop && ke(u, 20) && r.go(-1, !1)),
                Xe(I, f, u)
            })
            .catch(Kt)
      }))
  }
  let mt = Ft(),
    re = Ft(),
    G
  function V(_, C, R) {
    Ze(_)
    const I = re.list()
    return I.length ? I.forEach((Q) => Q(_, C, R)) : console.error(_), Promise.reject(_)
  }
  function Ve() {
    return G && l.value !== et
      ? Promise.resolve()
      : new Promise((_, C) => {
          mt.add([_, C])
        })
  }
  function Ze(_) {
    return G || ((G = !_), Ot(), mt.list().forEach(([C, R]) => (_ ? R(_) : C())), mt.reset()), _
  }
  function Te(_, C, R, I) {
    const { scrollBehavior: Q } = e
    if (!xt || !Q) return Promise.resolve()
    const f =
      (!R && Fc(ir(_.fullPath, 0))) || ((I || !R) && history.state && history.state.scroll) || null
    return qr()
      .then(() => Q(_, C, f))
      .then((u) => u && Ic(u))
      .catch((u) => V(u, _, C))
  }
  const pe = (_) => r.go(_)
  let bt
  const _t = new Set(),
    nn = {
      currentRoute: l,
      listening: !0,
      addRoute: m,
      removeRoute: A,
      clearRoutes: t.clearRoutes,
      hasRoute: H,
      getRoutes: O,
      resolve: j,
      options: e,
      push: T,
      replace: z,
      go: pe,
      back: () => pe(-1),
      forward: () => pe(1),
      beforeEach: i.add,
      beforeResolve: o.add,
      afterEach: c.add,
      onError: re.add,
      isReady: Ve,
      install(_) {
        const C = this
        _.component('RouterLink', Ge),
          _.component('RouterView', Ni),
          (_.config.globalProperties.$router = C),
          Object.defineProperty(_.config.globalProperties, '$route', {
            enumerable: !0,
            get: () => te(l),
          }),
          xt && !bt && l.value === et && ((bt = !0), T(r.location).catch((Q) => {}))
        const R = {}
        for (const Q in et) Object.defineProperty(R, Q, { get: () => l.value[Q], enumerable: !0 })
        _.provide(Ss, C), _.provide(Rs, Br(R)), _.provide(ts, l)
        const I = _.unmount
        _t.add(_),
          (_.unmount = function () {
            _t.delete(_),
              _t.size < 1 &&
                ((h = et), Oe && Oe(), (Oe = null), (l.value = et), (bt = !1), (G = !1)),
              I()
          })
      },
    }
  function we(_) {
    return _.reduce((C, R) => C.then(() => Je(R)), Promise.resolve())
  }
  return nn
}
function cf(e, t) {
  const n = [],
    s = [],
    r = [],
    i = Math.max(t.matched.length, e.matched.length)
  for (let o = 0; o < i; o++) {
    const c = t.matched[o]
    c && (e.matched.find((h) => Pt(h, c)) ? s.push(c) : n.push(c))
    const l = e.matched[o]
    l && (t.matched.find((h) => Pt(h, l)) || r.push(l))
  }
  return [n, s, r]
}
function ff(e) {
  return Be(Rs)
}
const uf = '/bright-motion-ventures/assets/Final-logo-DXisw9NX.png',
  af = '/bright-motion-ventures/assets/logo4-DHXxLtoC.png',
  df = '/bright-motion-ventures/assets/Name2-OEtbsRnj.png',
  hf = {
    class: 'fixed w-full h-16 flex justify-between items-center p-4 bg-transparent text-white',
  },
  pf = { class: 'hidden md:block mr-4' },
  gf = { class: 'flex space-x-8' },
  mf = { class: 'space-y-8 text-center' },
  bf = en({
    __name: 'NavigationBar',
    setup(e) {
      const t = ff(),
        n = gs(!1)
      function s() {
        console.log(t.name), (n.value = !n.value), console.log('end function')
      }
      return (r, i) => (
        vs(),
        ys('div', hf, [
          i[10] ||
            (i[10] = Y(
              'div',
              { class: 'flex items-center p-2' },
              [Y('img', { src: uf, alt: '', class: 'h-20 w-auto' })],
              -1,
            )),
          Y('div', pf, [
            Y('ul', gf, [
              Y(
                'li',
                {
                  class: ve([
                    'hover:border-b hover:border-primaryColour hover:text-primaryColour',
                    { 'border-b border-primaryColour text-primaryColour': te(t).name === 'home' },
                  ]),
                },
                [
                  ne(
                    te(Ge),
                    { to: '/' },
                    { default: We(() => i[0] || (i[0] = [qe('Home')])), _: 1 },
                  ),
                ],
                2,
              ),
              Y(
                'li',
                {
                  class: ve([
                    'hover:border-b hover:border-primaryColour hover:text-primaryColour',
                    { 'border-b border-primaryColour text-primaryColour': te(t).name === 'about' },
                  ]),
                },
                [
                  ne(
                    te(Ge),
                    { to: '/about' },
                    { default: We(() => i[1] || (i[1] = [qe('About')])), _: 1 },
                  ),
                ],
                2,
              ),
              Y(
                'li',
                {
                  class: ve([
                    'hover:border-b hover:border-primaryColour hover:text-primaryColour',
                    {
                      'border-b border-primaryColour text-primaryColour': te(t).name === 'projects',
                    },
                  ]),
                },
                [
                  ne(
                    te(Ge),
                    { to: '/projects' },
                    { default: We(() => i[2] || (i[2] = [qe('Projects')])), _: 1 },
                  ),
                ],
                2,
              ),
              Y(
                'li',
                {
                  class: ve([
                    'hover:border-b hover:border-primaryColour hover:text-primaryColour',
                    {
                      'border-b border-primaryColour text-primaryColour': te(t).name === 'contact',
                    },
                  ]),
                },
                [
                  ne(
                    te(Ge),
                    { to: '/contact' },
                    { default: We(() => i[3] || (i[3] = [qe('Contact')])), _: 1 },
                  ),
                ],
                2,
              ),
            ]),
          ]),
          Y('div', { class: 'block md:hidden scale-50 z-50', onClick: s }, [
            Y(
              'div',
              { class: ve([{ open: n.value }, 'hamburger']) },
              i[4] ||
                (i[4] = [
                  Y('span', null, null, -1),
                  Y('span', null, null, -1),
                  Y('span', null, null, -1),
                ]),
              2,
            ),
          ]),
          Y(
            'div',
            {
              class: ve([
                'h-screen w-screen bg-black absolute top-0 left-0 -translate-y-full transform-gpu duration-300 flex flex-col justify-center items-center',
                { 'translate-y-0': n.value },
              ]),
            },
            [
              i[9] ||
                (i[9] = Y(
                  'div',
                  { class: 'absolute left-1/2 transform -translate-x-1/2 top-20 w-60' },
                  [
                    Y('div', { class: 'flex flex-col items-center' }, [
                      Y('img', { src: af, alt: '', class: 'h-16 w-16' }),
                      Y('img', { src: df, alt: '', class: '' }),
                    ]),
                  ],
                  -1,
                )),
              Y('ul', mf, [
                Y(
                  'li',
                  {
                    class: ve([
                      'hover:border-b hover:border-primaryColour hover:text-primaryColour',
                      { 'border-b border-primaryColour text-primaryColour': te(t).name === 'home' },
                    ]),
                  },
                  [
                    ne(
                      te(Ge),
                      { onClick: s, to: '/' },
                      { default: We(() => i[5] || (i[5] = [qe('Home')])), _: 1 },
                    ),
                  ],
                  2,
                ),
                Y(
                  'li',
                  {
                    class: ve([
                      'hover:border-b hover:border-primaryColour hover:text-primaryColour',
                      {
                        'border-b border-primaryColour text-primaryColour': te(t).name === 'about',
                      },
                    ]),
                  },
                  [
                    ne(
                      te(Ge),
                      { onClick: s, to: '/about' },
                      { default: We(() => i[6] || (i[6] = [qe('About')])), _: 1 },
                    ),
                  ],
                  2,
                ),
                Y(
                  'li',
                  {
                    class: ve([
                      'hover:border-b hover:border-primaryColour hover:text-primaryColour',
                      {
                        'border-b border-primaryColour text-primaryColour':
                          te(t).name === 'projects',
                      },
                    ]),
                  },
                  [
                    ne(
                      te(Ge),
                      { onClick: s, to: '/projects' },
                      { default: We(() => i[7] || (i[7] = [qe('Projects')])), _: 1 },
                    ),
                  ],
                  2,
                ),
                Y(
                  'li',
                  {
                    class: ve([
                      'hover:border-b hover:border-primaryColour hover:text-primaryColour',
                      {
                        'border-b border-primaryColour text-primaryColour':
                          te(t).name === 'contact',
                      },
                    ]),
                  },
                  [
                    ne(
                      te(Ge),
                      { onClick: s, to: '/contact' },
                      { default: We(() => i[8] || (i[8] = [qe('Contact')])), _: 1 },
                    ),
                  ],
                  2,
                ),
              ]),
            ],
            2,
          ),
        ])
      )
    },
  }),
  Di = (e, t) => {
    const n = e.__vccOpts || e
    for (const [s, r] of t) n[s] = r
    return n
  },
  _f = Di(bf, [['__scopeId', 'data-v-eb97311f']]),
  vf = { class: '' },
  yf = en({
    __name: 'App',
    setup(e) {
      return (t, n) => (
        vs(),
        ys(
          Ne,
          null,
          [Y('header', null, [ne(_f, { class: 'z-50' })]), Y('main', vf, [ne(te(Ni))])],
          64,
        )
      )
    },
  }),
  xf = Di(yf, [['__scopeId', 'data-v-46f8317c']]),
  wf = 'modulepreload',
  Ef = function (e) {
    return '/bright-motion-ventures/' + e
  },
  yr = {},
  Un = function (t, n, s) {
    let r = Promise.resolve()
    if (n && n.length > 0) {
      document.getElementsByTagName('link')
      const o = document.querySelector('meta[property=csp-nonce]'),
        c = (o == null ? void 0 : o.nonce) || (o == null ? void 0 : o.getAttribute('nonce'))
      r = Promise.allSettled(
        n.map((l) => {
          if (((l = Ef(l)), l in yr)) return
          yr[l] = !0
          const h = l.endsWith('.css'),
            a = h ? '[rel="stylesheet"]' : ''
          if (document.querySelector(`link[href="${l}"]${a}`)) return
          const d = document.createElement('link')
          if (
            ((d.rel = h ? 'stylesheet' : wf),
            h || (d.as = 'script'),
            (d.crossOrigin = ''),
            (d.href = l),
            c && d.setAttribute('nonce', c),
            document.head.appendChild(d),
            h)
          )
            return new Promise((g, m) => {
              d.addEventListener('load', g),
                d.addEventListener('error', () => m(new Error(`Unable to preload CSS for ${l}`)))
            })
        }),
      )
    }
    function i(o) {
      const c = new Event('vite:preloadError', { cancelable: !0 })
      if (((c.payload = o), window.dispatchEvent(c), !c.defaultPrevented)) throw o
    }
    return r.then((o) => {
      for (const c of o || []) c.status === 'rejected' && i(c.reason)
      return t().catch(i)
    })
  },
  Sf = '/bright-motion-ventures/assets/landing-image-3to0Qr4m.png',
  Rf = en({
    __name: 'LandingPage',
    setup(e) {
      return (t, n) => (
        vs(),
        ys(
          'div',
          null,
          n[0] ||
            (n[0] = [
              El(
                '<div class="relative"><img src="' +
                  Sf +
                  '" alt="" class="h-screen w-screen object-cover"><div class="absolute h-screen w-screen bg-black opacity-50 top-0 left-0 h-auto"></div><div class="absolute flex inset-0 items-center justify-center md:justify-start md:ml-[25%] text-white"><div><p class="max-w-60 md:max-w-xl lg:max-w-2xl text-3xl md:text-3xl lg:text-5xl mb-6 font-semibold"> Driving sustainability </p><p class="max-w-52 md:max-w-md text-2xl lg:text-3xl"> Developed with international expertise and innovation </p><div class="flex flex-col md:flex-row mt-6"><button class="h-12 w-52 bg-primaryColour rounded hover:bg-white hover:text-primaryColour mr-8 mb-4 md:mb-0"> Find out more </button><button class="h-12 w-52 hover:bg-primaryColour rounded bg-white text-primaryColour hover:text-white"> Contact us </button></div></div></div></div>',
                1,
              ),
            ]),
        )
      )
    },
  }),
  Pf = lf({
    history: Dc('/bright-motion-ventures/'),
    routes: [
      { path: '/', name: 'home', component: Rf },
      {
        path: '/about',
        name: 'about',
        component: () => Un(() => import('./AboutPage-DntjD7Eh.js'), []),
      },
      {
        path: '/projects',
        name: 'projects',
        component: () => Un(() => import('./ProjectPage-BdgkW4vb.js'), []),
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => Un(() => import('./ContactPage-hlL1LXwl.js'), []),
      },
    ],
  }),
  Ps = nc(xf)
Ps.use(oc())
Ps.use(Pf)
Ps.mount('#app')
export { Di as _, El as a, Sf as b, ys as c, vs as o }
