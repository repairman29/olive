import Link from 'next/link'

export const metadata = {
  title: 'Privacy — Olive',
  description: 'Privacy information for Olive.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-12 text-[var(--cast-iron)]">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--sage-advice)] hover:underline text-sm mb-8">
          ← Back to Olive
        </Link>
        <h1 className="text-3xl font-serif mb-6">Privacy</h1>
        <p className="text-[var(--muted-foreground)] text-sm mb-6">
          Last updated: {new Date().toISOString().slice(0, 10)}
        </p>
        <div className="prose prose-sm max-w-none text-[var(--muted-foreground)] space-y-4">
          <p>
            Olive stores your account and preferences (e.g. shopping mode, saved lists, saved stores) so your experience is consistent. We use Supabase for auth and data storage.
          </p>
          <p>
            To add items to your Kroger cart, Olive uses Kroger&apos;s API with your authorization. We do not see or store your Kroger password or payment details. OAuth lets us add items to your cart on your behalf; you review and pay on Kroger.
          </p>
          <p>
            We do not sell your data. Data is used to run Olive and improve the product. We may update this page as our practices change.
          </p>
          <p>
            For questions, contact the team that invited you to the beta.
          </p>
        </div>
        <div className="mt-10 pt-6 border-t border-[var(--border)]">
          <Link href="/terms" className="text-[var(--sage-advice)] hover:underline text-sm">Terms of Use</Link>
          <span className="mx-2 text-[var(--muted)]">·</span>
          <Link href="/" className="text-[var(--sage-advice)] hover:underline text-sm">Home</Link>
        </div>
      </div>
    </main>
  )
}
