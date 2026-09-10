import TransactionList from './transaction-list';

import { fetchTransactions } from '@/lib/actions';

type TransactionListWrapperProps = {
	className?: string;
	range: 'last24hours' | 'last7days' | 'last30days' | 'last12months';
};

export default async function TransactionListWrapper({
	range,
	className,
}: TransactionListWrapperProps) {
	const transactions = await fetchTransactions({ range });

	return (
		<TransactionList initialTransactions={transactions} className={className} />
	);
}
