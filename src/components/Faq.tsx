import { useId, useState } from 'react'

export type FaqItem = {
  question: string
  answer: string
}

type Props = {
  items: FaqItem[]
  /** Heading text for the accordion group. */
  title?: string
}

/**
 * A native-button accordion: every trigger is a real <button>, so keyboard
 * behaviour, focus and Enter/Space come for free. The closed panel uses the
 * `hidden` attribute rather than a height animation — the answer is either
 * there or it is not, and nothing is trapped mid-transition.
 */
export function Faq({ items, title }: Props) {
  const base = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="faq">
      {title ? <h2 className="faq__title">{title}</h2> : null}

      <ul className="faq__list" role="list">
        {items.map((item, index) => {
          const triggerId = `${base}-trigger-${index}`
          const panelId = `${base}-panel-${index}`
          const isOpen = openIndex === index

          return (
            <li className="faq__item" key={item.question}>
              <h3 className="faq__heading">
                <button
                  type="button"
                  className="faq__trigger"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="faq__question">{item.question}</span>
                  <span className="faq__sign" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path d="M5 12h14" />
                      <path className="faq__sign-v" d="M12 5v14" />
                    </svg>
                  </span>
                </button>
              </h3>

              <div className="faq__panel" id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen}>
                <p className="faq__answer">{item.answer}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
