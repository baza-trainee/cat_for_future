import { FC, Fragment } from 'react';
import Button from '../Button/Button';
import { scrollToSection } from 'src/utils/scrollToSection';
import paws from 'src/assets/icons/adopt-kitten-instruct-paw.svg';
import s from './AdoptKittenInstruction.module.scss';
import { useGetInstructionsQuery } from 'src/store/slice/instructionsApiSlice.ts';
import { IInstruction } from 'src/types/IInstruction.ts';

const btn = {
	marginTop: '1.28rem',
	width: '100%',
};

const AdoptKittenInstruction: FC = () => {
	const { data: instructions } = useGetInstructionsQuery(undefined);
	console.log(instructions);
	return (
		<section className={s.wrapper}>
			<h2 className={s.title}>Як прихистити кошеня на виріст?</h2>
			<div className={s.instructionList}>
				{instructions.map(({ id, title, description }: IInstruction) => (
					<Fragment key={id}>
						<div className={s.instructionItem}>
							<img src={paws} alt="Paws" className={s.paws} />
							<div className={s.descriptionBody}>
								<h3 className={s.subtitle}>{title}</h3>
								<p className={s.description}>{description}</p>
							</div>
						</div>
					</Fragment>
				))}
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
