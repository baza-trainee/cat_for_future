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
								<label
									htmlFor="name"
									className={`${formik.errors.name && formik.touched.name ? css.errorLabel : ''} ${
										css.regLabel
									}`}
								>
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
								/>
								<ErrorMessage className={css.error} name="email" component="div" />
							</div>
							<div className={css.inputWrapper}>
								<label
									className={`${formik.errors.city && formik.touched.city ? css.errorLabel : ''} ${
										css.regLabel
									}`}
								>
									Місто*
								</label>
								<Field
									className={`${formik.errors.city && formik.touched.city ? css.errorField : ''} ${
										css.signUpField
									}`}
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
									title="Пароль має містити від 8 до 15 символів (латинські літери нижнього, верхнього регістру, цифри, спецсимволи)"
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

							<div className={css.loginAlternative}>
								<span className={css.loginAlernatLine}></span>
								<span>або</span>
								<span className={css.loginAlernatLine}></span>
							</div>

							<div className={css.loginAlternatBtnBox}>
								<Button
									name={'Зареєструватися через Google'}
									buttonClasses={'authBtn'}
									type={'button'}
									children={<Google className={css.loginAuthGoogleIcon} />}
								/>
								<Button
									name={'Зареєструватися через Facebook'}
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
								Для завершення реєстрації вам необхідно зробити позначки в обов’язкових полях
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

										{text === checkboxData[0] && <span>мій вік старше 18 років</span>}

										{text === checkboxData[1] && (
											<span>я проживаю у власному неорендованому житлі</span>
										)}

										{text === checkboxData[2] && (
											<span>
												у мене є фінансова можливість утримувати тварину (годувати та лікувати за
												необхідності)
											</span>
										)}

										{text === checkboxData[3] && (
											<span>
												я ознайомлений з{' '}
												<a
													// href="/src/assets/documents/recomendations.pdf"
													href="/*"
													target="_blank"
													rel="noopener noreferrer"
													className={css.docsRef}
												>
													Рекомендаціями по утриманню тварин
												</a>
											</span>
										)}

										{text === checkboxData[4] && (
											<span>
												я ознайомлений з{' '}
												<a
													// href="/documents/privacy-policy.pdf"
													href="/*"
													target="_blank"
													rel="noopener noreferrer"
													className={css.docsRef}
												>
													Політикою конфіденційності
												</a>{' '}
												і даю згоду на обробку персональних даних
											</span>
										)}

										{text === checkboxData[5] && (
											<span>
												я ознайомлений з{' '}
												<a
													// href="/documents/rules-of-website.pdf"
													href="/*"
													target="_blank"
													rel="noopener noreferrer"
													className={css.docsRef}
												>
													Правилами користування сайтом
												</a>
											</span>
										)}
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

				<button
					className={css.gobackLink}
					type="button"
					onClick={() => {
						if (current === 0) {
							window.location.href = '/';
						} else {
							prev();
						}
					}}
				>
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
					<div className={css.gobackBtn}>Повернутись</div>
				</button>
			</Form>
		</FormikProvider>
	);
};

export default RegistrationPage;
