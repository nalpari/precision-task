-- Initial todos schema with RLS policies and updated_at trigger.
-- All policies use `(select auth.uid())` (InitPlan optimization).

create table public.todos (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text not null check (char_length(title) between 1 and 500),
  completed   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index todos_user_created_idx on public.todos (user_id, created_at desc);

alter table public.todos enable row level security;

create policy "select own" on public.todos
  for select using ((select auth.uid()) = user_id);
create policy "insert own" on public.todos
  for insert with check ((select auth.uid()) = user_id);
create policy "update own" on public.todos
  for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "delete own" on public.todos
  for delete using ((select auth.uid()) = user_id);

create or replace function public.set_updated_at()
  returns trigger
  language plpgsql
  set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end
$$;

create trigger todos_set_updated_at before update on public.todos
  for each row execute function public.set_updated_at();
