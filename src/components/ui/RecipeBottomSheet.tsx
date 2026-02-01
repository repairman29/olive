import type { ReactNode } from 'react'

type RecipeBottomSheetProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export default function RecipeBottomSheet({ open, onClose, title, children }: RecipeBottomSheetProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl p-6 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-[#eef2e6] rounded-full mx-auto mb-4 sm:hidden" />
        <h3 className="text-[#2f4f4f] font-medium mb-4">{title}</h3>
        {children}
      </div>
    </div>
  )
}
