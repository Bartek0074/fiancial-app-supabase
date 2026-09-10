'use client';

import { useState } from 'react';

import { fetchTransactions } from '@/lib/actions';

import TransactionItem from '@/components/transaction-item';
import TransactionSummaryItem from '@/components/transaction-summary-item';
import Separator from '@/components/separator';
import Button from '@/components/button';

import { groupAndSumTransactionsByDate } from '@/lib/utils';

import { Loader } from 'lucide-react'

const LIMIT = 10;

type TransactionListProps = {
	range: 'last24hours' | 'last7days' | 'last30days' | 'last12months';
	initialTransactions: any[];
	className?: string;
};

export default function TransactionList({
	range,
	initialTransactions,
	className,
}: TransactionListProps) {
	const [transactions, setTransactions] = useState(initialTransactions);
	const [offset, setOffset] = useState(initialTransactions.length);
	const [buttonHidden, setButtonHidden] = useState(
		initialTransactions.length === 0,
	);
	const [isLoading, setIsLoading] = useState(false);

	const groupedTransactions = groupAndSumTransactionsByDate(transactions);

	const handleClick = async () => {
		setIsLoading(true);

		let nextTransactions: any = null;

		try {
			nextTransactions = await fetchTransactions({
				range,
				offset,
				limit: LIMIT,
			});
			setTransactions((prevTransactions) => [
				...prevTransactions,
				...nextTransactions,
			]);
			setOffset((prevValue) => prevValue + LIMIT);
			setButtonHidden(nextTransactions.length < LIMIT);
		} finally {
			setIsLoading(false);
		}

	};

	return (
		<div className={`space-y-8 ${className}`}>
			{Object.entries(groupedTransactions).map(([date, value]) => {
				return (
					<div key={date}>
						<TransactionSummaryItem date={date} amount={value.amount} />
						<Separator />
						<div className={`space-y-4 ${className}`}>
							{value.transactions.map((transaction: any) => (
								<div key={transaction.id}>
									<TransactionItem
										type={transaction.type}
										amount={transaction.amount}
										description={transaction.description}
										category={transaction.category}
									/>
								</div>
							))}
						</div>
					</div>
				);
			})}
			{transactions.length === 0 && (
				<div className='text-center text-gray-400 dark:text-gray-500'>
					<p>No transactions found.</p>
				</div>
			)}
			{!buttonHidden && (
				<div className='flex items-center justify-center'>
					<Button variant='ghost' onClick={handleClick} disabled={isLoading}>
						<div className='flex items-center justify-center space-x-1'>
							{isLoading && <Loader className='animate-spin' />}
							<div>
								Load More
							</div>
						</div>
					</Button>
				</div>
			)}
		</div>
	);
}
