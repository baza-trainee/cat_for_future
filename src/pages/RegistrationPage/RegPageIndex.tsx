import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import s from './RegPageIndex.module.scss';
import Header from 'src/components/Header/Header';
import Login from 'src/components/Login/Login';
import ModalDonate from 'src/components/ModalDonate/ModalDonate';
import Footer from 'src/components/Footer/Footer';

import image from 'src/assets/images/modal/thanks-reg.png';

import RegistrationPage from 'src/pages/RegistrationPage/Form/RegistrationPage';
import ModalWhiteCat from 'src/components/ModalWhiteCat/ModalWhiteCat';
import { useLoginMutation } from 'src/store/slice/authApiSlice.ts';
import { useTypedSelector } from 'src/hooks/useTypedSelectors.ts';

const RegPage: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isModalWhiteCatOpen, setIsModalWhiteCatOpen] = useState<boolean>(false);
	const [login] = useLoginMutation();
	const { email, password } = useTypedSelector((state) => state.setUserData.user);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setIsModalWhiteCatOpen(false);
	};

	const onOpenModalWhiteCat = () => {
		setIsModalWhiteCatOpen(true);
	};

	const navigate = useNavigate();

	const handleNavBtn = async () => {
		const formData = new FormData();
		formData.append('username', email);
		formData.append('password', password);
		const userToken = await login(formData).unwrap();
		localStorage.setItem('token', userToken.access_token);
		navigate('/account/');
	};

	return (
		<div className={s.wrapper}>
			{isModalOpen && <ModalDonate status={isModalOpen} onClose={closeModal} />}
			<Login />
			<Header onOpenModalDonate={openModal} />
			{isModalWhiteCatOpen && (
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
			<Footer />
		</div>
	);
};

export default RegPage;
