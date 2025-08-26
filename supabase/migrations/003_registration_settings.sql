-- Drop existing table if it exists
DROP TABLE IF EXISTS registration_settings;

-- Create the registration_settings table
CREATE TABLE registration_settings (
  id bigint PRIMARY KEY DEFAULT 1,
  registration_deadline timestamptz NOT NULL DEFAULT (now() + interval '30 days'),
  is_registration_enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_registration_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_registration_settings_updated_at_trigger
  BEFORE UPDATE ON registration_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_registration_settings_updated_at();

-- Add some policies
ALTER TABLE registration_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anyone to read registration_settings" 
  ON registration_settings 
  FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can modify registration_settings" 
  ON registration_settings 
  FOR ALL
  USING (auth.role() = 'admin');

-- Create admin user role if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_catalog.pg_roles WHERE rolname = 'admin'
  ) THEN
    CREATE ROLE admin;
  END IF;
END
$$;

-- Create stored procedure for updating settings
CREATE OR REPLACE FUNCTION update_registration_settings(deadline text, enabled boolean)
RETURNS boolean AS $$
BEGIN
  DELETE FROM registration_settings;
  
  INSERT INTO registration_settings (id, registration_deadline, is_registration_enabled)
  VALUES (1, deadline::timestamptz, enabled);
  
  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- Insert initial settings
INSERT INTO registration_settings (id, registration_deadline, is_registration_enabled)
VALUES (1, (now() + interval '30 days'), true)
ON CONFLICT (id) DO NOTHING;
