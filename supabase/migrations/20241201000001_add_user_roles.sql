-- Add role column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user'));

-- Create index for role column for better query performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Enable RLS on users table for role-based access
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own data
DROP POLICY IF EXISTS "Users can read own data" ON users;
CREATE POLICY "Users can read own data"
ON users FOR SELECT
USING (auth.uid() = id);

-- Policy: Users can only update their own data (except role)
DROP POLICY IF EXISTS "Users can update own data" ON users;
CREATE POLICY "Users can update own data"
ON users FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id AND role = OLD.role); -- Prevent role changes

-- Policy: Allow insert for new users (role will default to 'user')
DROP POLICY IF EXISTS "Users can insert own data" ON users;
CREATE POLICY "Users can insert own data"
ON users FOR INSERT
WITH CHECK (auth.uid() = id AND role = 'user'); -- Force role to be 'user' on insert

-- Enable RLS on user_sessions table
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own sessions
DROP POLICY IF EXISTS "Users can access own sessions" ON user_sessions;
CREATE POLICY "Users can access own sessions"
ON user_sessions FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Enable RLS on product_customizations table
ALTER TABLE product_customizations ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own customizations
DROP POLICY IF EXISTS "Users can access own customizations" ON product_customizations;
CREATE POLICY "Users can access own customizations"
ON product_customizations FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create a function to check if user is admin (for future use)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

-- Enable realtime for users table
ALTER PUBLICATION supabase_realtime ADD TABLE users;
