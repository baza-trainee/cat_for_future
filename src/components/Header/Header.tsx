import { useState } from 'react';
import { useNavigate } from 'react-router';

import Logotype from 'src/components/Logotype/Logotype';
import Menu from 'src/components/Menu/Menu';
import Button from 'src/components/Button/Button';
import BurgerMenu from 'src/components/Header/BurgerMenu/BurgerMenu';

import s from './Header.module.scss';

import { ReactComponent as Login } from 'src/assets/icons/header/log-in-icon.svg';
import { ReactComponent as BurgerMenuOpen } from 'src/assets/icons/header/burger-menu-open-icon.svg';
import { ReactComponent as BurgerMenuClose } from 'src/assets/icons/header/burger-menu-close-icon.svg';
import { useActions } from 'src/hooks/useActions';

interface HeaderProps {
	onOpenModalDonate: () => void;
}
const Header: React.FC<HeaderProps> = ({ onOpenModalDonate }) => {
	const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState<boolean>(false);
	const { showLogin } = useActions();

	const isLogin: boolean = !!localStorage.getItem('token');

	const navigate = useNavigate();

	const handleIsLogin = () => {
		!isLogin ? showLogin(true) : null;
		closeBurgerMenu();
	};

	const handleIsOpenBurgerMenu = () => {
		setIsOpenBurgerMenu((prev) => !prev);
	};

	const closeBurgerMenu = () => {
		setIsOpenBurgerMenu(false);
	};

	const handleNavigateToCabinet = () => {
		navigate('/account');
		closeBurgerMenu();
	};

	return (
		<>
			<header id="header" className={s.header}>
				<div className={s.container}>
					<Logotype onClick={closeBurgerMenu} />
					<Menu navClass="headerMenu" />
					<div className={s.btnWrapper}>
						<Button
							buttonClasses={'primaryBtn helpHeaderBtn'}
							type={'button'}
							name={'Допомогти'}
							onClick={onOpenModalDonate}
						/>
						<Button
							buttonClasses={'secondaryBtn  secondaryIconLeft'}
							type={'button'}
							name={isLogin ? 'Кабінет' : 'Вхід'}
							children={<Login className={s.icon} />}
							onClick={isLogin ? handleNavigateToCabinet : handleIsLogin}
						/>
					</div>
					<Button
						buttonClasses={'bigIconContainer burgerMenuBtn'}
						type={'button'}
						children={
							isOpenBurgerMenu ? (
								<BurgerMenuClose className={s.icon} />
							) : (
								<BurgerMenuOpen className={s.icon} />
							)
						}
						onClick={handleIsOpenBurgerMenu}
					/>
				</div>
			</header>
			{isOpenBurgerMenu && (
				<BurgerMenu onOpenModalDonate={onOpenModalDonate} closeBurgerMenu={closeBurgerMenu} />
			)}
		</>
	);
};

export default Header;
