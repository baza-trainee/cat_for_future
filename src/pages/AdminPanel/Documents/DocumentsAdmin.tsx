import ListTable from 'src/components/AdminPanel/ListTable/ListTable.tsx';
import DocumentsList from 'src/components/AdminPanel/Documents/DocumentsList.tsx';

const DocumentsAdmin = () => {
	return (
		<section>
			<ListTable header={['Назва документу', '', 'Документ', '', '']} sectionTitle={'Документи'}>
				<DocumentsList />
			</ListTable>
		</section>
	);
};

export default DocumentsAdmin;
