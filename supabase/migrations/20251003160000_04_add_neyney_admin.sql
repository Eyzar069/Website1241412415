/*
  # Add neyney123@gmx.de as Admin

  ## Overview
  Adds neyney123@gmx.de to the admin_emails table for admin access.

  ## Changes
  - Inserts neyney123@gmx.de into admin_emails table
  - Uses ON CONFLICT to avoid duplicate entries
*/

-- Insert admin email
INSERT INTO admin_emails (email)
VALUES ('neyney123@gmx.de')
ON CONFLICT (email) DO NOTHING;
