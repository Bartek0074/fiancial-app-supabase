import { Suspense } from 'react';

import TransactionList from './components/transaction-list';
import TransactionListFallback from './components/transaction-list-fallback';
import Trend from './components/trend';

export default function Page() {
	return (
		<div>
			<section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
				<Suspense fallback={<div>Loading...</div>}>
					<Trend type="Income" />
				</Suspense>
				<Suspense fallback={<div>Loading...</div>}>
					<Trend type="Expense" />
				</Suspense>
				<Suspense fallback={<div>Loading...</div>}>
					<Trend type="Saving" />
				</Suspense>
				<Suspense fallback={<div>Loading...</div>}>
					<Trend type="Investment" />
				</Suspense>
			</section>
			<Suspense fallback={<TransactionListFallback />}>
				<TransactionList />
			</Suspense>
		</div>
	);
}
