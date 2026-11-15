-- Record of the task list site's database table.
-- The live Supabase database already matches this file. Do not run it there:
-- it is here so the table can be checked or rebuilt.
-- Whenever the table changes, change this file in the same commit.

create table public.tasks (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (length(trim(title)) > 0),
  skill text not null check (skill in ('Reading', 'Writing', 'Listening', 'Speaking', 'Vocabulary', 'Grammar')),
  done boolean not null default false,
  created_at timestamptz not null default now()
);

-- Permissions: without these the site cannot reach the table at all.
-- Supabase used to add them to every new table automatically. They are written
-- here so a rebuilt table works even if it no longer does.
-- They look broad, but the row level security policies below decide which rows
-- each person can actually read or change.
grant all on table public.tasks to anon, authenticated, service_role;

-- Row level security: each person reads and writes only their own rows.
-- There is no delete policy, so nobody can delete tasks yet.
alter table public.tasks enable row level security;

create policy "Users can read their own tasks"
  on public.tasks for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can add their own tasks"
  on public.tasks for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own tasks"
  on public.tasks for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
