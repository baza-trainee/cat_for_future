import React from 'react';
import Logotype from 'src/components/Logotype/Logotype';
import ContactsInfo from 'src/components/ContactsInfo/ContactsInfo';

import s from 'src/components/Footer/Footer.module.scss';
import Menu from 'src/components/Menu/Menu';

const Footer: React.FC = () => {
	return (
		<footer>
			<div className={s.container}>
				<div className={s.mainContentContainer}>
					<Logotype />

					<div className={s.navContactsContainer}>
						<Menu documents={true} navClass={'footerMenu'} />
						<ContactsInfo />
					</div>
				</div>

				<div className={s.rights}>Розробка Baza Trainee Ukraine 2024 © Усі права захищені</div>
			</div>
		</footer>
	);
};

export default Footer;
