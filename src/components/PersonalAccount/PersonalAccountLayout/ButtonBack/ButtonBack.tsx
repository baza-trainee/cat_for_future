import React from 'react';
import s from './ButtonBack.module.scss';
import { ReactComponent as BackIcon } from 'src/assets/icons/arrow-left.svg';
import { useNavigate } from 'react-router';

const ButtonBack: React.FC = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<button className={s.back} onClick={handleGoBack}>
			<BackIcon />
			<p>Повернутись</p>
		</button>
	);
};

export default ButtonBack;
