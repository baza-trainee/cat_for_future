import React from 'react';
import { Route, Routes } from 'react-router';
import './App.scss';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Page404 from 'src/components/Page404/Page404';
import Contacts from 'src/pages/Contacts/Contacts';
import RegPage from 'src/pages/RegistrationPage/RegPageIndex';
import ConfirmPasswordForm from 'src/components/ConfirmPasswordForm/ConfirmPasswordForm';
import RequestPasswordForm from 'src/components/RequestPasswordForm/RequestPasswordForm';
import AdminLayout from 'src/components/Layout/AdminLayout/AdminLayout.tsx';
import ProtectedRoute from 'src/routes/ProtectedRouteAdmin.tsx';
import LoginAdmin from 'src/pages/AdminPanel/LoginAdmin/LoginAdmin.tsx';
import HeroAdmin from 'src/pages/AdminPanel/Hero/HeroAdmin.tsx';
import CatsAdmin from 'src/pages/AdminPanel/Cats/CatsAdmin.tsx';
import StoriesAdmin from 'src/pages/AdminPanel/Stories/StoriesAdmin.tsx';
import DocumentsAdmin from 'src/pages/AdminPanel/Documents/DocumentsAdmin.tsx';
import Instruction from 'src/pages/AdminPanel/Instruction/Instruction.tsx';
import ContactsAdmin from 'src/pages/AdminPanel/Contacts/ContactsAdmin.tsx';

const PersonalAccount = React.lazy(() => import('src/pages/PersonalAccount/PersonalAccount'));

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<Home />}>
					<Route path="confirm-password" element={<ConfirmPasswordForm />} />
					<Route path="request-password" element={<RequestPasswordForm />} />
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
			<Route element={<ProtectedRoute page="admin" />}>
				<Route element={<AdminLayout />}>
					<Route path="admin" element={<HeroAdmin />} />
					<Route path="admin/cats" element={<CatsAdmin />} />
					<Route path="admin/stories" element={<StoriesAdmin />} />
					<Route path="admin/documents" element={<DocumentsAdmin />} />
					<Route path="admin/instruction" element={<Instruction />} />
					<Route path="admin/contacts" element={<ContactsAdmin />} />
				</Route>
			</Route>
			<Route path="log-in" element={<LoginAdmin />} />
			<Route path="registration" element={<RegPage />} />
		</Routes>
	);
}

export default App;
