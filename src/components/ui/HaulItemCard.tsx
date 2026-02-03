import type { ReactNode } from 'react'

type HaulItemCardProps = {
  name: string
  status?: 'pending' | 'searching' | 'in_cart' | 'not_found' | 'cart_failed'
  checked?: boolean
  onToggle?: () => void
  onRemove?: () => void
  meta?: ReactNode
}

export default function HaulItemCard({
  name,
  status = 'pending',
  checked = false,
  onToggle,
  onRemove,
  meta,
}: HaulItemCardProps) {
  const statusLabel =
    status === 'in_cart'
      ? '✓ In cart'
      : status === 'not_found'
        ? 'Not found'
        : status === 'cart_failed'
          ? 'Couldn\'t add'
          : status === 'searching'
            ? 'Searching...'
            : null

  const statusClass =
    status === 'in_cart'
      ? 'text-[var(--basil)] font-medium'
      : status === 'not_found'
        ? 'text-[var(--heirloom-tomato)]'
        : status === 'cart_failed'
          ? 'text-[#c7762a] dark:text-[#e09b5a]'
          : status === 'searching'
            ? 'text-[var(--sage-advice)]'
            : 'text-[var(--muted-foreground)]'

  const isInCart = status === 'in_cart'

  return (
    <li className={`flex justify-between items-center px-4 py-2.5 rounded-xl group border transition-colors ${isInCart ? 'bg-[var(--olive-100)] dark:bg-[#1f221a] border-l-4 border-l-[var(--basil)]' : 'bg-[var(--input)] border border-transparent hover:border-[var(--border)]'}`}>
      <div className="flex items-center gap-2">
        <input type="checkbox" checked={checked} onChange={onToggle} className="accent-[var(--sage-advice)]" />
        <span className="text-[var(--cast-iron)]">{name}</span>
        {statusLabel && <span className={`text-xs ${statusClass}`}>{statusLabel}</span>}
        {meta}
      </div>
      <button
        onClick={onRemove}
        className="text-[#87a05a] dark:text-[#a4a999] text-sm hover:text-[#6b8245] dark:hover:text-[#e1e3da] opacity-0 group-hover:opacity-100 transition"
      >
        remove
      </button>
    </li>
  )
}
