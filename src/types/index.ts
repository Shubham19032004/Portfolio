export interface Experience {
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
}

export interface Project {
  name: string
  subtitle: string
  tech: string
  period: string
  bullets: string[]
  github?: string
}

export interface BlogPost {
  id: number
  title: string
  description: string
  url: string
  cover_image: string | null
  tag_list: string[]
  reading_time_minutes: number
  readable_publish_date: string
  positive_reactions_count: number
}

export interface GitHubEvent {
  id: string
  type: string
  repo: { name: string; url: string }
  payload: {
    commits?: Array<{ message: string; sha: string }>
    ref?: string
    action?: string
  }
  created_at: string
}

export interface OpenSourceContribution {
  project: string
  org: string
  description: string
  type: string
  url: string
  icon: string
}

export interface PullRequest {
  title: string
  description: string
  repo: string
  org: string
  url: string
  status: 'merged' | 'open' | 'closed'
  mergedAt?: string
}
