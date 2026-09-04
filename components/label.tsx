import { LabelHTMLAttributes } from 'react';

type LabelProps = {
	className?: string;
} & LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ ...props }: LabelProps) {
	return (
		<label
			{...props}
			className={`text-gray-700 dark:text-gray-300 cursor-pointer ${props.className}`}
		>
			{props.children}
		</label>
	);
}
