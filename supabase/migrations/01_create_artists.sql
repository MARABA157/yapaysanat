-- Create artists table first
create table if not exists public.artists (
    id uuid default gen_random_uuid() primary key,
    user_id uuid not null,
    bio text,
    specialties text[] default '{}',
    website text,
    social_links jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    featured boolean default false,
    total_views integer default 0,
    total_likes integer default 0,
    avatar_url text,
    cover_url text
);

-- Add RLS policies for artists
alter table public.artists enable row level security;

create policy "Artists are viewable by everyone"
    on public.artists
    for select
    using (true);

create policy "Users can create their own artist profile"
    on public.artists
    for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own artist profile"
    on public.artists
    for update
    using (auth.uid() = user_id);
