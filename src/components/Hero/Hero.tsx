import paw from '../../assets/icons/hero/paw.svg';
import Button from '../Button/Button';
import { scrollToSection } from 'src/utils/scrollToSection';
import s from './Hero.module.scss';

const btn = {
	width: '100%',
};

const Hero: React.FC = () => {
	return (
		<div className={s.hero}>
			<div className={s.content}>
				<h2 className={s.contentTitle}>Подаруй дім для маленьких хвостиків</h2>
				<span className={s.contentText}>Вони чекають на тебе</span>
				<div className={s.contentBtn}>
					<Button
						onClick={() => scrollToSection('ourCats')}
						name={'Знайти друга'}
						buttonClasses={'primaryBtn'}
						type={'submit'}
						styleBtn={btn}
					/>
				</div>
			</div>
			<div className={s.slogan}>
				<img className={s.sloganImg} src={paw} alt="paw" />
				<span className={s.sloganTitle}>Наша місія проста, але могутня</span>
				<span className={s.sloganText}>
					Опікуємось котами, які поруч з нами переживають буремні часи. Прилаштовуємо у добрі руки.
				</span>
			</div>
		</div>
	);
};

export default Hero;
