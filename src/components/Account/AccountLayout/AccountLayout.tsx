import React from 'react';

import s from './AccountLayout.module.scss';

import { Outlet } from 'react-router';
import ButtonBack from '../ButtonBack/ButtonBack';
import AccountMenu from '../AccountMenu/AccountMenu';

const AccountLayout: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.backBtn}>
				<ButtonBack />
			</div>
			<h2 className={s.title}>Особистий кабінет</h2>
			<div className={s.accountPanel}>
				<AccountMenu />
				<Outlet />
			</div>
		</div>
	);
};

export default AccountLayout;
