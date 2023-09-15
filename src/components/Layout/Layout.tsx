import React, { useState } from "react";
import s from "./Layout.module.scss";
import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CookieConsentBanner from "../CookieConsentBanner/CookieConsentBanner";
import ModalDonate from "../ModalDonate/ModalDonate";

const Layout: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className={s.wrapper}>
			<CookieConsentBanner />
			{/* {isModalOpen && <ModalDonate onClose={closeModal} />} */}
			{isModalOpen && (
				<ModalDonate
					status={true}
					closeModal={closeModal}
					onClose={closeModal}
				/>
			)}

			<Header onOpenModalDonate={openModal} />
			<main className={s.main}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
