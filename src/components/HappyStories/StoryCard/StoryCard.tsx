import s from './StoryCard.module.scss';

import { IStory } from 'src/data/stories.temp';
import Button from 'src/components/Button/Button';
import { ReactComponent as ArrayRight } from 'src/assets/icons/arrow-right.svg';

const StoryCard = ({ imgSrc, title, text }: IStory) => {
	return (
		<div className={s.card}>
			<img src={imgSrc} alt={title} className={s.img} />
			<div className="cardBody">
				<h3 className={s.title}>{title}</h3>
				<p className={s.description}>{text}</p>
				<div className={s.btnWrap}>
					<button type="button" className={s.btn}>
						Читати далі
					</button>
					<Button
						buttonClasses={'secondaryBtn  secondaryIconRight'}
						type={'button'}
						name="Обери кота для піклування"
						onClick={() => console.log('click')}
						styleBtn={{ border: 'none' }}
					>
						<ArrayRight className={s.icon} />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default StoryCard;
