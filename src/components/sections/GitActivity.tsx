import { useEffect, useState } from 'react'
import { GitCommit, GitPullRequest, Star } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'
import { Section, SectionHeading } from '../ui/Section'
import type { GitHubEvent } from '../../types'
import { personal } from '../../data/resume'

function eventIcon(type: string) {
  if (type === 'PushEvent') return <GitCommit size={13} className="text-sky-500" />
  if (type === 'PullRequestEvent') return <GitPullRequest size={13} className="text-violet-500" />
  if (type === 'WatchEvent') return <Star size={13} className="text-amber-500" />
  return <GitCommit size={13} className="text-zinc-400" />
}

function eventLabel(e: GitHubEvent): string {
  if (e.type === 'PushEvent') {
    const commits = e.payload.commits ?? []
    const msg = commits[0]?.message?.split('\n')[0] ?? 'Pushed commits'
    return `${msg} → ${e.repo.name.split('/')[1]}`
  }
  if (e.type === 'PullRequestEvent') {
    return `PR ${e.payload.action} → ${e.repo.name.split('/')[1]}`
  }
  if (e.type === 'WatchEvent') return `Starred ${e.repo.name}`
  if (e.type === 'CreateEvent') return `Created ${e.payload.ref ?? 'branch'} in ${e.repo.name.split('/')[1]}`
  return `${e.type.replace('Event', '')} on ${e.repo.name.split('/')[1]}`
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return `${Math.floor(days / 30)}mo ago`
}

export function GitActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`https://api.github.com/users/${personal.githubUsername}/events/public?per_page=10`)
      .then(r => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then((data: GitHubEvent[]) => {
        const relevant = data.filter(e =>
          ['PushEvent', 'PullRequestEvent', 'CreateEvent', 'WatchEvent'].includes(e.type)
        )
        setEvents(relevant.slice(0, 8))
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (error) return null

  return (
    <Section id="activity">
      <SectionHeading>Recent Activity</SectionHeading>
      <AnimatedSection>
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className="w-4 h-4 rounded bg-zinc-100 dark:bg-zinc-800 animate-pulse shrink-0" />
                <div className="h-3 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded flex-1" style={{ maxWidth: `${60 + i * 5}%` }} />
                <div className="h-3 w-12 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded shrink-0" />
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <p className="text-sm text-zinc-400 dark:text-zinc-500">No recent public activity found.</p>
        ) : (
          <div className="space-y-3">
            {events.map(event => (
              <div key={event.id} className="flex items-start gap-3 group">
                <span className="mt-0.5 shrink-0">{eventIcon(event.type)}</span>
                <a
                  href={`https://github.com/${event.repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors leading-snug flex-1 truncate"
                  title={eventLabel(event)}
                >
                  {eventLabel(event)}
                </a>
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600 shrink-0 whitespace-nowrap">
                  {timeAgo(event.created_at)}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            View all on GitHub →
          </a>
        </div>
      </AnimatedSection>
    </Section>
  )
}
