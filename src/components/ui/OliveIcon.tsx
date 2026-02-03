'use client'

import {
  Apple,
  Bell,
  Carrot,
  CheckCircle2,
  ClipboardList,
  Clock,
  CookingPot,
  Egg,
  Fuel,
  Handshake,
  MessageCircle,
  Milk,
  Moon,
  Salad,
  ShoppingBasket,
  ShoppingCart,
  Star,
  Sun,
  Tag,
  TriangleAlert,
  TrendingUp,
  UtensilsCrossed,
  Wheat,
  type LucideIcon,
} from 'lucide-react'
import OliveAvocadoIcon from './OliveAvocadoIcon'
import OliveBranchIcon from './OliveBranchIcon'

export type OliveIconName =
  | 'cart'
  | 'tag'
  | 'fuel'
  | 'message-circle'
  | 'bell'
  | 'clock'
  | 'trending-up'
  | 'star'
  | 'cooking-pot'
  | 'clipboard-list'
  | 'handshake'
  | 'olive-branch'
  | 'apple'
  | 'carrot'
  | 'egg'
  | 'milk'
  | 'salad'
  | 'utensils-crossed'
  | 'wheat'
  | 'olive-avocado'
  | 'olive-basket'
  | 'check-circle'
  | 'triangle-alert'
  | 'moon'
  | 'sun'

const lucideIconMap: Record<Exclude<OliveIconName, 'olive-branch' | 'olive-avocado' | 'olive-basket'>, LucideIcon> = {
  cart: ShoppingCart,
  tag: Tag,
  fuel: Fuel,
  'message-circle': MessageCircle,
  bell: Bell,
  clock: Clock,
  'trending-up': TrendingUp,
  star: Star,
  'cooking-pot': CookingPot,
  'clipboard-list': ClipboardList,
  handshake: Handshake,
  apple: Apple,
  carrot: Carrot,
  egg: Egg,
  milk: Milk,
  salad: Salad,
  'utensils-crossed': UtensilsCrossed,
  wheat: Wheat,
  'check-circle': CheckCircle2,
  'triangle-alert': TriangleAlert,
  moon: Moon,
  sun: Sun,
}

const sizeMap = { 16: 16, 20: 20, 24: 24, 28: 28, 32: 32 } as const
type OliveIconSize = keyof typeof sizeMap

export type OliveIconVariant = 'outline' | 'solid'

interface OliveIconProps {
  name: OliveIconName
  size?: OliveIconSize
  variant?: OliveIconVariant
  className?: string
  /** Use when the icon conveys meaning without adjacent text (e.g. standalone button). Decorative icons get aria-hidden. */
  ariaLabel?: string
}

export default function OliveIcon({
  name,
  size = 24,
  variant = 'outline',
  className = '',
  ariaLabel,
}: OliveIconProps) {
  const pixelSize = sizeMap[size]
  const isDecorative = ariaLabel == null || ariaLabel === ''

  if (name === 'olive-branch') {
    return (
      <OliveBranchIcon
        size={pixelSize}
        className={`flex-shrink-0 text-[var(--foreground)] ${className}`}
        aria-hidden={isDecorative}
        aria-label={ariaLabel}
      />
    )
  }

  if (name === 'olive-avocado') {
    return (
      <OliveAvocadoIcon
        size={pixelSize}
        className={`flex-shrink-0 text-[var(--foreground)] ${className}`}
        aria-hidden={isDecorative}
        aria-label={ariaLabel}
      />
    )
  }

  if (name === 'olive-basket') {
    const Icon = ShoppingBasket
    return (
      <Icon
        size={pixelSize}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`flex-shrink-0 text-[var(--foreground)] ${className}`}
        aria-hidden={isDecorative}
        {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
      />
    )
  }

  const Icon = lucideIconMap[name as Exclude<OliveIconName, 'olive-branch' | 'olive-avocado' | 'olive-basket'>]
  const isSolid = variant === 'solid'
  return (
    <Icon
      size={pixelSize}
      strokeWidth={isSolid ? 1.5 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={isSolid ? 'currentColor' : 'none'}
      className={`flex-shrink-0 text-[var(--foreground)] ${className}`}
      aria-hidden={isDecorative}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
    />
  )
}
