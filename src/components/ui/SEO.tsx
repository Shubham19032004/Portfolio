import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://portfolio-eight-rosy-r0gv9fjtac.vercel.app'
const DEFAULT_DESCRIPTION =
  'Backend engineer specialising in Go, distributed systems, and production-grade infrastructure. Building real-time monitoring agents, container runtimes, and high-throughput data pipelines.'

interface Props {
  title?: string
  description?: string
  path?: string
}

export function SEO({ title, description = DEFAULT_DESCRIPTION, path = '' }: Props) {
  const fullTitle = title
    ? `${title} | Shubham Nainwal`
    : 'Shubham Nainwal - Backend Engineer | Go, Distributed Systems'
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Shubham Nainwal" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Shubham Nainwal" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
