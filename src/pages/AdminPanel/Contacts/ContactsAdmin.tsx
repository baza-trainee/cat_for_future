import ListTable from 'src/components/AdminPanel/ListTable/ListTable.tsx';
import ContactsList from 'src/components/AdminPanel/Contacts/ContactsList.tsx';

const ContactsAdmin = () => {
	return (
		<section>
			<ListTable header={['', 'Назва', '', 'Контактні дані', '', '', '']} sectionTitle={'Контакти'}>
				<ContactsList />
			</ListTable>
		</section>
	);
};

export default ContactsAdmin;
