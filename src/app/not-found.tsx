import Link from 'next/link'
import { OliveIcon, OliveLogo } from '@/components/ui'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center text-center max-w-sm">
        <OliveIcon
          name="olive-branch"
          size={32}
          className="text-[var(--olive-500)] dark:text-[var(--olive-400)] mb-4"
          ariaLabel="Olive"
        />
        <h1 className="text-2xl font-semibold text-[var(--cast-iron)] mb-2">Page not found</h1>
        <p className="text-[var(--muted-foreground)] text-sm mb-6">
          This page isn’t in the kitchen. Head back and we’ll get you sorted.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--sage-advice)] hover:underline font-medium"
        >
          <OliveLogo size="sm" />
          Back to Olive
        </Link>
      </div>
    </main>
  )
}
