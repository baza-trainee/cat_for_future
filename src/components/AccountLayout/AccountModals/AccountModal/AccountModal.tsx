import React, { useEffect } from 'react';

import s from './AccountModal.module.scss';

import close from 'src/assets/icons/close_black.svg';
import Button from 'src/components/Button/Button';
import { useNavigate } from 'react-router';

interface ModalProps {
	title: string;
	text: string;
	status: boolean;
}

const AccountModal: React.FC<ModalProps> = ({ text, title, status }) => {
	const navigate = useNavigate();
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const onDismiss = () => {
		navigate(-1);
	};

	useEffect(() => {
		const escFunction = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onDismiss();
			}
		};

		if (status) {
			document.addEventListener('keyup', escFunction, false);
			return () => {
				document.removeEventListener('keyup', escFunction, false);
			};
		}
	}, [status, onDismiss]);

	const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === e.currentTarget) {
			onDismiss();
		}
	};

	return (
		<div className={s.backdrop} onClick={handleModalClick}>
			<div className={s.modalWrapper}>
				<div className={s.btnCloseWrapper}>
					<button onClick={onDismiss} ref={buttonRef}>
						<img className={s.close} src={close} alt="Close" />
					</button>
				</div>
				<h3 className={s.title}>{title}</h3>
				<p className={s.textWrapper}>{text}</p>

				<div className={s.btnWrapper}>
					<Button
						buttonClasses={'primaryBtn'}
						type={'submit'}
						name={'Оплатити'}
						onClick={() => console.log(`you want ${title} `)}
						styleBtn={{ width: '100%' }}
					/>
					<Button
						buttonClasses={'primaryBtn'}
						type={'submit'}
						name={'Оплатити'}
						onClick={() => console.log(`you want ${title} `)}
						styleBtn={{ width: '100%', backgroundColor: 'none', border: ' 1px solid black' }}
					/>
				</div>
			</div>
		</div>
	);
};

export default AccountModal;
