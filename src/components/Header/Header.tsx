import React from 'react';
import Logotype from '../Logotype/Logotype';
// import Button from '../Button/Button';
// import iconLogIn from 'src/images/log-in-icon.svg';
// import iconLogOut from 'src/images/log-out-icon.svg';
// import burgerMenuOpenIcon from 'src/images/burger-menu-open-icon.svg';
// import burgerMenuCloseIcon from 'src/images/burger-menu-close-icon.svg';

// import s from './Header.module.scss';

const Header: React.FC = () => {
	return (
		<div>
			Header
			<Logotype />
			{/* <Button
				buttonClasses={'primaryTextOnlyButton'}

				type={'button'}
				name={'Допомогти'}
				onClick={() => console.log('Клік Допомогти')}
			/>


			<Button
				buttonClasses={'secondaryIconLeftButton'}
				divClasses={'miniIconContainer'}
				imgClasses={'miniIconContainer'}
				type={'button'}
				name={'Вхід'}
				imgPath={iconLogIn}
				onClick={() => console.log('Клік Вхід')}
			/>
			<Button
				buttonClasses={'secondaryIconLeftButton'}
				divClasses={'miniIconContainer'}
				imgClasses={'miniIconContainer'}
				type={'button'}
				name={'Вихід'}
				imgPath={iconLogOut}
				onClick={() => console.log('Клік Вихід')}
			/>

			<Button
				buttonClasses={'tertiaryIconOnlyButton'}
				divClasses={'bigIconContainer'}
				imgClasses={'bigIcon'}
				type={'button'}
				imgPath={burgerMenuOpenIcon}
				onClick={() => console.log('Клік Відкрити меню')}
			/>
			<Button
				buttonClasses={'tertiaryIconOnlyButton'}
				divClasses={'bigIconContainer'}
				imgClasses={'bigIcon'}
				type={'button'}
				imgPath={burgerMenuCloseIcon}
				onClick={() => console.log('Клік Закрити меню')}
			/> */}
		</div>
	);
};

export default Header;
