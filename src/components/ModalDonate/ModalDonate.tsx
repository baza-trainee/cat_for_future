import React, { useEffect, useState } from "react";
import s from "./ModalDonate.module.scss";
import closeIcon from "../../assets/modal/Close.svg";
import Button from "src/components/Button/Button";
import { useMediaQuery } from "react-responsive";

interface ModalProps {
	status: boolean;
	closeModal: () => void;
	size?: "FULL";
	style?: React.CSSProperties;
	onClose: () => void;
}

const ModalDonate = ({ onClose, size, status, closeModal }: ModalProps) => {
	useEffect(() => {
		const escFunction = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeModal();
			}
		};

		if (status) {
			document.addEventListener("keyup", escFunction, false);
			return () => {
				document.removeEventListener("keyup", escFunction, false);
			};
		}
	}, [size, status, closeModal]);

	const [selectedSumOption, setSelectedSumOption] = useState<string>("");

	const handleSumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedSumOption(event.target.value);
	};

	const isDesktop = useMediaQuery({ minWidth: 1280 });
	const isTablet = useMediaQuery({ minWidth: 767, maxWidth: 1279.99 });

	const stylesForBtn = {
		width: isDesktop ? "20.4375rem" : isTablet ? "20.4375rem" : "16.75rem",
		height: isDesktop ? "3.5rem" : isTablet ? "3.25rem" : "3rem",
	};

	const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className={s.backdrop}
			style={{ display: status ? "block" : "none" }}
		>
			<div
				className={`modalClose ${s.modalWrapper}`}
				onClick={handleModalClick}
			>
				<div className={`aniModalOpening ${s.modalBody} ${size === "FULL" && "modalBodyFull"}`}>
					<button
						className={s.modalCloseBtn}
						type="button"
						onClick={onClose}
					>
						<img
							src={closeIcon}
							alt="close modal"
						/>
					</button>
					<section className={s.contentWrapper}>
						<div className={s.textWrapper}>
							<p className={s.text}>Зібрані кошти йдуть на харчування та медичну допомогу</p>
						</div>
						<form action="#">
							<div className={s.radioWrapper}>
								<div className={s.optionsWrapperUp}>
									<label className={selectedSumOption === "option1" ? s.selected : s.notSelected}>
										<input
											className={s.optionIndicatorSum}
											type="radio"
											value="option1"
											checked={selectedSumOption === "option1"}
											onChange={handleSumChange}
										/>
										100 UAH
									</label>

									<label className={selectedSumOption === "option2" ? s.selected : s.notSelected}>
										<input
											className={s.optionIndicatorSum}
											type="radio"
											value="option2"
											checked={selectedSumOption === "option2"}
											onChange={handleSumChange}
										/>
										200 UAH
									</label>
								</div>

								<div className={s.optionsWrapperDown}>
									<label className={selectedSumOption === "option3" ? s.selected : s.notSelected}>
										<input
											className={s.optionIndicatorSum}
											type="radio"
											value="option3"
											checked={selectedSumOption === "option3"}
											onChange={handleSumChange}
										/>
										500 UAH
									</label>

									<label className={s.otherSum}>
										<input
											className={s.otherValue}
											type="number"
											onFocus={() => setSelectedSumOption("")}
											onChange={handleSumChange}
											placeholder="Інша сума, UAH "
										/>
									</label>
								</div>
							</div>
							<div className={s.btnWrapper}>
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
	);
};

export default ModalDonate;
