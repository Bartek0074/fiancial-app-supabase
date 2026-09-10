import type { Metadata } from 'next';

import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

import TransactionForm from '../../../components/transaction-form';

export const metadata: Metadata = {
	title: 'Edit Transaction',
};

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const supabase = await createClient();

	const { data: transaction, error } = await supabase
		.from('transactions')
		.select('*')
		.eq('id', id)
		.single();

	if (error) notFound();

	return (
		<div>
			<section className='mb-8'>
				<h1 className='text-4xl font-semibold'>Edit Transaction</h1>
			</section>
			<TransactionForm initialData={transaction} />
		</div>
	);
}
