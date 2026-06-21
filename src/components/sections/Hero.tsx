import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, DevToIcon } from '../ui/Icons'
import { personal } from '../../data/resume'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 max-w-3xl mx-auto pt-14 overflow-hidden">

      {/* Light mode subtle gradient, dark mode handled by StarField */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-50/60 to-transparent dark:hidden" />
      <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-sky-500/8 blur-[120px] pointer-events-none dark:bg-sky-500/10" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-none mb-5">
          <span className="block text-zinc-900 dark:text-zinc-100">Shubham</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-br from-sky-500 via-sky-400 to-sky-600 dark:from-sky-300 dark:via-sky-400 dark:to-sky-600">
            Nainwal
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 font-light mb-4 max-w-lg leading-relaxed">
          Backend engineer building Go systems, distributed infrastructure,
          and real-time pipelines, often from scratch, always with full ownership.
        </p>

        <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-10 max-w-md leading-relaxed">
          Currently at PioVation GmbH, shipping production-grade observability infrastructure.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]"
          >
            <Mail size={14} />
            Get in touch
          </a>
          <a
            href={personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 text-sm font-medium transition-colors duration-200"
          >
            <Download size={14} />
            Resume
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-5">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all duration-200 hover:scale-110"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all duration-200 hover:scale-110"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={personal.devto}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all duration-200 hover:scale-110"
            aria-label="Dev.to"
          >
            <DevToIcon size={18} />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-zinc-300 dark:text-zinc-600"
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
