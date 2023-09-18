import { useState } from 'react';

import Logotype from 'src/components/Logotype/Logotype';
import Menu from 'src/components/Menu/Menu';
import Button from 'src/components/Button/Button';

import s from './Header.module.scss';

import { ReactComponent as Login } from 'src/assets/icons/header/log-in-icon.svg';
import { ReactComponent as BurgerMenuOpen } from 'src/assets/icons/header/burger-menu-open-icon.svg';
import { ReactComponent as BurgerMenuClose } from 'src/assets/icons/header/burger-menu-close-icon.svg';
import BurgerMenu from 'src/components/Header/BurgerMenu/BurgerMenu';

interface HeaderProps {
	onOpenModalDonate: () => void;
	onOpenLoginWindow: (boolean: boolean) => void;
}
const Header: React.FC<HeaderProps> = ({ onOpenModalDonate, onOpenLoginWindow }) => {
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState<boolean>(false);

	const handleIsLogin = () => {
		setIsLogin((prev) => !prev);
		!isLogin ? onOpenLoginWindow(true) : null;
	};

	const handleIsOpenBurgerMenu = () => {
		setIsOpenBurgerMenu((prev) => !prev);
	};

	return (
		<>
			<header className={s.header}>
				<div className={s.container}>
					<Logotype />
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
							onClick={handleIsLogin}
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
			{isOpenBurgerMenu && <BurgerMenu onOpenModalDonate={onOpenModalDonate} />}
		</>
	);
};

export default Header;
