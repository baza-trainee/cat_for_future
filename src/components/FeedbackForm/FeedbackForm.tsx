import React, { Dispatch, SetStateAction } from 'react';
import Button from 'src/components/Button/Button';
import clsx from 'clsx';
import { useFormik } from 'formik';

import s from 'src/components/FeedbackForm/FeedbackForm.module.scss';
import { feedbackSchema } from 'src/schemas/feedback.schema.ts';
import { useFeedbackMutation } from 'src/store/slice/contactsApiSlice.ts';

interface FeedbackFormProps {
	setShowModal: Dispatch<SetStateAction<boolean>>;
}

type FormValues = {
	name: string;
	email: string;
	message: string;
};

const initialValues: FormValues = {
	name: '',
	email: '',
	message: '',
};

const FeedbackForm: React.FC<FeedbackFormProps> = ({ setShowModal }) => {
	const [feedback] = useFeedbackMutation();

	const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid } =
		useFormik({
			initialValues: initialValues,
			validationSchema: feedbackSchema,
			validateOnChange: true,
			onSubmit: async (values, actions) => {
				await feedback(values).unwrap();

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
						disabled={
							isSubmitting || !isValid || (!touched.email && !touched.message && !touched.name)
						}
					/>
				</div>
			</form>
		</div>
	);
};

export default FeedbackForm;
