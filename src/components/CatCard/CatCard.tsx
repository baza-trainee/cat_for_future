import React, { useState } from 'react';
import { useMediaQuery } from 'src/hooks/useMediaQuery';

import ImageCatCard from './ImageCatCard/ImageCatCard';
import ModalWhiteCat from '../ModalWhiteCat/ModalWhiteCat';
import Button from '../Button/Button';
import Carousel from './Carousel/Carousel';
import Slider from '../Slider/Slider';

import { pluralize } from 'src/utils/pluralize';
import clsx from 'clsx';

import { ICat } from 'src/types/ICat';

import { ReactComponent as HeartIcon } from 'src/assets/icons/cat_card/heart.svg';
import { ReactComponent as LockIcon } from 'src/assets/icons/cat_card/lock.svg';
import lockIcon from 'src/assets/icons/cat_card/lock.svg';
import homeIcon from 'src/assets/icons/cat_card/home.svg';

import s from './CatCard.module.scss';
import { getDeadlineAndBirthDate } from 'src/utils/getDeadlineAndBirthDate';

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
	isSuccess: boolean;
}

const correctCatAgeInMonth = (catAge: number): string => {
	return catAge < 1 ? 'менше 1 місяця' : `${catAge} ${pluralize(catAge, 'місяц')}`;
};

const CatCard: React.FC<CatCardProps> = (props) => {
	const {
		id,
		name,
		is_male,
		date_of_birth,
		photos,
		variant,
		slideStyle,
		onBookedClick,
		onCatCardClick,
		is_reserved,
		setIsCatModalOpen,
		isSuccess,
	} = props;
	const { isTablet } = useMediaQuery();
	const tabletModal = variant === 'tabletModal';
	const desktopModal = variant === 'desktopModal';
	const [showThanksModal, setShowThanksModal] = useState(false);

	const [currentDate] = useState(Date.now());
	const catAge = getDeadlineAndBirthDate(date_of_birth, currentDate).getCatAge();
	const formattedDate = date_of_birth.replace(/-/g, '.').split('.').reverse().join('.');

	const handleThanksModalClose = () => {
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
						<ImageCatCard photo={photos[0].media_path} />
					) : !isTablet || (isTablet && tabletModal) ? (
						<Slider
							slidesPerView={tabletModal ? 1.148 : 1}
							spaceBetween={tabletModal ? 12 : 4}
							slidesPerGroup={1}
							slideStyle={slideStyle}
							loop={tabletModal}
							pagination={{ clickable: true }}
							className={tabletModal ? 'inTabletModal' : ''}
						>
							{photos?.map((photo, index) => <ImageCatCard key={index} photo={photo.media_path} />)}
						</Slider>
					) : (
						<Carousel photos={photos} />
					)}
				</div>
				<div className={s.modWrapper}>
					<div className={s.content}>
						<div className={s.header}>
							<h2 className={s.name}>{name}</h2>
							<div className={s.status}>
								<img
									className={s.statusIcon}
									src={is_reserved ? lockIcon : homeIcon}
									alt="booking_status"
								/>
								<span className={s.statusText}>{is_reserved ? 'Заброньований' : 'Шукаю дім'}</span>
							</div>
						</div>
						<div className={s.about}>
							{is_male ? 'Кіт' : 'Кішка'}, {correctCatAgeInMonth(catAge)}
						</div>
						<span className={s.birthday}>День народження: {formattedDate} </span>
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
							name={is_reserved ? 'Заброньований' : 'Забронювати'}
							onClick={() => handleBookedClick(id)}
							styleBtn={btnStyle}
							children={is_reserved ? <LockIcon /> : <HeartIcon className={s.heartIconBtn} />}
							disabled={is_reserved}
						/>
					</div>
				</div>
			</div>
			{showThanksModal && isSuccess && (
				<div onClick={(e) => e.stopPropagation()} className={s.thanksModalWrap}>
					<ModalWhiteCat
						handleCloseModal={handleThanksModalClose}
						image={photos[0].media_path}
						message="Дякуємо! Кошеня успішно заброньоване"
						name="На Головну"
						handleNavBtn={handleThanksModalClose}
					/>
				</div>
			)}
		</>
	);
};

export default CatCard;
