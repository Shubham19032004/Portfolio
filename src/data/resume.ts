import type { Experience, Project, OpenSourceContribution, PullRequest } from '../types'

export const personal = {
  name: 'Shubham Nainwal',
  tagline: 'Backend Engineer · Go · Distributed Systems · Infrastructure',
  email: 'shubhamnainwal70@gmail.com',
  github: 'https://github.com/Shubham19032004',
  linkedin: 'https://linkedin.com/in/shubham-nainwal',
  devto: 'https://dev.to/shubham_nainwal_4cf0dbffb',
  resume: 'https://drive.google.com/file/d/1_1jaMTLRICwbytrDtqCvFx-r0aO6V01w/view?usp=sharing',
  githubUsername: 'Shubham19032004',
  about: `I'm a backend engineer focused on Go, distributed systems, and production-grade infrastructure.
I've built real-time monitoring pipelines, container runtimes from scratch, and high-throughput data systems,
often from zero and with full ownership. I care deeply about how systems work at a low level: namespaces,
cgroups, kernel primitives. Currently building observability infrastructure at PioVation GmbH while
contributing to open source and writing about what I learn.`,
}

export const experiences: Experience[] = [
  {
    company: 'PioVation GmbH',
    role: 'Full-Stack Software Developer',
    period: 'Jan 2025 – Present',
    location: 'Germany (Remote)',
    bullets: [
      'Independently designed and built a production-grade distributed monitoring stack in Go: monitoring agent, monitoring service, and notification service across multiple microservices.',
      'Engineered a real-time telemetry pipeline using Go, gRPC, Kafka, and Redis to stream system metrics, container health data, and OpenTelemetry traces at microsecond-level latency.',
      'Built the monitoring agent responsible for scraping and forwarding system metrics, container statistics, and OTel instrumentation data across distributed nodes.',
      'Developed an async notification service with Go, gRPC, Kafka, and PostgreSQL for event-driven alert delivery via email and Slack, fully decoupled from the monitoring pipeline.',
      'Containerised all services using Docker, maintaining environment parity between development and production.',
      'Owned end-to-end delivery: system architecture → implementation → production deployment → ongoing maintenance.',
    ],
  },
  {
    company: 'Ministry of Statistics & Programme Implementation',
    role: 'Backend Developer Intern',
    period: 'Aug – Sep 2024',
    location: 'Delhi, India',
    bullets: [
      'Built and maintained RESTful APIs for the eSankhyiki Metadata Manager platform using Express.js and PostgreSQL, serving government statistical data workflows.',
      'Automated bulk data upload pipelines, eliminating manual steps and improving data accuracy and processing efficiency.',
    ],
  },
]

export const projects: Project[] = [
  {
    name: 'GO-Count',
    subtitle: 'Lightweight Container Runtime',
    tech: 'Go, Linux Kernel',
    period: 'Oct – Nov 2025',
    github: 'https://github.com/Shubham19032004/go-count',
    bullets: [
      'Built a fully functional container runtime from scratch in Go, implementing the core isolation mechanisms that underpin Docker without using Docker or any container library.',
      'Implemented process isolation via Linux namespaces (UTS, PID, mount, network) with CLONE_NEW* flags; filesystem isolation using pivot_root with per-container rootfs directories.',
      'Enforced CPU and memory resource limits via Linux cgroup v2; designed host-to-container networking with virtual ethernet (veth) pairs for full bidirectional communication.',
    ],
  },
]

export const skills = {
  Languages: ['Go', 'SQL', 'Bash'],
  'Backend & RPC': ['gRPC', 'REST APIs', 'Gin', 'Express.js'],
  Infrastructure: ['Docker', 'Linux', 'NGINX', 'cPanel'],
  'Data & Messaging': ['PostgreSQL', 'MongoDB', 'Redis', 'Kafka'],
  Systems: ['Linux Namespaces', 'cgroups v2', 'veth networking', 'pivot_root'],
}

export const openSourceContributions: OpenSourceContribution[] = [
  {
    project: 'Grafana',
    org: 'Grafana Labs',
    description:
      'Contributed to Grafana open source, the leading observability and data visualisation platform used by millions of engineers worldwide.',
    type: 'Open Source Contributor',
    url: 'https://github.com/grafana/grafana',
    icon: 'grafana',
  },
]

export const pullRequests: PullRequest[] = [
  {
    title: 'Provisioning: reject GitHub repository when connection has webhook disabled but repository does not',
    description:
      'Adds admission-time validation that rejects a GitHub repository create or update if the referenced connection has webhook disabled but the repository does not, preventing misconfigured states at creation time.',
    repo: 'grafana/grafana',
    org: 'Grafana Labs',
    url: 'https://github.com/grafana/grafana/pull/126757',
    status: 'merged',
    mergedAt: 'Jun 2026',
  },
  {
    title: 'Provisioning: skip webhook registration for GitHub repos when webhookDisabled is set',
    description:
      'Added a webhookDisabled field to GitHubRepositoryConfig. When set to true, Grafana skips webhook registration entirely for that repository and falls back to polling.',
    repo: 'grafana/grafana',
    org: 'Grafana Labs',
    url: 'https://github.com/grafana/grafana/pull/126330',
    status: 'merged',
    mergedAt: 'Jun 2026',
  },
  {
    title: 'Provisioning: allow GitHub App connection without webhook permissions',
    description:
      'Fixed a validation issue where Grafana hard-coded webhook permission requirements, blocking GitHub App connections that were intentionally set up without webhook access.',
    repo: 'grafana/grafana',
    org: 'Grafana Labs',
    url: 'https://github.com/grafana/grafana/pull/126129',
    status: 'merged',
    mergedAt: 'Jun 2026',
  },
  {
    title: 'VQB: Add selected columns to GROUP BY dropdown',
    description:
      'Fixed an inconsistency in the Visual Query Builder where the GROUP BY dropdown did not show already-selected columns as options, while ORDER BY did. This made it impossible to group by selected columns.',
    repo: 'grafana/grafana',
    org: 'Grafana Labs',
    url: 'https://github.com/grafana/grafana/pull/106391',
    status: 'merged',
    mergedAt: 'May 2026',
  },
]

export const awards = [
  {
    title: 'Postman API Fundamentals Student Expert',
    issuer: 'Postman',
    url: 'https://www.postman.com',
  },
]
