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
      className="bg-[var(--input)] p-1.5 rounded-2xl border-2 border-[var(--border)] flex relative overflow-hidden"
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
            ? 'bg-[var(--card)] text-[var(--sage-advice)] shadow-md border border-[var(--border)]'
            : 'text-[var(--foreground)] opacity-90 hover:opacity-100 hover:text-[var(--sage-advice)]'
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
            ? 'bg-[var(--card)] text-[var(--sage-advice)] shadow-md border border-[var(--border)]'
            : 'text-[var(--foreground)] opacity-90 hover:opacity-100 hover:text-[var(--sage-advice)]'
        }`}
      >
        <span aria-hidden>👵</span>
        Grandma
      </button>
    </div>
  )
}
