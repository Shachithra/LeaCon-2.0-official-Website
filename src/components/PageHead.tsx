import { Reveal } from './Reveal'

type Props = {
  eyebrow: string
  title: string
  lede: string
}

export function PageHead({ eyebrow, title, lede }: Props) {
  return (
    <header className="page-head">
      <div className="container">
        <div className="page-head__grid">
          <div>
            <p className="eyebrow eyebrow--teal">{eyebrow}</p>
            <h1 className="page-head__title h-display">{title}</h1>
          </div>
          <p className="page-head__lede">{lede}</p>
        </div>
        <Reveal variant="rule" className="page-head__rule" />
      </div>
    </header>
  )
}
