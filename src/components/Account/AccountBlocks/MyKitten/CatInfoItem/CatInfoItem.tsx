import { FC } from 'react';
import Button from 'src/components/Button/Button';
import ImageCatCard from 'src/components/CatCard/ImageCatCard/ImageCatCard';
import CatPhotosItem from '../CatPhotosItem/CatPhotosItem';
import Slider from 'src/components/Slider/Slider';
import useMediaQuery from 'src/hooks/useMediaQuery';
import { ICat } from 'src/types/ICat';
import { pluralize } from 'src/utils/pluralize';
import s from './CatInfoItem.module.scss';

interface CatInfoItemProps extends ICat {}

const primaryBtnStyle = {
	width: '100%',
};

const CatInfoItem: FC<CatInfoItemProps> = ({ id, sex, name, age, birthday, photos }) => {
	const { isTablet } = useMediaQuery();
	const { isDesktop } = useMediaQuery();

	return (
		<div className={s.kittenItem}>
			<h2 className={s.kittenTitle}>Привіт, я твоє кошеня {name} </h2>

			<div className={s.kittenDescrBody}>
				<div className={s.kittenId}>ID: {id}</div>
				<div className={s.kittenAge}>
					{sex === 'male' ? 'Кіт' : 'Кішка'}, {age} {pluralize(age, 'місяц')}
				</div>
				<div className={s.kittenBirthday}>Дата народження: {birthday}</div>
			</div>

			<div className={s.timerBlock}>
				<h3 className={s.timerTitle}>Я поїду додому через</h3>
				<div className={s.timerWrapper}>
					<div className={s.timerUnit}>
						<div className={s.timerNum}>0</div>
						<div className={s.timerNum}>0</div>
						<div className={s.timerNoun}>днів</div>
					</div>

					<div className={s.timerUnit}>
						<div className={s.timerNum}>0</div>
						<div className={s.timerNum}>0</div>
						<div className={s.timerNoun}>годин</div>
					</div>

					<div className={s.timerUnit}>
						<div className={s.timerNum}>0</div>
						<div className={s.timerNum}>0</div>
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
