/**
 * A. Particle overlay / H. 2.5D particle system. Particles drift on three depth
 * planes, link when close, and are pushed by the cursor. Paused off-screen and
 * in background tabs; capped at 40fps on a half-resolution canvas.
 */
interface P {
  x: number
  y: number
  vx: number
  vy: number
  z: number
}

export function mountParticles(host: HTMLElement, { interactive, count }: { interactive: boolean; count: number }): () => void {
  const canvas = document.createElement('canvas')
  canvas.className = 'fx-particles absolute inset-0 h-full w-full'
  canvas.setAttribute('aria-hidden', 'true')
  host.append(canvas)
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => canvas.remove()

  const dpr = Math.min(2.5, devicePixelRatio) // crisp on 3x OLED phones; few particles, so cheap
  let w = 0
  let h = 0
  const resize = () => {
    w = host.clientWidth
    h = host.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
  }
  resize()
  const ps: P[] = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    z: 0.4 + Math.random() * 0.8,
  }))
  const mouse = { x: -9999, y: -9999 }
  let visible = true
  let frame = 0
  let last = 0
  const css = getComputedStyle(document.documentElement)
  const colour = () => css.getPropertyValue('--color-brass').trim() || '#D6A75C'
  const line = () => css.getPropertyValue('--color-sage').trim() || '#B4C2B9'

  const tick = (t: number) => {
    frame = requestAnimationFrame(tick)
    if (t - last < 25) return
    last = t
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
    const c = colour()
    const l = line()
    for (const p of ps) {
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const d2 = dx * dx + dy * dy
      if (d2 < 140 * 140) {
        const f = (1 - Math.sqrt(d2) / 140) * 0.8 * p.z
        p.vx += (dx / (Math.sqrt(d2) + 0.01)) * f * 0.3
        p.vy += (dy / (Math.sqrt(d2) + 0.01)) * f * 0.3
      }
      p.vx *= 0.96
      p.vy *= 0.96
      p.x += p.vx + 0.08 * p.z
      p.y += p.vy - 0.04 * p.z
      if (p.x < -10) p.x = w + 10
      if (p.x > w + 10) p.x = -10
      if (p.y < -10) p.y = h + 10
      if (p.y > h + 10) p.y = -10
    }
    ctx.strokeStyle = l
    ctx.lineWidth = 0.6
    for (let i = 0; i < ps.length; i++) {
      for (let j = i + 1; j < ps.length; j++) {
        const a = ps[i]
        const b = ps[j]
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        if (d < 110) {
          ctx.globalAlpha = (1 - d / 110) * 0.18 * Math.min(a.z, b.z)
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
    }
    ctx.fillStyle = c
    for (const p of ps) {
      ctx.globalAlpha = 0.25 + p.z * 0.45
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.z * 1.8, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
  }

  const start = () => {
    if (!frame && visible && !document.hidden) frame = requestAnimationFrame(tick)
  }
  const stop = () => {
    cancelAnimationFrame(frame)
    frame = 0
  }
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting
    if (visible) start()
    else stop()
  })
  io.observe(host)
  const onVis = () => (document.hidden ? stop() : start())
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect()
    mouse.x = e.clientX - r.left
    mouse.y = e.clientY - r.top
  }
  const onLeave = () => {
    mouse.x = -9999
    mouse.y = -9999
  }
  document.addEventListener('visibilitychange', onVis)
  window.addEventListener('resize', resize)
  if (interactive) {
    host.addEventListener('pointermove', onMove, { passive: true })
    host.addEventListener('pointerleave', onLeave)
  }
  start()
  return () => {
    stop()
    io.disconnect()
    document.removeEventListener('visibilitychange', onVis)
    window.removeEventListener('resize', resize)
    host.removeEventListener('pointermove', onMove)
    host.removeEventListener('pointerleave', onLeave)
    canvas.remove()
  }
}
