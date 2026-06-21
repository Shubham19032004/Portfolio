import { motion } from 'framer-motion'
import { GitPullRequest, Star, ExternalLink, GitMerge } from 'lucide-react'
import { GithubIcon } from '../components/ui/Icons'
import { SEO } from '../components/ui/SEO'
import { Section, SectionHeading } from '../components/ui/Section'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { Badge } from '../components/ui/Badge'
import { openSourceContributions, personal } from '../data/resume'
import { useGitHubPRs, prStatus, repoName, formatDate, type GitHubPR } from '../hooks/useGitHubPRs'

function PRStatusBadge({ pr }: { pr: GitHubPR }) {
  const status = prStatus(pr)
  const styles = {
    merged: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
    open: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    closed: 'bg-zinc-800 text-zinc-500 border border-zinc-700',
  }
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-md ${styles[status]}`}>
      <GitMerge size={10} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

function PRCard({ pr, index }: { pr: GitHubPR; index: number }) {
  const date = prStatus(pr) === 'merged' && pr.pull_request.merged_at
    ? formatDate(pr.pull_request.merged_at)
    : formatDate(pr.created_at)

  return (
    <AnimatedSection delay={index * 0.06}>
      <a
        href={pr.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-300 card-hover"
      >
        <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
          <GitPullRequest size={14} className="text-violet-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="font-medium text-zinc-200 text-sm leading-snug group-hover:text-sky-400 transition-colors">
              {pr.title}
            </h3>
            <ExternalLink size={12} className="text-zinc-600 group-hover:text-sky-500 transition-colors shrink-0 mt-0.5" />
          </div>
          <p className="text-xs font-mono text-zinc-600 mb-3">{repoName(pr)}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <PRStatusBadge pr={pr} />
            <span className="text-xs font-mono text-zinc-600">{date}</span>
          </div>
        </div>
      </a>
    </AnimatedSection>
  )
}

function PRSkeleton() {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-zinc-800 p-5 animate-pulse">
      <div className="w-8 h-8 rounded-lg bg-zinc-800 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-zinc-800 rounded w-3/4" />
        <div className="h-3 bg-zinc-800 rounded w-1/4" />
        <div className="h-5 bg-zinc-800 rounded w-16 mt-3" />
      </div>
    </div>
  )
}

export function OpenSource() {
  const { prs, loading, error } = useGitHubPRs(personal.githubUsername, 'grafana')
  const mergedCount = prs.filter(pr => prStatus(pr) === 'merged').length

  const stats = [
    { label: 'Organisations', value: '1+', icon: GithubIcon },
    { label: 'PRs Merged', value: loading ? '...' : `${mergedCount}`, icon: GitMerge },
    { label: 'Projects', value: 'Open', icon: Star },
  ]

  return (
    <main className="pt-14">
      <SEO
        title="Open Source"
        description="Open source contributions to Grafana and personal projects including go-count, a container runtime built from scratch in Go."
        path="/open-source"
      />
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionHeading>Open Source</SectionHeading>
          <h1 className="text-3xl font-semibold text-zinc-100 mb-3">
            Open Source
          </h1>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-lg">
            Contributions to open source tools I use and believe in.
          </p>
        </motion.div>

        {/* Stats */}
        <AnimatedSection className="grid grid-cols-3 gap-4 mb-12">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-center">
              <Icon size={15} className="mx-auto mb-2 text-sky-500" />
              <p className="font-semibold text-zinc-100 text-lg">{value}</p>
              <p className="text-xs text-zinc-600 mt-0.5">{label}</p>
            </div>
          ))}
        </AnimatedSection>

        {/* Pull Requests */}
        <AnimatedSection delay={0.1}>
          <h2 className="text-xs font-mono uppercase tracking-widest text-sky-500 mb-6">
            Pull Requests
          </h2>

          {loading && (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => <PRSkeleton key={i} />)}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-zinc-800 p-6 text-center">
              <p className="text-sm text-zinc-500 mb-3">Could not load PRs from GitHub.</p>
              <a
                href={`https://github.com/search?q=author%3A${personal.githubUsername}+type%3Apr+org%3Agrafana&type=pullrequests`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sky-500 hover:text-sky-400 transition-colors font-mono"
              >
                View on GitHub instead
              </a>
            </div>
          )}

          {!loading && !error && prs.length === 0 && (
            <p className="text-sm text-zinc-600">No public PRs found.</p>
          )}

          {!loading && !error && prs.length > 0 && (
            <div className="space-y-3">
              {prs.map((pr, i) => (
                <PRCard key={pr.id} pr={pr} index={i} />
              ))}
            </div>
          )}
        </AnimatedSection>

        {/* Org contributions */}
        <AnimatedSection delay={0.2} className="mt-14">
          <h2 className="text-xs font-mono uppercase tracking-widest text-sky-500 mb-6">
            Organisations
          </h2>
          <div className="space-y-4">
            {openSourceContributions.map(contrib => (
              <a
                key={contrib.project}
                href={contrib.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 transition-colors card-hover"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                  <GithubIcon size={18} className="text-zinc-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-zinc-200 text-[15px] group-hover:text-sky-400 transition-colors">
                        {contrib.project}
                      </h3>
                      <p className="text-xs text-zinc-600 mb-2">{contrib.org}</p>
                    </div>
                    <ExternalLink size={13} className="text-zinc-600 group-hover:text-sky-500 transition-colors shrink-0 mt-0.5" />
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-3">
                    {contrib.description}
                  </p>
                  <Badge variant="brand">{contrib.type}</Badge>
                </div>
              </a>
            ))}
          </div>
        </AnimatedSection>

        {/* Personal projects */}
        <AnimatedSection delay={0.3} className="mt-14">
          <h2 className="text-xs font-mono uppercase tracking-widest text-sky-500 mb-6">
            Personal Projects
          </h2>
          <a
            href={`https://github.com/${personal.githubUsername}/go-count`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 transition-colors card-hover"
          >
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
              <span className="text-sky-400 font-mono text-xs font-bold">Go</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-zinc-200 text-[15px] group-hover:text-sky-400 transition-colors">
                    go-count
                  </h3>
                  <p className="text-xs text-zinc-600 mb-2">Lightweight Container Runtime</p>
                </div>
                <ExternalLink size={13} className="text-zinc-600 group-hover:text-sky-500 transition-colors shrink-0 mt-0.5" />
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed mb-3">
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

        <AnimatedSection delay={0.4} className="mt-10">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors font-medium"
          >
            <GithubIcon size={15} />
            See all repositories
          </a>
        </AnimatedSection>
      </Section>
    </main>
  )
}
