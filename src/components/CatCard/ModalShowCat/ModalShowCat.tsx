import React from 'react';
import s from './ModalShowCat.module.scss';

import { ReactComponent as Close } from 'src/assets/icons/login-close-btn.svg';

interface ModalShowCatProps {
	children: React.ReactNode;
	closeModal: () => void;
}

const ModalShowCat: React.FC<ModalShowCatProps> = ({ children, closeModal }) => {
	const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	return (
		<div className={s.backdrop} onClick={handleBackdropClick}>
			<div className={s.wrapper}>
				<Close className={s.closeIcon} onClick={closeModal} />
				{children}
			</div>
		</div>
	);
};

export default ModalShowCat;
