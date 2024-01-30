import React, { useEffect, useState } from 'react';
import s from './ModalDonate.module.scss';
import close from 'src/assets/icons/close_white.svg';
import Button from 'src/components/Button/Button';
import usePaymentHandler from 'src/hooks/usePaymentHandler';

interface DonateAmount {
	id: number;
	amount: string;
}

interface ModalProps {
	status: boolean;
	onClose: () => void;
}

const ModalDonate: React.FC<ModalProps> = ({ onClose, status }) => {
	const [isVisible, setIsVisible] = useState(status);
	const [price, setPrice] = useState('');
	const setValue = (value: string) => {
		setPrice(value);
	};

	const { handlePayment } = usePaymentHandler();

	useEffect(() => {
		if (status) {
			setIsVisible(true);
			document.addEventListener('keyup', escFunction, false);
			return () => {
				document.removeEventListener('keyup', escFunction, false);
			};
		}
	}, [status, onClose]);

	const escFunction = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			setIsVisible(false);
		}
	};

	const handleAnimationEnd = () => {
		if (!isVisible) {
			onClose();
			setIsVisible(false);
		}
	};

	const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === e.currentTarget) {
			setIsVisible(false);
		}
	};

	const handleSubmit = async () => {
		try {
			const paymentData = {
				amount: Number(price),
			};

			const paymentUrl = await handlePayment({ paymentData });

			if (paymentUrl) {
				window.location.href = paymentUrl;
			}
		} catch (error) {
			console.error(error);
		}
	};

	const donate: DonateAmount[] = [
		{ id: 1, amount: '100' },
		{ id: 2, amount: '200' },
		{ id: 3, amount: '500' },
	];

	const [selectedId, setSelectedId] = useState<number | null>(null);

	return (
		<div
			className={`${s.backdrop} ${isVisible ? s.fadeIn : s.fadeOut}`}
			onClick={handleModalClick}
			onAnimationEnd={handleAnimationEnd}
		>
			<div className={s.modalWrapper}>
				<div className={s.modalBanner}>
					<img className={s.close} onClick={handleModalClick} src={close} alt="Close" />
				</div>
				<div className={s.textWrapper}>
					<p>Зібрані кошти йдуть на харчування та медичну допомогу</p>
				</div>
				<form className={s.formDonate} noValidate>
					<div className={s.donatesAmountWrapper}>
						{donate.map(({ id, amount }) => (
							<button
								key={id}
								className={`${s.donateAmount} ${selectedId === id ? s.selected : ''}`}
								type="button"
								onClick={() => {
									setSelectedId(id);
									setValue(`${amount}`);
								}}
							>
								{amount} UAH
							</button>
						))}

						<input
							className={s.donateAmount}
							name="amount"
							value={price}
							onChange={(e) => setValue(e.target.value)}
							placeholder="Інша сума"
							type="number"
							min={1}
							required
							autoFocus
							onFocus={() => {
								setSelectedId(null);
							}}
						/>
					</div>

					<div className={s.btnWrapper}>
						<Button
							buttonClasses={'primaryBtn'}
							type={'button'}
							name={'Оплатити'}
							styleBtn={{ width: '100%' }}
							onClick={handleSubmit}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ModalDonate;
