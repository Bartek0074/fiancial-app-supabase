type FormErrorProps = {
	message?: string;
	className?: string;
};

export default function FormError({ message, className }: FormErrorProps) {
	if(!message) return null;

	return <p className={`text-red-500 mt-1 ${className}`}>{message}</p>;
}
