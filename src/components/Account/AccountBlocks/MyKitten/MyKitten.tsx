import React from 'react';
import Button from 'src/components/Button/Button';
import s from './MyKitten.module.scss';

const MyKitten: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.kittensList}>
				<div className={s.kittenItem}>
					<h2 className={s.kittenTitle}>Привіт, я твоє кошеня Кокос </h2>

					<div className={s.kittenDescrBody}>
						<div className={s.kittenId}>ID: 28</div>
						<div className={s.kittenAge}>Кіт, 2 місяці</div>
						<div className={s.kittenBirthday}>Дата народження: 28.08.2023</div>
					</div>

					<div className={s.timerBlock}>
						<h3>Я поїду додому через</h3>
						<div className={s.timerWrapper}>
							<div className={s.timerUnit}>
								<div className={s.timerNum}></div>
								<div className={s.timerNum}></div>
								<div>днів</div>
							</div>

							<div className={s.timerUnit}>
								<div className={s.timerNum}></div>
								<div className={s.timerNum}></div>
								<div>годин</div>
							</div>

							<div className={s.timerUnit}>
								<div className={s.timerNum}></div>
								<div className={s.timerNum}></div>
								<div>хвилин</div>
							</div>
						</div>
					</div>

					<div className={s.sliderBlock}>Slider</div>

					<div className={s.btnWrapper}>
						<Button name="Скасувати бронь" buttonClasses={'primaryBtn'} type={'button'} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyKitten;
