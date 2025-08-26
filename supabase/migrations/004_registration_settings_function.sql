-- Create a function to handle upsert operation for registration settings
CREATE OR REPLACE FUNCTION upsert_registration_settings(
  p_registration_deadline timestamptz,
  p_is_registration_enabled boolean
)
RETURNS void AS $$
BEGIN
  INSERT INTO registration_settings (
    id,
    registration_deadline,
    is_registration_enabled,
    created_at,
    updated_at
  )
  VALUES (
    1,
    p_registration_deadline,
    p_is_registration_enabled,
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    registration_deadline = p_registration_deadline,
    is_registration_enabled = p_is_registration_enabled,
    updated_at = now();
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER;
