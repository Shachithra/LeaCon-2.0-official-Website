import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap, useMotionEnabled } from '../motion/MotionProvider'

/**
 * PageWipe (M20) — the green wipe between routes.
 *
 * Forward navigation wipes left to right, navigation to a shallower page wipes
 * right to left. The new page is rendered behind the panel and becomes
 * interactive at the midpoint, so the wipe never blocks navigation.
 *
 * Only internal link clicks are intercepted: external links, the browser back
 * and forward buttons, and hash anchors keep their native behaviour. With
 * motion paused or reduced the same listener runs a plain 240ms crossfade.
 */
export function PageWipe() {
  const navigate = useNavigate()
  const location = useLocation()
  const enabled = useMotionEnabled()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const busy = useRef(false)

  useEffect(() => {
    const panel = () => panelRef.current

    const run = (target: string, forward: boolean) => {
      const node = panel()
      if (!node || busy.current) return

      if (!enabled) {
        /* Reduced motion / paused: plain crossfade, 240ms total. */
        busy.current = true
        gsap.set(node, { clearProps: 'transform', xPercent: 0, autoAlpha: 0 })
        node.dataset.variant = 'fade'
        gsap
          .timeline({
            onComplete: () => {
              node.dataset.variant = ''
              gsap.set(node, { autoAlpha: 0 })
              busy.current = false
            },
          })
          .to(node, { autoAlpha: 1, duration: 0.12, ease: 'none' })
          .call(() => navigate(target))
          .to(node, { autoAlpha: 0, duration: 0.12, ease: 'none' }, '+=0.04')
        return
      }

      busy.current = true
      node.dataset.variant = 'wipe'
      const from = forward ? -100 : 100
      const to = forward ? 100 : -100
      gsap.set(node, { autoAlpha: 1, xPercent: from })
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(node, { autoAlpha: 0, xPercent: 0 })
            node.dataset.variant = ''
            busy.current = false
          },
        })
        .to(node, { xPercent: 0, duration: 0.15, ease: 'power4.inOut' })
        .call(() => navigate(target))
        .to(node, { xPercent: to, duration: 0.15, ease: 'power4.inOut' }, '+=0.05')
    }

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (busy.current) return

      const target = event.target as Element | null
      const anchor = target?.closest?.('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('/') || href.startsWith('//')) return
      if (anchor.hasAttribute('download')) return
      const relTarget = anchor.getAttribute('target')
      if (relTarget && relTarget !== '_self') return

      const [path, hash] = href.split('#')
      const toPath = path || location.pathname

      /* Hash anchors on the current page keep native scrolling. */
      if (toPath === location.pathname && hash) return
      /* A link to the page already open is a no-op. */
      if (toPath === location.pathname && !hash) return

      event.preventDefault()
      event.stopPropagation()

      const depth = (value: string) => value.split('/').filter(Boolean).length
      const forward = depth(toPath) >= depth(location.pathname)
      run(hash ? `${toPath}#${hash}` : toPath, forward)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [enabled, location.pathname, navigate])

  return <div className="page-wipe" ref={panelRef} aria-hidden="true" />
}
