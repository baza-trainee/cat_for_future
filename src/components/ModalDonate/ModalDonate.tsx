import React, { useEffect, useState } from 'react';

import s from './ModalDonate.module.scss';

import close from 'src/assets/icons/close_white.svg';
import Button from 'src/components/Button/Button';

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

	const donate: DonateAmount[] = [
		{ id: 1, amount: '100' },
		{ id: 2, amount: '200' },
		{ id: 3, amount: '500' },
	];

	const [selectedId, setSelectedId] = useState<number | null>(null);

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
			// onClose();
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

	// const merchantAccount = import.meta.env.VITE_MERCHANT_ACCOUNT;
	// const merchantDomainName = 'cat-for-future-9qj7.vercel.app';
	// const orderReference = Date.now().toString();
	// const orderDate = Date.now().toString();
	// const amount = price;
	// const currency = 'UAH';
	// const productName = ['Кіт на виріст'];
	// const productCount = ['1'];
	// const productPrice = [price];
	// const message = [
	// 	merchantAccount,
	// 	merchantDomainName,
	// 	orderReference,
	// 	orderDate,
	// 	amount,
	// 	currency,
	// 	...productName,
	// 	...productCount,
	// 	...productPrice,
	// ].join(';');
	// const wordArray = CryptoJS.enc.Utf8.parse(message);
	// const hash = CryptoJS.HmacMD5(wordArray, `${import.meta.env.VITE_WAY_FOR_PAY_KEY}`).toString();

	return (
		// <div className={`${s.backdrop} ${!status ? s.fadeOut : ''}`} onClick={handleModalClick}>
		<div
			className={`${s.backdrop} ${isVisible ? s.fadeIn : s.fadeOut}`}
			onClick={handleModalClick}
			onAnimationEnd={handleAnimationEnd}
		>
			<div className={s.modalWrapper}>
				{/* <div className={`${s.modalWrapper} ${isVisible ? s.fadeIn : s.fadeOut}`}> */}
				<div className={s.modalBanner}>
					<img className={s.close} onClick={handleModalClick} src={close} alt="Close" />
				</div>
				<div className={s.textWrapper}>
					<p>Зібрані кошти йдуть на харчування та медичну допомогу</p>
				</div>
				<form
					// method="post"
					// action="https://secure.wayforpay.com/pay"
					// accept-сharset="utf-8"
					className={s.formDonate}
				>
					{/* <input
						className={s.hiddenInput}
						name="merchantAccount"
						value={`${import.meta.env.VITE_MERCHANT_ACCOUNT}`}
						readOnly
					/>
					<input
						className={s.hiddenInput}
						name="merchantAuthType"
						value="SimpleSignature"
						readOnly
					/>
					<input
						className={s.hiddenInput}
						name="merchantDomainName"
						value="cat-for-future-9qj7.vercel.app"
						readOnly
					/>
					<input
						className={s.hiddenInput}
						name="returnUrl"
						value="https://cat-for-future-9qj7.vercel.app/return"
						readOnly
					/>
					<input className={s.hiddenInput} name="merchantSignature" value={hash} readOnly />
					<input className={s.hiddenInput} name="orderReference" value={orderReference} readOnly />
					<input className={s.hiddenInput} name="orderDate" value={orderDate} readOnly /> */}

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
							max={10000}
							required
						/>
					</div>

					<div className={s.btnWrapper}>
						<Button
							buttonClasses={'primaryBtn'}
							type={'submit'}
							name={'Оплатити'}
							styleBtn={{ width: '100%' }}
						/>
					</div>
					{/* <input className={s.hiddenInput} name="currency" value="UAH" readOnly />
					<input className={s.hiddenInput} name="productName[]" value="Кіт на виріст" readOnly />
					<input className={s.hiddenInput} name="productPrice[]" value={price} readOnly />
					<input className={s.hiddenInput} name="productCount[]" value="1" readOnly /> */}
				</form>
			</div>
		</div>
	);
};

export default ModalDonate;
