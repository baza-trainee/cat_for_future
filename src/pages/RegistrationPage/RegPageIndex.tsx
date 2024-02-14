import React, { useEffect } from 'react';
import s from './RegPageIndex.module.scss';
import RegistrationPage from 'src/pages/RegistrationPage/Form/RegistrationPage';

const RegPage: React.FC = () => {
	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, []);

	return (
		<div className={s.wrapper}>
			<main className={s.main}>
				<RegistrationPage />
			</main>
		</div>
	);
};

export default RegPage;
