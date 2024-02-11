import React from 'react';
import s from './RegPageIndex.module.scss';
import RegistrationPage from 'src/pages/RegistrationPage/Form/RegistrationPage';

const RegPage: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<main className={s.main}>
				<RegistrationPage />
			</main>
		</div>
	);
};

export default RegPage;
