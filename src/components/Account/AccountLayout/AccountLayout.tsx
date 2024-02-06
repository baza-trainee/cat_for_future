import React, { useEffect, useState } from 'react';

import s from './AccountLayout.module.scss';

import { Outlet } from 'react-router';
import ButtonBack from '../ButtonBack/ButtonBack';
import AccountMenu from '../AccountMenu/AccountMenu';
import { scrollOnTop } from 'src/utils/scrollToSection';
import { useGetUserQuery } from 'src/store/slice/userApiSlice';

interface IError {
	data: {
		detail: string;
	};
	status: number;
}
const AccountLayout: React.FC = () => {
	const [isToken, setIsToken] = useState(false);

	const { error } = useGetUserQuery('', {
		refetchOnMountOrArgChange: true,
	});

	const userError = error as IError;

	useEffect(() => {
		if (userError?.status === 401) {
			localStorage.removeItem('token');
			setIsToken(false);
		}
	}, [userError]);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setIsToken(true);
		}
	}, []);

	useEffect(() => {
		scrollOnTop();
	}, []);

	return (
		<div className={s.wrapper}>
			{isToken && (
				<>
					<div className={s.backBtn}>
						<ButtonBack />
					</div>
					<h2 className={s.title}>Особистий кабінет</h2>
					<div className={s.accountPanel}>
						<AccountMenu />
						<Outlet />
					</div>
				</>
			)}
		</div>
	);
};

export default AccountLayout;
