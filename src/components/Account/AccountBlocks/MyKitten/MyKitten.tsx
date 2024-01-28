import React from 'react';
import CatInfoItem from './CatInfoItem/CatInfoItem';
import s from './MyKitten.module.scss';
import { useGetMyCatsQuery } from 'src/store/slice/userApiSlice';

const MyKitten: React.FC = () => {
	const { data: myCats = [] } = useGetMyCatsQuery('');

	return (
		<div className={s.wrapper}>
			<div className={s.kittensList}>
				{myCats.length > 0 && myCats.map((cat) => <CatInfoItem key={cat.id} {...cat} />)}
			</div>
		</div>
	);
};

export default MyKitten;
