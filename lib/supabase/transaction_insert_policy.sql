CREATE POLICY "Only authenticated users can add transactions"
ON public.transactions
AS permissive
FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);