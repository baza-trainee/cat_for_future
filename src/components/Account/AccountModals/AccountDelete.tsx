import React from 'react';
import AccountModal from './AccountModal/AccountModal';

const AccountDelete: React.FC = () => (
	<AccountModal
		status={true}
		title={'Видалення акаунта'}
		text={
			'Ви впевнені що бажаєте видалити акаунт? Видалення акаунту призведе до втрати всіх даних профілю'
		}
	/>
);

export default AccountDelete;
