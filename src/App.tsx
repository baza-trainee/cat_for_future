import { Route, Routes } from 'react-router';
import './App.scss';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import { PrivacyPolicy } from './ruleFiles/PrivacyPolicy/PrivacyPolicy';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
				</Route>
				<Route path="/privacy" element={<PrivacyPolicy />} />
			</Routes>
		</>
	);
}

export default App;
