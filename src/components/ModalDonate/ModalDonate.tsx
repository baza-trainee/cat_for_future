import React, { useEffect, useState } from "react";
import css from "./ModalDonate.module.scss";
import closeIcon from "../../assets/modal/Close.svg";
import Button from "src/components/Button/Button";
import { useMediaQuery } from "react-responsive";
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


	const isDesktop = useMediaQuery({ minWidth: 1280 });
	const isTablet = useMediaQuery({ minWidth: 767, maxWidth: 1279.99 });

	const stylesForBtn = {
		width: isDesktop ? "20.4375rem" : isTablet ? "20.4375rem" : "16.75rem",
		height: isDesktop ? "3.5rem" : isTablet ? "3.25rem" : "3rem",
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
							<form action="#">
								<div className={css.radioWrapper}>
									<div className={css.optionsWrapperUp}>
										<label className={selectedSumOption === "option1" ? css.selected : ""}>
											<input
												className={css.optionIndicatorSum}
												type="radio"
												value="option1"
												checked={selectedSumOption === "option1"}
												onChange={handleSumChange}
											/>
											100 UAH
										</label>

										<label className={selectedSumOption === "option2" ? css.selected : ""}>
											<input
												className={css.optionIndicatorSum}
												type="radio"
												value="option2"
												checked={selectedSumOption === "option2"}
												onChange={handleSumChange}
											/>
											200 UAH
										</label>
									</div>

									<div className={css.optionsWrapperDown}>
										<label className={selectedSumOption === "option3" ? css.selected : ""}>
											<input
												className={css.optionIndicatorSum}
												type="radio"
												value="option3"
												checked={selectedSumOption === "option3"}
												onChange={handleSumChange}
											/>
											500 UAH
										</label>

										<label className={css.otherSum}>
											<input
												className={css.otherValue}
												type="number"
												onFocus={() => setSelectedSumOption("")}
												onChange={handleInputSum}
												placeholder="Інша сума, UAH "
											/>
										</label>
									</div>
								</div>
								<div className={css.btnWrapper}>
									<Button
										buttonClasses={"primaryBtn"}
										type={"submit"}
										name={"Оплатити"}
										onClick={() => console.log("go to Wayforpay")}
										styleBtn={stylesForBtn}
									/>
								</div>
							</form>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalDonate;
