import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { gsap, useMotionEnabled } from '../motion/MotionProvider'
import { FrameWireframe } from './FrameWireframe'
import { assets, site } from '../config/site'
import { markEntered, markEntrySeen, shouldRunEntry } from '../motion/entry'

/**
 * EntrySequence (M1 + M14 + M15).
 *
 * Stage A — a photographic frame draws itself on forest (1.4s).
 * Stage B — a real loading counter (fonts + hero photograph) and a green
 *           ENTER button. ENTER can be pressed at once; the sequence also
 *           leaves by itself at 4s and is forced out at 5s.
 * Exit    — the frame fills with the hero photograph (0.7s), then the two
 *           forest panels split apart vertically (0.6s) to reveal the page.
 *
 * Skipped entirely on repeat visits, under reduced motion, or when motion is
 * paused — the page then starts at its final state with no animation at all.
 */

type Phase = 'hidden' | 'run' | 'exit' | 'gone'

const FOCUSABLE = 'a[href], button:not([disabled])'

export function EntrySequence() {
  const enabled = useMotionEnabled()
  const [phase, setPhase] = useState<Phase>('hidden')

  const rootRef = useRef<HTMLDivElement | null>(null)
  const skipRef = useRef<HTMLAnchorElement | null>(null)
  const counterRef = useRef<HTMLSpanElement | null>(null)
  const enterTimeline = useRef<gsap.core.Timeline | null>(null)
  const exitTimeline = useRef<gsap.core.Timeline | null>(null)
  const forceTimer = useRef<number>(0)
  const leaving = useRef(false)
  /* StrictMode runs this effect twice; the decision is made once and kept. */
  const decision = useRef<'pending' | 'run' | 'skip'>('pending')

  /* --- decide: run, or hand straight over to the page ------------------- */
  useEffect(() => {
    if (decision.current === 'pending') {
      decision.current = !enabled || !shouldRunEntry() ? 'skip' : 'run'
    }

    if (decision.current === 'skip') {
      markEntered()
      setPhase('gone')
      return
    }

    const src = assets.hero.src
    if (!src) {
      markEntrySeen()
      setPhase('run')
      return
    }

    /* The photograph wins the race only if it is ready inside 400ms. */
    let settled = false
    let cancelled = false
    const image = new Image()
    const timer = window.setTimeout(() => {
      if (settled || cancelled) return
      settled = true
      markEntrySeen()
      setPhase('run')
    }, 400)
    const ready = () => {
      if (settled || cancelled) return
      settled = true
      window.clearTimeout(timer)
      markEntered()
      setPhase('gone')
    }
    image.onload = ready
    image.onerror = ready
    image.src = src

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [enabled])

  /* --- stage A + stage B timeline --------------------------------------- */
  useEffect(() => {
    if (phase !== 'run') return
    const root = rootRef.current
    if (!root) return

    const counter = { value: 0 }
    const render = () => {
      const node = counterRef.current
      if (node) node.textContent = String(Math.round(counter.value)).padStart(3, '0')
    }
    render()

    const timeline = gsap.timeline()
    timeline.from(root.querySelector('.entry__label'), { autoAlpha: 0, duration: 0.3 }, 0.8)
    timeline.from(
      [root.querySelector('.entry__counter'), root.querySelector('.entry__enter')],
      { autoAlpha: 0, duration: 0.3, stagger: 0.05 },
      1.4,
    )
    timeline.to(
      counter,
      { value: 100, duration: 0.6, ease: 'none', onUpdate: render },
      1.4,
    )
    timeline.call(() => startExit(), undefined, 4)
    enterTimeline.current = timeline

    forceTimer.current = window.setTimeout(() => startExit(), 5000)
    skipRef.current?.focus({ preventScroll: true })

    return () => {
      timeline.kill()
      enterTimeline.current = null
      window.clearTimeout(forceTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  /* --- pausing mid-sequence drops straight to the page ------------------ */
  useEffect(() => {
    if (enabled) return
    enterTimeline.current?.kill()
    exitTimeline.current?.kill()
    window.clearTimeout(forceTimer.current)
    markEntered()
    setPhase('gone')
  }, [enabled])

  useEffect(() => {
    return () => {
      exitTimeline.current?.kill()
    }
  }, [])

  /* --- exit -------------------------------------------------------------- */
  function startExit() {
    if (leaving.current) return
    leaving.current = true

    enterTimeline.current?.kill()
    window.clearTimeout(forceTimer.current)
    markEntrySeen()

    const root = rootRef.current
    if (!root) {
      markEntered()
      setPhase('gone')
      return
    }

    setPhase('exit')

    const fill = root.querySelector('.entry__fill')
    const stage = root.querySelector('.entry__stage')
    const top = root.querySelector('.entry__panel--top')
    const bottom = root.querySelector('.entry__panel--bottom')

    const timeline = gsap.timeline({
      onComplete: () => {
        markEntered()
        setPhase('gone')
      },
    })
    timeline.to(fill, { clipPath: 'inset(0% 0 0 0)', duration: 0.7, ease: 'power4.inOut' })
    timeline.set(stage, { autoAlpha: 0 })
    timeline.call(() => markEntered())
    timeline.to(top, { yPercent: -100, duration: 0.6, ease: 'power4.inOut' })
    timeline.to(bottom, { yPercent: 100, duration: 0.6, ease: 'power4.inOut' }, '<')
    exitTimeline.current = timeline
  }

  function skip() {
    if (leaving.current) return
    leaving.current = true
    enterTimeline.current?.kill()
    window.clearTimeout(forceTimer.current)
    markEntrySeen()
    markEntered()
    setPhase('gone')
    window.setTimeout(() => {
      document.getElementById('main')?.focus({ preventScroll: true })
    }, 0)
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      skip()
      return
    }
    if (event.key !== 'Tab') return
    const nodes = Array.from(
      rootRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
    ).filter((node) => node.offsetParent !== null)
    if (!nodes.length) return
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    const active = document.activeElement
    if (event.shiftKey && (active === first || !rootRef.current?.contains(active))) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  }

  if (phase === 'hidden' || phase === 'gone') return null

  const heroSrc = assets.hero.src

  return (
    <div
      className="entry"
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Enter ${site.fullName}`}
      data-phase={phase}
      onKeyDown={onKeyDown}
    >
      <div className="entry__panel entry__panel--top" aria-hidden="true" />
      <div className="entry__panel entry__panel--bottom" aria-hidden="true" />

      <div className="entry__stage">
        <a
          className="entry__skip"
          ref={skipRef}
          href="#main"
          onClick={(event) => {
            event.preventDefault()
            skip()
          }}
        >
          Skip
        </a>

        <div className="entry__frame">
          <FrameWireframe animate duration={1.4} />
          <span className="entry__label">{site.fullName}</span>
          <div className="entry__fill" aria-hidden="true">
            {heroSrc ? <img src={heroSrc} alt="" /> : null}
          </div>
        </div>

        <div className="entry__controls">
          <span className="entry__counter tabular" ref={counterRef}>
            000
          </span>
          <button type="button" className="entry__enter" onClick={startExit}>
            Enter
          </button>
        </div>
      </div>
    </div>
  )
}
