import { ReactComponent as Login } from 'src/assets/icons/account/user.svg';
import { ReactComponent as Cat } from 'src/assets/icons/account/cat.svg';
import { ReactComponent as Setting } from 'src/assets/icons/account/settings.svg';
import { ReactComponent as Logout } from 'src/assets/icons/account/log-out.svg';
import { ReactComponent as Trash } from 'src/assets/icons/account/trash.svg';

export interface AccountMenuItemProps {
	id: number;
	name: string;
	to: string;
	icon: React.ReactNode;
	color?: string;
	onClick?: () => void;
}

const menu: AccountMenuItemProps[] = [
	{ id: 1, name: 'Мої данні', to: '/account', icon: <Login /> },
	{ id: 2, name: 'Моє кошеня', to: '/account/my-kitten', icon: <Cat /> },
	{ id: 3, name: 'Змінити пароль', to: '/account/change-password', icon: <Setting /> },
	{ id: 4, name: 'Вихід', to: '/account/logout', icon: <Logout /> },
	{
		id: 5,
		name: 'Видалити акаунт',
		to: '/account/delete-account',
		icon: <Trash />,
		color: '#939393',
	},
];

export default menu;
