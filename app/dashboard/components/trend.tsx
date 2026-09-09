import BaseTrend from '@/components/trend';
import { createClient } from '@/lib/supabase/server';

type TrendProps = {
	type: 'Income' | 'Expense' | 'Saving' | 'Investment';
	range: 'last24hours' | 'last7days' | 'last30days' | 'last12months';
};

export default async function Trend({ type,range }: TrendProps) {
	const supabase = await createClient();

	let { data, error } = await supabase.rpc('calculate_total', {
		range_arg: range,
		type_arg: type,
	});

	if (error) {
		throw new Error(error.message);
	}

	return <BaseTrend type={type} amount={data[0].current_amount} prevAmount={data[0].previous_amount} />;
}
