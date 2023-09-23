import React from 'react';
import s from './ButtonBack.module.scss';
import BackIcon from 'src/assets/icons/account/arrow-left.svg';
import { useNavigate } from 'react-router';

const ButtonBack: React.FC = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<button className={s.back} onClick={handleGoBack}>
			<img src={BackIcon} alt="Back" />
			<p>Повернутись</p>
		</button>
	);
};

export default ButtonBack;
