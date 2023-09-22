import React from 'react';
import s from './ImageCatCard.module.scss';
import clsx from 'clsx';

interface ImageCatCardProps {
	photo: string;
	className?: string;
}

const ImageCatCard: React.FC<ImageCatCardProps> = ({ photo, className }) => {
	return (
		<>
			<img className={clsx(s.photo, className && s[className])} src={photo} alt="cat_name" />
		</>
	);
};

export default ImageCatCard;
