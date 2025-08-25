-- Insert test teams
insert into teams (teamName, leaderName, leaderYear, leaderBranch, leaderSkills, members) values
  ('Team Innovators', 'John Doe', '3rd Year', 'Computer Science & Engineering', ARRAY['React', 'Python', 'Machine Learning'], '[{"name": "Jane Smith", "year": "3rd Year", "branch": "Computer Science & Engineering", "skills": ["React", "UI/UX"]}, {"name": "Mike Johnson", "year": "2nd Year", "branch": "Information Technology", "skills": ["Python", "Data Science"]}]'::jsonb),
  ('Tech Wizards', 'Alice Brown', '4th Year', 'Information Technology', ARRAY['Flutter', 'Firebase', 'AWS'], '[{"name": "Bob Wilson", "year": "4th Year", "branch": "Information Technology", "skills": ["Flutter", "Mobile Development"]}]'::jsonb);

-- Insert test individuals
insert into individuals (name, year, branch, skills, github, discord, has_deployed_software) values
  ('Test Student', '3rd Year', 'Computer Science & Engineering', ARRAY['React', 'Python'], 'https://github.com/teststudent', 'teststudent#1234', true),
  ('Sarah Connor', '2nd Year', 'Information Technology', ARRAY['Flutter', 'Firebase'], 'https://github.com/sconnor', 'sconnor#5678', false);
