import React from 'react';
import { Route, Routes } from 'react-router';
import './App.scss';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Page404 from 'src/components/Page404/Page404';
import Contacts from 'src/pages/Contacts/Contacts';
import RegPage from 'src/pages/RegistrationPage/RegPageIndex';
import ConfirmPasswordForm from 'src/components/ConfirmPasswordForm/ConfirmPasswordForm';
import RequestPasswordForm from 'src/pages/RequestPassword/RequestPasswordForm';
import AdminLayout from 'src/components/Layout/AdminLayout/AdminLayout.tsx';
import ProtectedRoute from 'src/routes/ProtectedRoute.tsx';
import HeroAdmin from 'src/pages/AdminPanel/Hero/HeroAdmin.tsx';
import CatsAdmin from 'src/pages/AdminPanel/Cats/CatsAdmin.tsx';
import StoriesAdmin from 'src/pages/AdminPanel/Stories/StoriesAdmin.tsx';
import DocumentsAdmin from 'src/pages/AdminPanel/Documents/DocumentsAdmin.tsx';
import Instruction from 'src/pages/AdminPanel/Instruction/Instruction.tsx';
import ContactsAdmin from 'src/pages/AdminPanel/Contacts/ContactsAdmin.tsx';
import EditDocument from 'src/pages/AdminPanel/Documents/EditDocument.tsx';
import EditInstruction from 'src/pages/AdminPanel/Instruction/EditInstruction.tsx';
import EditHero from 'src/pages/AdminPanel/Hero/EditHero.tsx';
import CatsActions from 'src/pages/AdminPanel/Cats/CatsActions.tsx';
import EditStory from 'src/pages/AdminPanel/Stories/EditStory.tsx';

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
				<Route path="contacts" element={<Contacts />} />
				<Route path="*" element={<Page404 />} />
				<Route path="registration" element={<RegPage />} />
			</Route>
			<Route element={<ProtectedRoute page="admin" />}>
				<Route path="admin" element={<AdminLayout />}>
					<Route path="hero" element={<HeroAdmin />} />
					<Route path="hero/edit" element={<EditHero />} />
					<Route path="cats" element={<CatsAdmin />} />
					<Route path="cats/add" element={<CatsActions />} />
					<Route path="cats/edit/:id" element={<CatsActions />} />
					<Route path="stories" element={<StoriesAdmin />} />
					<Route path="stories/:id" element={<EditStory />} />
					<Route path="documents" element={<DocumentsAdmin />} />
					<Route path="documents/:id" element={<EditDocument />} />
					<Route path="instruction" element={<Instruction />} />
					<Route path="instruction/:id" element={<EditInstruction />} />
					<Route path="contacts" element={<ContactsAdmin />} />
				</Route>
			</Route>
			{/*<Route path="log-in" element={<LoginAdmin />} />*/}
		</Routes>
	);
}

export default App;
