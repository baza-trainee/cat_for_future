import React from 'react';
import useMediaQuery from 'src/hooks/useMediaQuery';

import Button from '../Button/Button';
import CatCard from '../CatCard/CatCard';

import { cats } from 'src/data/cats.temp';
import s from './OurCats.module.scss';

const OurCats = () => {
	const { isTablet } = useMediaQuery();

	return (
		<section className={s.wrapper}>
			<h2 className={s.title}>Наші кошенята</h2>
			<div className={s.cats}>
				{cats.map((cat) => (
					<CatCard key={cat.id} {...cat} />
				))}
			</div>
			{!isTablet && (
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
