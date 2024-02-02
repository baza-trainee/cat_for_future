import s from './ModalMsg.module.scss';

import ModalBack from 'src/components/ModalBack/ModalBack';
import Button from 'src/components/Button/Button';
import greenCheck from 'src/assets/images/green_check.png';

interface ModalMsgProps {
	btnText: string;
	title: string;
	handleBtnClick: () => void;
	handleCloseModal: () => void;
	styleBtn?: React.CSSProperties;
}

const ModalMsg = ({
	btnText,
	title,
	handleBtnClick,
	handleCloseModal,
	styleBtn,
}: ModalMsgProps) => {
	return (
		<ModalBack handleCloseModal={handleCloseModal}>
			<img src={greenCheck} alt="green click" className={s.img} />
			<h2 className={s.title}>{title}</h2>
			<Button
				buttonClasses={'primaryBtn'}
				type={'button'}
				name={btnText}
				styleBtn={{ minWidth: '8.75rem', width: '100%', ...styleBtn }}
				onClick={handleBtnClick}
			/>
		</ModalBack>
	);
};

export default ModalMsg;
