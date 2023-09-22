import React, { useEffect, useState } from 'react';
import useMediaQuery from 'src/hooks/useMediaQuery';

import Button from '../Button/Button';
import CatCard from '../CatCard/CatCard';

import { cats } from 'src/data/cats.temp';
import s from './OurCats.module.scss';

const OurCats: React.FC = () => {
	const { isTablet } = useMediaQuery();
	const [catsData, setCatsData] = useState(cats);
	const [isShowMore, setIsShowMore] = useState(false);

	useEffect(() => {
		!isTablet && !isShowMore ? setCatsData(cats?.slice(0, 3)) : setCatsData(cats);
	}, [isTablet, isShowMore]);

	const handleShowMoreClick = () => {
		setIsShowMore(true);
	};

	return (
		<section className={s.wrapper}>
			<h2 className={s.title}>Наші кошенята</h2>
			<div className={s.cats}>
				{catsData.map((cat) => (
					<CatCard key={cat.id} {...cat} />
				))}
			</div>
			{!isTablet && catsData.length <= 3 && (
				<div className={s.btnContainer}>
					<Button
						onClick={handleShowMoreClick}
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
