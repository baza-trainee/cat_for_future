import React from 'react';
import { Swiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import clsx from 'clsx';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import s from './Slider.module.scss';

import { ReactComponent as Prev_arrow } from 'src/assets/icons/cat_card/arrow-left.svg';
import { ReactComponent as Next_arrow } from 'src/assets/icons/cat_card/arrow-right.svg';

interface ImageSliderProps {
	className?: string;
	slidesPerView: number;
	spaceBetween: number;
	slidesPerGroup: number;
	children: React.ReactNode[];
}

const Slider: React.FC<ImageSliderProps> = ({
	className,
	slidesPerView,
	spaceBetween,
	slidesPerGroup,
	children,
}) => {
	return (
		<div className={clsx(s.wrapper, className && s[className])}>
			<Swiper
				navigation={{
					prevEl: '.prevBtn',
					nextEl: '.nextBtn',
				}}
				slidesPerView={slidesPerView}
				spaceBetween={spaceBetween}
				centeredSlides
				centeredSlidesBounds
				slidesPerGroup={slidesPerGroup}
				modules={[Navigation, Pagination]}
				pagination={true}
				grabCursor
				speed={300}
				style={{ width: '100%', height: '100%' }}
			>
				{children}
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

export default Slider;
