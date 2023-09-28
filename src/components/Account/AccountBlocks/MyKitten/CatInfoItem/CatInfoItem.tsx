import { FC, useState } from 'react';
import Button from 'src/components/Button/Button';
import ImageCatCard from 'src/components/CatCard/ImageCatCard/ImageCatCard';
import CatPhotosItem from '../CatPhotosItem/CatPhotosItem';
import Slider from 'src/components/Slider/Slider';
import useMediaQuery from 'src/hooks/useMediaQuery';
import { ICat } from 'src/types/ICat';
import { pluralize } from 'src/utils/pluralize';
import useCountdownTimer from 'src/hooks/useCountdownTimer';
import { getDeadlineDate } from 'src/utils/getDeadlineDate';
import s from './CatInfoItem.module.scss';

interface CatInfoItemProps extends ICat {}

const primaryBtnStyle = {
	width: '100%',
};

const CatInfoItem: FC<CatInfoItemProps> = ({ id, sex, name, age, birthday, photos }) => {
	const [currentDate] = useState(Date.now());
	const { isTablet } = useMediaQuery();
	const { isDesktop } = useMediaQuery();

	// birthday example 20.08.2023
	// date example "2023-12-31T23:59:59"
	const { days, hours, minutes } = useCountdownTimer(getDeadlineDate(birthday, currentDate));

	const arrCorrectDate = [days, hours, minutes].map((item) =>
		item < 10 ? `0${item}` : item.toString()
	);
	const [correctDays, correctHours, correctMinutes] = arrCorrectDate;

	return (
		<div className={s.kittenItem}>
			<h2 className={s.kittenTitle}>Привіт, я твоє кошеня {name}</h2>

			<div className={s.kittenDescrBody}>
				<div className={s.kittenId}>ID: {id}</div>
				<div className={s.kittenAge}>
					{sex === 'male' ? 'Кіт' : 'Кішка'}, {age} {pluralize(age, 'місяц')}
				</div>
				<div className={s.kittenBirthday}>Дата народження: {birthday} </div>
			</div>

			<div className={s.timerBlock}>
				<h3 className={s.timerTitle}>Я поїду додому через</h3>
				<div className={s.timerWrapper}>
					<div className={s.timerUnit}>
						<div className={s.timerNum}>{correctDays[0]}</div>
						<div className={s.timerNum}>{correctDays[1]}</div>
						<div className={s.timerNoun}>{pluralize(Number(correctDays), 'дн')}</div>
					</div>

					<div className={s.timerUnit}>
						<div className={s.timerNum}>{correctHours[0]}</div>
						<div className={s.timerNum}>{correctHours[1]}</div>
						<div className={s.timerNoun}>годин</div>
					</div>

					<div className={s.timerUnit}>
						<div className={s.timerNum}>{correctMinutes[0]}</div>
						<div className={s.timerNum}>{correctMinutes[1]}</div>
						<div className={s.timerNoun}>хвилин</div>
					</div>
				</div>
			</div>

			<div className={s.sliderBlock}>
				{isDesktop ? (
					<Slider slidesPerView={2} spaceBetween={4} slidesPerGroup={1}>
						{photos?.map((photo, index) => <ImageCatCard key={index} photo={photo} />)}
					</Slider>
				) : isTablet ? (
					<CatPhotosItem photos={photos} />
				) : (
					<Slider slidesPerView={1} spaceBetween={4} slidesPerGroup={1}>
						{photos?.map((photo, index) => <ImageCatCard key={index} photo={photo} />)}
					</Slider>
				)}
			</div>

			<div className={s.btnWrapper}>
				<Button
					name="Скасувати бронь"
					buttonClasses={'primaryBtn'}
					type={'button'}
					styleBtn={primaryBtnStyle}
				/>
			</div>
		</div>
	);
};

export default CatInfoItem;
