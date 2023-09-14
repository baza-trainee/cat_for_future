import { useState } from "react";

import Logotype from "src/components/Logotype/Logotype";
import Menu from "src/components/Menu/Menu";
import Button from "src/components/Button/Button";

import s from "./Header.module.scss";

import logIn from "src/assets/icons/header/log-in-icon.svg";
import logOut from "src/assets/icons/header/log-out-icon.svg";
import burgerMenuOpen from "src/assets/icons/header/burger-menu-open-icon.svg";
import burgerMenuClose from "src/assets/icons/header/burger-menu-close-icon.svg";

// ---------------------modal------------------------------------------------------
import ModalDonate from "../ModalDonate/ModalDonate";
// -----------------------------------------------------------------------------

const Header: React.FC = () => {
	const [isLogin, setIsLogin] = useState(false);
	const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
	const handleIsLogin = () => {
		setIsLogin(prev => !prev);
	};

	const handleIsOpenBurgerMenu = () => {
		setIsOpenBurgerMenu(prev => !prev);
	};

	// --------------------modal-------------------------------------------------
	type modalIndex = "DONATE_MODAL";

	const [modalState, setModalState] = useState({
		DONATE_MODAL: { status: false },
	});

	const openModal = (modalName: modalIndex) => {
		setModalState({ ...modalState, [modalName]: { status: true } });
	};

	const closeModal = (modalName: modalIndex) => {
		const documentBody: HTMLBodyElement | null = document.querySelector("body");
		if (documentBody !== null) {
			documentBody.className = "";
		}
		setModalState({ ...modalState, [modalName]: { status: false } });
	};
	// -----------------------------------------------------------------------------

	return (
		<header className={s.header}>
			<div className={s.container}>
				<Logotype />
				<Menu />
				<div className={s.btnWrapper}>
					<Button
						buttonClasses={"primaryBtn helpBtn"}
						type={"button"}
						name={"Допомогти"}
						onClick={() => openModal("DONATE_MODAL")}
					/>
					<Button
						buttonClasses={"secondaryIconLeftBtn"}
						divClasses={"miniIconContainer"}
						imgClasses={"miniIconContainer"}
						type={"button"}
						name={isLogin ? "Вихід" : "Вхід"}
						imgPath={isLogin ? logOut : logIn}
						onClick={handleIsLogin}
					/>
				</div>
				<Button
					buttonClasses={"tertiaryIconBtn burgerMenuBtn"}
					divClasses={"bigIconContainer"}
					imgClasses={"bigIcon"}
					type={"button"}
					imgPath={isOpenBurgerMenu ? burgerMenuClose : burgerMenuOpen}
					onClick={handleIsOpenBurgerMenu}
				/>
			</div>
			<ModalDonate
				status={modalState.DONATE_MODAL.status}
				closeModal={closeModal}
				modal="DONATE_MODAL"
				onClose={() => closeModal("DONATE_MODAL")}
			></ModalDonate>
		</header>
	);
};

export default Header;
