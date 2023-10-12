import { CSSProperties, FC, MouseEvent } from 'react';

import s from './ModalBack.module.scss';

import { ReactComponent as Close } from 'src/assets/icons/login-close-btn.svg';

<<<<<<< HEAD
interface ModalBackProps {
	children: React.ReactNode;
	handleCloseModal: () => void;
	handleClickModalBack?: () => void;
	wrapStyle?: CSSProperties;
}

const ModalBack: FC<ModalBackProps> = ({
	children,
	handleCloseModal,
	handleClickModalBack,
	wrapStyle,
}) => {
	const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
		if (handleClickModalBack && e.target === e.currentTarget) {
			handleClickModalBack();
=======
interface ModalWhiteCatProps {
	children: React.ReactNode;
	handleCloseModal: () => void;
	wrapStyle?: CSSProperties;
}

const ModalWhiteCat: FC<ModalWhiteCatProps> = ({ children, handleCloseModal, wrapStyle }) => {
	const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			handleCloseModal();
>>>>>>> ccdf1e7 (feat/32-exit-remove-bugs-35-36-fix)
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

<<<<<<< HEAD
export default ModalBack;
=======
export default ModalWhiteCat;
>>>>>>> ccdf1e7 (feat/32-exit-remove-bugs-35-36-fix)
