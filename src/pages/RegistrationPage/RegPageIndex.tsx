import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import s from './RegPageIndex.module.scss';
import Header from 'src/components/Header/Header';
import Login from 'src/components/Login/Login';

import image from 'src/assets/images/modal/thanks-reg.png';

import RegistrationPage from 'src/pages/RegistrationPage/Form/RegistrationPage';
import ModalWhiteCat from 'src/components/ModalWhiteCat/ModalWhiteCat';

const RegPage: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoginWindOpen, setIsLoginWindOpen] = useState<boolean>(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const onOpenModalWhiteCat = () => {
		setIsModalOpen(true);
	};

	const navigate = useNavigate();

	const handleNavBtn = () => {
		navigate('/account/');
	};

	return (
		<div className={s.wrapper}>
			<Login onCloseLoginWindow={setIsLoginWindOpen} isLoginWindOpen={isLoginWindOpen} />
			<Header onOpenModalDonate={openModal} onOpenLoginWindow={setIsLoginWindOpen} />
			{isModalOpen && (
				<ModalWhiteCat
					image={image}
					message={'Реєстрація успішна!'}
					name={'Кабінет'}
					handleCloseModal={closeModal}
					handleNavBtn={handleNavBtn}
				/>
			)}
			<main className={s.main}>
				<RegistrationPage onOpenModalWhiteCat={onOpenModalWhiteCat} />
			</main>
		</div>
	);
};

export default RegPage;
