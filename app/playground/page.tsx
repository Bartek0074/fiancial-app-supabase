import PageHeader from '../../components/page-header';
import Trend from '../../components/trend';
import TransactionItem from '../../components/transaction-item';
import TransactionSummaryItem from '../../components/transaction-summary-item';
import Button from '../../components/button';
import Label from '../../components/label';
import Input from '../../components/input';
import Select from '../../components/select';

export default function Page() {
	return (
		<main className='space-y-8 mb-32'>
			<h1 className='text-4xl mt-8'>Playground</h1>
			<div>
				<h2 className='mb-4 text-lg font-mono'>PageHeader</h2>
				<hr className='mb-4 border-gray-200 dark:border-gray-800' />
				<div>
					<PageHeader />
				</div>
			</div>
			<div>
				<h2 className='mb-4 text-lg font-mono'>Trend</h2>
				<hr className='mb-4 border-gray-200 dark:border-gray-800' />
				<div className='flex space-x-8'>
					<Trend type='Income' amount={1000} prevAmount={900} />
					<Trend type='Expense' amount={12000} prevAmount={10000} />
					<Trend type='Investment' amount={7000} prevAmount={11100} />
					<Trend type='Saving' amount={500} prevAmount={950} />
				</div>
			</div>
			<div>
				<h2 className='mb-4 text-lg font-mono'>TransactionItem</h2>
				<hr className='mb-4 border-gray-200 dark:border-gray-800' />
				<div className='space-y-4'>
					<TransactionItem type='Income' description='Salary' amount={2000} />
					<TransactionItem
						type='Expense'
						description='Going out to eat'
						category='Food'
						amount={29}
					/>
					<TransactionItem
						type='Saving'
						description='For children'
						amount={500}
					/>
					<TransactionItem
						type='Investment'
						description='In Microsoft'
						amount={9000}
					/>
				</div>
			</div>
			<div>
				<h2 className='mb-4 text-lg font-mono'>
					TransactionSummaryItem + TransactionItem
				</h2>
				<hr className='mb-4 border-gray-200 dark:border-gray-800' />
				<div className='space-y-4'>
					<TransactionSummaryItem date='2026-09-04' amount={2000} />
					<hr className='mb-4 border-gray-200 dark:border-gray-800' />
					<TransactionItem type='Income' description='Salary' amount={2000} />
					<TransactionItem
						type='Expense'
						description='Going out to eat'
						category='Food'
						amount={29}
					/>
					<TransactionItem
						type='Saving'
						description='For children'
						amount={500}
					/>
					<TransactionItem
						type='Investment'
						description='In Microsoft'
						amount={9000}
					/>
				</div>
			</div>
			<div>
				<h2 className='mb-4 text-lg font-mono'>Button</h2>
				<hr className='mb-4 border-gray-200 dark:border-gray-800' />
				<div className='space-x-4'>
					<Button variant='default'>Button</Button>
					<Button variant='outline'>Button</Button>
					<Button variant='ghost'>Button</Button>

					<Button size='xs'>Button</Button>
					<Button size='sm'>Button</Button>
					<Button size='base'>Button</Button>
					<Button size='lg'>Button</Button>
				</div>
			</div>
			<div>
				<h2 className='mb-4 text-lg font-mono'>Forms</h2>
				<hr className='mb-4 border-gray-200 dark:border-gray-800' />
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<Label htmlFor='name' className='mb-1'>
							Your name
						</Label>
						<Input
							id='name'
							type='text'
							placeholder='Type something in here.'
							className='w-full'
						/>
					</div>
					<div>
						<Label htmlFor='city' className='mb-1'>
							City
						</Label>
						<Select id='city'>
							<option value='new-york'>New York</option>
							<option value='los-angeles'>Los Angeles</option>
							<option value='chicago'>Chicago</option>
						</Select>
					</div>
					<div className='flex items-center'>
						<Input id='terms' type='checkbox' />
						<Label htmlFor='terms' className='ml-2'>
							Accept terms
						</Label>
					</div>
				</div>
			</div>
		</main>
	);
}
