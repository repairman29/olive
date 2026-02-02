-- Per-user store preference (Kroger/King Soopers location)
-- Run in Supabase SQL Editor (same project as memory.sql / settings.sql)

alter table public.olive_user_settings
  add column if not exists kroger_location_id text,
  add column if not exists kroger_location_name text,
  add column if not exists kroger_cart_domain text;

comment on column public.olive_user_settings.kroger_location_id is 'Kroger/King Soopers store locationId from /api/kroger/locations';
comment on column public.olive_user_settings.kroger_location_name is 'Display name/address for the store (e.g. "17th & Uintah")';
comment on column public.olive_user_settings.kroger_cart_domain is 'Cart URL host for the user''s chain (e.g. www.kingsoopers.com, www.kroger.com)';
