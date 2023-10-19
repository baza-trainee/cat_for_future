import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import s from './AccountModal.module.scss';
import './animations.scss';

import close from 'src/assets/icons/close_black.svg';
import Button from 'src/components/Button/Button';

interface ModalProps {
	title: string;
	text: string;
	status: boolean;
}

const AccountModal: React.FC<ModalProps> = ({ text, title, status }) => {
	const navigate = useNavigate();
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const [isVisible, setIsVisible] = useState(status);

	const onDismiss = () => {
		setIsVisible(false);
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

	const handleAnimationEnd = () => {
		if (!isVisible) {
			navigate(-1);
		}
	};

	const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === e.currentTarget) {
			onDismiss();
		}
	};

	return (
		<div
			className={`${s.backdrop} ${isVisible ? 'fadeIn' : 'fadeOut'}`}
			onClick={handleModalClick}
			onAnimationEnd={handleAnimationEnd}
		>
			<div className={s.modalWrapper}>
				<section className={s.contentWrapper}>
					<div className={s.btnCloseWrapper}>
						<button onClick={onDismiss} ref={buttonRef} className={s.closeBtn}>
							<img className={s.close} src={close} alt="Close" />
						</button>
					</div>

					<h3 className={s.title}>{title}</h3>
					<p className={s.text}>{text}</p>

					<div className={s.btnWrapper}>
						<button className={s.backBtn} type="button" onClick={onDismiss}>
							Назад
						</button>
						<Button
							buttonClasses={'primaryBtn'}
							type={'submit'}
							name={`${title === 'Видалення акаунта' ? 'Видалити' : 'Вихід'}`}
							onClick={() => console.log(`you want ${title} `)}
							styleBtn={{
								width: '12.5rem',
								height: '3.5rem',
								padding: '1rem 4.3125rem',
								fontSize: '1.125rem',
							}}
						/>
					</div>
				</section>
			</div>
		</div>
	);
};

export default AccountModal;
