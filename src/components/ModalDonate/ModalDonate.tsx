import React, { useState } from 'react';
import s from './ModalDonate.module.scss';
import closeIcon from '../../assets/modal/Close.svg';
import Button from 'src/components/Button/Button';
// import axios from "axios";

interface ModalProps {

	onClose: () => void;
}

const ModalDonate = ({onClose }: ModalProps) => {
	const [selectedSumOption, setSelectedSumOption] = useState<string>('');

	const handleSumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(selectedSumOption);
		setSelectedSumOption(event.target.value);
	};



  const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
	return (
		<div className={s.backdrop} onClick={handleModalClick }>
			<div id={`js-bhx-modal-custom__wrapper-donate`} className={`modalClose ${s.modalWrapper}`}>
				<div className={`aniModalOpening ${s.modalBody} ${'modalBodyFull'}`}>
					<button className={s.modalCloseBtn} type="button" onClick={onClose}>
						<img src={closeIcon} alt="close modal" />
					</button>
					<section className={s.contentWrapper}>
						<div className={s.textWrapper}>
							<p className={s.text}>Зібрані кошти йдуть на харчування та медичну допомогу</p>
						</div>
						<form action="#">
							<div className={s.radioWrapper}>
								<div className={s.optionsWrapperUp}>
									<label className={selectedSumOption === 'option1' ? s.selected : ''}>
										<input
											className={s.optionIndicatorSum}
											type="radio"
											value="option1"
											checked={selectedSumOption === 'option1'}
											onChange={handleSumChange}
										/>
										100 UAH
									</label>

									<label className={selectedSumOption === 'option2' ? s.selected : ''}>
										<input
											className={s.optionIndicatorSum}
											type="radio"
											value="option2"
											checked={selectedSumOption === 'option2'}
											onChange={handleSumChange}
										/>
										200 UAH
									</label>
								</div>

								<div className={s.optionsWrapperDown}>
									<label className={selectedSumOption === 'option3' ? s.selected : ''}>
										<input
											className={s.optionIndicatorSum}
											type="radio"
											value="option3"
											checked={selectedSumOption === 'option3'}
											onChange={handleSumChange}
										/>
										500 UAH
									</label>

									<label className={s.otherSum}>
										<input
											className={s.otherValue}
											type="number"
											onFocus={() => setSelectedSumOption('')}
											onChange={handleSumChange}
											placeholder="Інша сума, UAH "
										/>
									</label>
								</div>
							</div>
							<div className={s.btnWrapper}>
								<Button
									buttonClasses={'primaryBtn helpBtn'}
									type={'submit'}
									name={'Оплатити'}
									onClick={() => console.log('go to Wayforpay')}
								/>
							</div>
						</form>
					</section>
				</div>
			</div>
		</div>
	);
};

export default ModalDonate;
