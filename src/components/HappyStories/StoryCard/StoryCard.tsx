import useMediaQuery from 'src/hooks/useMediaQuery';
import clsx from 'clsx';

import s from './StoryCard.module.scss';

import { IStory } from 'src/types/IStory';
import Button from 'src/components/Button/Button';
import { ReactComponent as ArrayRight } from 'src/assets/icons/arrow-right.svg';
import { scrollToSection } from 'src/utils/scrollToSection';
import { useScroll } from 'src/hooks/useScroll.ts';

interface StoryCardProps extends IStory {
	i: number;
	handleChangeTextState: (i: number) => void;
	isCollapsedText?: boolean;
}
const StoryCard = ({
	i,
	media_path,
	title,
	text,
	handleChangeTextState,
	isCollapsedText,
}: StoryCardProps) => {
	const { isDesktop, isTablet } = useMediaQuery();
	const { executeScroll } = useScroll();

	const collapseTextHandler = () => {
		handleChangeTextState(i);
		if (!isCollapsedText && !isTablet && !isDesktop) {
			setTimeout(() => {
				executeScroll('happyStories', -100);
			}, 100);
		}
	};

	return (
		<div className={s.card}>
			<img src={media_path} alt={title} className={s.img} />
			<div className={s.cardBody}>
				<h3 className={s.title}>{title}</h3>
				<p className={clsx(s.description, isCollapsedText && s.textCollapsed)}>{text}</p>
				<div className={s.btnWrap}>
					<button type="button" className={s.btn} onClick={collapseTextHandler}>
						{isCollapsedText ? 'Читати далі' : 'Згорнути'}
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
