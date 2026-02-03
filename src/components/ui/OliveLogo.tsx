'use client'

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14',
  '2xl': 'w-16 h-16',
  '3xl': 'w-20 h-20',
  '4xl': 'w-24 h-24',
  '5xl': 'w-32 h-32',
} as const

type OliveLogoSize = keyof typeof sizeClasses

interface OliveLogoProps {
  size?: OliveLogoSize
  pulse?: boolean
  className?: string
}

export default function OliveLogo({ size = 'md', pulse = false, className = '' }: OliveLogoProps) {
  const img = (
    <img
      src="/olive-logo.png"
      alt="Olive"
      className={`${sizeClasses[size]} rounded-full object-contain flex-shrink-0 ${className}`}
      width={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 48 : size === 'xl' ? 56 : size === '2xl' ? 64 : size === '3xl' ? 80 : size === '4xl' ? 96 : 128}
      height={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 48 : size === 'xl' ? 56 : size === '2xl' ? 64 : size === '3xl' ? 80 : size === '4xl' ? 96 : 128}
    />
  )
  if (pulse) {
    return (
      <div className={`olive-pulse inline-flex items-center justify-center rounded-full ${sizeClasses[size]} ${className}`}>
        <img
          src="/olive-logo.png"
          alt="Olive"
          className={`${sizeClasses[size]} rounded-full object-contain flex-shrink-0`}
          width={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 48 : size === 'xl' ? 56 : size === '2xl' ? 64 : size === '3xl' ? 80 : size === '4xl' ? 96 : 128}
          height={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 48 : size === 'xl' ? 56 : size === '2xl' ? 64 : size === '3xl' ? 80 : size === '4xl' ? 96 : 128}
        />
      </div>
    )
  }
  return img
}
