import ListTable from 'src/components/AdminPanel/ListTable/ListTable.tsx';

const Instruction = () => {
	return (
		<section>
			<ListTable
				header={['Заголовок ', '', 'Опис інструкції', '', '']}
				sectionTitle={'Інструкція'}
				withBtn
			>
				dfdf
			</ListTable>
		</section>
	);
};

export default Instruction;
