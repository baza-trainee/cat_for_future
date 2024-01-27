import ListTable from 'src/components/AdminPanel/ListTable/ListTable.tsx';

const StoriesAdmin = () => {
	return (
		<section>
			<ListTable
				header={['Фото', 'Заголовок історії', 'Опис історії']}
				sectionTitle={'Щасливі історії'}
				withBtn
			>
				dfdf
			</ListTable>
		</section>
	);
};

export default StoriesAdmin;
