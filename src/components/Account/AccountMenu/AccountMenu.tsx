import React from 'react';

import s from './AccountMenu.module.scss';

import AccountMenuItem from './AcountMenuItem/AccountMenuItem';
import menu from './ConstAccountMenu';

const AccountMenu: React.FC = () => {
	return (
		<nav>
			<ul className={s.wrapper}>
				{menu.map((item) => (
					<AccountMenuItem key={item.id} {...item} />
				))}
			</ul>
		</nav>
	);
};

export default AccountMenu;
