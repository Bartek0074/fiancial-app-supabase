import Link from 'next/link';
import DarkModeToggle from './dark-mode-toggle';
import Button from './button';

import useServerDarkMode from '@/hooks/use-server-dark-mode';

import { createClient } from '@/lib/supabase/server';

import { CircleUser, KeyRound } from 'lucide-react';

import { variants, sizes } from '@/lib/variants';

type PageHeaderProps = {
	className?: string;
};

export default async function PageHeader({ className }: PageHeaderProps) {
	const theme = await useServerDarkMode();

	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<header className={`flex justify-between items-center ${className}`}>
			<Link
				href='/dashboard'
				className='text-xl hover:underline underline-offset-8 decoration-2'
			>
				Fincance App
			</Link>
			<div className='flex items-center space-x-2'>
				<DarkModeToggle defaultMode={theme as 'light' | 'dark'} />
				{user && (
					<Button variant='ghost' size='sm'>
						<div className='flex items-center space-x-2'>
							<CircleUser className='w-5 h-5' />
							<span>{user.email}</span>
						</div>
					</Button>
				)}
				{!user && (
					<Link href='/login' className={`${variants.ghost} ${sizes.sm}`}>
						<KeyRound className='w-5 h-5' />
					</Link>
				)}
			</div>
		</header>
	);
}
