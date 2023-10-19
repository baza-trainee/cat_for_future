import React from 'react';
import AccountModal from './AccountModal/AccountModal';
import textData from './textData.json';

const AccountLogout: React.FC = () => (
	<AccountModal status={true} title={textData[2]} text={textData[3]} />
);

export default AccountLogout;
