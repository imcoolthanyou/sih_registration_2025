-- Create teams table
create table if not exists teams (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  teamName text not null,
  leaderName text not null,
  leaderYear text not null,
  leaderBranch text not null,
  leaderSkills text[] default '{}',
  members jsonb default '[]'
);

-- Create individuals table
create table if not exists individuals (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  year text not null,
  branch text not null,
  skills text[] default '{}',
  github text,
  discord text,
  hasDeployedSoftware boolean default false
);

-- Set up Row Level Security (RLS)
alter table teams enable row level security;
alter table individuals enable row level security;

-- Create policies
create policy "Anyone can view teams"
  on teams for select
  to anon
  using (true);

create policy "Anyone can view individuals"
  on individuals for select
  to anon
  using (true);

-- Create policies for inserting data
create policy "Anyone can insert teams"
  on teams for insert
  to anon
  with check (true);

create policy "Anyone can insert individuals"
  on individuals for insert
  to anon
  with check (true);
