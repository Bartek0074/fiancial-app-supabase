CREATE POLICY "Only authenticated users can delete transactions"
ON public.transactions
AS permissive
FOR DELETE
TO authenticated
USING ((SELECT auth.uid()) = user_id);

// remember to update error handling in the application when this policy is not enforced yet (returns 0)