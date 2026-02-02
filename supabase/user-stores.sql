-- Multiple saved stores per user; pick one as active for add-to-cart.
-- Active store drives product search (and thus sale prices / savings we show). Run after memory.sql, settings.sql, store-preference.sql.

create table if not exists public.olive_user_stores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  location_id text not null,
  location_name text not null,
  cart_domain text not null,
  nickname text,
  created_at timestamptz not null default now()
);

create index if not exists olive_user_stores_user_id_idx on public.olive_user_stores(user_id);

alter table public.olive_user_stores enable row level security;

create policy "olive_user_stores_select_own"
  on public.olive_user_stores for select using (auth.uid() = user_id);
create policy "olive_user_stores_insert_own"
  on public.olive_user_stores for insert with check (auth.uid() = user_id);
create policy "olive_user_stores_update_own"
  on public.olive_user_stores for update using (auth.uid() = user_id);
create policy "olive_user_stores_delete_own"
  on public.olive_user_stores for delete using (auth.uid() = user_id);

-- Which store to use for add-to-cart (null = use legacy kroger_* columns)
alter table public.olive_user_settings
  add column if not exists active_store_id uuid references public.olive_user_stores(id) on delete set null;

comment on column public.olive_user_settings.active_store_id is 'When set, add-to-cart uses this store from olive_user_stores; else uses kroger_location_id/cart_domain';
