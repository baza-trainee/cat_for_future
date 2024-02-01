import { useState, useEffect } from 'react';
import useMediaQuery from 'src/hooks/useMediaQuery';
import s from './StoryCard.module.scss';
import { IStory } from 'src/types/IStory';
import Button from 'src/components/Button/Button';
import { ReactComponent as ArrayRight } from 'src/assets/icons/arrow-right.svg';
import { scrollToSection } from 'src/utils/scrollToSection';

interface StoryCardProps extends IStory {
	isCollapsedText?: boolean;
}
const StoryCard = ({ media_path, title, text }: StoryCardProps) => {
	const { isDesktop } = useMediaQuery();

	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!isDesktop) {
			scrollToSection('happyStories');
		}
	}, [isDesktop]);

	return (
		<div className={s.card}>
			<img src={media_path} alt={title} className={s.img} />
			<div className={s.cardBody}>
				<h3 className={s.title}>{title}</h3>
				<p className={isOpen ? s.description : s.textCollapsed}>{text}</p>
				<div className={s.btnWrap}>
					<button type="button" className={s.btn} onClick={() => setIsOpen(!isOpen)}>
						{!isOpen ? 'Читати далі' : 'Згорнути'}
					</button>
					{isDesktop && (
						<Button
							buttonClasses={'secondaryBtn  secondaryIconRight'}
							type={'button'}
							name="Обери кота для піклування"
							onClick={() => scrollToSection('ourCats')}
							styleBtn={{ border: 'none', paddingTop: '1rem', paddingBottom: '1rem' }}
						>
							<ArrayRight className={s.icon} />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default StoryCard;
