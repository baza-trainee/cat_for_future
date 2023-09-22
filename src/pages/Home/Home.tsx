import React from 'react';
import Hero from 'src/components/Hero/Hero';
import OurCats from 'src/components/OurCats/OurCats';

import s from './Home.module.scss';

const Home: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<Hero />
			<OurCats />
		</div>
	);
};

export default Home;
