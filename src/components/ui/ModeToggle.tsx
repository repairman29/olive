type ModeToggleProps = {
  value: 'budget' | 'splurge'
  onChange: (value: 'budget' | 'splurge') => void
  disabled?: boolean
}

const baseButtonClass =
  'flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 z-10 flex items-center justify-center gap-2 focus:outline-none'

export default function ModeToggle({ value, onChange, disabled }: ModeToggleProps) {
  return (
    <div
      className="bg-[var(--input)] dark:bg-[var(--surface-elevated)] p-1.5 rounded-2xl border-2 border-[var(--border)] dark:border-[var(--surface-elevated-2)] flex relative overflow-hidden"
      role="group"
      aria-label="Shopping mode"
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange('budget')}
        aria-pressed={value === 'budget'}
        aria-label="Budget mode"
        className={`${baseButtonClass} ${
          value === 'budget'
            ? 'bg-[var(--sage-advice)] text-[var(--parchment)] shadow-md border border-transparent hover:opacity-90'
            : 'bg-transparent dark:bg-[var(--surface-elevated-2)] text-[var(--foreground)] hover:text-[var(--sage-advice)] dark:hover:bg-[var(--surface-elevated-3)]'
        }`}
      >
        <span aria-hidden>🏷️</span>
        Budget
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange('splurge')}
        aria-pressed={value === 'splurge'}
        aria-label="Splurge mode"
        className={`${baseButtonClass} ${
          value === 'splurge'
            ? 'bg-[var(--sage-advice)] text-[var(--parchment)] shadow-md border border-transparent hover:opacity-90'
            : 'bg-transparent dark:bg-[var(--surface-elevated-2)] text-[var(--foreground)] hover:text-[var(--sage-advice)] dark:hover:bg-[var(--surface-elevated-3)]'
        }`}
      >
        <span aria-hidden>⭐</span>
        Splurge
      </button>
    </div>
  )
}
