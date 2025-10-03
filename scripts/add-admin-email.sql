-- Add admin email to grant admin access
INSERT INTO admin_emails (email, created_at)
VALUES ('neyney123@gmx.de', NOW())
ON CONFLICT (email) DO NOTHING;
