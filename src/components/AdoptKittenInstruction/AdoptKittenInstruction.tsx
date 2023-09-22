import { FC } from 'react';
import Button from '../Button/Button';
import s from './AdoptKittenInstruction.module.scss';

const AdoptKittenInstruction: FC = () => {
	return (
		<section className={s.wrapper}>
			<h2 className={s.title}>Як прихистити кошеня на виріст?</h2>

			<div className={s.instructionList}>
				<div className={s.instructionItem}>
					<img src="" alt="" />
					<div className={s.descriptionBody}>
						<h3 className={s.subtitle}>Ознайомтеся з нашими кошенятами</h3>
						<p className={s.description}>
							Перш за все, ознайомтеся зі списком доступних кошенят на нашому cайті. Ви знайдете
							фотографії та описи кожного кошеня, які допоможуть вам обрати собі маленького друга.
						</p>
					</div>
				</div>

				<div className={s.instructionItem}>
					<img src="" alt="" />
					<div className={s.descriptionBody}>
						<h3 className={s.subtitle}>Ознайомтеся з нашими кошенятами</h3>
						<p className={s.description}>
							Перш за все, ознайомтеся зі списком доступних кошенят на нашому cайті. Ви знайдете
							фотографії та описи кожного кошеня, які допоможуть вам обрати собі маленького друга.
						</p>
					</div>
				</div>

				<div className={s.instructionItem}>
					<img src="" alt="" />
					<div className={s.descriptionBody}>
						<h3 className={s.subtitle}>Ознайомтеся з нашими кошенятами</h3>
						<p className={s.description}>
							Перш за все, ознайомтеся зі списком доступних кошенят на нашому cайті. Ви знайдете
							фотографії та описи кожного кошеня, які допоможуть вам обрати собі маленького друга.
						</p>
					</div>
				</div>
			</div>

			<Button name={'Обрати кошеня'} buttonClasses={'primaryBtn'} type={'button'} />
		</section>
	);
};

export default AdoptKittenInstruction;
