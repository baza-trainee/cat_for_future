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
import Timer from 'src/components/Timer/Timer';
import s from './CatInfoItem.module.scss';

interface CatInfoItemProps extends ICat {}

const primaryBtnStyle = {
	width: '100%',
};

const CatInfoItem: FC<CatInfoItemProps> = ({ id, sex, name, age, birthday, photos }) => {
	const [currentDate] = useState(Date.now());
	const { isTablet } = useMediaQuery();
	const { isDesktop } = useMediaQuery();

	const { days, hours, minutes } = useCountdownTimer(getDeadlineDate(birthday, currentDate).date);

	const arrCorrectDate = [days, hours, minutes].map((item) =>
		item < 10 ? `0${item}` : item.toString()
	);

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

			{getDeadlineDate(birthday, currentDate).lessFourMonths ? (
				<Timer arrCorrectDate={arrCorrectDate} />
			) : null}

			<div className={s.sliderBlock}>
				{isDesktop ? (
					<Slider
						slidesPerView={2}
						spaceBetween={20}
						slidesPerGroup={1}
						centeredSlides={false}
						centeredSlidesBounds={false}
						className={'inDesktopMyKitten'}
					>
						{photos?.map((photo, index) => <ImageCatCard key={index} photo={photo} />)}
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
					>
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
