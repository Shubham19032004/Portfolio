import { FileText } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/Icons'
import { personal } from '../../data/resume'

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 px-4">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">
          © {new Date().getFullYear()} Shubham Nainwal
        </p>
        <div className="flex items-center gap-3">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200 hover:scale-110"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200 hover:scale-110"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={personal.devto}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200 hover:scale-110"
            aria-label="Dev.to"
          >
            <FileText size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
