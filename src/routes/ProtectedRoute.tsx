import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useActions } from 'src/hooks/useActions.ts';
import { useGetUserQuery } from 'src/store/slice/userApiSlice.ts';

const ProtectedRoute = ({ page }: { page: 'admin' | 'account' }) => {
	const { showLoginAdmin, showLogin } = useActions();
	const [isFetch, setIsFetch] = useState(false);
	const { data: user } = useGetUserQuery(undefined, { skip: !isFetch });

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setIsFetch(true);
			if (page === 'admin') {
				if (user && user.is_superuser === true) {
					showLoginAdmin(false);
				} else {
					showLoginAdmin(true);
				}
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
	}, [user, page, showLoginAdmin, showLogin]);

	return <Outlet />;
};

export default ProtectedRoute;
