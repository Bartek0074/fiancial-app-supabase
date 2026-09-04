import { cookies } from 'next/headers';

type Theme = 'light' | 'dark';

const useServerDarkMode = async (defaultTheme: Theme = 'dark') => {
	const cookiesStore = await cookies();

	return cookiesStore.get('theme')?.value ?? defaultTheme;
};

export default useServerDarkMode;
