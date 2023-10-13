import React, { useEffect, useState } from 'react';
import s from './Carousel.module.scss';
import clsx from 'clsx';

interface CarouselProps {
	photos: string[];
}

const swapArrayElements = function (arr: string[], indexA: number, indexB: number) {
	const temp = arr[indexA];
	arr[indexA] = arr[indexB];
	arr[indexB] = temp;
};

const Carousel: React.FC<CarouselProps> = ({ photos }) => {
	const [sliderData, setSliderData] = useState<string[]>(photos);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	useEffect(() => {
		const swapArray = [...sliderData];
		if (selectedIndex !== null) {
			swapArrayElements(swapArray, selectedIndex, 0);
		}
		setSliderData(swapArray);
		setSelectedIndex(null);
	}, [selectedIndex]);

	return (
		<div className={s.wrapper}>
			<div className={s.selectedImage}>
				<img src={sliderData[0]} alt="slider image" />
			</div>
			<div className={s.imagesRow}>
				{sliderData.map((photo, index) => (
					<div key={index} className={clsx(s.image, photo === sliderData[0] && s.selected)}>
						<img src={photo} onClick={() => setSelectedIndex(index)} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Carousel;
