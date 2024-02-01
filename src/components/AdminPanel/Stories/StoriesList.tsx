import StoryItem from 'src/components/AdminPanel/Stories/Story/StoryItem.tsx';
import { useGetStoriesQuery } from 'src/store/slice/storiesApiSlice.ts';
import { Fragment } from 'react';
import styles from './Stories.module.scss';
import '../../Loader/loader.css';

const StoriesList = () => {
	const { data: stories, isLoading, isError } = useGetStoriesQuery('');

	return (
		<div className={styles.container}>
			{isError && <div className={styles.error}>Упс...Щось пішло не так</div>}
			{isLoading ? (
				<div className="loader" />
			) : (
				stories?.map((story) => (
					<Fragment key={story.id}>
						<StoryItem story={story} />
					</Fragment>
				))
			)}
		</div>
	);
};

export default StoriesList;
