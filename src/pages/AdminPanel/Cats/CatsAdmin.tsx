import ListTable from 'src/components/AdminPanel/ListTable/ListTable.tsx';

const CatsAdmin = () => {
	return (
		<section>
			<ListTable
				header={['Фото', 'Ім’я', 'Стать', 'Дата народження', 'Опис']}
				sectionTitle={'Мої кошенята'}
				withBtn
			>
				dfdf
			</ListTable>
		</section>
	);
};

export default CatsAdmin;
