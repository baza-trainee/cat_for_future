import React from 'react';
import { useMediaQuery } from 'src/hooks/useMediaQuery';
import Button from '../Button/Button';
import ImageCatCard from './ImageCatCard/ImageCatCard';
import SwiperCatCard from './Swiper/SwiperCatCard';

import lockIcon from 'src/assets/icons/cat_card/lock.svg';
//import homeIcon from 'src/assets/icons/cat_card/home.svg';
import { ReactComponent as HeartIcon } from 'src/assets/icons/cat_card/heart.svg';

import { cats } from 'src/data/cats.temp';

import { ICat } from 'src/data/cats.temp';
import s from './CatCard.module.scss';
import clsx from 'clsx';

const btnStyle = {
	width: '100%',
	gap: '.37rem',
};

const favoriteBtnStyle = {
	backgroundColor: 'rgba(255, 255, 255, 0.9)',
	width: '2.875rem',
	height: '2.875rem',
	borderRadius: '50%',
	padding: '.75rem',
	cursor: 'pointer',
};
const slideStyle = {
	width: '100%',
	height: '22.875rem',
	position: 'relative',
	paddingTop: '2.5rem',
} as React.CSSProperties;

interface CatCardProps extends ICat {}
const photo = cats[0].photos[0];
const photos = cats[0].photos;

const CatCard: React.FC<CatCardProps> = () => {
	const { isMobile, isTablet } = useMediaQuery();

	return (
		<div className={s.wrapper}>
			<div className={s.images}>
				{isMobile ? (
					<SwiperCatCard slides={photos} slideStyle={slideStyle} />
				) : (
					<ImageCatCard photo={photo} />
				)}
				<div className={clsx(s.favoriteBtnContainer, isTablet && s.favoriteBtnTablet)}>
					<Button
						buttonClasses={'primaryBtn'}
						onClick={() => console.log('add to favorite')}
						styleBtn={favoriteBtnStyle}
						children={<HeartIcon className={s.heartFavoriteBtn} />}
					/>
				</div>
			</div>
			<div className={s.content}>
				<div className={s.header}>
					<h2 className={s.name}>Кокос</h2>
					<div className={s.status}>
						<img className={s.statusIcon} src={lockIcon} alt="" />
						<span className={s.statusText}>Заброньований</span>
					</div>
				</div>
				<span className={s.id}>ID: 287</span>
				<div className={s.about}>хлопчик, 2 місяці</div>
				<span className={s.birthday}>День народження: 28.08.2023 </span>
			</div>
			<div className={s.buttonContainer}>
				<Button
					buttonClasses={'primaryBtn'}
					name="Забронювати"
					onClick={() => console.log('Клік Забронювати')}
					styleBtn={btnStyle}
					children={<HeartIcon className={s.heartIconBtn} />}
				/>
			</div>
		</div>
	);
};

export default CatCard;
