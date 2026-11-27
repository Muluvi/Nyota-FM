/**
 * Resolve any CSS colour (hex, rgb, color(display-p3 …), color-mix …) to sRGB
 * 0–1 channels by painting it on a 1×1 canvas. WebGL needs plain sRGB values,
 * while the CSS palette may be wide-gamut on OLED/P3 screens.
 */
let ctx: CanvasRenderingContext2D | null = null

export function cssToRgb(color: string): [number, number, number] {
  if (!ctx) {
    const c = document.createElement('canvas')
    c.width = c.height = 1
    ctx = c.getContext('2d', { willReadFrequently: true })
  }
  if (!ctx) return [0, 0, 0]
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = '#000'
  ctx.fillStyle = color.trim() || '#000'
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return [r / 255, g / 255, b / 255]
}

export function tokenRgb(name: string): [number, number, number] {
  return cssToRgb(getComputedStyle(document.documentElement).getPropertyValue(name))
}
