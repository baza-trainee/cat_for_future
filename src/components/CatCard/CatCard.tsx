import React, { useState } from 'react';
import { useMediaQuery } from 'src/hooks/useMediaQuery';
import Button from '../Button/Button';
import ImageCatCard from './ImageCatCard/ImageCatCard';
import ImageSlider from './ImageSlider/ImageSlider';

import lockIcon from 'src/assets/icons/cat_card/lock.svg';
import homeIcon from 'src/assets/icons/cat_card/home.svg';
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
	const { isMobile } = useMediaQuery();

	//temporary for testing
	const [isBooked, setIsBooked] = useState(true);
	const [inFavorite, setInFavorite] = useState(false);
	const handleBookedClick = () => {
		setIsBooked((prev) => !prev);
	};
	const handleAddToFavoriteClick = () => {
		setInFavorite((prev) => !prev);
	};

	return (
		<div className={s.wrapper}>
			<div className={s.images}>
				{isMobile ? (
					<ImageSlider slides={photos} slideStyle={slideStyle} />
				) : (
					<ImageCatCard photo={photo} />
				)}
				<div className={s.favoriteBtnContainer}>
					<Button
						buttonClasses={'primaryBtn'}
						onClick={handleAddToFavoriteClick}
						styleBtn={favoriteBtnStyle}
						children={
							<HeartIcon className={clsx(s.heartFavoriteBtn, inFavorite && s.inFavorite)} />
						}
					/>
				</div>
			</div>
			<div className={s.content}>
				<div className={s.header}>
					<h2 className={s.name}>Кокос</h2>
					<div className={s.status}>
						<img className={s.statusIcon} src={isBooked ? lockIcon : homeIcon} alt="" />
						<span className={s.statusText}>{isBooked ? 'Заброньований' : 'Шукаю дім'}</span>
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
					onClick={handleBookedClick}
					styleBtn={btnStyle}
					children={<HeartIcon className={s.heartIconBtn} />}
				/>
			</div>
		</div>
	);
};

export default CatCard;
