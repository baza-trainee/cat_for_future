import { useEffect, useState } from 'react';
import css from 'src/pages/RegistrationPage/Form/RegistrationPage.module.scss';
import { checkboxData } from 'src/pages/RegistrationPage/checkboxData.tsx';
import { ErrorMessage, Field } from 'formik';
import Button from 'src/components/Button/Button.tsx';

const CheckBoxes = ({
	checkboxesState,
	setCheckboxesState,
	isValid,
	error,
	prev,
}: {
	checkboxesState: Array<boolean>;
	setCheckboxesState: (checkboxes: Array<boolean>) => void;
	isValid: boolean;
	prev: () => void;
	error: string;
}) => {
	const [allChecked, setAllChecked] = useState<boolean>(false);

	useEffect(() => {
		const areAllCheckboxesChecked = checkboxesState.every((checkbox) => checkbox === true);

		setAllChecked(areAllCheckboxesChecked);
	}, [checkboxesState]);

	const handleCheckboxChange = (index: number) => {
		const updatedCheckboxes = [...checkboxesState];
		updatedCheckboxes[index] = !updatedCheckboxes[index];
		setCheckboxesState(updatedCheckboxes);
	};

	return (
		<section className={`${css.checkboxSection} slideInLeft`}>
			<div className={css.checkboxContainer}>
				<h2 className={css.titleSignup}>Реєстрація</h2>
				<p className={css.inputText}>
					Для завершення реєстрації вам необхідно зробити позначки в обов’язкових полях
				</p>

				<div className={css.checkboxes}>
					{checkboxData.map((item, index) => (
						<label key={index} className={`${css.check} ${css.option}`}>
							<Field
								className={css.checkInput}
								control="checkbox"
								type="checkbox"
								name={`checkbox[${index}]`}
								id={`checkbox${index}`}
								checked={checkboxesState[index]}
								onChange={() => handleCheckboxChange(index)}
							/>
							<span className={css.checkBox}></span>
							{item.linkText ? (
								<span>
									{' '}
									{item.text} - я ознайомлений з{' '}
									<a
										href={item.linkUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={css.docsRef}
									>
										{' '}
										{item.linkText}{' '}
									</a>{' '}
									{item.textAfter}
								</span>
							) : (
								<span>{item.text}</span>
							)}
						</label>
					))}
				</div>
				<ErrorMessage className={css.error} name="checkbox" component="div" />

				<div className={css.btnWrapper}>
					{error && <div className={css.regError}>{error}</div>}
					<Button
						buttonClasses={'primaryBtn'}
						type={'submit'}
						name={'Зареєструватися'}
						disabled={isValid || !allChecked || !!error}
						styleBtn={{ width: '100%' }}
					/>
				</div>
				<button className={css.linkMob} type="button" onClick={prev}></button>
			</div>
		</section>
	);
};

export default CheckBoxes;