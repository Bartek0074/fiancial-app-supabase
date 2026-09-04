import { InputHTMLAttributes } from 'react';

type InputProps = {
	className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ ...props }: InputProps) {
	const styles = {
		checkbox:
			'cursor-pointer rounded border-gray-300 text-gray-700 bg-white dark:bg-gray-950 dark:text-gray-500 shadow-sm',
		default:
			'cursor-text w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950',
	};

	return (
		<input
			{...props}
			className={`${props.type === 'checkbox' ? styles.checkbox : styles.default} ${props.className}`}
		/>
	);
}
