import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { GitPullRequest, Star, ExternalLink, GitMerge } from 'lucide-react'
import { GithubIcon } from '../components/ui/Icons'
import { SEO } from '../components/ui/SEO'
import { Section, SectionHeading } from '../components/ui/Section'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { Badge } from '../components/ui/Badge'
import { openSourceContributions, personal } from '../data/resume'
import { useGitHubPRs, prStatus, repoName, repoOwner, formatDate, type GitHubPR } from '../hooks/useGitHubPRs'
import type { OpenSourceContribution } from '../types'

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

interface OrgSummary {
  login: string
  prCount: number
  mergedCount: number
  info?: OpenSourceContribution
}

/** Merge orgs discovered from PRs with the optional metadata in resume data. */
function buildOrgs(prs: GitHubPR[]): OrgSummary[] {
  const byLogin = new Map<string, OrgSummary>()
  const keyOf = (login: string) => login.toLowerCase()

  for (const info of openSourceContributions) {
    byLogin.set(keyOf(info.githubOrg), { login: info.githubOrg, prCount: 0, mergedCount: 0, info })
  }
  for (const pr of prs) {
    const login = repoOwner(pr)
    const entry = byLogin.get(keyOf(login)) ?? { login, prCount: 0, mergedCount: 0 }
    entry.prCount++
    if (prStatus(pr) === 'merged') entry.mergedCount++
    byLogin.set(keyOf(login), entry)
  }
  return [...byLogin.values()].sort((a, b) => b.prCount - a.prCount)
}

export function OpenSource() {
  const { prs, loading, error } = useGitHubPRs(personal.githubUsername)
  const [activeOrg, setActiveOrg] = useState<string | null>(null)

  const orgs = useMemo(() => buildOrgs(prs), [prs])
  const visiblePRs = activeOrg
    ? prs.filter(pr => repoOwner(pr).toLowerCase() === activeOrg.toLowerCase())
    : prs
  const mergedCount = prs.filter(pr => prStatus(pr) === 'merged').length
  const openCount = prs.filter(pr => prStatus(pr) === 'open').length
  const activeOrgs = orgs.filter(o => o.prCount > 0)
  const orgCount = loading ? openSourceContributions.length : activeOrgs.length

  const filters: { login: string | null; label: string; count: number }[] = [
    { login: null, label: 'All', count: prs.length },
    ...activeOrgs.map(o => ({ login: o.login, label: o.info?.project ?? o.login, count: o.prCount })),
  ]

  const stats = [
    { label: 'Organisations', value: `${orgCount}`, icon: GithubIcon },
    { label: 'PRs Merged', value: loading ? '...' : `${mergedCount}`, icon: GitMerge },
    { label: 'PRs Open', value: loading ? '...' : `${openCount}`, icon: Star },
  ]

  return (
    <main className="pt-14">
      <SEO
        title="Open Source"
        description={`Open source contributions to ${openSourceContributions.map(c => c.project).join(', ')} and personal projects including go-count, a container runtime built from scratch in Go.`}
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
          <h2 className="text-xs font-mono uppercase tracking-widest text-sky-500 mb-4">
            Pull Requests
          </h2>

          {!loading && !error && filters.length > 2 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.map(({ login, label, count }) => {
                const active = activeOrg === login
                return (
                  <button
                    key={login ?? 'all'}
                    type="button"
                    onClick={() => setActiveOrg(login)}
                    aria-pressed={active}
                    className={`text-xs font-mono px-3 py-1 rounded-full border transition-colors ${
                      active
                        ? 'border-sky-500/40 bg-sky-500/10 text-sky-400'
                        : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    {label} <span className="opacity-60">{count}</span>
                  </button>
                )
              })}
            </div>
          )}

          {loading && (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => <PRSkeleton key={i} />)}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-zinc-800 p-6 text-center">
              <p className="text-sm text-zinc-500 mb-3">Could not load PRs from GitHub.</p>
              <a
                href={`https://github.com/search?q=author%3A${personal.githubUsername}+type%3Apr+-user%3A${personal.githubUsername}&type=pullrequests`}
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
              {visiblePRs.map((pr, i) => (
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
            {orgs.map(({ login, prCount, mergedCount: merged, info }) => (
              <a
                key={login}
                href={info?.url ?? `https://github.com/${login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 transition-colors card-hover"
              >
                <img
                  src={`https://github.com/${login}.png?size=80`}
                  alt=""
                  loading="lazy"
                  className="w-10 h-10 rounded-lg bg-zinc-800 shrink-0 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-zinc-200 text-[15px] group-hover:text-sky-400 transition-colors">
                        {info?.project ?? login}
                      </h3>
                      <p className="text-xs text-zinc-600 mb-2">{info?.org ?? `github.com/${login}`}</p>
                    </div>
                    <ExternalLink size={13} className="text-zinc-600 group-hover:text-sky-500 transition-colors shrink-0 mt-0.5" />
                  </div>
                  {info?.description && (
                    <p className="text-sm text-zinc-500 leading-relaxed mb-3">
                      {info.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="brand">{info?.type ?? 'Contributor'}</Badge>
                    {prCount > 0 && (
                      <span className="text-xs font-mono text-zinc-600">
                        {prCount} PR{prCount === 1 ? '' : 's'} · {merged} merged
                      </span>
                    )}
                  </div>
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
