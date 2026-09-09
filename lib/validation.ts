import { z } from 'zod';

import { types, categories } from '@/lib/consts';

export const transactionSchema = z
	.object({
		type: z.enum(types, 'The type is invalid'),
		category: z.preprocess(
			(val) => (typeof val === 'string' && val.length ? val : undefined),
			z.string().optional(),
		),
		amount: z.coerce.number().min(1, {
			message: 'The amount must be greater than or equal to 1',
		}),
		description: z.string().optional(),
		created_at: z
			.string()
			.nonempty('The transaction date is required')
			.refine((val) => !isNaN(Date.parse(val)), {
				message: 'The transaction date is invalid',
			}),
	})
	.refine(
		(data) => {
			if (data.type === 'Expense') {
				return (
					data.category !== undefined && categories.includes(data.category)
				);
			}
			return true;
		},
		{
			path: ['category'],
			message: 'Category is required for Expense',
		},
	);
