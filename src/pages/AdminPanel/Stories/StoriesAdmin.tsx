import ListTable from 'src/components/AdminPanel/ListTable/ListTable.tsx';
import StoriesList from 'src/components/AdminPanel/Stories/StoriesList.tsx';

const StoriesAdmin = () => {
	return (
		<section>
			<ListTable
				header={['', 'Фото', '', 'Заголовок історії', '', '', 'Опис історії', '', '', '', '']}
				sectionTitle={'Щасливі історії'}
			>
				<StoriesList />
			</ListTable>
		</section>
	);
};

export default StoriesAdmin;
