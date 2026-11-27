/**
 * Runtime effects layer. Loaded lazily after hydration, only when motion is
 * allowed (not reduced, not Lite, not Calm). One rAF loop and delegated
 * listeners; every effect pauses or cleans up when the page no longer needs it.
 */
type Cleanup = () => void

interface FxOptions {
  sound: boolean
  finePointer: boolean
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

/* ── C. Custom cursor + trail ─────────────────────────────────────────── */
function cursor(): Cleanup {
  const root = document.documentElement
  const el = document.createElement('div')
  el.className = 'fx-cursor'
  el.setAttribute('aria-hidden', 'true')
  el.innerHTML = '<div class="fx-cursor-ring"></div><div class="fx-cursor-dot"></div>'
  const trail = document.createElement('canvas')
  trail.className = 'fx-trail'
  trail.setAttribute('aria-hidden', 'true')
  document.body.append(trail, el)
  root.classList.add('fx-cursor-on')
  const ctx = trail.getContext('2d')
  const ring = el.firstElementChild as HTMLElement
  const dot = el.lastElementChild as HTMLElement
  const pts: { x: number; y: number }[] = []
  let x = -100
  let y = -100
  let rx = x
  let ry = y
  let frame = 0
  let idle = 0
  const resize = () => {
    trail.width = window.innerWidth * devicePixelRatio
    trail.height = window.innerHeight * devicePixelRatio
  }
  resize()
  const loop = () => {
    rx += (x - rx) * 0.18
    ry += (y - ry) * 0.18
    dot.style.transform = `translate(${x}px, ${y}px)`
    ring.style.transform = `translate(${rx}px, ${ry}px)`
    if (ctx) {
      pts.push({ x, y })
      if (pts.length > 16) pts.shift()
      ctx.clearRect(0, 0, trail.width, trail.height)
      const brass = getComputedStyle(root).getPropertyValue('--color-brass').trim() || '#D6A75C'
      ctx.strokeStyle = brass
      ctx.lineCap = 'round'
      for (let i = 1; i < pts.length; i++) {
        ctx.globalAlpha = (i / pts.length) * 0.35
        ctx.lineWidth = (i / pts.length) * 3 * devicePixelRatio
        ctx.beginPath()
        ctx.moveTo(pts[i - 1].x * devicePixelRatio, pts[i - 1].y * devicePixelRatio)
        ctx.lineTo(pts[i].x * devicePixelRatio, pts[i].y * devicePixelRatio)
        ctx.stroke()
      }
    }
    idle = Math.abs(x - rx) + Math.abs(y - ry) < 0.3 ? idle + 1 : 0
    frame = idle > 30 ? 0 : requestAnimationFrame(loop)
  }
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    x = e.clientX
    y = e.clientY
    const t = e.target as Element | null
    el.dataset.hover = t?.closest('a, button, [role="radio"], input, select, .fx-tilt') ? 'true' : 'false'
    idle = 0
    if (!frame) frame = requestAnimationFrame(loop)
  }
  const onDown = () => (el.dataset.down = 'true')
  const onUp = () => (el.dataset.down = 'false')
  const onLeave = () => {
    x = -100
    y = -100
  }
  document.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerdown', onDown)
  document.addEventListener('pointerup', onUp)
  document.documentElement.addEventListener('pointerleave', onLeave)
  window.addEventListener('resize', resize)
  return () => {
    cancelAnimationFrame(frame)
    document.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerdown', onDown)
    document.removeEventListener('pointerup', onUp)
    document.documentElement.removeEventListener('pointerleave', onLeave)
    window.removeEventListener('resize', resize)
    root.classList.remove('fx-cursor-on')
    el.remove()
    trail.remove()
  }
}

/* ── C. Tilt, inner parallax, magnetic pull, spotlight tracking ───────── */
function pointerEffects(): Cleanup {
  let tilted: HTMLElement | null = null
  let magnets: HTMLElement[] = []
  const refresh = () => (magnets = Array.from(document.querySelectorAll<HTMLElement>('.fx-magnetic')))
  refresh()
  const mo = new MutationObserver(() => refresh())
  mo.observe(document.body, { childList: true, subtree: true })

  const resetTilt = (el: HTMLElement) => {
    el.dataset.tilting = 'false'
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--px', '0')
    el.style.setProperty('--py', '0')
  }
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const target = e.target as Element | null
    const t = target?.closest<HTMLElement>('.fx-tilt') ?? null
    if (tilted && tilted !== t) resetTilt(tilted)
    tilted = t
    if (t) {
      const r = t.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      const max = Number(t.dataset.tiltMax ?? 8)
      t.dataset.tilting = 'true'
      t.style.setProperty('--rx', `${(-py * max).toFixed(2)}deg`)
      t.style.setProperty('--ry', `${(px * max).toFixed(2)}deg`)
      t.style.setProperty('--px', px.toFixed(3))
      t.style.setProperty('--py', py.toFixed(3))
      t.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(1)}%`)
      t.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(1)}%`)
    }
    for (const m of magnets) {
      const r = m.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const reach = Math.max(r.width, r.height) * 0.5 + 60
      if (Math.hypot(dx, dy) < reach) {
        m.style.setProperty('--tx', `${(dx * 0.25).toFixed(1)}px`)
        m.style.setProperty('--ty', `${(dy * 0.3).toFixed(1)}px`)
      } else if (m.style.getPropertyValue('--tx') !== '0px') {
        m.style.setProperty('--tx', '0px')
        m.style.setProperty('--ty', '0px')
      }
    }
    const host = target?.closest<HTMLElement>('[data-spotlight-host]')
    const spot = host?.querySelector<HTMLElement>('.fx-spotlight')
    if (host && spot) {
      const r = host.getBoundingClientRect()
      spot.dataset.tracking = 'true'
      spot.style.setProperty('--mx', `${e.clientX - r.left}px`)
      spot.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
  }
  document.addEventListener('pointermove', onMove, { passive: true })
  return () => {
    document.removeEventListener('pointermove', onMove)
    mo.disconnect()
    if (tilted) resetTilt(tilted)
    magnets.forEach((m) => {
      m.style.removeProperty('--tx')
      m.style.removeProperty('--ty')
    })
  }
}

/* ── C. Ripple on click ───────────────────────────────────────────────── */
function ripple(): Cleanup {
  const onDown = (e: PointerEvent) => {
    const host = (e.target as Element | null)?.closest<HTMLElement>('.fx-ripple')
    if (!host) return
    const r = host.getBoundingClientRect()
    const size = Math.max(r.width, r.height) * 2.2
    const dot = document.createElement('span')
    dot.className = 'fx-ripple-dot'
    dot.style.width = dot.style.height = `${size}px`
    dot.style.left = `${e.clientX - r.left - size / 2}px`
    dot.style.top = `${e.clientY - r.top - size / 2}px`
    host.append(dot)
    dot.addEventListener('animationend', () => dot.remove(), { once: true })
  }
  document.addEventListener('pointerdown', onDown)
  return () => document.removeEventListener('pointerdown', onDown)
}

/* ── B. Scroll engine: --sp per element, velocity, horizontal pin ─────── */
function scrollEffects(): Cleanup {
  let els: HTMLElement[] = []
  let hs: HTMLElement[] = []
  const refresh = () => {
    els = Array.from(document.querySelectorAll<HTMLElement>('[data-fx]'))
    hs = Array.from(document.querySelectorAll<HTMLElement>('.fx-hscroll'))
  }
  refresh()
  let pending = 0
  const mo = new MutationObserver(() => {
    window.clearTimeout(pending)
    pending = window.setTimeout(() => {
      refresh()
      schedule()
    }, 150)
  })
  mo.observe(document.body, { childList: true, subtree: true })

  let lastY = window.scrollY
  let velocity = 0
  let frame = 0
  const marquees = () => document.querySelectorAll<HTMLElement>('.fx-marquee-track').forEach((m) => m.getAnimations().forEach((a) => (a.playbackRate = 1 + Math.min(velocity, 6))))

  const update = () => {
    frame = 0
    const vh = window.innerHeight
    for (const el of els) {
      const r = el.getBoundingClientRect()
      if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) continue
      el.style.setProperty('--sp', clamp((vh - r.top) / (vh + r.height)).toFixed(3))
    }
    const desktop = window.innerWidth >= 1024
    for (const h of hs) {
      const track = h.querySelector<HTMLElement>('.fx-hscroll-track')
      const pin = h.querySelector<HTMLElement>('.fx-hscroll-pin')
      if (!track || !pin) continue
      h.dataset.active = desktop ? 'true' : 'false'
      if (!desktop) continue
      const distance = Math.max(0, track.scrollWidth - pin.clientWidth)
      h.style.setProperty('--hs-height', `${pin.offsetHeight + distance}px`)
      const r = h.getBoundingClientRect()
      const p = clamp((80 - r.top) / Math.max(1, distance))
      h.style.setProperty('--hs', (p * distance).toFixed(1))
      h.style.setProperty('--hsp', p.toFixed(3))
    }
    const y = window.scrollY
    velocity = velocity * 0.85 + (Math.abs(y - lastY) / 16) * 0.15
    lastY = y
    document.documentElement.style.setProperty('--scroll-velocity', velocity.toFixed(2))
    marquees()
    if (velocity > 0.05) schedule()
  }
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  schedule()
  return () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    mo.disconnect()
    hs.forEach((h) => (h.dataset.active = 'false'))
  }
}

/* ── J. Favicon shows reading progress as a dial ring ─────────────────── */
function favicon(): Cleanup {
  const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (!link) return () => undefined
  const original = link.href
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 64
  const ctx = canvas.getContext('2d')
  let last = -1
  const draw = () => {
    if (!ctx) return
    const max = document.documentElement.scrollHeight - window.innerHeight
    const p = max > 0 ? Math.round((window.scrollY / max) * 20) / 20 : 0
    if (p === last) return
    last = p
    const brass = getComputedStyle(document.documentElement).getPropertyValue('--color-brass').trim() || '#D6A75C'
    ctx.clearRect(0, 0, 64, 64)
    ctx.fillStyle = '#090B0A'
    ctx.beginPath()
    ctx.roundRect(0, 0, 64, 64, 12)
    ctx.fill()
    ctx.lineWidth = 6
    ctx.strokeStyle = '#27312C'
    ctx.beginPath()
    ctx.arc(32, 32, 22, 0, Math.PI * 2)
    ctx.stroke()
    ctx.strokeStyle = brass
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.arc(32, 32, 22, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.max(0.02, p))
    ctx.stroke()
    ctx.fillStyle = brass
    ctx.beginPath()
    ctx.arc(32, 32, 5, 0, Math.PI * 2)
    ctx.fill()
    link.href = canvas.toDataURL('image/png')
  }
  const timer = window.setInterval(draw, 600)
  draw()
  return () => {
    window.clearInterval(timer)
    link.href = original
  }
}

/* ── G. Optional micro-interaction sounds (off by default) ────────────── */
function sounds(): Cleanup {
  let ctx: AudioContext | null = null
  const tone = (freq: number, ms: number, gain = 0.03) => {
    ctx ??= new AudioContext()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.value = freq
    g.gain.setValueAtTime(gain, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + ms / 1000)
    o.connect(g).connect(ctx.destination)
    o.start()
    o.stop(ctx.currentTime + ms / 1000)
  }
  const onClick = (e: MouseEvent) => {
    if ((e.target as Element | null)?.closest('button, a')) tone(880, 45)
  }
  const onSound = (e: Event) => {
    const kind = (e as CustomEvent<string>).detail
    if (kind === 'success') {
      tone(660, 120, 0.04)
      window.setTimeout(() => tone(990, 180, 0.04), 110)
    } else if (kind === 'error') tone(180, 200, 0.05)
  }
  document.addEventListener('click', onClick)
  window.addEventListener('nyota:sound', onSound)
  return () => {
    document.removeEventListener('click', onClick)
    window.removeEventListener('nyota:sound', onSound)
    void ctx?.close()
  }
}

/* ── A. Hero canvases (particles everywhere; WebGL shader on desktop) ─── */
/** H. Three.js needs WebGL2, a fine pointer, a wide screen and a few cores; phones keep the 2D canvases. */
function canRun3d(finePointer: boolean): boolean {
  if (!finePointer || window.innerWidth < 1024 || (navigator.hardwareConcurrency || 4) < 4) return false
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
}

function heroCanvases(finePointer: boolean): Cleanup {
  const cleanups: Cleanup[] = []
  let cancelled = false
  const use3d = canRun3d(finePointer)
  const particlesHost = document.querySelector<HTMLElement>('[data-fx-host="particles"]')
  if (particlesHost && !use3d) {
    void import('./particles').then(({ mountParticles }) => {
      if (!cancelled) cleanups.push(mountParticles(particlesHost, { interactive: finePointer, count: finePointer ? 70 : 28 }))
    })
  }
  const shaderHost = document.querySelector<HTMLElement>('[data-fx-host="shader"]')
  const mountFlatShader = () =>
    import('./shader').then(({ mountShader }) => {
      if (!cancelled && shaderHost) cleanups.push(mountShader(shaderHost))
    })
  if (shaderHost && use3d) {
    import('./scene3d')
      .then(({ mountScene3d }) => {
        if (!cancelled) cleanups.push(mountScene3d(shaderHost))
      })
      .catch(() => void mountFlatShader())
  } else if (shaderHost && finePointer) {
    void mountFlatShader()
  }
  return () => {
    cancelled = true
    cleanups.forEach((c) => c())
  }
}

export function startFx({ sound, finePointer }: FxOptions): Cleanup {
  const cleanups: Cleanup[] = [ripple(), scrollEffects(), favicon(), heroCanvases(finePointer)]
  if (finePointer) cleanups.push(cursor(), pointerEffects())
  if (sound) cleanups.push(sounds())
  return () => cleanups.forEach((c) => c())
}
