import React from 'react';

import { ReactComponent as Login } from 'src/assets/icons/header/log-in-icon.svg';
import { ReactComponent as Cat } from 'src/assets/icons/cat.svg';
import { ReactComponent as Setting } from 'src/assets/icons/settings.svg';
import { ReactComponent as Logout } from 'src/assets/icons/log-out.svg';
import { ReactComponent as Trash } from 'src/assets/icons/trash.svg';
import { Link } from 'react-router-dom';
interface PersonalAccountMenuItem {
	id: number;
	name: string;
	to: string;
	icon: React.ReactNode;
}

const PersonalAccountMenu: React.FC = () => {
	const menu: PersonalAccountMenuItem[] = [
		{ id: 1, name: 'Мої данні', to: 'my-data', icon: <Login /> },
		{ id: 2, name: 'Моє кошеня', to: 'my-kitten', icon: <Cat /> },
		{ id: 3, name: 'Змінити пароль', to: 'change-password', icon: <Setting /> },
		{ id: 4, name: 'Вихід', to: 'logout', icon: <Logout /> },
		{ id: 5, name: 'Видалити аккаунт', to: 'delete-account', icon: <Trash /> },
	];

	return menu.map(({ id, name, icon, to }) => (
		<Link key={id} to={to}>
			{icon}
			{name}
		</Link>
	));
};

export default PersonalAccountMenu;
