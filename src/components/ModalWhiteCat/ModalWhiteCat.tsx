import React, { useState } from 'react';

import s from 'src/components/ModalWhiteCat/ModalWhiteCat.module.scss';

import close from 'src/assets/icons/login-close-btn.svg';
import Button from 'src/components/Button/Button';

interface ModalWhiteCatProps {
	image: string;
	message: string;
	name: string;
	onClick: () => void;
}

const ModalWhiteCat: React.FC<ModalWhiteCatProps> = ({ image, message, name, onClick }) => {
	const [showModal, setShowModal] = useState<boolean>(true);

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		showModal && (
			<div className={s.backdrop}>
				<div className={s.modalWrapper}>
					<div className={s.modalCloser}>
						<img className={s.close} onClick={closeModal} src={close} alt="Close " />
					</div>

					<div className={s.textWrapper}>
						<p>{message}</p>
					</div>

					<div className={s.imgWrapper}>
						<img src={image} />
					</div>

					<div className={s.btnWrapper}>
						<Button
							buttonClasses={'primaryBtn'}
							type={'button'}
							name={name}
							styleBtn={{ width: '100%' }}
							onClick={onClick}
						/>
					</div>
				</div>
			</div>
		)
	);
};

export default ModalWhiteCat;
