-- ============================================================
-- KEYNA SHOP — Database Schema
-- Run this in your Supabase project SQL Editor
-- ============================================================

-- 0. Extensions
create extension if not exists "pgcrypto";

-- 1. Profiles (admin users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Trigger: auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'admin');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  handle text unique not null,
  category text not null,
  price numeric(10,0) not null,
  rating numeric(2,1) not null default 0,
  -- Multilingual
  title text not null,
  title_en text not null default '',
  title_ar text not null default '',
  description text not null default '',
  description_en text not null default '',
  description_ar text not null default '',
  -- Media
  images text[] not null default '{}',
  -- Variants as JSON (label, available)
  variants jsonb not null default '[]'::jsonb,
  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "Anyone can read products"
  on public.products for select
  using (true);

create policy "Admins can insert products"
  on public.products for insert
  with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Admins can update products"
  on public.products for update
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Admins can delete products"
  on public.products for delete
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- 3. Orders
create type order_status as enum ('pending', 'confirmed', 'shipped', 'delivered');

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  address text not null,
  status order_status not null default 'pending',
  total numeric(10,0) not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Anyone can insert orders"
  on public.orders for insert
  with check (true);

create policy "Admins can read orders"
  on public.orders for select
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Admins can update orders"
  on public.orders for update
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- 4. Order Items
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  product_handle text not null,
  product_title text not null,
  variant_label text not null default 'Default',
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,0) not null,
  created_at timestamptz not null default now()
);

alter table public.order_items enable row level security;

create policy "Anyone can insert order items"
  on public.order_items for insert
  with check (true);

create policy "Admins can read order items"
  on public.order_items for select
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Admins can update order items"
  on public.order_items for update
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- 5. Telegram bot admin chat IDs
create table if not exists public.telegram_chats (
  id bigint primary key, -- Telegram chat_id
  created_at timestamptz not null default now()
);

alter table public.telegram_chats enable row level security;

create policy "Only admins can read telegram_chats"
  on public.telegram_chats for select
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Only admins can insert telegram_chats"
  on public.telegram_chats for insert
  with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- 6. Indexes
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_handle on public.products(handle);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_created_at on public.orders(created_at desc);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
