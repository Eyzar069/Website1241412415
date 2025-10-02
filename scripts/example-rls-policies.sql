-- Example: How to update your RLS policies to use the has_role() function
-- Replace 'your_table_name' with your actual table name

-- Example 1: Only admins can insert
CREATE POLICY "Only admins can insert"
  ON public.your_table_name
  FOR INSERT
  WITH CHECK (public.has_role('supabase_admin'));

-- Example 2: Only admins can update
CREATE POLICY "Only admins can update"
  ON public.your_table_name
  FOR UPDATE
  USING (public.has_role('supabase_admin'));

-- Example 3: Only admins can delete
CREATE POLICY "Only admins can delete"
  ON public.your_table_name
  FOR DELETE
  USING (public.has_role('supabase_admin'));

-- Example 4: Everyone can read, only admins can modify
CREATE POLICY "Everyone can read"
  ON public.your_table_name
  FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify"
  ON public.your_table_name
  FOR ALL
  USING (public.has_role('supabase_admin'));

-- Example 5: Check for multiple roles (admin OR moderator)
CREATE POLICY "Admins and moderators can modify"
  ON public.your_table_name
  FOR ALL
  USING (
    public.has_role('supabase_admin') OR 
    public.has_role('moderator')
  );
