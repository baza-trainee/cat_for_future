import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';

import { Provider } from 'react-redux';
import store from './store/store.ts';
import { ScrollProvider } from 'src/context/ScrollContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<BrowserRouter>
			<ScrollProvider>
				<App />
			</ScrollProvider>
		</BrowserRouter>
	</Provider>
);
