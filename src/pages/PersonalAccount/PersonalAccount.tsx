import React from 'react';

import { Route, Routes } from 'react-router';

import PersonalAccountLayout from 'src/components/AccountLayout/AccountLayout';
import AccountLogout from 'src/components/AccountLayout/AccountModals/AcoountLogout';
import AccountDelete from 'src/components/AccountLayout/AccountModals/AccountDelete';
import MyData from 'src/components/AccountLayout/AccountBlocks/MyData/MyData';
import ChangePassword from 'src/components/AccountLayout/AccountBlocks/ChangePassword/ChangePassword';
import MyKitten from 'src/components/AccountLayout/AccountBlocks/MyKitten/MyKitten';

const PersonalAccount: React.FC = () => (
	<Routes>
		<Route path="/" element={<PersonalAccountLayout />}>
			<Route index element={<MyData />} />
			<Route path="my-kitten" element={<MyKitten />} />
			<Route path="change-password" element={<ChangePassword />} />
			<Route path="logout" element={<AccountLogout />} />
			<Route path="delete-account" element={<AccountDelete />} />
		</Route>
	</Routes>
);

export default PersonalAccount;
