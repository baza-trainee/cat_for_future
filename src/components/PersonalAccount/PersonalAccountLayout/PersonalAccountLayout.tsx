import React from 'react';
import s from './PersonalAccountLayout.module.scss';
import { Outlet } from 'react-router';
import ButtonBack from './ButtonBack/ButtonBack';
import PersonalAccountMenu from './PersonalAccountMenu/PersonalAccountMenu';

const PersonalAccountLayout: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.backBtn}>
				<ButtonBack />
			</div>
			<title className={s.title}>Особистий кабінет</title>
			<PersonalAccountMenu />
			<Outlet />
		</div>
	);
};

export default PersonalAccountLayout;
