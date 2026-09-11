'use client';

import { useActionState } from 'react';
import type { LoginState } from '@/lib/actions';

import Label from '@/components/label';
import Input from '@/components/input';
import SubmitButton from '@/components/submit-button';

import { login } from '@/lib/actions';

const initialState: LoginState = {
	message: '',
	error: false,
};

export default function LoginForm() {
	const [state, formAction] = useActionState(login, initialState);

	return (
		<form action={formAction} className='flex flex-col space-y-4'>
			<div className='flex flex-col space-y-1'>
				<Label htmlFor='email'>Email</Label>
				<Input
					type='email'
					placeholder='name@example.com'
					name='email'
					required
				/>
			</div>
			<SubmitButton type='submit' size='sm' className='w-full'>
				Sign in with email
			</SubmitButton>
			<p
				className={`${state.error ? 'text-red-500' : 'text-green-500'} text-sm text-center`}
			>
				{state.message}
			</p>
		</form>
	);
}
