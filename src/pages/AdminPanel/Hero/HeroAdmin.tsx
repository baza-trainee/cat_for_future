import ListTable from 'src/components/AdminPanel/ListTable/ListTable.tsx';
import HeroList from 'src/components/AdminPanel/Hero/HeroList.tsx';

const HeroAdmin = () => {
	return (
		<section>
			<ListTable
				header={['Заголовок', '', 'Підзаголовок', '', 'Фото', '', 'Текст 1', '', 'Текст 2']}
				sectionTitle={'Hero section'}
				headerStyle={{ paddingRight: '10rem', paddingLeft: '3.88rem' }}
			>
				<HeroList />
			</ListTable>
		</section>
	);
};

export default HeroAdmin;
