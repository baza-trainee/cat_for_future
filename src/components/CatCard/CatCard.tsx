import React, { useState } from 'react';
import { useMediaQuery } from 'src/hooks/useMediaQuery';

import ImageCatCard from './ImageCatCard/ImageCatCard';
import Button from '../Button/Button';
import Carousel from './Carousel/Carousel';
import Slider from '../Slider/Slider';

import { pluralize } from 'src/utils/pluralize';
import clsx from 'clsx';

import { ICat } from 'src/types/ICat';

import { ReactComponent as HeartIcon } from 'src/assets/icons/cat_card/heart.svg';
import lockIcon from 'src/assets/icons/cat_card/lock.svg';
import homeIcon from 'src/assets/icons/cat_card/home.svg';

import s from './CatCard.module.scss';
import ModalWhiteCat from '../ModalWhiteCat/ModalWhiteCat';
import { useNavigate } from 'react-router';

const btnStyle = {
	width: '100%',
	gap: '.37rem',
};

interface CatCardProps extends ICat {
	onCatCardClick?: (id: number) => void;
	setIsCatModalOpen?: (boolean: boolean) => void;
	variant?: 'tabletModal' | 'desktopModal';
	slideStyle?: React.CSSProperties;
	onBookedClick: (id: number) => void;
}

const CatCard: React.FC<CatCardProps> = (props) => {
	const {
		id,
		name,
		age,
		sex,
		birthday,
		photos,
		onCatCardClick,
		variant,
		slideStyle,
		setIsCatModalOpen,
		onBookedClick,
		booking_status,
	} = props;
	const { isTablet } = useMediaQuery();
	const tabletModal = variant === 'tabletModal';
	const desktopModal = variant === 'desktopModal';
	const [showThanksModal, setShowThanksModal] = useState(false);

	const navigate = useNavigate();

	const navigateToHome = () => {
		navigate('/');
		setShowThanksModal(false);
		setIsCatModalOpen && setIsCatModalOpen(false);
	};

	//temporary for testing
	const handleBookedClick = (id: number) => {
		setShowThanksModal(true);
		onBookedClick(id);
	};

	return (
		<>
			<div
				style={!variant ? { cursor: 'pointer' } : undefined}
				onClick={isTablet && onCatCardClick ? () => onCatCardClick(id) : undefined}
				className={clsx(s.wrapper, tabletModal && s.tabletModal, desktopModal && s.desktopModal)}
			>
				<div className={s.images}>
					{isTablet && !variant ? (
						<ImageCatCard photo={photos[0]} />
					) : !isTablet || (isTablet && tabletModal) ? (
						<Slider
							slidesPerView={tabletModal ? 1.148 : 1}
							spaceBetween={tabletModal ? 12 : 4}
							slidesPerGroup={1}
							slideStyle={slideStyle}
							loop={tabletModal}
							className={tabletModal ? 'inTabletModal' : ''}
						>
							{photos?.map((photo, index) => <ImageCatCard key={index} photo={photo} />)}
						</Slider>
					) : (
						<Carousel photos={photos} />
					)}
					<div className={s.heartIconContainer}>
						<HeartIcon className={clsx(s.heartIcon, booking_status && s.isBooked)} />
					</div>
				</div>
				<div className={s.modWrapper}>
					<div className={s.content}>
						<div className={s.header}>
							<h2 className={s.name}>{name}</h2>
							<div className={s.status}>
								<img
									className={s.statusIcon}
									src={booking_status ? lockIcon : homeIcon}
									alt="booking_status"
								/>
								<span className={s.statusText}>
									{booking_status ? 'Заброньований' : 'Шукаю дім'}
								</span>
							</div>
						</div>
						<span className={s.id}>ID: {id}</span>
						<div className={s.about}>
							{sex === 'male' ? 'Кіт' : 'Кішка'}, {age} {pluralize(age, 'місяц')}
						</div>
						<span className={s.birthday}>День народження: {birthday} </span>
						{variant && (
							<p className={s.desc}>
								Грайливе та миле кошеня знаходиться у пошуку люблячого хазяїна якому подарує море
								радості та щастя.
							</p>
						)}
					</div>

					<div onClick={(e) => e.stopPropagation()} className={s.buttonContainer}>
						<Button
							buttonClasses={'primaryBtn'}
							name="Забронювати"
							onClick={() => handleBookedClick(id)}
							styleBtn={btnStyle}
							children={<HeartIcon className={s.heartIconBtn} />}
							disabled={booking_status}
						/>
					</div>
				</div>
			</div>
			{showThanksModal && (
				<div onClick={(e) => e.stopPropagation()} className={s.thanksModalWrap}>
					<ModalWhiteCat
						image={photos[0]}
						message="Дякуємо! Кошеня успішно заброньоване"
						name="На Головну"
						onClick={navigateToHome}
					/>
				</div>
			)}
		</>
	);
};

export default CatCard;
