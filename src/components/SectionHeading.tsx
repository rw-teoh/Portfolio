type SectionHeadingProps = {
  id: string
  eyebrow: string
  title: string
  description: string
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <p className="section-eyebrow">{eyebrow}</p>
      <h1 id={id}>{title}</h1>
      <p>{description}</p>
    </header>
  )
}
