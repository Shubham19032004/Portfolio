import { AnimatedSection } from '../ui/AnimatedSection'
import { Section, SectionHeading } from '../ui/Section'
import { awards } from '../../data/resume'

export function Education() {
  return (
    <Section id="education">
      <SectionHeading>Education & Awards</SectionHeading>
      <div className="space-y-8">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[15px]">
                Bachelor of Computer Applications
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Vivekananda Institute of Professional Studies, Delhi
              </p>
            </div>
            <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
              Oct 2022 – 2025
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-4">
            Awards
          </h4>
          <div className="space-y-3">
            {awards.map(award => (
              <div key={award.title} className="flex items-baseline gap-3">
                <span className="shrink-0 text-sky-500 text-xs font-mono">✦</span>
                <div>
                  <a
                    href={award.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-700 dark:text-zinc-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {award.title}
                  </a>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-2">· {award.issuer}</span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </Section>
  )
}
