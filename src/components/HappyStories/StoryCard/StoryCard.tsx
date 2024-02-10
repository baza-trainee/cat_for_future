import { useState } from 'react';
import useMediaQuery from 'src/hooks/useMediaQuery';
import s from './StoryCard.module.scss';
import { IStory } from 'src/types/IStory';
import Button from 'src/components/Button/Button';
import { ReactComponent as ArrayRight } from 'src/assets/icons/arrow-right.svg';
import { scrollToSection } from 'src/utils/scrollToSection';

interface StoryCardProps extends IStory {
	i: number;
	handleChangeTextState: (i: number) => void;
	isCollapsedText?: boolean;
}
const StoryCard = ({ media_path, title, text }: StoryCardProps) => {
	const { isDesktop, isTablet } = useMediaQuery();

	const collapseTextHandler = () => {
		setIsOpen(!isOpen);
		if (isOpen && !isTablet && !isDesktop) {
			scrollToSection('happyStories');
		}
	};

	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={s.card}>
			<img src={media_path} alt={title} className={s.img} />
			<div className={s.cardBody}>
				<h3 className={s.title}>{title}</h3>
				<p className={!isOpen ? s.textCollapsed : s.description}>{text}</p>
				<div className={s.btnWrap}>
					<button type="button" className={s.btn} onClick={collapseTextHandler}>
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
