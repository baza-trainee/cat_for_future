import ListTable from 'src/components/AdminPanel/ListTable/ListTable.tsx';

const DocumentsAdmin = () => {
	return (
		<section>
			<ListTable
				header={['Назва документу', 'Документ', '', '', '']}
				sectionTitle={'Документи'}
				withBtn
			>
				dfdf
			</ListTable>
		</section>
	);
};

export default DocumentsAdmin;
