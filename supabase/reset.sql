-- First, drop the tables if they exist
DROP TABLE IF EXISTS individuals;
DROP TABLE IF EXISTS teams;

-- Then recreate them with the correct structure
CREATE TABLE teams (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  "teamName" TEXT NOT NULL,
  "leaderName" TEXT NOT NULL,
  "leaderYear" TEXT NOT NULL,
  "leaderBranch" TEXT NOT NULL,
  "leaderSkills" TEXT[] DEFAULT '{}',
  members JSONB DEFAULT '[]'
);

CREATE TABLE individuals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  year TEXT NOT NULL,
  branch TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  github TEXT,
  discord TEXT,
  "hasDeployedSoftware" BOOLEAN DEFAULT false
);

-- Enable RLS but allow all operations for now
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE individuals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for teams" ON teams FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for individuals" ON individuals FOR ALL TO anon USING (true) WITH CHECK (true);

-- Insert test data
INSERT INTO teams ("teamName", "leaderName", "leaderYear", "leaderBranch", "leaderSkills", members)
VALUES 
  ('Team Innovators', 'John Doe', '3rd Year', 'Computer Science & Engineering',
   ARRAY['React', 'Python', 'Machine Learning'],
   '[{"name": "Jane Smith", "year": "3rd Year", "branch": "Computer Science & Engineering", "skills": ["React", "UI/UX"]},
     {"name": "Mike Johnson", "year": "2nd Year", "branch": "Information Technology", "skills": ["Python", "Data Science"]}]'::jsonb);

INSERT INTO individuals (name, year, branch, skills, github, discord, "hasDeployedSoftware")
VALUES 
  ('Test Student', '3rd Year', 'Computer Science & Engineering',
   ARRAY['React', 'Python'],
   'https://github.com/teststudent',
   'teststudent#1234',
   true);
