/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from 'react';
import clsx from 'clsx';

import s from './StoryCard.module.scss';

import { IStory } from 'src/data/stories.temp';
import Button from 'src/components/Button/Button';
import { ReactComponent as ArrayRight } from 'src/assets/icons/arrow-right.svg';

const StoryCard = ({ imgSrc, title, text }: IStory) => {
	const [isCollapsedText, setIsCollapsedText] = useState(true);

	const handleExpandText = () => {
		setIsCollapsedText((prev) => !prev);
	};

	return (
		<div className={s.card}>
			<img src={imgSrc} alt={title} className={s.img} />
			<div className="cardBody">
				<h3 className={s.title}>{title}</h3>
				<p className={clsx(s.description, isCollapsedText && s.textCollapsed)}>{text}</p>
				<div className={s.btnWrap}>
					<button type="button" className={s.btn} onClick={handleExpandText}>
						{isCollapsedText ? 'Читати далі' : 'Згорнути'}
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
