import ListTable from 'src/components/AdminPanel/ListTable/ListTable.tsx';
import CatsList from 'src/components/AdminPanel/Cats/CatsList.tsx';
import { useNavigate } from 'react-router';

const CatsAdmin = () => {
	const navigate = useNavigate();
	return (
		<section>
			<ListTable
				header={['Фото', 'Ім’я', 'Стать', 'Дата народження', 'Опис', '']}
				sectionTitle={'Мої кошенята'}
				withBtn
				onClick={() => navigate('add')}
			>
				<CatsList />
			</ListTable>
		</section>
	);
};

export default CatsAdmin;
