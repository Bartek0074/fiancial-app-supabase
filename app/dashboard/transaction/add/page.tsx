import type { Metadata } from 'next';

import TransactionForm from '../../../dashboard/components/transaction-form';

export const metadata: Metadata = {
	title: 'New Transaction',
};

export default function Page() {
	return (
		<div>
			<section className='mb-8'>
				<h1 className='text-4xl font-semibold'>New Transaction</h1>
			</section>

			<TransactionForm />
		</div>
	);
}
