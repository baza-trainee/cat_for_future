import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { scrollOnTop } from 'src/utils/scrollToSection';
import Hero from 'src/components/Hero/Hero';
import OurCats from 'src/components/OurCats/OurCats';
import AdoptKittenInstruction from 'src/components/AdoptKittenInstruction/AdoptKittenInstruction';
import HappyStories from 'src/components/HappyStories/HappyStories';
import s from './Home.module.scss';
import { useScroll } from 'src/hooks/useScroll.ts';

const Home: React.FC = () => {
	const location = useLocation();
	const { executeScroll } = useScroll();

	useEffect(() => {
		if (location.hash) {
			executeScroll(location.hash.slice(1));
		} else if (location.pathname === '/') {
			scrollOnTop();
		}
	}, [executeScroll, location]);

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
