/**
 * D. Confetti burst for success states (all asks noted, break-even reached).
 * A short-lived canvas (≤1.6s) in palette colours; skipped for reduced motion,
 * Lite and Calm.
 */
export function confetti(x = window.innerWidth / 2, y = window.innerHeight / 2, count = 90) {
  const root = document.documentElement
  if (root.classList.contains('lite') || root.classList.contains('fx-calm') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:310'
  const dpr = Math.min(3, devicePixelRatio)
  canvas.width = innerWidth * dpr
  canvas.height = innerHeight * dpr
  document.body.append(canvas)
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas.remove()
  const css = getComputedStyle(root)
  const colours = ['--color-brass', '--color-moss', '--color-brick-ink', '--color-sage', '--color-paper'].map((v) => css.getPropertyValue(v).trim() || '#D6A75C')
  const bits = Array.from({ length: count }, () => {
    const a = Math.random() * Math.PI * 2
    const v = 4 + Math.random() * 9
    return { x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 6, r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4, w: 5 + Math.random() * 6, h: 3 + Math.random() * 4, c: colours[Math.floor(Math.random() * colours.length)] }
  })
  const start = performance.now()
  const tick = (now: number) => {
    const t = now - start
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    for (const b of bits) {
      b.vy += 0.35
      b.vx *= 0.985
      b.x += b.vx
      b.y += b.vy
      b.r += b.vr
      ctx.save()
      ctx.globalAlpha = Math.max(0, 1 - t / 1600)
      ctx.translate(b.x, b.y)
      ctx.rotate(b.r)
      ctx.fillStyle = b.c
      ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h)
      ctx.restore()
    }
    if (t < 1600) requestAnimationFrame(tick)
    else canvas.remove()
  }
  requestAnimationFrame(tick)
}
