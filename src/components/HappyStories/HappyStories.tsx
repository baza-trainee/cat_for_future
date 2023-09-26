import { happyStories } from 'src/data/stories.temp';
import { IStory } from 'src/data/stories.temp';
import { scrollToSection } from 'src/utils/scrollToSection';

import s from './HappyStories.module.scss';

import StoryCard from 'src/components/HappyStories/StoryCard/StoryCard';
import Slider from 'src/components/Slider/Slider';
import Button from 'src/components/Button/Button';
import { ReactComponent as ArrayRight } from 'src/assets/icons/arrow-right.svg';
import useMediaQuery from 'src/hooks/useMediaQuery';

const HappyStories = () => {
	const { isDesktop } = useMediaQuery();
	return (
		<section className={s.happyStories} id="happyStories">
			<div className={s.container}>
				<h2 className={s.title}>Щасливі історіі</h2>
				<div className={s.storiesWrap}>
					{!isDesktop ? (
						<Slider slidesPerView={1} spaceBetween={20} slidesPerGroup={1}>
							{happyStories.map((story: IStory) => (
								<StoryCard key={story.id} {...story} />
							))}
						</Slider>
					) : (
						happyStories.map((story: IStory) => <StoryCard key={story.id} {...story} />)
					)}
				</div>
				{!isDesktop && (
					<Button
						buttonClasses={'secondaryBtn  secondaryIconRight'}
						type={'button'}
						name="Обери кота для піклування"
						onClick={() => scrollToSection('ourCats')}
						styleBtn={{
							border: 'none',
							marginTop: '1.25rem',
							padding: '1rem 0.5rem',
						}}
					>
						<ArrayRight className={s.icon} />
					</Button>
				)}
			</div>
		</section>
	);
};

export default HappyStories;
