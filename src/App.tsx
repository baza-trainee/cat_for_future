import React from 'react';
import { Route, Routes } from 'react-router';
import './App.scss';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Page404 from 'src/components/Page404/Page404';
import Contacts from 'src/pages/Contacts/Contacts';
import RegPage from 'src/pages/RegistrationPage/RegPageIndex';
import ConfirmPasswordForm from 'src/components/ConfirmPasswordForm/ConfirmPasswordForm';

const PersonalAccount = React.lazy(() => import('src/pages/PersonalAccount/PersonalAccount'));

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<Home />}>
					<Route path="confirm-password" element={<ConfirmPasswordForm />} />
				</Route>
				<Route
					path="account/*"
					element={
						<React.Suspense fallback={<>...</>}>
							<PersonalAccount />
						</React.Suspense>
					}
				/>
				<Route path="*" element={<Page404 />} />
				<Route path="contacts" element={<Contacts />} />
			</Route>
			<Route path="registration" element={<RegPage />} />
		</Routes>
	);
}

export default App;
