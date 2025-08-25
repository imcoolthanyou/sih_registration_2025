-- Enable RLS
alter table teams enable row level security;
alter table individuals enable row level security;

-- Teams policies
create policy "Teams are viewable by everyone"
  on teams for select
  using (true);

create policy "Teams can be created by anyone"
  on teams for insert
  with check (true);

create policy "Teams can only be updated by admin"
  on teams for update
  using (auth.uid() in (select user_id from admin_users));

create policy "Teams can only be deleted by admin"
  on teams for delete
  using (auth.uid() in (select user_id from admin_users));

-- Individuals policies
create policy "Individuals are viewable by everyone"
  on individuals for select
  using (true);

create policy "Individuals can be created by anyone"
  on individuals for insert
  with check (true);

create policy "Individuals can only be updated by admin or self"
  on individuals for update
  using (auth.uid() = user_id or auth.uid() in (select user_id from admin_users));

create policy "Individuals can only be deleted by admin"
  on individuals for delete
  using (auth.uid() in (select user_id from admin_users));

-- Create admin_users table
create table admin_users (
  user_id uuid references auth.users(id) primary key,
  created_at timestamptz default now()
);
