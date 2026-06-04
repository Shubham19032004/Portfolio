import { AnimatedSection } from '../ui/AnimatedSection'
import { Section, SectionHeading } from '../ui/Section'
import { Badge } from '../ui/Badge'
import { skills } from '../../data/resume'

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading>Skills</SectionHeading>
      <AnimatedSection>
        <div className="space-y-5">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex flex-col sm:flex-row gap-3">
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 sm:w-36 shrink-0 pt-0.5">
                {category}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {items.map(skill => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </Section>
  )
}
