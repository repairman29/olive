-- Saved lists (template lists) — e.g. "Super Bowl party", "Weekly staples"
-- Users can build a list, save it by name, and later load it and push to Kroger.

create table if not exists public.olive_saved_lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.olive_saved_list_items (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references public.olive_saved_lists(id) on delete cascade,
  term text not null,
  quantity numeric not null default 1,
  unit text,
  notes text,
  sort_order int not null default 0
);

create index if not exists olive_saved_lists_user_id_idx on public.olive_saved_lists(user_id);
create index if not exists olive_saved_list_items_list_id_idx on public.olive_saved_list_items(list_id);

alter table public.olive_saved_lists enable row level security;
alter table public.olive_saved_list_items enable row level security;

create policy "olive_saved_lists_select_own"
  on public.olive_saved_lists for select using (auth.uid() = user_id);
create policy "olive_saved_lists_insert_own"
  on public.olive_saved_lists for insert with check (auth.uid() = user_id);
create policy "olive_saved_lists_update_own"
  on public.olive_saved_lists for update using (auth.uid() = user_id);
create policy "olive_saved_lists_delete_own"
  on public.olive_saved_lists for delete using (auth.uid() = user_id);

-- Items are accessed via list ownership (server uses service role; RLS for direct client access)
create policy "olive_saved_list_items_select_via_list"
  on public.olive_saved_list_items for select
  using (exists (select 1 from public.olive_saved_lists l where l.id = list_id and l.user_id = auth.uid()));
create policy "olive_saved_list_items_insert_via_list"
  on public.olive_saved_list_items for insert
  with check (exists (select 1 from public.olive_saved_lists l where l.id = list_id and l.user_id = auth.uid()));
create policy "olive_saved_list_items_update_via_list"
  on public.olive_saved_list_items for update
  using (exists (select 1 from public.olive_saved_lists l where l.id = list_id and l.user_id = auth.uid()));
create policy "olive_saved_list_items_delete_via_list"
  on public.olive_saved_list_items for delete
  using (exists (select 1 from public.olive_saved_lists l where l.id = list_id and l.user_id = auth.uid()));
