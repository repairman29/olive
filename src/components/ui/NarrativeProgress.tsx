type NarrativeProgressProps = {
  message?: string | null
  step?: number
  total?: number
}

export default function NarrativeProgress({ message, step = 0, total = 3 }: NarrativeProgressProps) {
  if (!message) return null
  const progress = Math.min(100, Math.round(((step + 1) / total) * 100))
  return (
    <div className="mb-4">
      <div className="h-1.5 w-full bg-[#eef2e6] rounded-full overflow-hidden">
        <div className="h-full bg-[#8fbc8f] transition-all" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-xs text-[#556b2f] mt-2">{message}</p>
    </div>
  )
}
