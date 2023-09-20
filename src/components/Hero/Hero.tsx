import paw from '../../assets/icons/hero/paw.svg';
import Button from '../Button/Button';
import s from './Hero.module.scss';

const Hero: React.FC = () => {
	return (
		<div className={s.hero}>
			<div className={s.content}>
				<h2 className={s.contentTitle}>Подаруй дім для маленьких хвостиків</h2>
				<span className={s.contentText}>Вони чекають на тебе</span>
				<Button
					onClick={() => ''}
					name={'Знайти друга'}
					buttonClasses={'primaryBtn'}
					type={'submit'}
				/>
			</div>
			<div className={s.slogan}>
				<img className={s.sloganImg} src={paw} alt="paw" />
				<span className={s.sloganTitle}>Наша місія проста, але могутня</span>
				<span className={s.sloganText}>
					Рятуємо та забезпечуємо котиків всім необхідним - харчуванням та медикаментами.
					Прилаштовуємо у добрі руки
				</span>
			</div>
		</div>
	);
};

export default Hero;
