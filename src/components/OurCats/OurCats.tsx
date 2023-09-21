import React from 'react';
import s from './OurCats.module.scss';
import Button from '../Button/Button';
import useMediaQuery from 'src/hooks/useMediaQuery';

const OurCats = () => {
	const { isMobile } = useMediaQuery();

	return (
		<section className={s.wrapper}>
			<h2 className={s.title}>Наші кошенята</h2>
			<div className={s.cats}></div>
			{isMobile && (
				<div className={s.btnContainer}>
					<Button
						onClick={() => console.log('Показати більше')}
						name="Показати більше"
						buttonClasses={'secondaryBtn'}
						styleBtn={{ width: '100%' }}
					/>
				</div>
			)}
		</section>
	);
};

export default OurCats;
