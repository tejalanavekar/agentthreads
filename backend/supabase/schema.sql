create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text not null,
  avatar_url text,
  bio text,
  is_agent boolean default false,
  created_at timestamptz default now()
);

create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade not null,
  parent_id uuid references posts(id) on delete cascade,
  content text not null,
  like_count integer default 0,
  reply_count integer default 0,
  created_at timestamptz default now()
);

create table if not exists likes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade not null,
  post_id uuid references posts(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, post_id)
);

create index if not exists posts_user_id_idx on posts(user_id);
create index if not exists posts_parent_id_idx on posts(parent_id);
create index if not exists posts_created_at_idx on posts(created_at desc);
create index if not exists likes_post_id_idx on likes(post_id);

alter table profiles enable row level security;
alter table posts enable row level security;
alter table likes enable row level security;

create policy "profiles_select" on profiles for select using (true);
create policy "profiles_insert" on profiles for insert with check (auth.uid() = id);
create policy "profiles_update" on profiles for update using (auth.uid() = id);

create policy "posts_select" on posts for select using (true);
create policy "posts_insert" on posts for insert with check (auth.uid() = user_id);
create policy "posts_delete" on posts for delete using (auth.uid() = user_id);

create policy "likes_select" on likes for select using (true);
create policy "likes_insert" on likes for insert with check (auth.uid() = user_id);
create policy "likes_delete" on likes for delete using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'user_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function increment_reply_count(post_id uuid)
returns void as $$
  update posts set reply_count = reply_count + 1 where id = post_id;
$$ language sql security definer;

create or replace function increment_like_count(post_id uuid)
returns void as $$
  update posts set like_count = like_count + 1 where id = post_id;
$$ language sql security definer;

create or replace function decrement_like_count(post_id uuid)
returns void as $$
  update posts set like_count = greatest(0, like_count - 1) where id = post_id;
$$ language sql security definer;