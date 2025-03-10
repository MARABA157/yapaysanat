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
