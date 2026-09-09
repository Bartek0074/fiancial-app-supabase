import type { Metadata } from 'next';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Link from 'next/link';

import TransactionList from './components/transaction-list';
import TransactionListFallback from './components/transaction-list-fallback';
import Trend from './components/trend';
import TrendFallback from './components/trend-fallback';

import { PlusCircle } from 'lucide-react';

import { variants, sizes } from '../../lib/variants';
import { types } from '../../lib/consts';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default function Page() {
	return (
		<div>
			<section className='mb-8'>
				<h1 className='text-4xl font-semibold'>Summary</h1>
			</section>

			<section className='mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8'>
				{types.map((type) => (
					<ErrorBoundary
						key={type}
						fallback={<p className='text-red-500'>Cannot fetch {type} trend</p>}
					>
						<Suspense fallback={<TrendFallback />}>
							<Trend type={type} />
						</Suspense>
					</ErrorBoundary>
				))}
			</section>

			<section className='flex justify-between items-center mb-8'>
				<h2 className='text-2xl font-semibold'>Transactions</h2>
				<Link
					href='/dashboard/transaction/add'
					className={`flex items-center space-x-1 ${variants.outline} ${sizes.sm}`}
				>
					<PlusCircle className='w-4 h-4' />
					<div>Add</div>
				</Link>
			</section>

			<Suspense fallback={<TransactionListFallback />}>
				<TransactionList />
			</Suspense>
		</div>
	);
}
