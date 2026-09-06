'use client';

import Label from '@/components/label';
import Select from '@/components/select';
import Input from '@/components/input';
import Button from '@/components/button';

import { types, categories } from '@/lib/consts';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { transactionSchema } from '@/lib/validation';

type TransactionFormProps = {};

export default function TransactionForm({}: TransactionFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onTouched',
		resolver: zodResolver(transactionSchema),
	});

	const onSubmit = (data: any) => {
		console.log(data);
		console.log(process.env.NEXT_PUBLIC_API_URL);
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
					{errors.created_at && (
						<p className='text-red-500 mt-1'>
							{typeof errors.created_at.message === 'string'
								? errors.created_at.message
								: ''}
						</p>
					)}
				</div>

				<div>
					<Label className='mb-1'>Amount</Label>
					<Input {...register('amount')} type='number' className='no-spinner' />
					{errors.amount && (
						<p className='text-red-500 mt-1'>
							{typeof errors.amount.message === 'string'
								? errors.amount.message
								: ''}
						</p>
					)}
				</div>

				<div className='col-span-1 md:col-span-2'>
					<Label className='mb-1'>Description</Label>
					<Input {...register('description')} type='text' />
					{errors.description && (
						<p className='text-red-500 mt-1'>
							{typeof errors.description.message === 'string'
								? errors.description.message
								: ''}
						</p>
					)}
				</div>
			</div>
			<div className='flex justify-end'>
				<Button type='submit'>Submit</Button>
			</div>
		</form>
	);
}
