import React from 'react';
import CatInfoItem from './CatInfoItem/CatInfoItem';
import { cats } from 'src/data/cats.temp';
import s from './MyKitten.module.scss';

const MyKitten: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.kittensList}>
				{cats.map((cat) => (
					<CatInfoItem key={cat.id} {...cat} />
				))}
			</div>
		</div>
	);
};

export default MyKitten;
