import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { supabaseServer, isSupabaseServerConfigured } from '@/lib/supabaseServer'

/**
 * POST /api/memory/feedback — Store "Nailed it" / "Not quite" for learning (Story 16).
 * Body: { response: 'nailed' | 'not_quite' }
 * Writes to olive_events with event_type='haul_feedback' so we can use it for preference learning.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const response = body?.response
    if (response !== 'nailed' && response !== 'not_quite') {
      return NextResponse.json({ error: 'Invalid response' }, { status: 400 })
    }

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch {
              // no-op
            }
          },
        },
      }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!isSupabaseServerConfigured() || !supabaseServer) {
      return NextResponse.json({ ok: true })
    }

    const db = supabaseServer
    await db.from('olive_events').insert({
      user_id: user.id,
      event_type: 'haul_feedback',
      term: response,
      created_at: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Feedback API error:', e)
    return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 })
  }
}
