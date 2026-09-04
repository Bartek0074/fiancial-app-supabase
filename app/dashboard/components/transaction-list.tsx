import TransactionItem from '@/components/transaction-item';
import TransactionSummaryItem from '@/components/transaction-summary-item';

const groupAndSumTransactionsByDate = (transactions: any[]) => {
	const grouped: Record<string, { transactions: any[]; amount: number }> = {};

	for (const transaction of transactions) {
		const date = transaction.created_at.split('T')[0];

		if (!grouped[date]) {
			grouped[date] = { transactions: [], amount: 0 };
		}
		grouped[date].transactions.push(transaction);

		const amount =
			transaction.type === 'Expense' ? -transaction.amount : transaction.amount;

		grouped[date].amount += amount;
	}

	return grouped;
};

type TransactionListProps = {
	className?: string;
};

export default async function TransactionList({
	className,
}: TransactionListProps) {
	const res = await fetch('http://localhost:3100/transactions');
	const transactions = await res.json();

	const groupedTransactions = groupAndSumTransactionsByDate(transactions);

	return (
		<div className={`space-y-8 ${className}`}>
			{Object.entries(groupedTransactions).map(([date, value]) => {
				return (
					<div key={date}>
						<TransactionSummaryItem date={date} amount={value.amount} />
						<hr className='my-4 border-gray-200 dark:border-gray-800' />
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
		</div>
	);
}
