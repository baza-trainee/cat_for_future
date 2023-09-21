import { useMediaQuery as useQuery } from 'react-responsive';

export const useMediaQuery = () => {
	const isTablet = useQuery({ query: '(min-width: 768px)' });
	const isDesktop = useQuery({ query: '(min-width: 1280px)' });
	return {
		isTablet,
		isDesktop,
	};
};

export default useMediaQuery;
