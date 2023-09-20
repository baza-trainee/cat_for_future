import React from 'react';
import s from './ImageCatCard.module.scss';

interface ImageCatCardProps {
	photo: string;
}

const ImageCatCard: React.FC<ImageCatCardProps> = ({ photo }) => {
	return (
		<>
			<img className={s.photo} src={photo} alt="cat_name" />
		</>
	);
};

export default ImageCatCard;
