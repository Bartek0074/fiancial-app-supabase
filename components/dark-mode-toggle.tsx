'use client';

import Button from './button';

import useDarkMode from '@/hooks/use-dark-mode';

import { Moon, Sun } from 'lucide-react';

type DarkModeToggleProps = {
	defaultMode?: 'light' | 'dark';
	variant?: 'default' | 'outline' | 'ghost';
	size?: 'xs' | 'sm' | 'base' | 'lg';
};

export default function DarkModeToggle({
	defaultMode = 'dark',
}: DarkModeToggleProps) {
	const { theme, toggleTheme } = useDarkMode(defaultMode);

	return (
		<Button variant='ghost' size='sm' onClick={toggleTheme}>
			{theme === 'dark' ? (
				<Sun className='h-5 w-5' />
			) : (
				<Moon className='h-5 w-5' />
			)}
		</Button>
	);
}
