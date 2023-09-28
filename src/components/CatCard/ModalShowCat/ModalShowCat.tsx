import React from 'react';
import s from './ModalShowCat.module.scss';

import { ReactComponent as Close } from 'src/assets/icons/login-close-btn.svg';
import clsx from 'clsx';

interface ModalShowCatProps {
	children: React.ReactNode;
	closeModal: () => void;
	variant?: 'tabletModal' | 'desktopModal';
}

const ModalShowCat: React.FC<ModalShowCatProps> = ({ children, closeModal, variant }) => {
	const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	return (
		<div className={s.backdrop} onClick={handleBackdropClick}>
			<div className={s.wrapper}>
				<Close
					className={clsx(s.closeIcon, variant === 'desktopModal' && s.desktopModal)}
					onClick={closeModal}
				/>
				{children}
			</div>
		</div>
	);
};

export default ModalShowCat;
