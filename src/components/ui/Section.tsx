import type { ReactNode } from 'react'

interface Props {
  id?: string
  children: ReactNode
  className?: string
}

export function Section({ id, children, className = '' }: Props) {
  return (
    <section
      id={id}
      className={`py-24 px-4 sm:px-6 max-w-3xl mx-auto ${className}`}
    >
      {children}
    </section>
  )
}

interface SectionHeadingProps {
  children: ReactNode
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-sky-500 mb-10">
      {children}
    </h2>
  )
}
