'use client'

import Link from 'next/link'
import { OliveIcon, OliveLogo, SageAdviceButton } from '@/components/ui'

export default function HelpPage() {
  const faqs = [
    {
      category: "Trust & Privacy",
      questions: [
        {
          q: "Does Olive place the order for me?",
          a: "Never. Olive’s job is to do the heavy lifting of finding your items and filling your cart. Once your haul is ready, we hand the baton to you on the Kroger site so you can review deals and hit the final 'checkout' button yourself."
        },
        {
          q: "Is my Kroger password safe?",
          a: "Absolutely. Olive never sees or stores your password. We use a secure 'handshake' with Kroger (OAuth) that lets us tuck items into your cart without ever having access to your sensitive login info or credit cards."
        }
      ]
    },
    {
      category: "Using the \"Magic\"",
      questions: [
        {
          q: "How does 'Magic Paste' work?",
          a: "It's like a kitchen sieve for your screen! Just paste a recipe link or a messy text list into the main box. Olive reads the text, ignores the 'fluff' like cooking instructions, and identifies exactly which ingredients you need for your cart."
        },
        {
          q: "What is 'Budget vs. Splurge' mode?",
          a: "You’re the pilot of your pantry. Budget mode tells Olive to hunt for store brands and sale items to save you money. Splurge mode tells her to prioritize your favorite premium brands and the items you usually love."
        },
        {
          q: "What savings does Olive show?",
          a: "We show what you saved from sale prices and can surface fuel points. We don't clip digital coupons — clip those on Kroger for extra savings."
        }
      ]
    },
    {
      category: "Troubleshooting",
      questions: [
        {
          q: "Why couldn't Olive find an item?",
          a: "Sometimes items are out of stock or described in a way that confuses Olive’s search. If she’s not 100% sure, she’ll flag it with an Heirloom Tomato icon so you can give it a quick look.",
          icon: 'triangle-alert' as const
        }
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-12 text-[var(--cast-iron)]">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <OliveLogo size="5xl" />
          </div>
          <h1 className="text-3xl font-serif mb-2">Olive’s Help Center</h1>
          <p className="text-[var(--muted-foreground)]">Your kitchen companion’s guide to a tidy pantry.</p>
        </div>

        <div className="space-y-12">
          {faqs.map((cat) => (
            <section key={cat.category}>
              <h2 className="text-xs uppercase tracking-widest font-semibold text-[var(--muted)] mb-6 border-b border-[var(--border)] pb-2">
                {cat.category}
              </h2>
              <div className="space-y-8">
                {cat.questions.map((faq) => (
                  <div key={faq.q} className="group">
                    <h3 className="text-lg font-serif mb-3 group-hover:text-[var(--sage-advice)] transition-colors">
                      {faq.q}
                    </h3>
                    {'icon' in faq && faq.icon && (
                      <div className="mb-2">
                        <OliveIcon name={faq.icon} size={24} className="text-[var(--heirloom-tomato)]" ariaLabel="Low confidence or needs attention" />
                      </div>
                    )}
                    <p className="text-[var(--muted-foreground)] leading-relaxed mb-4 italic">
                      &ldquo;{faq.a}&rdquo;
                    </p>
                    <Link href="/dashboard">
                      <SageAdviceButton className="text-xs px-4 py-2">
                        Back to My Kitchen
                      </SageAdviceButton>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-20 pt-8 border-t border-[var(--border)] text-center">
          <p className="text-xs text-[var(--muted)] mb-4">
            Still have questions? Olive is always learning.
          </p>
          <Link href="/dashboard">
            <span className="text-[var(--sage-advice)] hover:underline font-medium">Return to Dashboard</span>
          </Link>
        </footer>
      </div>
    </main>
  )
}
