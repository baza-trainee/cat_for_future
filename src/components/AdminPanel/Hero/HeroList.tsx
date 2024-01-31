import styles from './HeroList.module.scss';
import { useGetHeroQuery } from 'src/store/slice/heroApiSlice.ts';
import '../../Loader/loader.css';
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';

const HeroList = () => {
	const { data: hero, isError, isLoading } = useGetHeroQuery(undefined);

	return (
		<div className={styles.wrapper}>
			{isError && <div className={styles.error}>Упс...Щось пішло не так</div>}
			{isLoading && <div className="loader" />}
			{hero && (
				<div className={styles.item}>
					<div>{hero.title.slice(0, 15)}...</div>
					<div>{hero.sub_title.slice(0, 15)}...</div>
					<img src={hero.media_path} alt="Кіт" />
					<div>{hero.left_text.slice(0, 10)}...</div>
					<div>{hero.right_text.slice(0, 13)}...</div>
					<Link to={`/admin/hero/edit`} className={styles.edit}>
						<Pencil />
					</Link>
				</div>
			)}
		</div>
	);
};

export default HeroList;
