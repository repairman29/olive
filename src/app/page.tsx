'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BentoTile, CommandInput, SageAdviceButton } from '@/components/ui'

export default function Home() {
  const [heroCommand, setHeroCommand] = useState('')
  return (
    <main className="min-h-screen bg-[radial-gradient(70%_60%_at_50%_0%,_#f3f7ef_0%,_#fffdf0_60%)]">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Nav */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#556b2f] rounded-full flex items-center justify-center">
              <span className="text-white text-sm">🫒</span>
            </div>
            <span className="text-xl font-medium text-[#2f4f4f]">Olive</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden sm:inline-flex items-center gap-2 text-[#87a05a]">
              <span className="w-2 h-2 bg-[#8fbc8f] rounded-full"></span>
              Friends & family beta
            </span>
            <Link
              href="/login"
              className="text-[#556b2f] hover:text-[#3a4529] transition font-medium"
            >
              Sign In
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-[#eef2e6] px-3 py-1.5 rounded-full text-[#6b8245] text-xs mb-6 shadow-sm">
              <span className="w-2 h-2 bg-[#8fbc8f] rounded-full"></span>
              Private beta • Invite-only
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-[#2f4f4f] mb-6 leading-tight">
              Your Kitchen Companion
            </h1>
            <p className="text-lg text-[#536538] mb-8 leading-relaxed">
              Turn messy lists and recipes into a filled Kroger cart in one tap. Olive finds the right brands,
              clips the deals, and keeps you in control at checkout.
            </p>
            <div className="flex flex-wrap gap-3">
              <SageAdviceButton
                className="text-lg px-8 py-4 rounded-full shadow-sm"
                onClick={() => (window.location.href = '/login')}
              >
                Join the Beta →
              </SageAdviceButton>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#87a05a]">
              <span className="inline-flex items-center gap-2 italic">
                <span className="text-lg">↗</span>
                Help us teach Olive your favorite brands.
              </span>
              <Link
                href="/login?then=connect"
                className="inline-flex items-center gap-2 text-[#556b2f] hover:text-[#3a4529] transition"
              >
                <span>🛒</span>
                <span>Continue with Kroger</span>
              </Link>
              <a
                href={`https://${process.env.NEXT_PUBLIC_KROGER_CART_DOMAIN || 'www.kroger.com'}/shopping/cart`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#556b2f] hover:text-[#3a4529] transition"
              >
                View Cart
              </a>
            </div>
            <p className="text-xs text-[#87a05a] mt-4">
              Add Olive to your home screen for one-tap access • Olive never checks out for you.
            </p>
          </div>

          <BentoTile className="rounded-[32px]">
            <div className="bg-[#f8faf5] rounded-3xl p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#556b2f] rounded-full flex items-center justify-center olive-pulse">
                  <span className="text-white">🫒</span>
                </div>
                <div>
                  <p className="text-[#2f4f4f] font-medium">Olive</p>
                  <p className="text-[#87a05a] text-xs">Kitchen companion</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-white rounded-2xl px-4 py-3 border border-[#eef2e6]">
                  &ldquo;Olive, we need sourdough and green apples.&rdquo;
                </div>
                <div className="bg-[#eef2e6] rounded-2xl px-4 py-3 text-[#3a4529]">
                  Added your usual sourdough. Fuji apples are on sale — want those?
                </div>
                <div className="bg-white rounded-2xl px-4 py-3 border border-[#eef2e6]">
                  &ldquo;Yes, perfect.&rdquo;
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5 text-center text-xs text-[#6b8245]">
              <div className="bg-[#f8faf5] rounded-2xl py-3">
                <div className="text-lg">🏷️</div>
                Coupons
                <div className="text-[11px] text-[#87a05a] mt-1">12 deals spotted today</div>
              </div>
              <div className="bg-[#f8faf5] rounded-2xl py-3">
                <div className="text-lg">⛽</div>
                Fuel points
                <div className="text-[11px] text-[#87a05a] mt-1">+30¢ on deck</div>
              </div>
              <div className="bg-[#f8faf5] rounded-2xl py-3">
                <div className="text-lg">🛒</div>
                Ready cart
                <div className="text-[11px] text-[#87a05a] mt-1">Drafted for review</div>
              </div>
            </div>
          </BentoTile>
        </div>

        {/* How it Works - Bento Style */}
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {/* Main Card */}
          <BentoTile className="md:col-span-2">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#eef2e6] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                💬
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#2f4f4f] mb-2">Just tell her</h3>
                <p className="text-[#536538]">
                  Type &ldquo;Olive, we need milk&rdquo; — that&apos;s it. She finds your usual brand,
                  adds it to your cart, and keeps a running list as you go.
                </p>
              </div>
            </div>
          </BentoTile>

          {/* Secondary Cards */}
          <BentoTile>
            <div className="text-3xl mb-3">🏷️</div>
            <h3 className="text-lg font-medium text-[#2f4f4f] mb-1">Coupons Clipped</h3>
            <p className="text-[#536538] text-sm">
              Olive finds digital deals on items you actually buy and applies them automatically.
            </p>
          </BentoTile>

          <BentoTile>
            <div className="text-3xl mb-3">⛽</div>
            <h3 className="text-lg font-medium text-[#2f4f4f] mb-1">Fuel Points Tracked</h3>
            <p className="text-[#536538] text-sm">
              She&apos;ll let you know when you&apos;re close to the next discount at the pump.
            </p>
          </BentoTile>

          <BentoTile>
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="text-lg font-medium text-[#2f4f4f] mb-1">Never Run Out</h3>
            <p className="text-[#536538] text-sm">
              Olive remembers your rhythm. She&apos;ll nudge you before the milk carton goes empty.
            </p>
          </BentoTile>

          <BentoTile>
            <div className="text-3xl mb-3">🛒</div>
            <h3 className="text-lg font-medium text-[#2f4f4f] mb-1">Ready for Checkout</h3>
            <p className="text-[#536538] text-sm">
              When you&apos;re ready, review your cart and head to Kroger for pickup. Easy.
            </p>
          </BentoTile>
        </div>

        {/* Aha Demo */}
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          <BentoTile>
            <h3 className="text-[#2f4f4f] font-medium mb-2">Before Olive</h3>
            <p className="text-[#536538] text-sm mb-4">Copying a list item-by-item in the Kroger app.</p>
            <div className="space-y-2 text-sm">
              <div className="bg-[#f8faf5] rounded-xl px-3 py-2 border border-[#eef2e6]">Milk</div>
              <div className="bg-[#f8faf5] rounded-xl px-3 py-2 border border-[#eef2e6]">Avocados</div>
              <div className="bg-[#f8faf5] rounded-xl px-3 py-2 border border-[#eef2e6]">Sourdough</div>
            </div>
          </BentoTile>
          <BentoTile>
            <h3 className="text-[#2f4f4f] font-medium mb-2">With Olive</h3>
            <p className="text-[#536538] text-sm mb-4">Paste once. Olive sorts, finds, and fills.</p>
            <div className="bg-[#f8faf5] rounded-2xl px-4 py-3 border border-[#eef2e6] text-sm">
              &ldquo;Milk, avocados, sourdough, trash bags&rdquo;
            </div>
            <div className="mt-3 text-xs text-[#87a05a]">
              &ldquo;I found 4 items. Sound right?&rdquo;
            </div>
          </BentoTile>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {[
            { step: '1', title: 'Connect Kroger', text: 'Link your account once so Olive can build your cart.' },
            { step: '2', title: 'Add as you go', text: 'Drop items in whenever you think of them.' },
            { step: '3', title: 'Checkout anytime', text: 'Review and place the order when it suits you.' },
          ].map((item) => (
            <BentoTile key={item.step}>
              <div className="w-8 h-8 bg-[#eef2e6] rounded-full flex items-center justify-center text-sm font-medium text-[#536538] mb-3">
                {item.step}
              </div>
              <h3 className="text-[#2f4f4f] font-medium mb-2">{item.title}</h3>
              <p className="text-[#536538] text-sm">{item.text}</p>
            </BentoTile>
          ))}
        </div>

        {/* Try it */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div>
              <h3 className="text-xl font-medium text-[#2f4f4f] mb-2">Try the command flow</h3>
              <p className="text-[#536538] text-sm">
                Drop a list here and see how Olive thinks before you even sign in.
              </p>
            </div>
            <Link
              href="/login?then=connect"
              className="inline-flex items-center gap-2 border border-[#dce5cc] text-[#536538] text-sm px-4 py-2 rounded-full hover:bg-[#f8faf5] transition w-fit"
            >
              Continue with Kroger
            </Link>
          </div>
          <CommandInput
            value={heroCommand}
            onChange={setHeroCommand}
            onSubmit={() => (window.location.href = '/login')}
            helperText="We’ll save your list once you connect."
          />
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl p-8 border border-[#eef2e6] shadow-sm mb-12">
          <h3 className="text-xl font-medium text-[#2d3a1f] mb-4">Questions</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[#536538]">
            <div>
              <p className="font-medium text-[#2d3a1f] mb-1">Does Olive place the order?</p>
              <p>No. Olive builds your cart, you review and checkout in Kroger.</p>
            </div>
            <div>
              <p className="font-medium text-[#2d3a1f] mb-1">Is this only for Kroger?</p>
              <p>For now, yes. It works across the Kroger family of stores.</p>
            </div>
            <div>
              <p className="font-medium text-[#2d3a1f] mb-1">What about substitutions?</p>
              <p>Olive will ask before swapping anything unless you say otherwise.</p>
            </div>
            <div>
              <p className="font-medium text-[#2d3a1f] mb-1">Is this free?</p>
              <p>During beta, yes. We just want feedback and real-world use.</p>
            </div>
          </div>
        </div>

        {/* Supported Stores */}
        <div className="text-center py-8 border-t border-[#eef2e6]">
          <p className="text-[#87a05a] text-sm mb-3">Works with the Kroger family</p>
          <div className="flex flex-wrap justify-center gap-6 text-[#536538] opacity-60">
            <span>Kroger</span>
            <span>King Soopers</span>
            <span>Fry&apos;s</span>
            <span>Ralphs</span>
            <span>Fred Meyer</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#eef2e6] py-6 bg-white/50">
        <div className="max-w-4xl mx-auto px-6 text-center text-[#87a05a] text-sm">
          <p>Made with care • Olive never places orders for you • Not affiliated with Kroger</p>
        </div>
      </footer>
    </main>
  )
}
