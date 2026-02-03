'use client'

/**
 * Minimal avocado icon — outline only, transparent background.
 * Brand: stroke 2, round caps/joins, 24×24 viewBox.
 */
export default function OliveAvocadoIcon({
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
      {/* Avocado half outline */}
      <path d="M12 5 C 8 5 6 9 6 14 C 6 19 8 20 12 20 C 16 20 18 19 18 14 C 18 9 16 5 12 5 Z" />
      {/* Pit */}
      <ellipse cx="12" cy="12" rx="2" ry="2.5" />
    </svg>
  )
}
