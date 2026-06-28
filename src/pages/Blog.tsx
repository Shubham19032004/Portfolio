import { useEffect, useState } from 'react'
import { ExternalLink, Clock, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { SEO } from '../components/ui/SEO'
import { Section, SectionHeading } from '../components/ui/Section'
import { Badge } from '../components/ui/Badge'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import type { BlogPost } from '../types'
import { personal } from '../data/resume'

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <AnimatedSection delay={index * 0.08}>
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-sm"
      >
        {post.cover_image && (
          <div className="aspect-[2/1] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tag_list.map(tag => (
              <Badge key={tag} variant="brand">{tag}</Badge>
            ))}
          </div>

          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[15px] leading-snug mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            {post.title}
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-2">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.reading_time_minutes} min read
            </span>
            <span className="flex items-center gap-1">
              <Heart size={11} />
              {post.positive_reactions_count}
            </span>
            <span className="ml-auto">{post.readable_publish_date}</span>
          </div>
        </div>
      </a>
    </AnimatedSection>
  )
}

function BlogSkeleton() {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-pulse">
      <div className="aspect-[2/1] bg-zinc-100 dark:bg-zinc-900" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-1/4" />
        <div className="h-5 bg-zinc-100 dark:bg-zinc-800 rounded w-3/4" />
        <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded" />
        <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-2/3" />
      </div>
    </div>
  )
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('https://dev.to/api/articles?username=shubham_nainwal_19&per_page=20')
      .then(r => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then(setPosts)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="pt-14">
      <SEO
        title="Blog"
        description="Writing about Go, distributed systems, container runtimes, and building things from the ground up."
        path="/blog"
      />
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionHeading>Blog</SectionHeading>
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
            Writing
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
            Thoughts on Go, distributed systems, and building things from the ground up.
            Also published on{' '}
            <a
              href={personal.devto}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 hover:text-sky-600 transition-colors"
            >
              dev.to
            </a>.
          </p>
        </motion.div>

        {error && (
          <div className="text-center py-16">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-3">
              Couldn't load posts right now.
            </p>
            <a
              href={personal.devto}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-sky-500 hover:text-sky-600 transition-colors"
            >
              Read on dev.to <ExternalLink size={12} />
            </a>
          </div>
        )}

        {loading && (
          <div className="space-y-6">
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="text-sm text-zinc-400 py-8">No posts yet. Check back soon.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="space-y-6">
            {posts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </Section>
    </main>
  )
}
