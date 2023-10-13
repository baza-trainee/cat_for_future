import React from 'react';
import AccountModal from './AccountModal/AccountModal';
import textData from './textData.json';

const AccountDelete: React.FC = () => (
	<AccountModal status={true} title={textData[0]} text={textData[1]} />
);

export default AccountDelete;
