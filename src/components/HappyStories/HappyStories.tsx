import { useEffect, useRef, useState } from 'react';
import { IStory } from 'src/types/IStory';
import useMediaQuery from 'src/hooks/useMediaQuery';
import s from './HappyStories.module.scss';
import StoryCard from 'src/components/HappyStories/StoryCard/StoryCard';
import Slider from 'src/components/Slider/Slider';
import Button from 'src/components/Button/Button';
import { ReactComponent as ArrayRight } from 'src/assets/icons/arrow-right.svg';
import { useGetStoriesQuery } from 'src/store/slice/storiesApiSlice.ts';
import { useScroll } from 'src/hooks/useScroll.ts';

const HappyStories = () => {
	const { data: stories } = useGetStoriesQuery('');
	const [isTextStateArr, setIsTextStateArr] = useState<boolean[] | []>([]);
	const { isDesktop } = useMediaQuery();
	const { executeScroll, registerRef } = useScroll();
	const storyRef = useRef(null);

	useEffect(() => {
		registerRef('happyStories', storyRef);
	}, [registerRef]);

	useEffect(() => {
		if (stories) {
			setIsTextStateArr(stories.map(() => true));
		}
	}, [stories]);

	const handleChangeTextState = (i: number) => {
		setIsTextStateArr((prev) => prev.map((state, index) => (i === index ? !state : state)));
	};

	const onCollapseText = () => {
		if (isTextStateArr) {
			setIsTextStateArr(isTextStateArr.map(() => true));
		}
		setTimeout(() => {
			executeScroll('happyStories', -100);
		}, 100);
	};

	return (
		<section className={s.happyStories} id="happyStories" ref={storyRef}>
			<div className={s.container}>
				<h2 className={s.title}>Щасливі історії</h2>
				<div className={s.storiesWrap}>
					{stories && !isDesktop ? (
						<Slider
							slidesPerView={1}
							spaceBetween={20}
							slidesPerGroup={1}
							onSlideChange={onCollapseText}
						>
							{stories.map((story: IStory, i) => (
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
						stories?.map((story: IStory, i) => (
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
						onClick={() => executeScroll('ourCats', -80)}
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
