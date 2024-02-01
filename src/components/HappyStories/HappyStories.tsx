import { IStory } from 'src/types/IStory';
import { scrollToSection } from 'src/utils/scrollToSection';
import useMediaQuery from 'src/hooks/useMediaQuery';

import s from './HappyStories.module.scss';

import StoryCard from 'src/components/HappyStories/StoryCard/StoryCard';
import Slider from 'src/components/Slider/Slider';
import Button from 'src/components/Button/Button';
import { ReactComponent as ArrayRight } from 'src/assets/icons/arrow-right.svg';

import { useGetStoriesQuery } from 'src/store/slice/storiesSlice';

const HappyStories = () => {
	const { data: stories } = useGetStoriesQuery(undefined);

	const { isDesktop } = useMediaQuery();

	return (
		<section className={s.happyStories} id="happyStories">
			<div className={s.container}>
				<h2 className={s.title}>Щасливі історії</h2>
				<div className={s.storiesWrap}>
					{!isDesktop ? (
						<Slider slidesPerView={1} spaceBetween={20} slidesPerGroup={1}>
							{stories?.map((story: IStory) => <StoryCard key={story.id} {...story} />)}
						</Slider>
					) : (
						stories?.map((story: IStory) => <StoryCard key={story.id} {...story} />)
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
