import React from 'react';
import s from './Menu.module.scss';
import { Link } from 'react-router-dom';

interface INavLink {
	name: string;
	to: string;
}
interface IMenuProps {
	class_name?: string;
}

const navLinks: INavLink[] = [
	{
		name: 'Перегляд кошенят',
		to: '/kittens',
	},
	{
		name: 'Щасливі історії',
		to: '/happy-stories',
	},
	{
		name: 'Контакти',
		to: '/contacts',
	},
];

const Menu: React.FC<IMenuProps> = ({ class_name }) => {
	return (
		<nav className={[s.menu, class_name && s[class_name]].join(' ')}>
			<ul className={s.list}>
				{navLinks.map((link) => (
					<li className={s.item} key={link.name}>
						<Link className={s.link} to={link.to}>
							{link.name}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Menu;
