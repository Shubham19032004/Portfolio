import { AnimatedSection } from '../ui/AnimatedSection'
import { Section, SectionHeading } from '../ui/Section'
import { experiences } from '../../data/resume'

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading>Experience</SectionHeading>
      <div className="space-y-10">
        {experiences.map((exp, i) => (
          <AnimatedSection key={exp.company} delay={i * 0.1}>
            <div className="group">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[15px]">
                    {exp.company}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{exp.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                    {exp.period}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">{exp.location}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-sky-500 dark:bg-sky-400" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  )
}
