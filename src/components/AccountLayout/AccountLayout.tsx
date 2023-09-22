import React from 'react';

import s from './AccountLayout.module.scss';

import { Outlet } from 'react-router';
import ButtonBack from './ButtonBack/ButtonBack';
import AccountMenu from './AccountMenu/AccountMenu';

const AccountLayout: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.backBtn}>
				<ButtonBack />
			</div>
			<p className={s.title}>Особистий кабінет</p>
			<div className={s.containerPanel}>
				<div className={s.navMenu}>
					<AccountMenu />
				</div>
				<div className={s.acccountBlock}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AccountLayout;
