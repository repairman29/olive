type ConfidenceBadgeProps = {
  confidence: number
}

export default function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  if (confidence >= 0.7) return null
  return (
    <span className="ml-2 text-xs text-[#d24d33]">!</span>
  )
}
