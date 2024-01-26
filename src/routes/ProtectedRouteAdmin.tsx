import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useActions } from 'src/hooks/useActions.ts';

const ProtectedRoute = ({ page }: { page: 'admin' | 'account' }) => {
	const { showLoginAdmin, showLogin } = useActions();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			if (page === 'admin') {
				showLoginAdmin(false);
			} else {
				showLogin(false);
			}
		} else {
			if (page === 'admin') {
				showLoginAdmin(true);
			} else {
				showLogin(true);
			}
		}
	}, [page, showLoginAdmin, showLogin]);

	return <Outlet />;
};

export default ProtectedRoute;
