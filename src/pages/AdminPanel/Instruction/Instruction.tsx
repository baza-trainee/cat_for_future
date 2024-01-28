import ListTable from 'src/components/AdminPanel/ListTable/ListTable.tsx';
import InstructionsList from 'src/components/AdminPanel/Instructions/InstructionsList.tsx';

const Instruction = () => {
	return (
		<section>
			<ListTable
				header={[' ', 'Заголовок', '', 'Опис інструкції', '', '']}
				sectionTitle={'Інструкція'}
			>
				<InstructionsList />
			</ListTable>
		</section>
	);
};

export default Instruction;
