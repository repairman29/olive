'use client'

/**
 * Bespoke olive branch mark — monoline, warm, organic.
 * Brand: stroke 2, round caps/joins, 24×24 viewBox.
 * Use for favicon, empty states, or anywhere the Olive brand mark (without the circular logo) is needed.
 */
export default function OliveBranchIcon({
  size = 24,
  className = '',
  'aria-hidden': ariaHidden,
  'aria-label': ariaLabel,
}: {
  size?: number
  className?: string
  'aria-hidden'?: boolean
  'aria-label'?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
    >
      {/* Central stem */}
      <path d="M12 22 L12 2" />
      {/* Upper leaves */}
      <path d="M12 10 L7 5" />
      <path d="M12 10 L17 5" />
      {/* Lower leaves */}
      <path d="M12 16 L9 13" />
      <path d="M12 16 L15 13" />
    </svg>
  )
}
