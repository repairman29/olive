type QuantityToggleProps = {
  value: 'exact' | 'overshoot'
  onChange: (value: 'exact' | 'overshoot') => void
  disabled?: boolean
}

const baseButtonClass =
  'flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 z-10 flex items-center justify-center gap-2 focus:outline-none'

export default function QuantityToggle({ value, onChange, disabled }: QuantityToggleProps) {
  return (
    <div
      className="bg-[var(--input)] dark:bg-[var(--surface-elevated)] p-1.5 rounded-2xl border-2 border-[var(--border)] dark:border-[var(--surface-elevated-2)] flex relative overflow-hidden"
      role="group"
      aria-label="Quantity mode"
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange('exact')}
        aria-pressed={value === 'exact'}
        aria-label="Exact quantity"
        className={`${baseButtonClass} ${
          value === 'exact'
            ? 'bg-[var(--sage-advice)] text-[var(--parchment)] shadow-md border border-transparent hover:opacity-90'
            : 'bg-transparent dark:bg-[var(--surface-elevated-2)] text-[var(--foreground)] hover:text-[var(--sage-advice)] dark:hover:bg-[var(--surface-elevated-3)]'
        }`}
      >
        <span aria-hidden>🤏</span>
        Exact
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange('overshoot')}
        aria-pressed={value === 'overshoot'}
        aria-label="Grandma mode (overshoot)"
        className={`${baseButtonClass} ${
          value === 'overshoot'
            ? 'bg-[var(--sage-advice)] text-[var(--parchment)] shadow-md border border-transparent hover:opacity-90'
            : 'bg-transparent dark:bg-[var(--surface-elevated-2)] text-[var(--foreground)] hover:text-[var(--sage-advice)] dark:hover:bg-[var(--surface-elevated-3)]'
        }`}
      >
        <span aria-hidden>👵</span>
        Grandma
      </button>
    </div>
  )
}
