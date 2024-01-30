import React, { useEffect, useState } from 'react';
import s from './Carousel.module.scss';
import clsx from 'clsx';

interface IPhoto {
	id: number;
	media_path: string;
}
interface CarouselProps {
	photos: IPhoto[];
}

const Carousel: React.FC<CarouselProps> = ({ photos }) => {
	const [sliderData, setSliderData] = useState<IPhoto[]>(photos);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	useEffect(() => {
		if (selectedIndex !== null) {
			const newSliderData = [...sliderData];
			[newSliderData[0], newSliderData[selectedIndex]] = [
				newSliderData[selectedIndex],
				newSliderData[0],
			];
			setSliderData(newSliderData);
			setSelectedIndex(null);
		}
	}, [selectedIndex, sliderData]);

	return (
		<div className={s.wrapper}>
			<div className={s.selectedImage}>
				<img src={sliderData[0].media_path} alt="slider image" />
			</div>
			<div className={s.imagesRow}>
				{sliderData.map((photo, index) => (
					<div key={photo.id} className={clsx(s.image, photo === sliderData[0] && s.selected)}>
						<img src={photo.media_path} onClick={() => setSelectedIndex(index)} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Carousel;
