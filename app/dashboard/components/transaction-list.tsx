import TransactionItem from '@/components/transaction-item';
import TransactionSummaryItem from '@/components/transaction-summary-item';
import Separator from '@/components/separator';

import { groupAndSumTransactionsByDate } from '@/lib/utils';

type TransactionListProps = {
	initialTransactions: any[];
	className?: string;
};

export default function TransactionList({
	initialTransactions,
	className,
}: TransactionListProps) {
	const groupedTransactions = groupAndSumTransactionsByDate(
		initialTransactions as any,
	);

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
		</div>
	);
}
