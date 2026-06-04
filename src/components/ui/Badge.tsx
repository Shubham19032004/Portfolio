interface Props {
  children: string
  variant?: 'default' | 'brand' | 'muted'
}

const variants = {
  default: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
  brand: 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
  muted: 'bg-zinc-50 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-500',
}

export function Badge({ children, variant = 'default' }: Props) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium font-mono ${variants[variant]}`}>
      {children}
    </span>
  )
}
