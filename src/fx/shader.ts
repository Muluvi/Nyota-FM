/**
 * H. WebGL fragment shader: a slow liquid mesh gradient in the palette
 * (domain-warped fbm noise) with a vignette and faint chromatic fringe as
 * post-processing. Raw WebGL, no library. Half-resolution, 30fps cap, paused
 * off-screen. Falls back to the CSS morphing blobs if WebGL is unavailable.
 */
import { cssToRgb } from './color'
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `precision mediump float;
uniform vec2 r; uniform float t; uniform vec2 m;
uniform vec3 c1; uniform vec3 c2; uniform vec3 c3; uniform vec3 bg;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a*n(p); p *= 2.02; a *= 0.5; } return v; }
vec3 scene(vec2 uv){
  vec2 q = vec2(fbm(uv*1.6 + t*0.03), fbm(uv*1.6 + vec2(5.2, 1.3) - t*0.025));
  vec2 w = uv*1.2 + 2.0*q + (m - 0.5)*0.35;
  float f = fbm(w + t*0.02);
  vec3 col = mix(bg, c2, smoothstep(0.35, 0.75, f) * 0.42);
  col = mix(col, c1, smoothstep(0.55, 0.95, f*q.x*1.6) * 0.5);
  col = mix(col, c3, smoothstep(0.6, 1.0, q.y*f*1.4) * 0.35);
  return col;
}
void main(){
  vec2 uv = gl_FragCoord.xy / r.xy; vec2 a = vec2(r.x/r.y, 1.0);
  vec2 p = uv*a;
  float ca = 0.004;
  vec3 col = vec3(scene(p + ca).r, scene(p).g, scene(p - ca).b);
  float vig = smoothstep(1.15, 0.35, length(uv - 0.5));
  gl_FragColor = vec4(mix(bg, col, vig), 1.0);
}`

/** Tokens may be wide-gamut (display-p3); the canvas probe maps them to sRGB for GL. */
const rgb = (cssColor: string) => cssToRgb(cssColor)

export function mountShader(host: HTMLElement): () => void {
  const canvas = document.createElement('canvas')
  canvas.className = 'fx-shader-canvas'
  canvas.setAttribute('aria-hidden', 'true')
  host.prepend(canvas)
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false, powerPreference: 'low-power' })
  if (!gl) {
    canvas.remove()
    return () => undefined
  }
  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)
    if (!s) throw new Error('shader')
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return s
  }
  const prog = gl.createProgram()
  if (!prog) return () => canvas.remove()
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    canvas.remove()
    return () => undefined
  }
  gl.useProgram(prog)
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'p')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  const u = (name: string) => gl.getUniformLocation(prog, name)
  const uR = u('r')
  const uT = u('t')
  const uM = u('m')

  const setColours = () => {
    const css = getComputedStyle(document.documentElement)
    gl.uniform3fv(u('c1'), rgb(css.getPropertyValue('--color-brass')))
    gl.uniform3fv(u('c2'), rgb(css.getPropertyValue('--color-moss')))
    gl.uniform3fv(u('c3'), rgb(css.getPropertyValue('--color-brick')))
    gl.uniform3fv(u('bg'), rgb(css.getPropertyValue('--color-ink')))
  }
  setColours()
  const themeObserver = new MutationObserver(setColours)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  const scale = 0.5
  const resize = () => {
    canvas.width = Math.max(1, host.clientWidth * scale)
    canvas.height = Math.max(1, host.clientHeight * scale)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uR, canvas.width, canvas.height)
  }
  resize()
  const mouse = { x: 0.5, y: 0.5 }
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect()
    mouse.x = (e.clientX - r.left) / r.width
    mouse.y = 1 - (e.clientY - r.top) / r.height
  }
  host.addEventListener('pointermove', onMove, { passive: true })

  let frame = 0
  let last = 0
  let visible = true
  const t0 = performance.now()
  const render = (now: number) => {
    frame = requestAnimationFrame(render)
    if (now - last < 33) return
    last = now
    gl.uniform1f(uT, (now - t0) / 1000)
    gl.uniform2f(uM, mouse.x, mouse.y)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    canvas.dataset.ready = 'true'
  }
  const start = () => {
    if (!frame && visible && !document.hidden) frame = requestAnimationFrame(render)
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
  document.addEventListener('visibilitychange', onVis)
  window.addEventListener('resize', resize)
  start()
  return () => {
    stop()
    io.disconnect()
    themeObserver.disconnect()
    document.removeEventListener('visibilitychange', onVis)
    window.removeEventListener('resize', resize)
    host.removeEventListener('pointermove', onMove)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    canvas.remove()
  }
}
