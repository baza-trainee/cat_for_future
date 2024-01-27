import styles from './DocumentsAdmin.module.scss';
import { Pencil, ScrollText } from 'lucide-react';
import { Link } from 'react-router-dom';

const DocumentItem = ({ title, id, name }: { title: string; id: number; name: string }) => {
	const path = name.split('/').pop();

	return (
		<div className={styles.item}>
			<div className={styles.data}>
				<div className={styles.name}>{title}</div>
				<div className={styles.document}>
					<div className={styles.icon}>
						<ScrollText strokeWidth={1} />
					</div>
					<span>{path}</span>
				</div>
			</div>
			<Link to={`/admin/documents/${id}`} className={styles.edit}>
				<Pencil />
			</Link>
		</div>
	);
};

export default DocumentItem;
