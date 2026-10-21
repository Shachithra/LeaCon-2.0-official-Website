import { useState, type ReactNode } from 'react'
import { partners } from '../data/partners'
import { siteConfig } from '../config/site'
import { strings } from '../data/strings'

/* ------------------------------------------------------------------ InfoList */

export type InfoRow = {
  term: string
  /** `null` means the organisers have not confirmed it yet. */
  value: string | null
  /** Text used when value is null. Set `omit` to hide the row instead. */
  pending?: string
  omit?: boolean
  /** Rendered instead of plain text, e.g. a link. */
  render?: (value: string) => ReactNode
}

/**
 * InfoList — the practical facts, as a definition list with 2px rules.
 * No cards, no boxes, no invented values: an unconfirmed row either states
 * its status or is left out entirely.
 */
export function InfoList({
  rows,
  columns = 1,
  className = '',
}: {
  rows: InfoRow[]
  columns?: 1 | 2 | 4
  className?: string
}) {
  const visible = rows.filter((row) => !(row.omit && row.value === null))
  if (!visible.length) return null

  return (
    <dl className={`info-list info-list--${columns}${className ? ` ${className}` : ''}`}>
      {visible.map((row) => (
        <div className="info-list__row" key={row.term}>
          <dt className="label">{row.term}</dt>
          <dd className="info-list__value">
            {row.value !== null ? (
              row.render ? (
                row.render(row.value)
              ) : (
                row.value
              )
            ) : (
              <span className="pending">{row.pending ?? strings.detailsPending}</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/* ------------------------------------------------------------- FaqAccordion */

export type FaqItem = { question: string; answer: string }

/** Accordion (M13): height animates, aria-expanded is honest, one open at a time. */
export function FaqAccordion({ items, idPrefix = 'faq' }: { items: FaqItem[]; idPrefix?: string }) {
  const [open, setOpen] = useState<string | null>(items[0]?.question ?? null)

  if (!items.length) return null

  return (
    <div className="faq">
      {items.map((item) => {
        const expanded = open === item.question
        const panelId = `${idPrefix}-${item.question.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
        return (
          <div className="faq__item" key={item.question}>
            <h3 className="faq__question">
              <button
                type="button"
                className="faq__trigger"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : item.question)}
              >
                <span>{item.question}</span>
                <span className="faq__sign" aria-hidden="true">
                  {expanded ? '–' : '+'}
                </span>
              </button>
            </h3>
            <div className="faq__panel" id={panelId} data-open={expanded} role="region">
              <div className="faq__panel-inner">
                <p className="faq__answer">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* --------------------------------------------------------------- RegisterCta */

/**
 * RegisterCta — one action, one button.
 *
 * With a confirmed URL it opens the organiser's own registration in a new tab
 * with a visible note saying so. Without one it states the coming-soon line as
 * text — never a disabled button and never a fake success state.
 */
export function RegisterCta({ className = '' }: { className?: string }) {
  const url = siteConfig.registrationUrl

  return (
    <div className={`register-cta${className ? ` ${className}` : ''}`}>
      {url ? (
        <>
          <a className="btn" href={url} target="_blank" rel="noopener noreferrer">
            Register now
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </a>
          <p className="register-cta__hint">Opens the official registration in a new tab.</p>
        </>
      ) : (
        <>
          <p className="register-cta__pending">{strings.registrationPending}</p>
          <p className="register-cta__hint">
            {siteConfig.contactEmail
              ? `Questions first? Write to ${siteConfig.contactEmail}.`
              : 'This page carries the link the moment the organisers publish it.'}
          </p>
        </>
      )}
    </div>
  )
}

/* --------------------------------------------------------------- PartnerList */

/** Confirmed partners only. Renders nothing until logos and names are approved. */
export function PartnerList() {
  if (!partners.length) return null

  return (
    <ul className="partners" role="list">
      {partners.map((partner) => (
        <li className="partners__item" key={partner.id}>
          {partner.url ? (
            <a href={partner.url} target="_blank" rel="noopener noreferrer">
              {partner.logo.src ? (
                <img className="partners__logo" src={partner.logo.src} alt={partner.name} loading="lazy" />
              ) : (
                <span className="partners__name">{partner.name}</span>
              )}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : partner.logo.src ? (
            <img className="partners__logo" src={partner.logo.src} alt={partner.name} loading="lazy" />
          ) : (
            <span className="partners__name">{partner.name}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
