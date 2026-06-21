interface Props {
  children: string
  variant?: 'default' | 'brand' | 'muted'
}

const variants = {
  default: 'bg-zinc-100 text-zinc-600 border border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-zinc-700/50',
  brand: 'bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20',
  muted: 'bg-zinc-50 text-zinc-500 border border-zinc-100 dark:bg-zinc-900 dark:text-zinc-500 dark:border-zinc-800',
}

export function Badge({ children, variant = 'default' }: Props) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-mono ${variants[variant]}`}>
      {children}
    </span>
  )
}
