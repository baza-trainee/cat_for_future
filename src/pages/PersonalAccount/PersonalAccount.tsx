import React from 'react';

import { Route, Routes } from 'react-router';

import PersonalAccountLayout from 'src/components/Account/AccountLayout/AccountLayout';
import AccountLogout from 'src/components/Account/AccountModals/AcoountLogout';
import AccountDelete from 'src/components/Account/AccountModals/AccountDelete';
import MyData from 'src/components/Account/AccountBlocks/MyData/MyData';
import ChangePassword from 'src/components/Account/AccountBlocks/ChangePassword/ChangePassword';
import MyKitten from 'src/components/Account/AccountBlocks/MyKitten/MyKitten';
import ProtectedRoute from 'src/routes/ProtectedRouteAdmin.tsx';

const PersonalAccount: React.FC = () => (
	<Routes>
		<Route element={<ProtectedRoute page="account" />}>
			<Route path="/" element={<PersonalAccountLayout />}>
				<Route index element={<MyData />} />
				<Route path="my-kitten" element={<MyKitten />} />
				<Route path="change-password" element={<ChangePassword />} />
				<Route path="logout" element={<AccountLogout />} />
				<Route path="delete-account" element={<AccountDelete />} />
			</Route>
		</Route>
	</Routes>
);

export default PersonalAccount;
