import { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import Button from 'src/components/Button/Button';
import { InputMask } from 'primereact/inputmask';

import s from './MyData.module.scss';

const btnWrapper = {
	width: '100%',
};

const MyData: FC = () => {
	const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
		initialValues: {
			name: '',
			number: '',
			email: '',
			city: '',
		},
		validationSchema: Yup.object().shape({
			name: Yup.string()
				.required("Обов'язкове поле")
				.matches(
					/^([a-zA-Z\u0400-\u04FF][a-zA-Z\u0400-\u04FF-'./ ]*)$/,
					`Введіть ім'я латиницею або кирилицею!`
				)
				.min(2, "Введіть ім'я від 2 до 15 символів")
				.max(15, "Введіть ім'я від 2 до 15 символів"),
			number: Yup.string().required("Обов'язкове поле").min(13, 'Введіть мінімум 9 символів'),
			email: Yup.string().email('Введіть коректну e-mail адресу').required("Обов'язкове поле"),
			city: Yup.string().required("Обов'язкове поле"),
		}),
		onSubmit: (values) => {
			console.log(values);
		},
	});

	return (
		<div className={s.details}>
			<form className={s.detailsForm} onSubmit={handleSubmit}>
				<div className={s.detailsFormWrapper}>
					<div className={s.detailsBlock}>
						<label
							className={
								errors.name && touched.name ? clsx(s.detailsLabel, s.errorLabel) : s.detailsLabel
							}
						>
							Імʼя*
						</label>

						<input
							className={
								errors.name && touched.name ? clsx(s.detailsInput, s.inputError) : s.detailsInput
							}
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.name}
							name="name"
							type="text"
						/>
						{errors.name && touched.name ? (
							<span className={s.errorMessage}>{errors.name}</span>
						) : null}
					</div>

					<div className={s.detailsBlock}>
						<label
							className={
								errors.number && touched.number
									? clsx(s.detailsLabel, s.errorLabel)
									: s.detailsLabel
							}
						>
							Номер телефону*
						</label>

						<InputMask
							mask="+380 99 999 9999"
							className={
								errors.number && touched.number
									? clsx(s.detailsInput, s.inputError)
									: s.detailsInput
							}
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.number.length < 5 ? (values.number = '+380') : values.number}
							name="number"
							type="tel"
						/>
						{errors.number && touched.number ? (
							<span className={s.errorMessage}>{errors.number}</span>
						) : null}
					</div>

					<div className={s.detailsBlock}>
						<label
							className={
								errors.email && touched.email ? clsx(s.detailsLabel, s.errorLabel) : s.detailsLabel
							}
						>
							E-mail*
						</label>

						<input
							className={
								errors.email && touched.email ? clsx(s.detailsInput, s.inputError) : s.detailsInput
							}
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
							name="email"
							type="text"
						/>
						{errors.email && touched.email ? (
							<span className={s.errorMessage}>{errors.email}</span>
						) : null}
					</div>

					<div className={s.detailsBlock}>
						<label
							className={
								errors.city && touched.city ? clsx(s.detailsLabel, s.errorLabel) : s.detailsLabel
							}
						>
							Місто*
						</label>

						<select
							className={
								errors.city && touched.city ? clsx(s.detailsInput, s.inputError) : s.detailsInput
							}
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.city}
							name="city"
						>
							<option value="" disabled>
								Оберіть місто
							</option>
							<option value="місто Київ">місто Київ</option>
							<option value="Київська область">Київська область</option>
						</select>
						{errors.city && touched.city ? (
							<div>
								<span className={s.errorMessage}>{errors.city}</span>
							</div>
						) : null}
					</div>
				</div>

				<div className={s.btnWrapper}>
					<Button
						styleBtn={btnWrapper}
						name={'Зберегти'}
						buttonClasses={'primaryBtn'}
						type={'submit'}
						disabled={
							Object.values(values).join('').length > 4 && Object.values(errors).length === 0
								? false
								: true
						}
					/>
				</div>
			</form>
		</div>
	);
};

export default MyData;
