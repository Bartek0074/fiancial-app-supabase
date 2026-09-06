import Label from '@/components/label';
import Select from '@/components/select';
import Input from '@/components/input';
import Button from '@/components/button';

import { types, categories } from '@/lib/consts';

type TransactionFormProps = {};

export default async function TransactionForm({ }: TransactionFormProps) {
	return (
		<form className='space-y-4'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div>
					<Label htmlFor='type' className='mb-1'>
						Type
					</Label>
					<Select id='type' name='type'>
						{types.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</Select>
				</div>

				<div>
					<Label htmlFor='category' className='mb-1'>
						Category
					</Label>
					<Select id='category' name='category'>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</Select>
				</div>

				<div>
					<Label htmlFor='transaction-date' className='mb-1'>
						Transaction Date
					</Label>
					<Input id='transaction-date' name='transaction-date' type='date' />
				</div>

				<div>
					<Label htmlFor='amount' className='mb-1'>
						Amount
					</Label>
					<Input id='amount' name='amount' type='number' className='no-spinner' />
				</div>

				<div className='col-span-2'>
					<Label htmlFor='description' className='mb-1'>
						Description
					</Label>
					<Input id='description' name='description' type='text' />
				</div>
			</div>
			<div className='flex justify-end'>
				<Button type='submit'>Submit</Button>
			</div>
		</form>
	);
}
