-- Add fractional `position` for drag-and-drop reordering.
-- New rows default to epoch(now()) so insertion order matches creation order
-- and the gap between any two days dwarfs intra-day reorder magnitudes,
-- keeping date-group boundaries stable without an extra sort key.

alter table public.todos
  add column position double precision;

update public.todos
  set position = extract(epoch from created_at);

alter table public.todos
  alter column position set not null;

alter table public.todos
  alter column position set default extract(epoch from now());

create index todos_user_position_idx
  on public.todos (user_id, position desc);
