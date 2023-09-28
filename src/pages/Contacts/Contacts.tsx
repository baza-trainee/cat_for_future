import React, { useState } from 'react';
import catPhoto from 'src/assets/images/modal/cat-donate.png';
import FeedbackForm from 'src/components/FeedbackForm/FeedbackForm';
import ContactsInfo from 'src/components/ContactsInfo/ContactsInfo';
import ModalWhiteCat from 'src/components/ModalWhiteCat/ModalWhiteCat';

import s from './Contacts.module.scss';
import { useNavigate } from 'react-router-dom';

const Contacts: React.FC = () => {
	const [showModal, setShowModal] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate('/');
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<>
			<div className={s.container}>
				<h1>Контакти</h1>

				<div className={s.contentContainer}>
					<FeedbackForm setShowModal={setShowModal} />

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

			{showModal && (
				<ModalWhiteCat
					image={catPhoto}
					handleNavBtn={handleNavigate}
					handleCloseModal={closeModal}
					name={'На Головну'}
					message={'Ваш запит успішно надіслано'}
				/>
			)}
		</>
	);
};

export default Contacts;
