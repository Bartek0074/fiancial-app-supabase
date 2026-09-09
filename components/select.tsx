import { SelectHTMLAttributes } from 'react';

type SelectProps = {
	className?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ ...props }: SelectProps) {
	return (
		<select
			{...props}
			className={`w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 disabled:opacity-25 ${props.className}`}
		>
			{props.children}
		</select>
	);
}
