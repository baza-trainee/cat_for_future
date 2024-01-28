import styles from './Instructions.module.scss';
import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';

const InstructionItem = ({
	title,
	id,
	description,
}: {
	title: string;
	id: number;
	description: string;
}) => {
	const truncateText = (text: string, maxLength: number) => {
		if (text.length > maxLength) {
			return text.substring(0, maxLength) + '...';
		}
		return text;
	};

	return (
		<div className={styles.item}>
			<div className={styles.data}>
				<div className={styles.name}>{truncateText(title, 20)}</div>
				<p className={styles.description}>{truncateText(description, 40)}</p>
			</div>
			<Link to={`/admin/instruction/${id}`} className={styles.edit}>
				<Pencil />
			</Link>
		</div>
	);
};

export default InstructionItem;
