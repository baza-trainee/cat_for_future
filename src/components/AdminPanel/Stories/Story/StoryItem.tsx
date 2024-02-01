import styles from './Story.module.scss';
import { IStory } from 'src/types/IStory.ts';
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';

const StoryItem = ({ story }: { story: IStory }) => {
	return (
		<div className={styles.item}>
			<img src={story.media_path} alt={story.title} />
			<div className={styles.title}>{story.title.slice(0, 21)}...</div>
			<div className={styles.text}>{story.text.slice(0, 29)}...</div>
			<div className={styles.icons}>
				<Link to={`${story.id}`}>
					<Pencil />
				</Link>
			</div>
		</div>
	);
};

export default StoryItem;
