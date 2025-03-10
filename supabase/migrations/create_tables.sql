-- Create artists table first
create table if not exists public.artists (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users not null,
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

-- Create artworks table
create table if not exists public.artworks (
    id uuid default gen_random_uuid() primary key,
    artist_id uuid references public.artists(id),
    title text not null,
    description text,
    image_url text not null,
    tags text[] default '{}',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    likes_count integer default 0,
    views_count integer default 0,
    comments_count integer default 0,
    ai_generated boolean default false,
    ai_style text,
    ai_prompt text,
    for_sale boolean default false,
    price numeric,
    medium text default 'Karışık Teknik',
    dimensions text
);

-- Enable full text search for artworks
alter table public.artworks add column if not exists fts tsvector 
    generated always as (to_tsvector('turkish', coalesce(title, '') || ' ' || coalesce(description, ''))) stored;

create index if not exists artworks_fts_idx on public.artworks using gin(fts);

-- Add RLS policies for artworks
alter table public.artworks enable row level security;

create policy "Artworks are viewable by everyone"
    on public.artworks
    for select
    using (true);

create policy "Users can insert their own artworks"
    on public.artworks
    for insert
    with check (artist_id in (
        select id from public.artists where user_id = auth.uid()
    ));

create policy "Users can update their own artworks"
    on public.artworks
    for update
    using (artist_id in (
        select id from public.artists where user_id = auth.uid()
    ));

create policy "Users can delete their own artworks"
    on public.artworks
    for delete
    using (artist_id in (
        select id from public.artists where user_id = auth.uid()
    ));

-- Create comments table
create table if not exists public.comments (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users not null,
    artwork_id uuid references public.artworks(id) not null,
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    likes_count integer default 0,
    parent_id uuid references public.comments(id)
);

-- Add RLS policies for comments
alter table public.comments enable row level security;

create policy "Comments are viewable by everyone"
    on public.comments
    for select
    using (true);

create policy "Authenticated users can create comments"
    on public.comments
    for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own comments"
    on public.comments
    for update
    using (auth.uid() = user_id);

-- Create likes table
create table if not exists public.likes (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users not null,
    artwork_id uuid references public.artworks(id) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, artwork_id)
);

-- Add RLS policies for likes
alter table public.likes enable row level security;

create policy "Likes are viewable by everyone"
    on public.likes
    for select
    using (true);

create policy "Authenticated users can create likes"
    on public.likes
    for insert
    with check (auth.uid() = user_id);

create policy "Users can delete their own likes"
    on public.likes
    for delete
    using (auth.uid() = user_id);

-- Create ai_styles table
create table if not exists public.ai_styles (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text not null,
    preview_url text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies for ai_styles
alter table public.ai_styles enable row level security;

create policy "AI styles are viewable by everyone"
    on public.ai_styles
    for select
    using (true);

-- Insert some initial AI styles
insert into public.ai_styles (name, description, preview_url) values
    ('Empresyonist', 'Claude Monet tarzı empresyonist sanat stili', '/styles/impressionist.jpg'),
    ('Pop Art', 'Andy Warhol tarzı pop art stili', '/styles/pop-art.jpg'),
    ('Sürrealist', 'Salvador Dali tarzı sürrealist sanat stili', '/styles/surrealist.jpg'),
    ('Minimalist', 'Modern minimalist sanat stili', '/styles/minimalist.jpg'),
    ('Dijital', 'Modern dijital sanat stili', '/styles/digital.jpg')
on conflict do nothing;
