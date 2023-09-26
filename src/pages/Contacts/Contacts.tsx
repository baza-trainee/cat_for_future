import React from 'react';

import s from './Contacts.module.scss';
import FeedbackForm from 'src/components/FeedbackForm/FeedbackForm';
import ContactsInfo from 'src/components/ContactsInfo/ContactsInfo';

const Contacts: React.FC = () => {
	return (
		<div className={s.container}>
			<h1>Контакти</h1>

			<div className={s.contentContainer}>
				<FeedbackForm />

				<div className={s.contactsFrame}>
					<ContactsInfo
						type="contactsBurgerMenu"
						componentType="contactPage"
						styleContacts={{ flexDirection: 'column' }}
					/>
					<p>
						Наше відділення нової пошти для посилок
						<br />
						№ 280 м. Київ вул. Софії Русової 5
						<br />
						+380984500609
					</p>
				</div>
			</div>
		</div>
	);
};

export default Contacts;
