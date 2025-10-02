-- Assign supabase_admin role to a user by email
-- Replace 'neyney123@gmx.de' with the actual user email

-- First, let's see the user_id for the email (for verification)
-- You can run this query first to get the user_id:
-- SELECT id, email FROM auth.users WHERE email = 'neyney123@gmx.de';

-- Insert admin role for the user
INSERT INTO public.user_roles (user_id, role)
SELECT 
  id,
  'supabase_admin'
FROM auth.users
WHERE email = 'neyney123@gmx.de'
ON CONFLICT (user_id, role) DO NOTHING;

-- Verify the role was assigned
SELECT 
  u.email,
  ur.role,
  ur.created_at
FROM auth.users u
JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'neyney123@gmx.de';
