-- Add neyney123@gmx.de as admin
INSERT INTO admin_emails (email)
VALUES ('neyney123@gmx.de')
ON CONFLICT (email) DO NOTHING;
