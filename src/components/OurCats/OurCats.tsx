import React, { useEffect, useState } from 'react';
import useMediaQuery from 'src/hooks/useMediaQuery';

import Button from '../Button/Button';
import CatCard from '../CatCard/CatCard';
import ModalShowCat from '../CatCard/ModalShowCat/ModalShowCat';

import { cats } from 'src/data/cats.temp';
import s from './OurCats.module.scss';

const OurCats: React.FC = () => {
	const { isTablet, isDesktop } = useMediaQuery();
	const [catsData, setCatsData] = useState(cats);
	const [isShowMore, setIsShowMore] = useState(false);
	const [isModalCatID, setIsModalCatID] = useState<number>();
	const [isCatModalOpen, setIsCatModalOpen] = useState(false);

	useEffect(() => {
		!isTablet && !isShowMore ? setCatsData(cats?.slice(0, 3)) : setCatsData(cats);
	}, [isTablet, isShowMore]);

	const handleShowMoreClick = () => {
		setIsShowMore(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};
	const openModal = () => {
		setIsModalOpen(true);
	};
	const onCatCardClick = (id: number) => {
		setIsModalCatID(id);
		openModal();
	};

	return (
		<section id="ourCats" className={s.wrapper}>
			<h2 className={s.title}>Наші кошенята</h2>
			<div className={s.cats}>
				{catsData.map((cat) => (
					<CatCard key={cat.id} {...cat} onCatCardClick={onCatCardClick} />
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
			{isCatModalOpen &&
				catsData
					.filter((item) => item.id === isModalCatID)
					.map((cat) => (
						<ModalShowCat
							key={cat.id}
							closeModal={closeModal}
							children={
								<CatCard
									setIsModalOpen={setIsCatModalOpen}
									variant={isDesktop ? 'desktopModal' : 'tabletModal'}
									{...cat}
								/>
							}
							variant={isDesktop ? 'desktopModal' : 'tabletModal'}
						/>
					))}
		</section>
	);
};

export default OurCats;
