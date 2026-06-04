import { GithubIcon } from '../ui/Icons'
import { AnimatedSection } from '../ui/AnimatedSection'
import { Section, SectionHeading } from '../ui/Section'
import { Badge } from '../ui/Badge'
import { projects } from '../../data/resume'

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading>Projects</SectionHeading>
      <div className="space-y-8">
        {projects.map((proj, i) => (
          <AnimatedSection key={proj.name} delay={i * 0.1}>
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[15px]">
                    {proj.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{proj.subtitle}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      aria-label="GitHub"
                    >
                      <GithubIcon size={15} />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tech.split(',').map(t => (
                  <Badge key={t} variant="brand">{t.trim()}</Badge>
                ))}
                <span className="ml-auto text-xs font-mono text-zinc-400 dark:text-zinc-500 self-center">
                  {proj.period}
                </span>
              </div>

              <ul className="space-y-2">
                {proj.bullets.map((bullet, j) => (
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
