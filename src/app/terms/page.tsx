import Link from 'next/link'

export const metadata = {
  title: 'Terms of Use — Olive',
  description: 'Terms of use for Olive.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-12 text-[var(--cast-iron)]">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--sage-advice)] hover:underline text-sm mb-8">
          ← Back to Olive
        </Link>
        <h1 className="text-3xl font-serif mb-6">Terms of Use</h1>
        <p className="text-[var(--muted-foreground)] text-sm mb-6">
          Last updated: {new Date().toISOString().slice(0, 10)}
        </p>
        <div className="prose prose-sm max-w-none text-[var(--muted-foreground)] space-y-4">
          <p>
            Welcome to Olive. By using this service you agree to use it responsibly and in line with Kroger&apos;s and our providers&apos; policies. Olive helps you build a grocery list and add items to your Kroger cart; you complete checkout and payment on Kroger&apos;s site.
          </p>
          <p>
            Olive is not affiliated with Kroger. We do not place orders for you or handle payment. You are responsible for reviewing your cart and orders on Kroger.
          </p>
          <p>
            We may update these terms from time to time. Continued use of Olive after changes constitutes acceptance of the updated terms.
          </p>
          <p>
            For questions, contact the team that invited you to the beta.
          </p>
        </div>
        <div className="mt-10 pt-6 border-t border-[var(--border)]">
          <Link href="/privacy" className="text-[var(--sage-advice)] hover:underline text-sm">Privacy</Link>
          <span className="mx-2 text-[var(--muted)]">·</span>
          <Link href="/" className="text-[var(--sage-advice)] hover:underline text-sm">Home</Link>
        </div>
      </div>
    </main>
  )
}
