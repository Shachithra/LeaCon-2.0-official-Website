import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(ScrollTrigger, Flip)

const STORAGE_KEY = 'leacon-motion'

type MotionContextValue = {
  /** Visitor pressed "Pause motion" (persisted). */
  paused: boolean
  /** Motion may run: not paused and the OS does not ask for reduced motion. */
  enabled: boolean
  toggle: () => void
}

const MotionContext = createContext<MotionContextValue>({
  paused: false,
  enabled: true,
  toggle: () => {},
})

function readStoredPause(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'paused'
  } catch {
    return false
  }
}

function readSystemReduce(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * MotionProvider (M12).
 *
 * Holds the two switches that decide whether anything animates: the visitor's
 * own "Pause motion" control and the operating system's reduced-motion
 * preference. Both behave identically — every effect in the build reads
 * `enabled` and, when it is false, leaves the page in its HTML final state.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(readStoredPause)
  const [systemReduce, setSystemReduce] = useState(readSystemReduce)

  useEffect(() => {
    if (!window.matchMedia) return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (event: MediaQueryListEvent) => setSystemReduce(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'playing'
  }, [paused])

  const toggle = useCallback(() => {
    setPaused((current) => {
      const next = !current
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'paused' : 'playing')
      } catch {
        /* storage unavailable: the control still works for this visit */
      }
      return next
    })
  }, [])

  const value = useMemo<MotionContextValue>(
    () => ({ paused, enabled: !paused && !systemReduce, toggle }),
    [paused, systemReduce, toggle],
  )

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}

export function useMotion(): MotionContextValue {
  return useContext(MotionContext)
}

/**
 * Runs a GSAP setup only while motion is allowed.
 *
 * The setup always animates FROM a hidden state, so the DOM holds the final
 * state in the HTML and reverts to it the moment motion is paused. Scroll
 * triggers are created inside the same context and killed on revert.
 */
export function useMotionEffect(
  setup: () => void,
  deps: unknown[] = [],
  scope?: RefObject<HTMLElement | SVGElement | null>,
) {
  const { enabled } = useMotion()

  useEffect(() => {
    if (!enabled) return
    const matchMedia = gsap.matchMedia()
    matchMedia.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(setup, scope?.current ?? undefined)
      return () => context.revert()
    })
    return () => matchMedia.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps])
}

/** True when motion may run — used for one-off decisions like the entry sequence. */
export function useMotionEnabled(): boolean {
  return useMotion().enabled
}

export { ScrollTrigger, Flip, gsap }
