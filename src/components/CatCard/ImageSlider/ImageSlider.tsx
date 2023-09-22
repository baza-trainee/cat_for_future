import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import clsx from 'clsx';

import ImageCatCard from '../ImageCatCard/ImageCatCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import s from './ImageSlider.module.scss';

import { ReactComponent as Prev_arrow } from 'src/assets/icons/cat_card/arrow-left.svg';
import { ReactComponent as Next_arrow } from 'src/assets/icons/cat_card/arrow-right.svg';

interface ImageSliderProps {
	slides: string[];
	className?: string;
	slideStyle?: React.CSSProperties;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ slides, className, slideStyle }) => {
	return (
		<div className={clsx(s.wrapper, className && s[className])}>
			<Swiper
				navigation={{
					prevEl: '.prevBtn',
					nextEl: '.nextBtn',
				}}
				slidesPerView={1}
				spaceBetween={4}
				centeredSlides
				centeredSlidesBounds
				slidesPerGroup={1}
				modules={[Navigation, Pagination]}
				pagination={true}
				grabCursor
				speed={300}
				style={{ width: '100%', height: '100%' }}
			>
				{slides?.map((item) => (
					<SwiperSlide key={item} style={slideStyle}>
						<ImageCatCard photo={item} />
					</SwiperSlide>
				))}
				<button style={{ cursor: 'pointer' }} className={'prevBtn'}>
					<Prev_arrow className={s.leftArrow} />
				</button>
				<button style={{ cursor: 'pointer' }} className={'nextBtn'}>
					<Next_arrow className={s.rightArrow} />
				</button>
			</Swiper>
		</div>
	);
};

export default ImageSlider;