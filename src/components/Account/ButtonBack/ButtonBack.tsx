import React from 'react';

import s from './ButtonBack.module.scss';

import BackIcon from 'src/assets/icons/account/arrow-left.svg';
import { Link } from 'react-router-dom';

const ButtonBack: React.FC = () => (
	<Link to="/" className={s.back}>
		<img src={BackIcon} alt="Back" />
		<p>Повернутись</p>
	</Link>
);

export default ButtonBack;
