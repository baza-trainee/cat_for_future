import { Fragment } from 'react';
import styles from 'src/components/Layout/AdminLayout/AdminLayout.module.scss';
import { NavLink } from 'react-router-dom';
import { Cat, Contact, Heart, Newspaper, ScrollText, UserRound } from 'lucide-react';

const navMenu = [
	{
		url: 'admin',
		anchor: 'Hero section',
		icon: <UserRound size={24} />,
	},
	{
		url: 'admin/cats',
		anchor: 'Кошенята',
		icon: <Cat size={24} />,
	},
	{
		url: 'admin/stories',
		anchor: 'Щасливі історії',
		icon: <Heart size={24} />,
	},
	{
		url: 'admin/documents',
		anchor: 'Звітність',
		icon: <ScrollText size={24} />,
	},
	{
		url: 'admin/instruction',
		anchor: 'Інструкція',
		icon: <Newspaper size={24} />,
	},
	{
		url: 'admin/contacts',
		anchor: 'Контакти',
		icon: <Contact size={24} />,
	},
];
const SideBar = () => {
	return (
		<div className={styles.sidebar}>
			<div className={styles.navWrapper}>
				<nav className={styles.nav}>
					{navMenu.map((link, index) => (
						<Fragment key={index}>
							<NavLink
								to={link.url}
								className={({ isActive }) =>
									isActive ? `${styles['nav-link']} ${styles.active}` : `${styles['nav-link']}  `
								}
								end
							>
								{link.icon}
								{link.anchor}
							</NavLink>
						</Fragment>
					))}
				</nav>
			</div>
		</div>
	);
};

export default SideBar;
