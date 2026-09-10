'use server';

import { createClient } from '@/lib/supabase/server';

import { transactionSchema } from '@/lib/validation';

export async function createTransaction(formData: unknown) {
	const validated = transactionSchema.safeParse(formData);

	if (!validated.success) {
		throw new Error('Invalid transaction data');
	}

	const supabase = await createClient();

	const { error } = await supabase.from('transactions').insert(validated.data);

	if (error) {
		throw new Error('Failed creating the transaction');
	}
}

export async function fetchTransactions({
	limit = 10,
	offset = 0,
	range,
}: {
	limit?: number;
	offset?: number;
	range: 'last24hours' | 'last7days' | 'last30days' | 'last12months';
}) {
	const supabase = await createClient();

	let { data, error } = await supabase.rpc('fetch_transactions', {
		limit_arg: limit,
		offset_arg: offset,
		range_arg: range,
	});
	if (error) throw new Error(error.message);

	return data;
}
