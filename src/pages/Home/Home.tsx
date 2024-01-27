import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { scrollToSection, scrollOnTop } from 'src/utils/scrollToSection';
import Hero from 'src/components/Hero/Hero';
import OurCats from 'src/components/OurCats/OurCats';
import AdoptKittenInstruction from 'src/components/AdoptKittenInstruction/AdoptKittenInstruction';
import HappyStories from 'src/components/HappyStories/HappyStories';

import s from './Home.module.scss';

const Home: React.FC = () => {
	const location = useLocation();

	useEffect(() => {
		location.hash && scrollToSection(location.hash.slice(1));
		location.pathname === '/' && !location.hash ? scrollOnTop() : null;
	}, [location]);

	return (
		<div className={s.wrapper}>
			<Hero />
			<OurCats />
			<AdoptKittenInstruction />
			<HappyStories />
			<Outlet />
		</div>
	);
};

export default Home;
