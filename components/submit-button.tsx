import { ButtonHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

import Button from '@/components/button';

import { Loader } from 'lucide-react';

type SubmitButtonProps = {
	variant?: 'default' | 'outline' | 'ghost' | 'danger';
	size?: 'xs' | 'sm' | 'base' | 'lg';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function SubmitButton({ ...props }: SubmitButtonProps) {
	const { pending } = useFormStatus();

	return (
		<Button {...props} className={`${props.className}`} disabled={pending}>
			<div className='flex items-center justify-center space-x-1'>
				{pending && <Loader className='animate-spin w-4 h-4' />}
				<span>{props.children}</span>
			</div>
		</Button>
	);
}
