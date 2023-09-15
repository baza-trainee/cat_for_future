import React, { useEffect, useState } from "react";
import css from "./ModalDonate.module.scss";
import closeIcon from "../../assets/modal/Close.svg";
import Button from "src/components/Button/Button";
import { useMediaQuery } from "react-responsive";
// import axios from "axios";

interface IProps {
	modal: string;
	status: boolean;
	closeModal: any;
	size?: "FULL";
	children?: React.ReactNode;
	onClose: () => void;
}

const ModalDonate = ({ size, status, closeModal, modal, onClose }: IProps) => {
	const [mouseClickTarget, setMouseClickTarget] = useState(false);

	const escFunction = (e: any) => {
		if (e.key === "Escape") {
			closeModal(modal);
		}
	};

	useEffect((): any => {
		if (status) {
			document.addEventListener("keyup", escFunction, false);
			return () => {
				document.removeEventListener("keyup", escFunction, false);
			};
		}
	}, [size, modal, status]);

	useEffect(() => {
		const bhxModalCustomWrapperAll = document.querySelectorAll(".modalClose");
		const bhxModalCustomAll = document.querySelectorAll(".backdrop");
		const handleClickModalDown = (e: any) => {
			if (e.target.classList.contains("modalClose")) {
				setMouseClickTarget(true);
			}
		};
		const handleClickModalUp = (e: any) => {
			if (e.target.classList.contains("modalClose") && mouseClickTarget) {
				bhxModalCustomWrapperAll.forEach(element => {
					element.removeEventListener("mousedown", handleClickModalDown, false);
					element.removeEventListener("mouseup", handleClickModalUp, false);
				});
				closeModal(modal);
				setMouseClickTarget(false);
			}
		};

		if (status) {
			bhxModalCustomWrapperAll.forEach(element => {
				element.addEventListener("mousedown", handleClickModalDown, false);
				element.addEventListener("mouseup", handleClickModalUp, false);
			});
		} else {
			bhxModalCustomAll.forEach(element => {
				// eslint-disable-next-line no-param-reassign
				element.scrollTop = 0;
			});
		}
	}, [status, mouseClickTarget]);

	const [selectedSumOption, setSelectedSumOption] = useState("");
	const [inputSum, setInputSum] = useState("");

	const handleSumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedSumOption(event.target.value);
	};

	const handleInputSum = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputSum(event.target.value);
	};

	const isDesktop = useMediaQuery({ minWidth: 1280 });
	const isTablet = useMediaQuery({ minWidth: 767, maxWidth: 1279.99 });

	const stylesForBtn = {
		width: isDesktop ? "20.4375rem" : isTablet ? "20.4375rem" : "16.75rem",
		height: isDesktop ? "3.5rem" : isTablet ? "3.25rem" : "3rem",
	};

	return (
		<>
			<div
				className={css.backdrop}
				style={{ display: status ? "block" : "none" }}
			>
				<div
					id={`js-bhx-modal-custom__wrapper-${modal}`}
					className={`modalClose ${css.modalWrapper}`}
				>
					<div className={`aniModalOpening ${css.modalBody} ${size === "FULL" && "modalBodyFull"}`}>
						<button
							className={css.modalCloseBtn}
							type="button"
							onClick={onClose}
						>
							<img
								src={closeIcon}
								alt="close modal"
							/>
						</button>
						<section className={css.contentWrapper}>
							<div className={css.textWrapper}>
								<p className={css.text}>Зібрані кошти йдуть на харчування та медичну допомогу</p>
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
		</>
	);
};

export default ModalDonate;
