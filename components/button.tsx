import { ButtonHTMLAttributes } from 'react';

import { variants, sizes } from '../lib/variants';

type ButtonProps = {
	variant?: 'default' | 'outline' | 'ghost' | 'danger';
	size?: 'xs' | 'sm' | 'base' | 'lg';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className={`cursor-pointer ${props.variant ? variants[props.variant] : variants.default} ${props.size ? sizes[props.size] : sizes.base}`}
		>
			{props.children}
		</button>
	);
}
