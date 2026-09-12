'use server';

import { createClient } from '@/lib/supabase/server';

import { revalidatePath } from 'next/cache';

import { transactionSchema } from '@/lib/validation';

import { redirect } from 'next/navigation';

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
	if (error) throw new Error('Failed fetching transactions');

	return data;
}

export async function deleteTransaction(id: number) {
	const supabase = await createClient();

	const { error } = await supabase.from('transactions').delete().eq('id', id);

	if (error) {
		throw new Error('Failed deleting the transaction');
	}

	revalidatePath('/dashboard');
}

export async function updateTransaction(id: string, formData: unknown) {
	const validated = transactionSchema.safeParse(formData);

	if (!validated.success) {
		throw new Error('Invalid transaction data');
	}

	const supabase = await createClient();

	const { error } = await supabase
		.from('transactions')
		.update(validated.data)
		.eq('id', id);

	if (error) {
		throw new Error('Failed updating the transaction');
	}
}

export type LoginState = {
	message: string;
	error: boolean;
};

export async function login(prevState: LoginState, formData: FormData) {
	const email = formData.get('email');

	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithOtp({
		email: email as string,
		options: {
			shouldCreateUser: true,
		},
	});

	if (error) {
		return {
			error: true,
			message: 'Something went wrong',
		};
	}

	return {
		error: false,
		message: `Email sent to ${email}`,
	};
}

export async function signOut() {
	const supabase = await createClient();

	const { error } = await supabase.auth.signOut();

	if (error) {
		throw new Error('Failed signing out');
	}

	redirect('/login');
}
