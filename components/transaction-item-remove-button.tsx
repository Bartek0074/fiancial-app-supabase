'use client';

import { useState } from 'react';

import Button from './button';

import { deleteTransaction } from '@/lib/actions';

import { X, Loader } from 'lucide-react';

type TransactionItemRemoveButtonProps = {
	id: number;
	onRemoved: () => void;
};

export default function TransactionItemRemoveButton({
	id,
	onRemoved,
}: TransactionItemRemoveButtonProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [confirmed, setConfirmed] = useState(false);

	const handleClick = async () => {
		if (!confirmed) {
			setConfirmed(true);
			return;
		}
		try {
			setIsLoading(true);
			await deleteTransaction(id);
			onRemoved();
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			size='xs'
			variant={confirmed ? 'danger' : 'ghost'}
			onClick={handleClick}
			disabled={isLoading}
		>
			{!isLoading ? (
				<X className='h-4 w-4' />
			) : (
				<Loader className='h-4 w-4 animate-spin' />
			)}
		</Button>
	);
}
