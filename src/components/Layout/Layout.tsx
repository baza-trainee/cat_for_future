import React from 'react';
import s from './Layout.module.scss';
import { Outlet } from 'react-router';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CookieConsentBanner from '../CookieConsentBanner/CookieConsentBanner';

const Layout: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<CookieConsentBanner />
			<Header />
			<main className={s.main}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
