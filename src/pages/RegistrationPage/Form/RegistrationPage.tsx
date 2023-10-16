import React, { useState, useEffect } from 'react';
import { useFormik, FormikProvider, Field, ErrorMessage, Form } from 'formik';
import { InputMask } from 'primereact/inputmask';
import Button from 'src/components/Button/Button';
import Eye from 'src/components/Login/Eye/Eye';
import { ReactComponent as Google } from 'src/assets/icons/google-auth-icon.svg';
import { ReactComponent as Facebook } from 'src/assets/icons/facebook-auth-icon.svg';
import css from './RegistrationPage.module.scss';
import { signupSchema } from '../schema';
import checkboxData from '../checkboxData.json';
import './animations.scss';

interface RegistrationPageProps {
	onOpenModalWhiteCat: () => void;
}

type FormValues = {
	name: string;
	phone: string;
	email: string;
	city: string;
	password: string;
	confirmpass: string;
	checkbox: string;
};

const initialValues: FormValues = {
	name: '',
	phone: '',
	email: '',
	city: '',
	password: '',
	confirmpass: '',
	checkbox: '',
};

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onOpenModalWhiteCat }) => {
	const [checkboxes, setCheckboxes] = useState<Array<boolean>>(
		Array(checkboxData.length).fill(false)
	);

	const [allChecked, setAllChecked] = useState<boolean>(false);

	useEffect(() => {
		const areAllCheckboxesChecked = checkboxes.every((checkbox) => checkbox === true);

		setAllChecked(areAllCheckboxesChecked);
	}, [checkboxes]);

	const handleCheckboxChange = (index: number) => {
		const updatedCheckboxes = [...checkboxes];
		updatedCheckboxes[index] = !updatedCheckboxes[index];
		setCheckboxes(updatedCheckboxes);
	};

	const [visible, setVisible] = useState(false);
	const [visibleConfirm, setVisibleConfirm] = useState(false);

	const [current, setCurrent] = useState(0);

	const formik = useFormik<FormValues>({
		initialValues: initialValues,
		validationSchema: signupSchema,
		onSubmit: (values) => {
			console.log('open modal', values);
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
	};

	return (
		<FormikProvider value={formik}>
			<Form className={css.form}>
				{current === 0 && (
					<>
						<section className={`${css.inputs} slideInLeft`}>
							<h2 className={css.titleSignup}>Реєстрація</h2>
							<div className={css.inputWrapper}>
								<label htmlFor="name" className={css.regLabel}>
									Ім’я*
								</label>
								<Field
									className={css.signUpField}
									name="name"
									type="text"
									id="name"
									placeholder="Введіть ваше ім’я"
									required
								/>
								<ErrorMessage className={css.error} name="name" component="div" />
							</div>
							<div className={css.inputWrapper}>
								<label className={css.regLabel}>Номер телефону*</label>
								<Field
									as={InputMask}
									mask="+380 99 999 9999"
									id="phone"
									placeholder="Введіть номер телефону"
									className={css.signUpField}
									name="phone"
									required
								/>
								<ErrorMessage className={css.error} name="phone" component="div" />
							</div>
							<div className={css.inputWrapper}>
								<label className={css.regLabel}>E-mail*</label>
								<Field
									className={css.signUpField}
									name="email"
									type="email"
									id="email"
									placeholder="Введіть e-mail"
									required
								/>
								<ErrorMessage className={css.error} name="email" component="div" />
							</div>
							<div className={css.inputWrapper}>
								<label className={css.regLabel}>Місто*</label>
								<Field
									className={css.signUpField}
									component="select"
									name="city"
									id="city"
									placeholder="Оберіть місто"
									required
								>
									<option value="" disabled>
										Оберіть місто
									</option>
									<option value="місто Київ">місто Київ</option>
									<option value="Київська область">Київська область</option>
								</Field>
								<span className={css.customArrow}></span>
								<ErrorMessage className={css.error} name="city" component="div" />
							</div>
							<div className={css.inputWrapper}>
								<label className={css.regLabel}>Пароль*</label>
								<Field
									className={css.signUpField}
									name="password"
									type={visible ? 'text' : 'password'}
									placeholder="Ввести пароль"
									id="password"
									required
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
								<label className={css.regLabel}>Підтвердження паролю*</label>
								<Field
									className={css.signUpField}
									name="confirmpass"
									type={visibleConfirm ? 'text' : 'password'}
									placeholder="Повторити пароль"
									id="confirmpass"
									required
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

							<div className={css.btnWrapper}>
								<Button
									buttonClasses={'primaryBtn'}
									type={'button'}
									name={'Продовжити'}
									onClick={() => next()}
									styleBtn={{ width: '100%' }}
								/>
							</div>

							<div className={css.loginAlternative}>
								<span className={css.loginAlernatLine}></span>
								<span>або</span>
								<span className={css.loginAlernatLine}></span>
							</div>

							<div className={css.loginAlternatBtnBox}>
								<Button
									name={'Увійти через Google'}
									buttonClasses={'authBtn'}
									type={'button'}
									children={<Google className={css.loginAuthGoogleIcon} />}
								/>
								<Button
									name={'Увійти через Facebook'}
									buttonClasses={'authBtn'}
									type={'button'}
									children={<Facebook className={css.loginAuthFacebookIcon} />}
								/>
							</div>
						</section>
					</>
				)}

				{current === 1 && (
					<section className={`${css.checkboxSection} slideInLeft`}>
						<div className={css.checkboxContainer}>
							<h2 className={css.titleSignup}>Реєстрація</h2>
							<p className={css.inputText}>
								Залишилося зробити лише кілька позначок в обов'язкових полях, і ви можете обирати
								котика.
							</p>

							<div className={css.checkboxes}>
								{checkboxData.map((text, index) => (
									<label key={index} className={`${css.check} ${css.option}`}>
										<Field
											className={css.checkInput}
											control="checkbox"
											type="checkbox"
											name={`checkbox[${index}]`}
											id={`checkbox${index}`}
											checked={checkboxes[index]}
											onChange={() => handleCheckboxChange(index)}
										/>
										<span className={css.checkBox}></span>
										{text}
									</label>
								))}
							</div>
							<ErrorMessage className={css.error} name="checkbox" component="div" />
							<div className={css.btnWrapper}>
								<Button
									buttonClasses={'primaryBtn'}
									type={'submit'}
									name={'Зареєструватися'}
									onClick={onOpenModalWhiteCat}
									disabled={!formik.isValid || !allChecked}
									styleBtn={{ width: '100%' }}
								/>
							</div>
							<button
								className={css.linkMob}
								type="button"
								onClick={() => {
									prev();
								}}
							></button>
						</div>
					</section>
				)}

				<div className={css.gobackLink}>
					<svg
						className={css.linkIcon}
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
					>
						<path
							d="M12 19L5 12L12 5"
							stroke="#FE702C"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M19 12H5"
							stroke="#FE702C"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<button
						className={css.gobackBtn}
						type="button"
						onClick={() => {
							if (current === 0) {
								window.location.href = '/';
							} else {
								prev();
							}
						}}
					>
						Повернутись
					</button>
				</div>
			</Form>
		</FormikProvider>
	);
};

export default RegistrationPage;