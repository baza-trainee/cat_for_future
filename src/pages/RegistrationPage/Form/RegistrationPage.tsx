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
import { useActions } from 'src/hooks/useActions.ts';

import { useLoginMutation } from 'src/store/slice/authApiSlice.ts';
import { useTypedSelector } from 'src/hooks/useTypedSelectors.ts';
import ModalWhiteCat from 'src/components/ModalWhiteCat/ModalWhiteCat';
import image from 'src/assets/images/modal/thanks-reg.png';

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

const RegistrationPage: React.FC = () => {
	const [visible, setVisible] = useState(false);
	const [visibleConfirm, setVisibleConfirm] = useState(false);
	const [current, setCurrent] = useState(0);
	const [registration] = useRegistrationMutation();
	const navigate = useNavigate();
	const [checkboxesState, setCheckboxesState] = useState<Array<boolean>>(
		Array(checkboxData.length).fill(false)
	);
	const [error, setError] = useState('');
	const { setUserData } = useActions();

	const formik = useFormik<FormValues>({
		initialValues: initialValues,
		validationSchema: signupSchema,
		validateOnChange: false,
		validateOnBlur: false,
		enableReinitialize: true,
		onSubmit: async (values) => {
			const { name, password, email, phone } = values;
			const cleanedNumber = phone.replace(/[^0-9+]/g, '');

			try {
				await registration({ name, password, email, phone: cleanedNumber }).unwrap();
				onOpenModalWhiteCat();
				setUserData({ email, password });
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

	const [isModalWhiteCatOpen, setIsModalWhiteCatOpen] = useState<boolean>(false);
	const [login] = useLoginMutation();
	const { email, password } = useTypedSelector((state) => state.setUserData.user);

	const closeModal = () => {
		setIsModalWhiteCatOpen(false);
	};

	const onOpenModalWhiteCat = () => {
		setIsModalWhiteCatOpen(true);
	};

	const handleNavBtn = async () => {
		const formData = new FormData();
		formData.append('username', email);
		formData.append('password', password);
		const userToken = await login(formData).unwrap();
		localStorage.setItem('token', userToken.access_token);
		navigate('/account/');
	};

	return (
		<>
			<FormikProvider value={formik}>
				<Form className={css.form}>
					{current === 0 && (
						<>
							<section className={`${css.inputs} slideInLeft`}>
								<h2 className={css.titleSignup}>Реєстрація</h2>
								<div className={css.inputWrapper}>
									<label
										htmlFor="name"
										className={`${
											formik.errors.name && formik.touched.name ? css.errorLabel : ''
										} ${css.regLabel}`}
									>
										{' '}
										Ім’я*
									</label>
									<Field
										className={`${
											formik.errors.name && formik.touched.name ? css.errorField : ''
										} ${css.signUpField}`}
										name="name"
										type="text"
										id="name"
										placeholder="Введіть ваше ім’я"
										required
										value={formik.values.name}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											formik.handleChange(e);
											formik.validateField('name');
										}}
										onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
											formik.handleBlur(e);
											formik.validateField('name');
										}}
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
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											formik.handleChange(e);
											formik.validateField('phone');
										}}
										onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
											formik.handleBlur(e);
											formik.validateField('phone');
										}}
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
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											formik.handleChange(e);
											formik.validateField('email');
											if (formik.values.password) {
												formik.validateField('password');
											}
										}}
										onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
											formik.handleBlur(e);
											formik.validateField('email');
										}}
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
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											formik.handleChange(e);
											formik.validateField('password');
											if (formik.values.confirmpass) {
												formik.validateField('confirmpass');
											}
										}}
										onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
											formik.handleBlur(e);
											formik.validateField('password');
											if (formik.values.confirmpass) {
												formik.validateField('confirmpass');
											}
										}}
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
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											formik.handleChange(e);
											formik.validateField('confirmpass');
										}}
										onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
											formik.handleBlur(e);
											formik.validateField('confirmpass');
										}}
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
										disabled={
											!formik.isValid ||
											!(
												formik.touched.confirmpass &&
												formik.touched.password &&
												formik.touched.email &&
												formik.touched.name &&
												formik.touched.phone
											)
										}
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
			{isModalWhiteCatOpen && (
				<ModalWhiteCat
					image={image}
					message={'Реєстрація успішна!'}
					name={'Кабінет'}
					handleCloseModal={closeModal}
					handleNavBtn={handleNavBtn}
				/>
			)}
		</>
	);
};

export default RegistrationPage;
