/**
 * H. Three.js hero scene (desktop, WebGL2, motion allowed): a wireframe
 * terrain for Western Kenya, a lattice transmitter mast with a beacon, signal
 * rings radiating from 107.3, a 3D particle field, exponential depth fog and an
 * UnrealBloom post-processing pass. Loaded lazily; paused off-screen and in
 * background tabs; capped at 45fps; fully disposed on cleanup.
 */
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  FogExp2,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  TorusGeometry,
  Vector2,
  WebGLRenderer,
  ACESFilmicToneMapping,
  SRGBColorSpace,
} from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { tokenRgb } from './color'

const MAST = { x: 4.2, z: -2.5, h: 6 }

function height(x: number, z: number, t: number) {
  return (
    Math.sin(x * 0.28 + t * 0.15) * 0.55 +
    Math.cos(z * 0.33 - t * 0.1) * 0.45 +
    Math.sin((x + z) * 0.12) * 0.9 -
    Math.exp(-((x - MAST.x) ** 2 + (z - MAST.z) ** 2) / 18) * 0.2
  )
}

function mastGeometry(): BufferGeometry {
  const pts: number[] = []
  const levels = 9
  const leg = (i: number, y: number) => {
    const w = 0.55 * (1 - y / MAST.h) + 0.06
    const a = (i * Math.PI) / 2 + Math.PI / 4
    return [MAST.x + Math.cos(a) * w, y, MAST.z + Math.sin(a) * w]
  }
  for (let l = 0; l < levels; l++) {
    const y0 = (l / levels) * MAST.h
    const y1 = ((l + 1) / levels) * MAST.h
    for (let i = 0; i < 4; i++) {
      pts.push(...leg(i, y0), ...leg(i, y1)) // legs
      pts.push(...leg(i, y1), ...leg((i + 1) % 4, y1)) // ring
      pts.push(...leg(i, y0), ...leg((i + 1) % 4, y1)) // brace
    }
  }
  pts.push(MAST.x, MAST.h, MAST.z, MAST.x, MAST.h + 1.1, MAST.z) // antenna
  const g = new BufferGeometry()
  g.setAttribute('position', new BufferAttribute(new Float32Array(pts), 3))
  return g
}

export function mountScene3d(host: HTMLElement): () => void {
  const canvas = document.createElement('canvas')
  canvas.className = 'fx-shader-canvas fx-scene3d'
  canvas.setAttribute('aria-hidden', 'true')
  host.prepend(canvas)

  let renderer: WebGLRenderer
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', alpha: false })
  } catch {
    canvas.remove()
    return () => undefined
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.outputColorSpace = SRGBColorSpace

  const scene = new Scene()
  const camera = new PerspectiveCamera(52, 1, 0.1, 120)
  camera.position.set(0, 3.4, 12)

  const palette = () => ({
    ink: new Color(...tokenRgb('--color-ink')),
    brass: new Color(...tokenRgb('--color-brass')),
    moss: new Color(...tokenRgb('--color-moss')),
    brick: new Color(...tokenRgb('--color-brick-ink')),
    sage: new Color(...tokenRgb('--color-sage')),
  })
  let col = palette()
  scene.background = col.ink
  scene.fog = new FogExp2(col.ink.getHex(), 0.06)

  // Terrain
  const terrainGeo = new PlaneGeometry(64, 44, 110, 76)
  terrainGeo.rotateX(-Math.PI / 2)
  const terrainMat = new MeshBasicMaterial({ color: col.moss, wireframe: true, transparent: true, opacity: 0.13 })
  const terrain = new Mesh(terrainGeo, terrainMat)
  terrain.position.y = -2.2
  scene.add(terrain)
  const tPos = terrainGeo.getAttribute('position') as BufferAttribute

  // Mast and beacon
  const mastMat = new LineBasicMaterial({ color: col.brass, transparent: true, opacity: 0.5 })
  const mast = new LineSegments(mastGeometry(), mastMat)
  mast.position.y = -1.2
  scene.add(mast)
  const beaconMat = new MeshBasicMaterial({ color: col.brick })
  const beacon = new Mesh(new SphereGeometry(0.09, 16, 16), beaconMat)
  beacon.position.set(MAST.x, MAST.h + 1.1 - 1.2, MAST.z)
  scene.add(beacon)

  // Signal rings radiating from the antenna
  const rings = Array.from({ length: 6 }, (_, i) => {
    const m = new MeshBasicMaterial({ color: col.brass, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false })
    const r = new Mesh(new TorusGeometry(1, 0.006, 6, 160), m)
    r.rotation.x = Math.PI / 2
    r.position.set(MAST.x, MAST.h + 0.9 - 1.2, MAST.z)
    r.userData.offset = i / 6
    scene.add(r)
    return r
  })

  // 3D particle field
  const count = 1400
  const pPos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 40
    pPos[i * 3 + 1] = Math.random() * 12 - 1
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 4
  }
  const pGeo = new BufferGeometry()
  pGeo.setAttribute('position', new BufferAttribute(pPos, 3))
  const pMat = new PointsMaterial({ color: col.sage, size: 0.035, sizeAttenuation: true, transparent: true, opacity: 0.4, blending: AdditiveBlending, depthWrite: false })
  const particles = new Points(pGeo, pMat)
  scene.add(particles)

  // Post-processing: bloom
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  const bloom = new UnrealBloomPass(new Vector2(1, 1), 0.5, 0.6, 0.3)
  composer.addPass(bloom)
  composer.addPass(new OutputPass())

  const resize = () => {
    const w = host.clientWidth
    const h = host.clientHeight
    renderer.setSize(w, h, false)
    composer.setSize(w, h)
    bloom.resolution.set(w / 2, h / 2)
    camera.aspect = w / Math.max(1, h)
    camera.updateProjectionMatrix()
  }
  resize()

  const applyTheme = () => {
    col = palette()
    scene.background = col.ink
    ;(scene.fog as FogExp2).color = col.ink
    terrainMat.color = col.moss
    mastMat.color = col.brass
    beaconMat.color = col.brick
    pMat.color = col.sage
    rings.forEach((r) => ((r.material as MeshBasicMaterial).color = col.brass))
  }
  const themeObserver = new MutationObserver(applyTheme)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  const mouse = { x: 0, y: 0 }
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect()
    mouse.x = (e.clientX - r.left) / r.width - 0.5
    mouse.y = (e.clientY - r.top) / r.height - 0.5
  }
  window.addEventListener('pointermove', onMove, { passive: true })

  let frame = 0
  let last = 0
  let visible = true
  const t0 = performance.now()
  const render = (now: number) => {
    frame = requestAnimationFrame(render)
    if (now - last < 22) return
    last = now
    const t = (now - t0) / 1000
    for (let i = 0; i < tPos.count; i++) tPos.setY(i, height(tPos.getX(i), tPos.getZ(i), t))
    tPos.needsUpdate = true
    rings.forEach((r) => {
      const p = (t * 0.28 + (r.userData.offset as number)) % 1
      r.scale.setScalar(0.4 + p * 13)
      ;(r.material as MeshBasicMaterial).opacity = (1 - p) * 0.3
    })
    beacon.scale.setScalar(0.8 + Math.max(0, Math.sin(t * 3.2)) * 0.9)
    particles.rotation.y = t * 0.015
    particles.position.y = Math.sin(t * 0.2) * 0.2
    camera.position.x += (mouse.x * 2.4 - camera.position.x) * 0.03
    camera.position.y += (3.4 - mouse.y * 1.2 - camera.position.y) * 0.03
    camera.lookAt(1.2, 2.2, -2)
    composer.render()
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
    window.removeEventListener('pointermove', onMove)
    scene.traverse((o) => {
      const m = o as Mesh
      m.geometry?.dispose()
      const mat = m.material as { dispose?: () => void } | undefined
      mat?.dispose?.()
    })
    composer.dispose()
    renderer.dispose()
    canvas.remove()
  }
}
