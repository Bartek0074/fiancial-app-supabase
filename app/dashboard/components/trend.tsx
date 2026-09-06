
import BaseTrend from '@/components/trend';

type TrendProps = {
	type: "Income" | "Expense" | "Saving" | "Investment";
};

export default async function Trend({
	type,
}: TrendProps) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trends/${type}`);

	const trend = await response.json();

	const { amount, prevAmount } = trend;

	return (
		<BaseTrend type={type} amount={amount} prevAmount={prevAmount} />
	);
}
