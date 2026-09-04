import PageHeader from '../../components/page-header';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex flex-col min-h-screen'>
			<PageHeader className='my-8' />
			<main>{children}</main>
			<footer className='mt-auto'>Footer</footer>
		</div>
	);
}
