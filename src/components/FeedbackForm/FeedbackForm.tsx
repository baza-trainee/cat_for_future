import React, { Dispatch, SetStateAction } from 'react';
import Button from 'src/components/Button/Button';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import s from 'src/components/FeedbackForm/FeedbackForm.module.scss';

interface FeedbackFormProps {
	setShowModal: Dispatch<SetStateAction<boolean>>;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ setShowModal }) => {
	const onSubmit = async (values, actions) => {
		console.log(`Надіслати пропозиції: ${values.message}; 
				ім'я:  ${values.name}; email: ${values.email}`);
		await new Promise((resolve) => setTimeout(resolve, 500));
		actions.resetForm();
		setShowModal(true);
	};
	// validation login form
	const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid } =
		useFormik({
			initialValues: {
				name: '',
				email: '',
				message: '',
			},
			validationSchema: Yup.object().shape({
				name: Yup.string()
					.notRequired()
					.min(2, `Введіть ім'я від 2 до 15 символів`)
					.max(15, `Введіть ім'я від 2 до 15 символів`)
					//name starts with one letter, then could be symbols and/or at least 1 another letter
					//name could be either with latin or cyrillic letters
					.matches(
						/^((?:([a-zA-Z]+[\s'.-]*)+|([\u0400-\u04FF]+[\s'.-]*)+))$/,
						`Дозволена латиниця або кирилиця, пробіл, дефіс, апостроф, крапка`
					),
				email: Yup.string()
					.min(3, `Введіть коректну e-mail адресу`)
					.max(320, `Введіть коректну e-mail адресу`)
					.email(`Введіть коректну e-mail адресу`)
					.matches(
						/[A-Z0-9_%+-]+(?:\.[0-9a-zA-Z]+)*@[A-Z0-9-]+.+.[A-Z]{2,4}/gim,
						`Введіть коректну e-mail адресу`
					)
					.required(`Обов'язкове поле`),
				message: Yup.string()
					.min(8, `Введіть повідомлення від 8 символів`)
					.max(255, `Повідомлення не повинно містити більше 255 символів`)
					.required(`Обов'язкове поле`),
			}),
			onSubmit: onSubmit,
		});

	return (
		<div className={s.container}>
			<div className={s.textContainer}>
				<h2>Зворотний зв’язок</h2>
				<p>Якщо у Вас є запитання або пропозиції, напишіть нам</p>
			</div>

			<form className={clsx(s.form)} onSubmit={handleSubmit}>
				<div className={clsx(s.inputWrapper)}>
					<div className={clsx(s.inputBox)}>
						<label
							htmlFor="name"
							className={errors.name && touched.name ? clsx(s.label, s.labelError) : clsx(s.label)}
						>
							Ім’я
						</label>
						<div>
							<input
								id="name"
								name="name"
								autoComplete="name"
								type="text"
								className={
									errors.name && touched.name ? clsx(s.input, s.inputError) : clsx(s.input)
								}
								placeholder="Ваше ім’я"
								value={values.name}
								onChange={handleChange}
								onBlur={handleBlur}
							/>

							{errors.name && touched.name ? (
								<div className={clsx(s.errorMessage)}>{errors.name}</div>
							) : null}
						</div>
					</div>

					<div className={clsx(s.inputBox)}>
						<label
							htmlFor="email"
							className={
								errors.email && touched.email ? clsx(s.label, s.labelError) : clsx(s.label)
							}
						>
							E-mail*
						</label>
						<div>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								className={
									errors.email && touched.email ? clsx(s.input, s.inputError) : clsx(s.input)
								}
								placeholder="Ваш e-mail"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{errors.email && touched.email ? (
								<div className={clsx(s.errorMessage)}>{errors.email}</div>
							) : null}
						</div>
					</div>

					<div className={clsx(s.inputBox)}>
						<label
							htmlFor="message"
							className={
								errors.message && touched.message ? clsx(s.label, s.labelError) : clsx(s.label)
							}
						>
							Повідомлення*
						</label>
						<div>
							<textarea
								id="message"
								name="message"
								className={
									errors.message && touched.message ? clsx(s.input, s.inputError) : clsx(s.input)
								}
								value={values.message}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{errors.message && touched.message ? (
								<div className={clsx(s.errorMessage)}>{errors.message}</div>
							) : null}
						</div>
					</div>
				</div>

				<div className={s.btnWrapper}>
					<Button
						buttonClasses="primaryBtn"
						type="submit"
						name="Надіслати"
						disabled={isSubmitting || !isValid}
					/>
				</div>
			</form>
		</div>
	);
};

export default FeedbackForm;
