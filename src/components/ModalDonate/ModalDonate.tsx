import React, { useEffect, useState } from 'react';

import s from './ModalDonate.module.scss';

import close from 'src/assets/icons/close_white.svg';
import Button from 'src/components/Button/Button';

interface DonateAmount {
	id: number;
	amount: string;
}

interface ModalProps {
	onClose: () => void;
}

const ModalDonate: React.FC<ModalProps> = ({ onClose }) => {
	const donate: DonateAmount[] = [
		{ id: 1, amount: '100' },
		{ id: 2, amount: '200' },
		{ id: 3, amount: '500' },
	];

	const [selectedAmount, setSelectedAmount] = useState<string>('');

	useEffect(() => {
		const escFunction = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (status) {
			document.addEventListener('keyup', escFunction, false);
			return () => {
				document.removeEventListener('keyup', escFunction, false);
			};
		}
	}, [status, onClose]);

	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(selectedAmount);
		setSelectedAmount(event.target.value);
	};

	const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div className={s.backdrop}>
			<div className={s.modalWrapper} onClick={handleModalClick}>
				<div className={s.modalBanner}>
					<img className={s.close} onClick={onClose} src={close} alt="Close" />
				</div>
				<div className={s.textWrapper}>
					<p>Зібрані кошти йдуть на харчування та медичну допомогу</p>
				</div>
				<form action="#" className={s.formDonate}>
					<div className={s.donatesAmountWrapper}>
						{donate.map(({ id, amount }) => (
							<button
								key={id}
								className={`${s.donateAmount} ${selectedAmount === amount ? s.selected : ''}`}
								type="button"
								onClick={() => setSelectedAmount(amount)}
							>
								{amount} UAH
							</button>
						))}
						<input
							id="myInput"
							className={s.donateAmount}
							type="number"
							step={0.01}
							onFocus={() => setSelectedAmount('')}
							onChange={handleAmountChange}
							placeholder="введи UAH"
						/>
					</div>
					<div className={s.btnWrapper}>
						<Button
							buttonClasses={'primaryBtn'}
							type={'submit'}
							name={'Оплатити'}
							onClick={() => console.log(`go to Wayforpay amount ${selectedAmount}`)}
							styleBtn={{ width: '100%' }}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ModalDonate;
