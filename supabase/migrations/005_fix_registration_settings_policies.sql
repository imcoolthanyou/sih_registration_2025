-- Drop existing policies
DROP POLICY IF EXISTS "Allow anyone to read registration_settings" ON registration_settings;
DROP POLICY IF EXISTS "Only admins can modify registration_settings" ON registration_settings;

-- First disable RLS temporarily to ensure we can access the table
ALTER TABLE registration_settings DISABLE ROW LEVEL SECURITY;

-- Ensure we have a default row
INSERT INTO registration_settings (id, registration_deadline, is_registration_enabled)
VALUES (1, NOW() + interval '30 days', true)
ON CONFLICT (id) DO NOTHING;

-- Re-enable RLS
ALTER TABLE registration_settings ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Allow public read access to registration_settings"
ON registration_settings FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow service role full access to registration_settings"
ON registration_settings FOR ALL
TO service_role
USING (true);
