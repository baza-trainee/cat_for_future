import { FC } from 'react';
import Button from '../Button/Button';
import { scrollToSection } from 'src/utils/scrollToSection';
import paws from 'src/assets/icons/adopt-kitten-instruct-paw.svg';
import s from './AdoptKittenInstruction.module.scss';

const btn = {
	marginTop: '1.28rem',
	width: '100%',
};

const AdoptKittenInstruction: FC = () => {
	return (
		<section className={s.wrapper}>
			<h2 className={s.title}>Як прихистити кошеня на виріст?</h2>

			<div className={s.instructionList}>
				<div className={s.instructionItem}>
					<img src={paws} alt="Paws" className={s.paws} />
					<div className={s.descriptionBody}>
						<h3 className={s.subtitle}>Ознайомтеся з нашими кошенятами</h3>
						<p className={s.description}>
							Перш за все, ознайомтеся зі списком доступних кошенят на нашому cайті. Ви знайдете
							фотографії та описи кожного кошеняти, які допоможуть вам обрати собі маленького друга.
						</p>
					</div>
				</div>

				<div className={s.instructionItem}>
					<img src={paws} alt="Paws" className={s.paws} />
					<div className={s.descriptionBody}>
						<h3 className={s.subtitle}>Заповніть заявку на укотовлення</h3>
						<p className={s.description}>
							Знайшли кошеня, яке вам подобається? Зареєструйтесь на нашому сайті, заповніть заявку
							на усиновлення та очікуйте поки воно підросте та його можна буде забрати додому.
						</p>
					</div>
				</div>

				<div className={s.instructionItem}>
					<img src={paws} alt="Paws" className={s.paws} />
					<div className={s.descriptionBody}>
						<h3 className={s.subtitle}>Дочекайтесь поки кошеня підросте</h3>
						<p className={s.description}>
							Вже забронювали улюбленця? У власному кабінеті, після бронювання кошеняти, ви маєте
							можливість віслідковувати як воно росте та рахувати час до зустрічі.
						</p>
					</div>
				</div>
			</div>

			<div className={s.btn}>
				<Button
					name={'Обрати кошеня'}
					buttonClasses={'primaryBtn'}
					type={'button'}
					styleBtn={btn}
					onClick={() => scrollToSection('ourCats')}
				/>
			</div>
		</section>
	);
};

export default AdoptKittenInstruction;
