import DocumentItem from 'src/components/AdminPanel/Documents/DocumentItem.tsx';
import styles from './DocumentsAdmin.module.scss';
import { useGetDocumentQuery } from 'src/store/slice/documentsSlice.ts';
import { Fragment } from 'react';
import '../../Loader/loader.css';

interface Document {
	id: number;
	media_path: string;
	name: string;
}
const DocumentsList = () => {
	const { data: documents, isLoading, isError } = useGetDocumentQuery(undefined);

	return (
		<div className={styles.container}>
			{isLoading && <div className="loader" />}
			{isError && <div className={styles.error}>Упс...Щось пішло не так</div>}
			{documents?.map((item: Document) => (
				<Fragment key={item.id}>
					<DocumentItem name={item.media_path} title={item.name} id={item.id} />
				</Fragment>
			))}
		</div>
	);
};

export default DocumentsList;
