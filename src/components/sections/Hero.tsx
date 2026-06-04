import { motion } from 'framer-motion'
import { Mail, FileText, ArrowDown, Download } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/Icons'
import { personal } from '../../data/resume'

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 max-w-3xl mx-auto pt-14">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-sm text-sky-500 mb-4 tracking-wide">
          Hello, I&apos;m
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
          Shubham Nainwal
        </h1>
        <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 font-light mb-6 leading-relaxed">
          Backend Engineer building{' '}
          <span className="text-zinc-700 dark:text-zinc-300 font-normal">Go systems</span>,{' '}
          <span className="text-zinc-700 dark:text-zinc-300 font-normal">distributed infrastructure</span>, and{' '}
          <span className="text-zinc-700 dark:text-zinc-300 font-normal">real-time pipelines</span> from scratch.
        </p>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 max-w-xl leading-relaxed">
          Currently at PioVation GmbH, building production-grade observability infrastructure.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
          >
            <Mail size={14} />
            Get in touch
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <GithubIcon size={14} />
            GitHub
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <LinkedinIcon size={14} />
            LinkedIn
          </a>
          <a
            href={personal.devto}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <FileText size={14} />
            Blog
          </a>
          <a
            href={personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <Download size={14} />
            Resume
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-zinc-400 dark:text-zinc-600"
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
