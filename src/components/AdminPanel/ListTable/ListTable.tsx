import { ReactNode } from 'react';
import styles from './ListTable.module.scss';
import { PlusCircle } from 'lucide-react';

const ListTable = ({
	header,
	children,
	sectionTitle,
	withBtn = false,
	onClick,
	btnText = 'Додати',
}: {
	sectionTitle: string;
	header?: string[];
	children: ReactNode;
	withBtn?: boolean;
	onClick?: () => void;
	btnText?: string;
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>{sectionTitle}</h1>
				{withBtn && (
					<button onClick={onClick}>
						{btnText}
						<div className={styles.icon}>
							<PlusCircle />
						</div>
					</button>
				)}
			</div>
			<div className={styles.table}>
				<div className={styles.header}>
					{header?.map((item, index) => <div key={index}>{item}</div>)}
				</div>
				{children}
			</div>
		</div>
	);
};

export default ListTable;
