-- Create admin_emails table to store which emails have admin access
CREATE TABLE IF NOT EXISTS admin_emails (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on admin_emails table
ALTER TABLE admin_emails ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can read admin_emails (to check if they're admin)
CREATE POLICY "Anyone can check if email is admin"
  ON admin_emails FOR SELECT
  TO authenticated
  USING (true);

-- Insert default admin email (change this to your admin email)
INSERT INTO admin_emails (email) 
VALUES ('admin@mrphone.de')
ON CONFLICT (email) DO NOTHING;

-- Add more admin emails as needed
-- INSERT INTO admin_emails (email) VALUES ('another-admin@mrphone.de');
