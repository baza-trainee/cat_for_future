import { CSSProperties, FC, MouseEvent } from 'react';

import s from './ModalBack.module.scss';

import { ReactComponent as Close } from 'src/assets/icons/login-close-btn.svg';

interface ModalWhiteCatProps {
	children: React.ReactNode;
	handleCloseModal: () => void;
	wrapStyle?: CSSProperties;
}

const ModalWhiteCat: FC<ModalWhiteCatProps> = ({ children, handleCloseModal, wrapStyle }) => {
	const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			handleCloseModal();
		}
	};

	return (
		<div className={s.backdrop} onClick={handleModalClick}>
			<div className={s.modalWrapper}>
				<Close onClick={handleCloseModal} className={s.closeIcon} />
				<div className={s.insideWrapper} style={wrapStyle}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default ModalWhiteCat;
