-- Recipes and ingredients for "shop for a recipe" (e.g. enchiladas for 4)
-- Run in Supabase SQL Editor (same project as memory.sql)

create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique
);

create table if not exists public.recipe_ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  term text not null,
  quantity_per_serving numeric not null default 1,
  variant_key text,
  variant_value text
);

create index if not exists recipe_ingredients_recipe_id_idx on public.recipe_ingredients(recipe_id);
create unique index if not exists recipe_ingredients_recipe_term_variant_idx
  on public.recipe_ingredients(recipe_id, term, coalesce(variant_key, ''), coalesce(variant_value, ''));

alter table public.recipes enable row level security;
alter table public.recipe_ingredients enable row level security;

create policy "recipes_select_all" on public.recipes for select using (true);
create policy "recipe_ingredients_select_all" on public.recipe_ingredients for select using (true);

-- Seed: Enchiladas (protein: chicken | beef, sauce: green | red)
insert into public.recipes (id, name, slug) values
  ('a0000001-0001-4000-8000-000000000001', 'Enchiladas', 'enchiladas')
on conflict (slug) do nothing;

-- Base ingredients (variant_key null)
insert into public.recipe_ingredients (recipe_id, term, quantity_per_serving, variant_key, variant_value)
select r.id, t.term, t.qty, null, null from public.recipes r,
  (values
    ('flour tortillas', 0.5),
    ('shredded cheese', 0.25),
    ('onion', 0.25),
    ('sour cream', 0.25)
  ) as t(term, qty)
where r.slug = 'enchiladas'
on conflict do nothing;

-- Protein choice (one of)
insert into public.recipe_ingredients (recipe_id, term, quantity_per_serving, variant_key, variant_value)
select r.id, t.term, 0.25, 'protein', t.val from public.recipes r,
  (values ('chicken', 'chicken'), ('ground beef', 'beef')) as t(term, val)
where r.slug = 'enchiladas'
on conflict do nothing;

-- Sauce choice (one of)
insert into public.recipe_ingredients (recipe_id, term, quantity_per_serving, variant_key, variant_value)
select r.id, t.term, 0.25, 'sauce', t.val from public.recipes r,
  (values ('green enchilada sauce', 'green'), ('red enchilada sauce', 'red')) as t(term, val)
where r.slug = 'enchiladas'
on conflict do nothing;
