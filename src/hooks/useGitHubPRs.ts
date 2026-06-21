import { useEffect, useState } from 'react'

export interface GitHubPR {
  id: number
  title: string
  html_url: string
  state: string
  created_at: string
  pull_request: {
    merged_at: string | null
  }
  repository_url: string
  body: string | null
}

interface State {
  prs: GitHubPR[]
  loading: boolean
  error: boolean
}

interface CacheEntry {
  prs: GitHubPR[]
  fetchedAt: number
}

const TTL = 5 * 60 * 1000 // 5 minutes
const cache = new Map<string, CacheEntry>()

export function useGitHubPRs(username: string, org: string) {
  const key = `${username}:${org}`
  const cached = cache.get(key)
  const isValid = cached && Date.now() - cached.fetchedAt < TTL

  const [state, setState] = useState<State>({
    prs: isValid ? cached.prs : [],
    loading: !isValid,
    error: false,
  })

  useEffect(() => {
    if (isValid) return

    const url = `https://api.github.com/search/issues?q=author:${username}+type:pr+org:${org}&sort=created&order=desc&per_page=20`

    fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
      .then(r => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then(data => {
        const prs: GitHubPR[] = data.items ?? []
        cache.set(key, { prs, fetchedAt: Date.now() })
        setState({ prs, loading: false, error: false })
      })
      .catch(() => setState({ prs: [], loading: false, error: true }))
  }, [key, isValid, username, org])

  return state
}

export function prStatus(pr: GitHubPR): 'merged' | 'open' | 'closed' {
  if (pr.pull_request?.merged_at) return 'merged'
  if (pr.state === 'open') return 'open'
  return 'closed'
}

export function repoName(pr: GitHubPR): string {
  return pr.repository_url.replace('https://api.github.com/repos/', '')
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
