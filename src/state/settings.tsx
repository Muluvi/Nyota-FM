import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type Overlay = 'menu' | 'search' | 'briefing' | 'presentation' | null

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
}

const SettingsContext = createContext<Settings | null>(null)

const LITE_KEY = 'nyota.lite'
const READ_KEY = 'nyota.read'

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
  const stored = safeGet(LITE_KEY)
  const liteAuto = stored === null && detectSlowConnection()
  const [lite, setLiteState] = useState<boolean>(stored === null ? liteAuto : stored === '1')
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [sheet, setSheet] = useState<string | null>(null)
  const [expandAll, setExpandAll] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [readChapters, setRead] = useState<Set<string>>(() => new Set((safeGet(READ_KEY) ?? '').split(',').filter(Boolean)))

  useEffect(() => {
    document.documentElement.classList.toggle('lite', lite)
  }, [lite])

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
    }),
    [lite, liteAuto, setLite, overlay, sheet, expandAll, toast, notify, readChapters, markRead],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings(): Settings {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider')
  return ctx
}
