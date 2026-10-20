import { Reveal } from './Reveal'

type Props = {
  eyebrow: string
  title: string
  lede: string
  /** `forest` opens the page on the deep green field instead of warm paper. */
  tone?: 'paper' | 'forest'
}

export function PageHead({ eyebrow, title, lede, tone = 'paper' }: Props) {
  const onForest = tone === 'forest'

  return (
    <header
      className={`page-head${onForest ? ' page-head--forest' : ''}`}
      data-field={onForest ? 'forest' : undefined}
    >
      <div className="container">
        <div className="page-head__grid">
          <div>
            <p className="eyebrow eyebrow--green">{eyebrow}</p>
            <h1 className="page-head__title h-display">{title}</h1>
          </div>
          <p className="page-head__lede">{lede}</p>
        </div>
        <Reveal variant="rule" className="page-head__rule" />
      </div>
    </header>
  )
}
