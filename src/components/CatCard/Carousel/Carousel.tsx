import React, { useState } from 'react';
import s from './Carousel.module.scss';
import ImageCatCard from '../ImageCatCard/ImageCatCard';
import clsx from 'clsx';

interface CarouselProps {
	photos: string[];
}

const Carousel: React.FC<CarouselProps> = ({ photos }) => {
	const [sliderData, setSliderData] = useState<string>(photos[0]);

	const handleImageClick = (index: number) => {
		console.log(index);
		const slider = photos[index];
		setSliderData(slider);
	};

	return (
		<div className={s.wrapper}>
			<div className={s.selectedImage}>
				<img src={sliderData} alt="slider image" />
			</div>
			<div className={s.imagesRow}>
				{photos.map((photo, index) => (
					<div key={index} className={clsx(s.image, photo === sliderData && s.selected )}>
						<img src={photo} onClick={() => handleImageClick(index)} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Carousel;
