import { FC } from 'react';
import s from './CatPhotosItem.module.scss';

interface CatPhotosItemProps {
	photos: string[];
	className?: string;
	id: number;
}

const CatPhotosItem: FC<CatPhotosItemProps> = ({ photos }) => {
	return (
		<div className={s.wrapper}>
			{photos.map((photo) => (
				<img src={photo} alt="Kitten photo" className={s.img} key={`${photo}`} />
			))}
		</div>
	);
};

export default CatPhotosItem;
