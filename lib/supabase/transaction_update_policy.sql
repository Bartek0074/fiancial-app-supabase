CREATE POLICY "Only authenticated users can update transactions"
ON public.transactions
AS permissive
FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);