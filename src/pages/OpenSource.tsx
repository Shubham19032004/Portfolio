import { motion } from 'framer-motion'
import { GitPullRequest, Star, ExternalLink, GitMerge } from 'lucide-react'
import { GithubIcon } from '../components/ui/Icons'
import { Section, SectionHeading } from '../components/ui/Section'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { Badge } from '../components/ui/Badge'
import { openSourceContributions, pullRequests, personal } from '../data/resume'
import type { PullRequest } from '../types'

const stats = [
  { label: 'Organisations', value: '1+', icon: GithubIcon },
  { label: 'PRs Merged', value: `${pullRequests.filter(p => p.status === 'merged').length}+`, icon: GitMerge },
  { label: 'Projects', value: 'Open', icon: Star },
]

function PRCard({ pr, index }: { pr: PullRequest; index: number }) {
  const statusStyles = {
    merged: 'bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400',
    open: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    closed: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
  }

  return (
    <AnimatedSection delay={index * 0.07}>
      <a
        href={pr.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
      >
        <div className="w-9 h-9 rounded-lg bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center shrink-0 mt-0.5">
          <GitPullRequest size={16} className="text-violet-600 dark:text-violet-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="font-medium text-zinc-900 dark:text-zinc-100 text-[14px] leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {pr.title}
            </h3>
            <ExternalLink size={13} className="text-zinc-400 group-hover:text-sky-500 transition-colors shrink-0 mt-0.5" />
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2 font-mono">{pr.repo}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
            {pr.description}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md ${statusStyles[pr.status]}`}>
              <GitMerge size={11} />
              {pr.status.charAt(0).toUpperCase() + pr.status.slice(1)}
            </span>
            {pr.mergedAt && (
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">{pr.mergedAt}</span>
            )}
          </div>
        </div>
      </a>
    </AnimatedSection>
  )
}

export function OpenSource() {
  return (
    <main className="pt-14">
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionHeading>Open Source</SectionHeading>
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
            Open Source
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-lg">
            I contribute to open source tools I use and believe in. Below are the
            projects, organisations, and pull requests I've contributed to.
          </p>
        </motion.div>

        {/* Stats row */}
        <AnimatedSection className="grid grid-cols-3 gap-4 mb-12">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 text-center"
            >
              <Icon size={16} className="mx-auto mb-2 text-sky-500" />
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-lg">{value}</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{label}</p>
            </div>
          ))}
        </AnimatedSection>

        {/* Pull Requests */}
        <AnimatedSection delay={0.1}>
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6">
            Pull Requests
          </h2>
          <div className="space-y-3">
            {pullRequests.map((pr, i) => (
              <PRCard key={pr.url} pr={pr} index={i} />
            ))}
          </div>
        </AnimatedSection>

        {/* Org contributions */}
        <AnimatedSection delay={0.2} className="mt-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6">
            Organisations
          </h2>
          <div className="space-y-4">
            {openSourceContributions.map(contrib => (
              <a
                key={contrib.project}
                href={contrib.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                  <GithubIcon size={18} className="text-zinc-600 dark:text-zinc-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[15px] group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {contrib.project}
                      </h3>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">{contrib.org}</p>
                    </div>
                    <ExternalLink size={13} className="text-zinc-400 group-hover:text-sky-500 transition-colors shrink-0 mt-0.5" />
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
                    {contrib.description}
                  </p>
                  <Badge variant="brand">{contrib.type}</Badge>
                </div>
              </a>
            ))}
          </div>
        </AnimatedSection>

        {/* Personal OSS projects */}
        <AnimatedSection delay={0.3} className="mt-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6">
            Personal Projects
          </h2>
          <a
            href={`https://github.com/${personal.githubUsername}/gocount`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center shrink-0">
              <span className="text-sky-600 dark:text-sky-400 font-mono text-sm font-bold">Go</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[15px] group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    gocount
                  </h3>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">Lightweight Container Runtime</p>
                </div>
                <ExternalLink size={13} className="text-zinc-400 group-hover:text-sky-500 transition-colors shrink-0 mt-0.5" />
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
                A fully functional container runtime built from scratch in Go, implementing Linux namespaces,
                cgroup v2 resource limits, pivot_root filesystem isolation, and veth networking without using
                Docker or any container library.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Go', 'Linux', 'Namespaces', 'cgroups v2'].map(t => (
                  <Badge key={t} variant="brand">{t}</Badge>
                ))}
              </div>
            </div>
          </a>
        </AnimatedSection>

        {/* GitHub CTA */}
        <AnimatedSection delay={0.4} className="mt-10">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium"
          >
            <GithubIcon size={15} />
            See all repositories
          </a>
        </AnimatedSection>
      </Section>
    </main>
  )
}
