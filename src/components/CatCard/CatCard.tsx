import React from 'react';
import Button from '../Button/Button';
import s from './CatCard.module.scss';

import cat from 'src/assets/images/cats/cat_1.jpg';
import lockIcon from 'src/assets/icons/cat_card/lock.svg';
//import homeIcon from 'src/assets/icons/cat_card/home.svg';
import heartIcon from 'src/assets/icons/cat_card/heart.svg';

const btnStyle = {
	width: '100%',
	gap: '.37rem',
};

const CatCard: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.image}>
				<img src={cat} alt="cat_name" />
			</div>
			<div className={s.content}>
				<div className={s.header}>
					<h2 className={s.name}>Кокос</h2>
					<div className={s.status}>
						<img className={s.statusIcon} src={lockIcon} alt="" />
						<span className={s.statusText}>Заброньований</span>
					</div>
				</div>
				<span className={s.id}>ID: 287</span>
				<div className={s.about}>хлопчик, 2 місяці</div>
				<span className={s.birthday}>День народження: 28.08.2023 </span>
			</div>
			<div className={s.buttonContainer}>
				<Button
					buttonClasses={'primaryBtn'}
					imgPath={heartIcon}
					type="button"
					name="Забронювати"
					onClick={() => console.log('Клік Забронювати')}
					imgClasses={'catCardIcon'}
					styleBtn={btnStyle}
				/>
			</div>
		</div>
	);
};

export default CatCard;
