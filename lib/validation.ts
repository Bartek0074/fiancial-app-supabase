import { z } from 'zod';

import { types, categories } from '@/lib/consts';

export const transactionSchema = z.object({
	type: z.enum(types, 'The type is invalid'),
	category: z.enum(categories, 'The category is invalid'),
	amount: z.coerce.number().min(1, {
		message: 'The amount must be greater than or equal to 1',
	}),
	description: z.string().min(1, {
		message: 'The description is required',
	}),
	created_at: z
		.string()
		.nonempty('The transaction date is required')
		.refine((val) => !isNaN(Date.parse(val)), {
			message: 'The transaction date is invalid',
		}),
});
