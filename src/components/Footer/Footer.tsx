import React from 'react';
import Logotype from 'src/components/Logotype/Logotype';
import Contacts from 'src/components/Contacts/Contacts';

import s from 'src/components/Footer/Footer.module.scss';
import FooterNavMenu from 'src/components/FooterNavMenu/FooterNavMenu';

const Footer: React.FC = () => {
	return (
		<footer>
			<div className={s.container}>
				<div className={s.mainContentContainer}>
					<Logotype />

					<div className={s.navContactsContainer}>
						<FooterNavMenu documents={true} navClass={'footerMenu'} />

						<Contacts />
					</div>
				</div>

				<div className={s.rights}>Розробка Baza Trainee Ukraine 2023 © Усі права захищені</div>
			</div>
		</footer>
	);
};

export default Footer;
