import { CSSProperties, FC } from 'react';

import s from './ModalBack.module.scss';

import { ReactComponent as Close } from 'src/assets/icons/login-close-btn.svg';

import { useEscape } from 'src/hooks/useEscape';
import { onClickModalBack } from 'src/utils/onClickModalBack';

interface ModalBackProps {
	children: React.ReactNode;
	handleCloseModal: () => void;
	wrapStyle?: CSSProperties;
}

const ModalBack: FC<ModalBackProps> = ({ children, handleCloseModal, wrapStyle }) => {
	useEscape(handleCloseModal);

	return (
		<div className={s.backdrop} onClick={(e) => onClickModalBack(e, handleCloseModal)}>
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
