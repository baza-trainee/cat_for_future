import React from 'react';
import s from './Menu.module.scss';
import { Link } from 'react-router-dom';

interface INavLink {
	name: string;
	to: string;
}
interface IMenuProps {
	classes?: string;
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

const Menu: React.FC<IMenuProps> = ({ classes }) => {
	return (
		<nav className={s.menu}>
			<ul className={[s.list, classes && s[classes]].join(' ')}>
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
