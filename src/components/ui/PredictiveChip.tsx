import type { ReactNode } from 'react'

type PredictiveChipProps = {
  children: ReactNode
  onClick?: () => void
  onDismiss?: () => void
}

export default function PredictiveChip({ children, onClick, onDismiss }: PredictiveChipProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-dashed border-[#c2d1a3] text-xs text-[#536538] bg-[#fdfcf9]">
      <button type="button" onClick={onClick} className="text-left">
        {children}
      </button>
      {onDismiss && (
        <button type="button" onClick={onDismiss} className="text-[#87a05a]">
          ×
        </button>
      )}
    </div>
  )
}
