import { useEffect, useRef, type RefObject } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { gsap, useMotion } from '../motion/MotionProvider'
import { FrameWireframe } from './FrameWireframe'
import { ClockText, CopyEmail } from './Details'
import { navItems, registerItem, site } from '../config/site'

/**
 * MenuOverlay (M3 + M19) — the full-screen forest panel below 1024px.
 *
 * Left half: the large nav items, each rising out of a mask. Right half: a
 * photographic frame wireframe that draws itself once on open, with
 * "LEACON 2.0" inside it. Native <dialog> supplies the focus trap, Escape
 * handling and focus return; scroll on the page behind is locked while open.
 */
type Props = {
  open: boolean
  onClose: () => void
  triggerRef: RefObject<HTMLButtonElement | null>
}

export function MenuOverlay({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const { enabled } = useMotion()
  const closing = useRef(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      closing.current = false
      dialog.showModal()
      const previous = document.documentElement.style.overflow
      document.documentElement.style.overflow = 'hidden'
      return () => {
        document.documentElement.style.overflow = previous
      }
    }

    if (!open && dialog.open) dialog.close()
    return
  }, [open])

  function requestClose() {
    if (closing.current) return
    closing.current = true
    const dialog = dialogRef.current
    if (!dialog || !dialog.open || !enabled) {
      onClose()
      return
    }
    gsap.to(dialog, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.4,
      ease: 'power4.inOut',
      onComplete: onClose,
    })
  }

  /* M3/M19 open: panel wipes down, links rise out of masks, wireframe draws. */
  useEffect(() => {
    if (!open || !enabled) return
    const dialog = dialogRef.current
    if (!dialog) return

    const context = gsap.context(() => {
      const timeline = gsap.timeline()
      timeline.fromTo(
        dialog,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power4.inOut' },
      )
      timeline.from(
        dialog.querySelectorAll('.menu-overlay__link .mask__inner'),
        { yPercent: 105, duration: 0.5, stagger: 0.06, ease: 'expo.out' },
        0.25,
      )
      timeline.from(
        dialog.querySelectorAll('.menu-overlay__foot > *'),
        { autoAlpha: 0, y: 12, duration: 0.4, stagger: 0.06, ease: 'power3.out' },
        0.4,
      )
    }, dialogRef)

    return () => context.revert()
  }, [open, enabled])

  return (
    <dialog
      id="site-menu"
      ref={dialogRef}
      className="menu-overlay"
      aria-label="Site menu"
      onCancel={(event) => {
        event.preventDefault()
        requestClose()
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) requestClose()
      }}
    >
      <div className="menu-overlay__inner">
        <div className="menu-overlay__top">
          <span className="wordmark wordmark--invert" aria-hidden="true">
            <span className="wordmark__name">{site.wordmark}</span>
            <span className="wordmark__ed">{site.edition}</span>
          </span>
          <button
            type="button"
            className="menu-overlay__close"
            onClick={requestClose}
            autoFocus
          >
            <span aria-hidden="true">[ Close ]</span>
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <div className="menu-overlay__body">
          <nav aria-label="Menu" className="menu-overlay__nav">
            <ul className="menu-overlay__list" role="list">
              {navItems.map((item) => (
                <li className="menu-overlay__item" key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `menu-overlay__link${isActive ? ' is-active' : ''}`
                    }
                    onClick={requestClose}
                  >
                    <span className="mask">
                      <span className="mask__inner">{item.label}</span>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu-overlay__aside" aria-hidden="true">
            {open ? <FrameWireframe animate on="forest" duration={1.2} /> : null}
            <span className="menu-overlay__frame-label">{site.fullName}</span>
          </div>
        </div>

        <div className="menu-overlay__foot">
          <Link to={registerItem.to} className="btn btn--paper btn--block" onClick={requestClose}>
            {registerItem.label}
          </Link>
          <div className="menu-overlay__meta">
            <ClockText />
            <CopyEmail />
          </div>
        </div>
      </div>
    </dialog>
  )
}
