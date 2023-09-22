import { Route, Routes } from 'react-router';
import './App.scss';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Page404 from 'src/components/Page404/Page404';
import { routesPersonalAccount } from './components/PersonalAccount/PersonalAccountRouter';
import PersonalAccountLayout from './components/PersonalAccount/PersonalAccountLayout/PersonalAccountLayout';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="account" element={<PersonalAccountLayout />}>
						{routesPersonalAccount.map((r, i) => (
							<Route key={i} path={r.path} element={r.element} />
						))}
					</Route>
					<Route path="*" element={<Page404 />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
