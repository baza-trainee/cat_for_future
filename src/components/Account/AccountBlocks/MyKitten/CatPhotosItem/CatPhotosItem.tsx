import { FC } from 'react';
import s from './CatPhotosItem.module.scss';

interface CatPhotosItemProps {
	photos: string[];
	className?: string;
}

const CatPhotosItem: FC<CatPhotosItemProps> = ({ photos }) => {
	return (
		<div className={s.wrapper}>
			{photos.map((photo) => (
				<img src={photo} alt="Kitten photo" className={s.img} />
			))}
		</div>
	);
};

export default CatPhotosItem;
