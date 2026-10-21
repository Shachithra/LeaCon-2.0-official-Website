import { useEffect, useState } from 'react'
import { siteConfig } from '../config/site'

/**
 * ClockText (M13) — "SRI LANKA 15:26". A live local clock for the country the
 * event happens in, on the Asia/Colombo time zone, ticking once a minute.
 */
const formatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Asia/Colombo',
})

function nowInSriLanka(): string {
  return formatter.format(new Date())
}

export function ClockText({ className }: { className?: string }) {
  const [time, setTime] = useState(nowInSriLanka)

  useEffect(() => {
    const id = window.setInterval(() => {
      const next = nowInSriLanka()
      setTime((current) => (current === next ? current : next))
    }, 15000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span className={`clock tabular${className ? ` ${className}` : ''}`}>
      <span className="clock__place">Sri Lanka</span>{' '}
      <time>{time}</time>
    </span>
  )
}

/**
 * CopyEmail (M13) — click to copy, the label says "Copied", an aria-live
 * region announces it. Renders nothing until an official address exists.
 */
export function CopyEmail({ className }: { className?: string }) {
  const email = siteConfig.contactEmail
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(id)
  }, [copied])

  if (!email) return null

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      /* Clipboard blocked: the mailto link below still works. */
    }
  }

  return (
    <span className={`copy-email${className ? ` ${className}` : ''}`}>
      <button type="button" className="copy-email__btn" onClick={copy}>
        {copied ? 'Copied' : email}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </span>
  )
}
