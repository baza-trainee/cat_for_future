import s from './ModalMsg.module.scss';

import ModalBack from 'src/components/ModalBack/ModalBack';
import Button from 'src/components/Button/Button';
import greenCheck from 'src/assets/images/green_check.png';

interface ModalMsgProps {
	name: string;
	handleBtnClick: () => void;
	handleCloseModal: () => void;
}

const ModalMsg = ({ name, handleBtnClick, handleCloseModal }: ModalMsgProps) => {
	return (
		<ModalBack handleCloseModal={handleCloseModal}>
			<img src={greenCheck} alt="green click" className={s.img} />
			<h2 className={s.title}>Пароль успішно змінено!</h2>
			<Button
				buttonClasses={'primaryBtn'}
				type={'button'}
				name={name}
				styleBtn={{ minWidth: '8.75rem' }}
				onClick={handleBtnClick}
			/>
		</ModalBack>
	);
};

export default ModalMsg;
