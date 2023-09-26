import React from 'react';
import s from './ShowCatModal.module.scss';

import { ReactComponent as Close } from 'src/assets/icons/login-close-btn.svg';

interface ShowCatModalProps {
	children: React.ReactNode;
	closeModal: () => void;
}

const ShowCatModal: React.FC<ShowCatModalProps> = ({ children, closeModal }) => {
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

export default ShowCatModal;
