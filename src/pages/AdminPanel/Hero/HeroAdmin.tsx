import ListTable from 'src/components/AdminPanel/ListTable/ListTable.tsx';

const HeroAdmin = () => {
	return (
		<section>
			<ListTable
				header={['Заголовок', 'Підзаголовок', 'Фото', 'Текст 1', 'Текст 2']}
				sectionTitle={'Hero section'}
			>
				dfdf
			</ListTable>
		</section>
	);
};

export default HeroAdmin;
