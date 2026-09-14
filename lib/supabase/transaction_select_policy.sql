CREATE POLICY "Only owners of transactions can read them"
ON public.transactions
AS permissive
FOR SELECT
TO authenticated
USING (user_id = auth.uid());