import React, { useState } from 'react';
import { useFormik, FormikProvider, Field, ErrorMessage, Form } from 'formik';
import { InputMask } from 'primereact/inputmask';
import Button from 'src/components/Button/Button';
import Eye from 'src/components/Login/Eye/Eye';
import css from './RegistrationPage.module.scss';
import { signupSchema } from '../schema';
import './animations.scss';
import CheckBoxes from 'src/pages/RegistrationPage/Form/CheckBoxes.tsx';
import { ArrowLeft } from 'lucide-react';
import { useRegistrationMutation } from 'src/store/slice/authApiSlice.ts';
import { useNavigate } from 'react-router-dom';
import { checkboxData } from 'src/pages/RegistrationPage/checkboxData.tsx';

interface RegistrationPageProps {
	onOpenModalWhiteCat: () => void;
}

type FormValues = {
	name: string;
	phone: string;
	email: string;
	password: string;
	confirmpass: string;
	checkbox: string;
};

const initialValues: FormValues = {
	name: '',
	phone: '',
	email: '',
	password: '',
	confirmpass: '',
	checkbox: '',
};

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onOpenModalWhiteCat }) => {
	const [visible, setVisible] = useState(false);
	const [visibleConfirm, setVisibleConfirm] = useState(false);
	const [current, setCurrent] = useState(0);
	const [registration] = useRegistrationMutation();
	const navigate = useNavigate();
	const [checkboxesState, setCheckboxesState] = useState<Array<boolean>>(
		Array(checkboxData.length).fill(false)
	);
	const [error, setError] = useState('');

	const formik = useFormik<FormValues>({
		initialValues: initialValues,
		validationSchema: signupSchema,
		validateOnChange: true,
		validateOnBlur: true,
		enableReinitialize: true,
		onSubmit: async (values) => {
			const { name, password, email, phone } = values;
			const cleanedNumber = phone.replace(/[^0-9+]/g, '');

			try {
				await registration({ name, password, email, phone: cleanedNumber }).unwrap();
				onOpenModalWhiteCat();
			} catch (error: any) {
				if (error?.data?.detail) {
					setError(error.data.detail);
				} else {
					setError('An unexpected error occurred.');
				}
			}
		},
	});
	const initialValidation = async (): Promise<void> => {
		const isValid = await formik.validateForm();

		if (isValid) {
			setCurrent(current + 1);
		}
	};

	const next = async (): Promise<void> => {
		if (current === 0) {
			await initialValidation();
		} else {
			const isValid = await formik.validateForm();
			if (isValid) {
				setCurrent(current + 1);
			}
		}
	};

	const prev = (): void => {
		setCurrent(current - 1);
		setError('');
	};

	return (
		<FormikProvider value={formik}>
			<Form className={css.form}>
				{current === 0 && (
					<>
						<section className={`${css.inputs} slideInLeft`}>
							<h2 className={css.titleSignup}>Реєстрація</h2>
							<div className={css.inputWrapper}>
								<label
									htmlFor="name"
									className={`${formik.errors.name && formik.touched.name ? css.errorLabel : ''} ${
										css.regLabel
									}`}
								>
									{' '}
									Ім’я*
								</label>
								<Field
									className={`${formik.errors.name && formik.touched.name ? css.errorField : ''} ${
										css.signUpField
									}`}
									name="name"
									type="text"
									id="name"
									placeholder="Введіть ваше ім’я"
									required
									value={formik.values.name}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								<ErrorMessage className={css.error} name="name" component="div" />
							</div>
							<div className={css.inputWrapper}>
								<label
									className={`${
										formik.errors.phone && formik.touched.phone ? css.errorLabel : ''
									} ${css.regLabel}`}
								>
									Номер телефону*
								</label>
								<Field
									as={InputMask}
									mask="+380 99 999 9999"
									id="phone"
									placeholder="Введіть номер телефону"
									className={`${
										formik.errors.phone && formik.touched.phone ? css.errorField : ''
									} ${css.signUpField}`}
									name="phone"
									required
									value={formik.values.phone}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.errors.phone}
								/>
								<ErrorMessage className={css.error} name="phone" component="div" />
							</div>
							<div className={css.inputWrapper}>
								<label
									className={`${
										formik.errors.email && formik.touched.email ? css.errorLabel : ''
									} ${css.regLabel}`}
								>
									E-mail*
								</label>
								<Field
									className={`${
										formik.errors.email && formik.touched.email ? css.errorField : ''
									} ${css.signUpField}`}
									name="email"
									type="email"
									id="email"
									placeholder="Введіть e-mail"
									required
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								<ErrorMessage className={css.error} name="email" component="div" />
							</div>
							<div className={css.inputWrapper}>
								<label
									className={`${
										formik.errors.password && formik.touched.password ? css.errorLabel : ''
									} ${css.regLabel}`}
								>
									Пароль*
								</label>
								<Field
									className={`${
										formik.errors.password && formik.touched.password ? css.errorField : ''
									} ${css.signUpField}`}
									title="Пароль має містити від 8 до 64 символів (латинські літери нижнього, верхнього регістру, цифри, та @, #, $, %, ^, &, +, =, !)"
									name="password"
									type={visible ? 'text' : 'password'}
									placeholder="Ввести пароль"
									id="password"
									required
									value={formik.values.password}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>

								<div className={css.eye}>
									<Eye
										onClickShowPass={(boolean: boolean) => {
											setVisible(boolean);
										}}
										onShowPass={visible}
									/>
								</div>

								<ErrorMessage className={css.error} name="password" component="div" />
							</div>
							<div className={css.inputWrapper}>
								<label
									className={`${
										formik.errors.confirmpass && formik.touched.confirmpass ? css.errorLabel : ''
									} ${css.regLabel}`}
								>
									Підтвердження паролю*
								</label>
								<Field
									className={`${
										formik.errors.confirmpass && formik.touched.confirmpass ? css.errorField : ''
									} ${css.signUpField}`}
									name="confirmpass"
									type={visibleConfirm ? 'text' : 'password'}
									placeholder="Повторити пароль"
									id="confirmpass"
									required
									value={formik.values.confirmpass}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								<div className={css.eye}>
									<Eye
										onClickShowPass={(boolean: boolean) => {
											setVisibleConfirm(boolean);
										}}
										onShowPass={visibleConfirm}
									/>
								</div>
								<ErrorMessage className={css.error} name="confirmpass" component="div" />
							</div>

							<div className={css.nextBtnWrapper}>
								<Button
									buttonClasses={'primaryBtn'}
									type={'button'}
									name={'Продовжити'}
									onClick={() => next()}
									styleBtn={{ width: '100%' }}
									disabled={!formik.isValid || !formik.dirty}
								/>
							</div>

							<button
								className={css.linkMob}
								type="button"
								onClick={() => {
									window.location.href = '/';
								}}
							></button>
						</section>
					</>
				)}

				{current === 1 && (
					<CheckBoxes
						error={error}
						checkboxesState={checkboxesState}
						setCheckboxesState={setCheckboxesState}
						isValid={!formik.isValid}
						prev={() => {
							prev();
						}}
					/>
				)}

				<button
					className={css.gobackLink}
					type="button"
					onClick={() => {
						if (current === 0) {
							navigate('/');
						} else {
							prev();
						}
					}}
				>
					<ArrowLeft color="#FE702C" />
					<div className={css.gobackBtn}>Повернутись</div>
				</button>
			</Form>
		</FormikProvider>
	);
};

export default RegistrationPage;
