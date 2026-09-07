'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { purgeTransactionListCache } from '@/lib/actions';

import { z } from 'zod';

import Label from '@/components/label';
import Select from '@/components/select';
import Input from '@/components/input';
import Button from '@/components/button';
import FormError from '@/components/form-error';

import { types, categories } from '@/lib/consts';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { transactionSchema } from '@/lib/validation';

type TransactionFormProps = {};

export default function TransactionForm({}: TransactionFormProps) {
	const router = useRouter();

	const [isSaving, setIsSaving] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onTouched',
		resolver: zodResolver(transactionSchema),
	});

	const onSubmit = async (data: z.infer<typeof transactionSchema>) => {
		setIsSaving(true);

		try {
			await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					amount: data.amount,
					type: data.type,
					description: data.description,
					category: data.category,
					created_at: `${data.created_at}T00:00:00`,
				}),
			});

			await purgeTransactionListCache();

			router.push('/dashboard');
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div>
					<Label className='mb-1'>Type</Label>
					<Select {...register('type')}>
						{types.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</Select>
				</div>

				<div>
					<Label className='mb-1'>Category</Label>
					<Select {...register('category')}>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</Select>
				</div>

				<div>
					<Label className='mb-1'>Transaction Date</Label>
					<Input {...register('created_at')} type='date' />
					<FormError message={errors.created_at?.message as string} />
				</div>

				<div>
					<Label className='mb-1'>Amount</Label>
					<Input {...register('amount')} type='number' className='no-spinner' />
					<FormError message={errors.amount?.message as string} />
				</div>

				<div className='col-span-1 md:col-span-2'>
					<Label className='mb-1'>Description</Label>
					<Input {...register('description')} type='text' />
					<FormError message={errors.description?.message as string} />
				</div>
			</div>
			<div className='flex justify-end'>
				<Button type='submit' disabled={isSaving}>
					{isSaving ? 'Saving...' : 'Submit'}
				</Button>
			</div>
		</form>
	);
}
