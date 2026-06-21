import { AnimatedSection } from '../ui/AnimatedSection'
import { Section, SectionHeading } from '../ui/Section'
import { skills } from '../../data/resume'

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading>Skills</SectionHeading>
      <AnimatedSection>
        <div className="space-y-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex flex-col sm:flex-row gap-3">
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600 sm:w-36 shrink-0 pt-1.5">
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-mono rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-sky-400 dark:hover:border-sky-500/50 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-zinc-800/80 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </Section>
  )
}
