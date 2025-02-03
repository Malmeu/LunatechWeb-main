-- Enable les extensions nécessaires
create extension if not exists "uuid-ossp";

-- Création de la table des profils utilisateurs
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

-- Création de la table des articles
create table if not exists public.posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  description text,
  content text,
  meta_title text,
  meta_description text,
  featured_image text,
  tags text[],
  published boolean default false,
  author_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone
);

-- Création d'un bucket pour les images
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true);

-- Politiques de sécurité pour les profils
alter table public.profiles enable row level security;

create policy "Les profils publics sont visibles par tous"
  on public.profiles for select
  using ( true );

create policy "Les utilisateurs peuvent modifier leur propre profil"
  on public.profiles for update
  using ( auth.uid() = id );

-- Politiques de sécurité pour les articles
alter table public.posts enable row level security;

create policy "Les articles publiés sont visibles par tous"
  on public.posts for select
  using ( published = true or auth.uid() = author_id );

create policy "Les auteurs peuvent créer des articles"
  on public.posts for insert
  with check ( auth.role() = 'authenticated' );

create policy "Les auteurs peuvent modifier leurs propres articles"
  on public.posts for update
  using ( auth.uid() = author_id );

create policy "Les auteurs peuvent supprimer leurs propres articles"
  on public.posts for delete
  using ( auth.uid() = author_id );

-- Politiques de sécurité pour le stockage des images
create policy "Les images sont accessibles par tous"
  on storage.objects for select
  using ( bucket_id = 'blog-images' );

create policy "Les utilisateurs authentifiés peuvent uploader des images"
  on storage.objects for insert
  with check (
    bucket_id = 'blog-images'
    and auth.role() = 'authenticated'
  );

create policy "Les auteurs peuvent supprimer leurs images"
  on storage.objects for delete
  using (
    bucket_id = 'blog-images'
    and auth.uid() = owner
  );

-- Fonction pour gérer la mise à jour automatique du champ updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger pour la mise à jour automatique du champ updated_at dans la table posts
create trigger handle_updated_at
  before update
  on public.posts
  for each row
  execute procedure public.handle_updated_at();

-- Trigger pour la mise à jour automatique du champ updated_at dans la table profiles
create trigger handle_updated_at
  before update
  on public.profiles
  for each row
  execute procedure public.handle_updated_at();

-- Fonction pour créer automatiquement un profil
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

-- Trigger pour créer automatiquement un profil
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Index pour améliorer les performances
create index if not exists posts_author_id_idx on public.posts (author_id);
create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists posts_slug_idx on public.posts (slug);
create index if not exists profiles_username_idx on public.profiles (username);

-- Fonction pour générer un slug unique
create or replace function generate_unique_slug(title text)
returns text
language plpgsql
as $$
declare
  base_slug text;
  new_slug text;
  counter integer := 1;
begin
  -- Convertir le titre en slug de base
  base_slug := lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'));
  -- Supprimer les tirets au début et à la fin
  base_slug := trim(both '-' from base_slug);
  
  -- Vérifier si le slug existe déjà
  new_slug := base_slug;
  while exists (select 1 from public.posts where slug = new_slug) loop
    counter := counter + 1;
    new_slug := base_slug || '-' || counter::text;
  end loop;
  
  return new_slug;
end;
$$;
