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
	// validation login form
	const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
		useFormik({
			initialValues: {
				name: '',
				email: '',
				message: '',
			},
			validationSchema: Yup.object().shape({
				name: Yup.string()
					.notRequired()
					.test(
						'len',
						`Введіть ім'я від 2 до 15 символів`,
						(val) => !val || (val.length >= 2 && val.length <= 15)
					)
					.matches(
						/^((?:[\pa-zA-Z\s'.-]+|[\p\u0400-\u04FF\s'.-]+))$/,
						// /^([a-zA-Z\u0400-\u04FF][a-zA-Z\u0400-\u04FF-'./ ]*)$/,
						`Введіть ім'я латиницею або кирилицею`
					),
				email: Yup.string().email(`Введіть коректну email адресу`).required(`Обов'язкове поле`),
				message: Yup.string()
					.test(
						'len',
						`Введіть повідомлення від 8 до 255 символів`,
						(val) => val !== undefined && val.length >= 8 && val.length <= 255
					)
					.required(`Обов'язкове поле`),
			}),
			// need _ when we don't use values
			onSubmit: (_, actions) => {
				console.log(`Надіслати пропозиції: ${values.message}; 
				ім'я:  ${values.name}; email: ${values.email}`);
				actions.resetForm();
				setShowModal(true);
			},
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
						disabled={isSubmitting}
					/>
				</div>
			</form>
		</div>
	);
};

export default FeedbackForm;
