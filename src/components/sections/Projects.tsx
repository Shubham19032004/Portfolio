import { AnimatedSection } from '../ui/AnimatedSection'
import { Section, SectionHeading } from '../ui/Section'
import { Badge } from '../ui/Badge'
import { GithubIcon } from '../ui/Icons'
import { projects } from '../../data/resume'

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading>Projects</SectionHeading>
      <div className="space-y-5">
        {projects.map((proj, i) => (
          <AnimatedSection key={proj.name} delay={i * 0.1}>
            <div className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/70 transition-all duration-300 card-hover">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-xl" />
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">
                    {proj.name}
                  </h3>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{proj.subtitle}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">{proj.period}</span>
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
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
              </div>
              <ul className="space-y-2">
                {proj.bullets.map((bullet, j) => (
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
    </Section>
  )
}
