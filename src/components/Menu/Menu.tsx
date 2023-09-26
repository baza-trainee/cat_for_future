import React from 'react';
import s from './Menu.module.scss';
import { Link } from 'react-router-dom';

interface INavLink {
	name: string;
	to: string;
}
interface IMenuProps {
	documents?: boolean;
	navClass?: string;
	unListClass?: string;
	onClick?: () => void;
}

const navLinks: INavLink[] = [
	{
		name: 'Перегляд кошенят',
		to: '/#ourCats',
	},
	{
		name: 'Щасливі історії',
		to: '/#happyStories',
	},
	{
		name: 'Контакти',
		to: '/contacts',
	},
];

const docLinks: INavLink[] = [
	{
		name: 'Рекомендації по утриманню тварин',
		//no link yet
		to: '*',
	},
	{
		name: 'Політика конфіденційності',
		to: 'src/assets/documents/privacy-policy.pdf',
	},
	{
		name: 'Правила користування сайтом',
		to: 'src/assets/documents/rules-of-website.pdf',
	},
	{
		name: 'Звітність',
		//no link yet
		to: '*',
	},
];

const Menu: React.FC<IMenuProps> = ({ documents, unListClass, navClass, onClick }) => {
	return (
		<nav className={[s.menu, navClass && s[navClass]].join(' ')}>
			<ul className={[s.list, unListClass && s[unListClass]].join(' ')}>
				{navLinks.map((link) => (
					<li className={s.item} key={link.name}>
						<Link onClick={onClick} to={link.to}>
							{link.name}
						</Link>
					</li>
				))}

				{documents &&
					docLinks.map((link) => (
						<li className={s.item} key={link.name}>
							<Link target="_blank" onClick={onClick} className={s.docLink} to={link.to}>
								{link.name}
							</Link>
						</li>
					))}
			</ul>
		</nav>
	);
};

export default Menu;
