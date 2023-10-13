import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
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
	loop?: boolean;
	centeredSlides?: boolean;
	centeredSlidesBounds?: boolean;
	pagination?: { clickable: boolean };
	slideStyle?: React.CSSProperties;
	children: React.ReactNode[];
	onSlideChange?: () => void;
}

const Slider: React.FC<ImageSliderProps> = ({
	className,
	slidesPerView,
	spaceBetween,
	slidesPerGroup,
	centeredSlides = true,
	centeredSlidesBounds = true,
	pagination = true,
	loop,
	children,
	slideStyle,
	onSlideChange,
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
				centeredSlides={centeredSlides}
				centeredSlidesBounds={centeredSlidesBounds}
				slidesPerGroup={slidesPerGroup}
				modules={[Navigation, Pagination]}
				pagination={pagination}
				grabCursor
				speed={300}
				style={{ width: '100%', height: '100%' }}
				onSlideChange={onSlideChange}
				loop={loop}
			>
				{children.map((slide, index) => (
					<SwiperSlide key={index} style={slideStyle}>
						{slide}
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

export default Slider;
