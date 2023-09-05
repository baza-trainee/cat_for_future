import React from 'react';
import Button from '../Button/Button';
import iconLogIn from 'src/images/log-in-icon.svg';
import Logotype from '../Logotype/Logotype';

const Header: React.FC = () => {
	return (
		<div>
			Header
			<Logotype />
			<Button
				type={'button'}
				name={'Вхід'}
				imgPath={iconLogIn}
				disabled={false}
				onClick={() => console.log('Enter')}
			/>
		</div>
	);
};

export default Header;
