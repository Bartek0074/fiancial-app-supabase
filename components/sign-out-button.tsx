'use client';

import SubmitButton from './submit-button';

import { LogOut } from 'lucide-react';

import { signOut } from '@/lib/actions';

type SignOutButtonProps = {
	className?: string;
};

export default function SignOutButton({ className }: SignOutButtonProps) {
	return (
		<form action={signOut}>
			<SubmitButton className={className} variant='ghost' size='sm'>
				<LogOut className='w-5 h-5' />
			</SubmitButton>
		</form>
	);
}
