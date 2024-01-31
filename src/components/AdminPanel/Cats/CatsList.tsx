import { useGetCatsQuery } from 'src/store/slice/catsSlice.ts';
import styles from './CatsList.module.scss';
import { Fragment } from 'react';
import CatItem from 'src/components/AdminPanel/Cats/CatItem.tsx';

const CatsList = () => {
	const { data: cats } = useGetCatsQuery('');

	return (
		<div className={styles.container}>
			{cats?.map((cat) => (
				<Fragment key={cat.id}>
					<CatItem cat={cat} />
				</Fragment>
			))}
		</div>
	);
};

export default CatsList;
