import { AnimatedSection } from '../ui/AnimatedSection'
import { Section, SectionHeading } from '../ui/Section'
import { personal } from '../../data/resume'

export function About() {
  return (
    <Section id="about">
      <AnimatedSection>
        <SectionHeading>About</SectionHeading>
        <div className="space-y-4">
          {personal.about.split('\n').filter(Boolean).map((para, i) => (
            <p key={i} className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px]">
              {para.trim()}
            </p>
          ))}
        </div>
      </AnimatedSection>
    </Section>
  )
}
