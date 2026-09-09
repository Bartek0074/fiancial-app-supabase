import dotenv from 'dotenv';

import { createClient } from '@supabase/supabase-js';

import { faker } from '@faker-js/faker';

dotenv.config({
	path: '.env.local',
});

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.SUPABASE_SECRET_KEY,
);

export const types = ['Income', 'Expense', 'Investment', 'Saving'];

export const categories = [
	'Housing',
	'Transport',
	'Health',
	'Food',
	'Education',
	'Other',
];

async function seed() {
	let transactions = [];

	for (let i = 0; i < 10; i++) {
		const created_at = faker.date.past();
		let type,
			category = null;

		const typeBias = Math.random();

		if (typeBias < 0.6) {
			type = 'Expense';
			category = faker.helpers.arrayElement(categories);
		} else if (typeBias < 0.8) {
			type = 'Income';
		} else {
			type = faker.helpers.arrayElement(['Investment', 'Saving']);
		}

		let amount;

		switch (type) {
			case 'Income':
				amount = faker.number.int({ min: 2000, max: 9000 });
				break;
			case 'Expense':
				amount = faker.number.int({ min: 10, max: 1000 });
				break;
			case 'Investment':
				amount = faker.number.int({ min: 3000, max: 10000 });
				break;
			case 'Saving':
				amount = faker.number.int({ min: 3000, max: 10000 });
				break;
		}

		transactions.push({
			created_at,
			amount,
			type,
			category,
			description: faker.lorem.sentence(),
		});
	}

	const { error } = await supabase.from('transactions').insert(transactions);

	if (error) {
		console.error('Error seeding transactions:', error);
	} else {
		console.log('Successfully seeded transactions');
	}
}

seed().catch((error) => {
	console.error('Error running seed function:', error);
});
