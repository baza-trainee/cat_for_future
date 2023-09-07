import { useState } from 'react';

import Logotype from 'src/components/Logotype/Logotype';
import Menu from 'src/components/Menu/Menu';
import Button from 'src/components/Button/Button';

import s from './Header.module.scss';

import logIn from 'src/assets/icons/header/log-in-icon.svg';
import logOut from 'src/assets/icons/header/log-out-icon.svg';
import burgerMenuOpen from 'src/assets/icons/header/burger-menu-open-icon.svg';
import burgerMenuClose from 'src/assets/icons/header/burger-menu-close-icon.svg';

const Header: React.FC = () => {
	const [isLogin, setIsLogin] = useState(false);
	const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
	const handleIsLogin = () => {
		setIsLogin((prev) => !prev);
	};

	const handleIsOpenBurgerMenu = () => {
		setIsOpenBurgerMenu((prev) => !prev);
	};

	const authBtn = isLogin ? (
		<Button
			buttonClasses={'secondaryIconLeftButton'}
			divClasses={'miniIconContainer'}
			imgClasses={'miniIconContainer'}
			type={'button'}
			name={'Вихід'}
			imgPath={logOut}
			onClick={handleIsLogin}
		/>
	) : (
		<Button
			buttonClasses={'secondaryIconLeftButton'}
			divClasses={'miniIconContainer'}
			imgClasses={'miniIconContainer'}
			type={'button'}
			name={'Вхід'}
			imgPath={logIn}
			onClick={handleIsLogin}
		/>
	);

	const menuBtn = isOpenBurgerMenu ? (
		<Button
			buttonClasses={'tertiaryIconOnlyButton burgerMenuBtn'}
			divClasses={'bigIconContainer'}
			imgClasses={'bigIcon'}
			type={'button'}
			imgPath={burgerMenuClose}
			onClick={handleIsOpenBurgerMenu}
		/>
	) : (
		<Button
			buttonClasses={'tertiaryIconOnlyButton burgerMenuBtn'}
			divClasses={'bigIconContainer'}
			imgClasses={'bigIcon'}
			type={'button'}
			imgPath={burgerMenuOpen}
			onClick={handleIsOpenBurgerMenu}
		/>
	);

	return (
		<header className={s.header}>
			<div className={s.container}>
				<Logotype />
				<Menu />
				<div className={s.btnWrapper}>
					<Button
						buttonClasses={'primaryTextOnlyButton helpBtn'}
						type={'button'}
						name={'Допомогти'}
						onClick={() => console.log('Клік Допомогти')}
					/>
					{authBtn}
				</div>
				{menuBtn}
			</div>
		</header>
	);
};

export default Header;
