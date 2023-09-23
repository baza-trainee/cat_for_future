import React from 'react';
import AccountModal from './AccountModal/AccountModal';

const AccountLogout: React.FC = () => (
	<AccountModal
		status={true}
		title={'Вихід з акаунта'}
		text={'Ви впевнені що бажаєте вийти з акаунта?'}
	/>
);

export default AccountLogout;
