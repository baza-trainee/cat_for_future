import { FC, useState } from 'react';
import Button from 'src/components/Button/Button';
import ImageCatCard from 'src/components/CatCard/ImageCatCard/ImageCatCard';
import CatPhotosItem from '../CatPhotosItem/CatPhotosItem';
import Slider from 'src/components/Slider/Slider';
import useMediaQuery from 'src/hooks/useMediaQuery';
import { ICat } from 'src/types/ICat';
import { pluralize } from 'src/utils/pluralize';
import useCountdownTimer from 'src/hooks/useCountdownTimer';
import { getDeadlineAndBirthDate } from 'src/utils/getDeadlineAndBirthDate';
import Timer from 'src/components/Timer/Timer';
import s from './CatInfoItem.module.scss';

interface CatInfoItemProps extends ICat {
	handleCancelReservID: (id: number) => void;
}

const primaryBtnStyle = {
	width: '100%',
};

const CatInfoItem: FC<CatInfoItemProps> = ({
	id,
	is_male,
	date_of_birth,
	name,
	photos,
	handleCancelReservID,
}) => {
	const [currentDate] = useState(Date.now());
	const { isTablet, isDesktop } = useMediaQuery();

	const deadlineDate = getDeadlineAndBirthDate(date_of_birth, currentDate).date;
	const catAge = getDeadlineAndBirthDate(date_of_birth, currentDate).getCatAge();
	const correctCatAgeInMonth = (ageNumber: number) => {
		return ageNumber < 1 ? 'менше 1 місяця' : `${ageNumber} ${pluralize(ageNumber, 'місяц')}`;
	};
	const { days, hours, minutes, seconds } = useCountdownTimer(deadlineDate);
	const arrCorrectDate = [days, hours, minutes, seconds].map((item) =>
		item < 10 ? `00${item}` : item < 100 ? `0${item}` : item.toString()
	);

	const formattedDate = date_of_birth.replace(/-/g, '.').split('.').reverse().join('.');

	return (
		<div className={s.kittenItem}>
			<h2 className={s.kittenTitle}>Привіт, я твоє кошеня {name}</h2>

			<div className={s.kittenDescrBody}>
				<div className={s.kittenAge}>
					{is_male ? 'Кіт' : 'Кішка'}, {correctCatAgeInMonth(catAge)}
				</div>
				<div className={s.kittenBirthday}>Дата народження: {formattedDate} </div>
			</div>

			{getDeadlineAndBirthDate(date_of_birth, currentDate).lessFourMonths && days !== 0 ? (
				<Timer arrCorrectDate={arrCorrectDate} />
			) : null}

			<div className={s.sliderBlock}>
				{isDesktop ? (
					<Slider
						slidesPerView={2}
						spaceBetween={25}
						slidesPerGroup={1}
						centeredSlides={false}
						centeredSlidesBounds={false}
						className={'inDesktopMyKitten'}
						pagination={{ clickable: true }}
					>
						{photos?.map((photo) => <ImageCatCard key={photo.id} photo={photo.media_path} />)}
					</Slider>
				) : isTablet ? (
					<CatPhotosItem photos={photos} id={id} />
				) : (
					<Slider
						slidesPerView={1}
						spaceBetween={4}
						slidesPerGroup={1}
						centeredSlides={false}
						centeredSlidesBounds={false}
						className={'inMobileMyKitten'}
						pagination={{ clickable: true }}
					>
						{photos?.map((photo) => <ImageCatCard key={photo.id} photo={photo.media_path} />)}
					</Slider>
				)}
			</div>

			<div className={s.btnWrapper}>
				<Button
					name="Скасувати бронь"
					buttonClasses={'primaryBtn'}
					type={'button'}
					styleBtn={primaryBtnStyle}
					onClick={() => handleCancelReservID(id)}
				/>
			</div>
		</div>
	);
};

export default CatInfoItem;
