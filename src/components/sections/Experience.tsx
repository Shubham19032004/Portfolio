import { AnimatedSection } from '../ui/AnimatedSection'
import { Section, SectionHeading } from '../ui/Section'
import { experiences } from '../../data/resume'

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading>Experience</SectionHeading>
      <div className="relative">
        <div className="absolute left-0 top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <AnimatedSection key={exp.company} delay={i * 0.1}>
              <div className="sm:pl-8 relative">
                <div className="absolute -left-[4.5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-sky-500 bg-white dark:bg-[#09090b] hidden sm:block" />
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">
                      {exp.company}
                    </h3>
                    <p className="text-sm text-sky-600 dark:text-sky-400 mt-0.5">{exp.role}</p>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                      {exp.period}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5">{exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </Section>
  )
}
