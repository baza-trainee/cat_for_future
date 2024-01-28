import { FC } from 'react';
import s from './CatPhotosItem.module.scss';

interface CatPhotosItemProps {
	photos: { id: number; media_path: string }[];
	className?: string;
	id: number;
}

const CatPhotosItem: FC<CatPhotosItemProps> = ({ photos }) => {
	return (
		<div className={s.wrapper}>
			{photos.map((photo) => (
				<img src={photo.media_path} alt="Kitten photo" className={s.img} key={photo.id} />
			))}
		</div>
	);
};

export default CatPhotosItem;
