import { useState } from 'react';

import { happyStories } from 'src/data/stories.temp';
import { IStory } from 'src/types/IStory';
import { scrollToSection } from 'src/utils/scrollToSection';
import useMediaQuery from 'src/hooks/useMediaQuery';

import s from './HappyStories.module.scss';

import StoryCard from 'src/components/HappyStories/StoryCard/StoryCard';
import Slider from 'src/components/Slider/Slider';
import Button from 'src/components/Button/Button';
import { ReactComponent as ArrayRight } from 'src/assets/icons/arrow-right.svg';

const HappyStories = () => {
	const [isTextStateArr, setIsTextStateArr] = useState<boolean[]>(happyStories.map(() => true));

	const { isDesktop } = useMediaQuery();

	const handleChangeTextState = (i: number) => {
		setIsTextStateArr((prev) => prev.map((state, index) => (i === index ? !state : state)));
	};

	const onCollapseText = () => {
		setIsTextStateArr(isTextStateArr.map(() => true));
	};

	return (
		<section className={s.happyStories} id="happyStories">
			<div className={s.container}>
				<h2 className={s.title}>Щасливі історії</h2>
				<div className={s.storiesWrap}>
					{!isDesktop ? (
						<Slider
							slidesPerView={1}
							spaceBetween={20}
							slidesPerGroup={1}
							onSlideChange={onCollapseText}
						>
							{happyStories.map((story: IStory, i) => (
								<StoryCard
									key={story.id}
									{...story}
									i={i}
									handleChangeTextState={handleChangeTextState}
									isCollapsedText={isTextStateArr[i]}
								/>
							))}
						</Slider>
					) : (
						happyStories.map((story: IStory, i) => (
							<StoryCard
								i={i}
								key={story.id}
								{...story}
								handleChangeTextState={handleChangeTextState}
								isCollapsedText={isTextStateArr[i]}
							/>
						))
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
