import { CSSProperties, FC, MouseEvent } from 'react';

import s from './ModalBack.module.scss';

import { ReactComponent as Close } from 'src/assets/icons/login-close-btn.svg';

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

export default ModalBack;
