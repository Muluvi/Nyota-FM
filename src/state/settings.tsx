import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

type Overlay = 'menu' | 'search' | 'briefing' | 'presentation' | null
export type Theme = 'dark' | 'light'
export type AccentTheme = 'brass' | 'moss' | 'brick'
export type MotionLevel = 'full' | 'calm'

interface Settings {
  lite: boolean
  liteAuto: boolean
  setLite: (on: boolean) => void
  overlay: Overlay
  openOverlay: (o: Overlay) => void
  closeOverlay: () => void
  /** Toolkit widget currently open in the sheet. */
  sheet: string | null
  openSheet: (id: string | null) => void
  /** Details forced open (print, deep link). */
  expandAll: boolean
  setExpandAll: (on: boolean) => void
  toast: string | null
  notify: (msg: string) => void
  readChapters: Set<string>
  markRead: (id: string) => void
  theme: Theme
  setTheme: (t: Theme) => void
  accent: AccentTheme
  setAccent: (a: AccentTheme) => void
  motion: MotionLevel
  setMotion: (m: MotionLevel) => void
  sound: boolean
  setSound: (on: boolean) => void
}

const SettingsContext = createContext<Settings | null>(null)

const LITE_KEY = 'nyota.lite'
const READ_KEY = 'nyota.read'
const PREF_KEY = 'nyota.prefs'

interface Prefs {
  theme: Theme
  accent: AccentTheme
  motion: MotionLevel
  sound: boolean
}
const DEFAULT_PREFS: Prefs = { theme: 'dark', accent: 'brass', motion: 'full', sound: false }

/** Mirrors preferences onto <html> classes (the inline script in index.html does the same before paint). */
function applyPrefs(p: Prefs) {
  const el = document.documentElement
  el.classList.toggle('theme-light', p.theme === 'light')
  el.classList.remove('accent-moss', 'accent-brick')
  if (p.accent !== 'brass') el.classList.add(`accent-${p.accent}`)
  el.classList.toggle('fx-calm', p.motion === 'calm')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', p.theme === 'light' ? '#F4F5F0' : '#000000')
}

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}
function safeSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* storage unavailable: setting lasts for this visit only */
  }
}

interface NetworkInformationLike {
  saveData?: boolean
  effectiveType?: string
}

export function detectSlowConnection(): boolean {
  const conn = (navigator as Navigator & { connection?: NetworkInformationLike }).connection
  if (!conn) return false
  return Boolean(conn.saveData) || ['slow-2g', '2g', '3g'].includes(conn.effectiveType ?? '')
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  // First render is identical on server and client; browser state is read after mount.
  const [lite, setLiteState] = useState(false)
  const [liteAuto, setLiteAuto] = useState(false)
  const synced = useRef(false)
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [sheet, setSheet] = useState<string | null>(null)
  const [expandAll, setExpandAll] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [readChapters, setRead] = useState<Set<string>>(() => new Set())
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS)
  const prefsSynced = useRef(false)

  useEffect(() => {
    if (prefsSynced.current) {
      applyPrefs(prefs)
      safeSet(PREF_KEY, JSON.stringify(prefs))
    }
  }, [prefs])

  useEffect(() => {
    try {
      const stored = JSON.parse(safeGet(PREF_KEY) ?? 'null') as Partial<Prefs> | null
      if (stored) setPrefs({ ...DEFAULT_PREFS, ...stored })
    } catch {
      /* corrupt preference: keep defaults */
    }
    prefsSynced.current = true
  }, [])

  const updatePrefs = useCallback((patch: Partial<Prefs>) => setPrefs((p) => ({ ...p, ...patch })), [])

  // Declared before the mount effect so the first pass never strips the pre-paint class.
  useEffect(() => {
    if (synced.current) document.documentElement.classList.toggle('lite', lite)
  }, [lite])

  useEffect(() => {
    const stored = safeGet(LITE_KEY)
    const auto = stored === null && detectSlowConnection()
    setLiteAuto(auto)
    // The inline script in index.html already applied the class before first paint.
    setLiteState(document.documentElement.classList.contains('lite') || auto)
    setRead(new Set((safeGet(READ_KEY) ?? '').split(',').filter(Boolean)))
    synced.current = true
  }, [])


  const setLite = useCallback((on: boolean) => {
    setLiteState(on)
    safeSet(LITE_KEY, on ? '1' : '0')
  }, [])

  const notify = useCallback((msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast((t) => (t === msg ? null : t)), 2200)
  }, [])

  const markRead = useCallback((id: string) => {
    setRead((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      safeSet(READ_KEY, [...next].join(','))
      return next
    })
  }, [])

  const value = useMemo<Settings>(
    () => ({
      lite,
      liteAuto,
      setLite,
      overlay,
      openOverlay: setOverlay,
      closeOverlay: () => setOverlay(null),
      sheet,
      openSheet: setSheet,
      expandAll,
      setExpandAll,
      toast,
      notify,
      readChapters,
      markRead,
      theme: prefs.theme,
      setTheme: (theme) => updatePrefs({ theme }),
      accent: prefs.accent,
      setAccent: (accent) => updatePrefs({ accent }),
      motion: prefs.motion,
      setMotion: (motion) => updatePrefs({ motion }),
      sound: prefs.sound,
      setSound: (sound) => updatePrefs({ sound }),
    }),
    [lite, liteAuto, setLite, overlay, sheet, expandAll, toast, notify, readChapters, markRead, prefs, updatePrefs],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings(): Settings {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider')
  return ctx
}
