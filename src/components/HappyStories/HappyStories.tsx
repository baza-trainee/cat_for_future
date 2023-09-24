import { happyStories } from 'src/data/stories.temp';
import { IStory } from 'src/data/stories.temp';

import s from './HappyStories.module.scss';

import StoryCard from 'src/components/HappyStories/StoryCard/StoryCard';

const HappyStories = () => {
	return (
		<section className={s.happyStories}>
			<div className={s.container}>
				<h2 className={s.title}>Щасливі історіі</h2>
				<div className="storiesWrap">
					{happyStories.map((story: IStory) => (
						<StoryCard key={story.id} {...story} />
					))}
				</div>
			</div>
		</section>
	);
};

export default HappyStories;
