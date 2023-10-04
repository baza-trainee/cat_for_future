import React from 'react';
import s from './AccountMenuItem.module.scss';

import { Link, useMatch } from 'react-router-dom';
import { AccountMenuItemProps } from '../ConstAccountMenu';

const AccountMenuItem: React.FC<AccountMenuItemProps> = ({ name, to, icon, color }) => {
	const match = useMatch(to);
	console.log(match);
	const classLink = match ? `${s.link} ${s.active} ` : s.link;
	return (
		<li className={classLink} style={{ color: color }}>
			<Link to={to} className={s.menuItem}>
				{icon}
				{name}
			</Link>
		</li>
	);
};

export default AccountMenuItem;
