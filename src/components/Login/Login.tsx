import { FC, useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../Button/Button';
import { useTypedSelector } from 'src/hooks/useTypedSelectors';
import { useActions } from 'src/hooks/useActions';
import useMediaQuery from 'src/hooks/useMediaQuery';
import Eye from './Eye/Eye';
import closeBtn from 'src/assets/icons/login-close-btn.svg';
import { ReactComponent as Google } from 'src/assets/icons/google-auth-icon.svg';
import { ReactComponent as Facebook } from 'src/assets/icons/facebook-auth-icon.svg';
import s from './Login.module.scss';

const primaryBtnStyle = {
	width: '100%',
	padding: '0.81rem 0',
};

const secondaryBtnStyle = {
	width: '100%',
	padding: '0.75rem 0',
	backgroundColor: 'transparent',
};

const Login: FC = () => {
	const [onShowPass, setOnShowPass] = useState<boolean>(false);
	const [authEmailError, setAuthEmailError] = useState<boolean>(false);
	const [authPasswordError, setAuthPasswordError] = useState<boolean>(false);
	const [isLandscapeOrientation, setIsLandscapeOrientation] = useState<boolean>(false);
	const { isTablet } = useMediaQuery();

	const { isOpen } = useTypedSelector((state) => state.showLogin);
	const { showLogin } = useActions();
	const location = useLocation();

	const onCloseLoginWindow = () => {
		showLogin(false);
	};

	const initialValue = useMemo(
		() => ({
			loginEmail: '',
			loginPassword: '',
		}),
		[]
	);

	// validation login form
	const {
		handleSubmit,
		handleBlur,
		handleChange,
		values,
		errors,
		touched,
		isSubmitting,
		setValues,
		setErrors,
		setTouched,
	} = useFormik({
		enableReinitialize: true,
		initialValues: initialValue,
		validationSchema: Yup.object().shape({
			loginEmail: Yup.string()
				.email('Введіть коректну e-mail адресу')
				.matches(
					/^[A-Z0-9_%+-]+(\.[A-Z0-9_%+-]+)*@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
					'Введіть коректну e-mail адресу'
				)
				.required("Обов'язкове поле"),
			loginPassword: Yup.string()
				.min(8, 'Введіть коректний пароль')
				.max(15, 'Введіть коректний пароль')
				.matches(
					/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/,
					'Введіть коректний пароль'
				)
				.required("Обов'язкове поле"),
		}),
		onSubmit: (_, actions) => {
			setAuthEmailError(false);
			setAuthPasswordError(false);
			console.log('Sing IN');
			actions.resetForm();
		},
	});

	const handleCloseLoginWind = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === e.currentTarget) {
			onCloseLoginWindow();
			setValues(initialValue);
			setErrors({});
			setTouched({});
		}
	};

	useEffect(() => {
		values.loginEmail && authEmailError
			? setAuthEmailError(false)
			: values.loginPassword && authPasswordError
			? setAuthPasswordError(false)
			: touched.loginEmail && authEmailError
			? setAuthEmailError(false)
			: touched.loginPassword && authPasswordError
			? setAuthPasswordError(false)
			: null;
	}, [values, touched, authEmailError, authPasswordError]);

	useEffect(() => {
		isOpen && showLogin(false);
	}, [location]);

	useEffect(() => {
		const handleOrientationChange = () => {
			const newOrientation = window.matchMedia('(orientation: landscape)').matches;
			setIsLandscapeOrientation(newOrientation);
		};

		// Add an event handler when mounting a component
		window.addEventListener('resize', handleOrientationChange);

		handleOrientationChange();

		return () => {
			window.removeEventListener('resize', handleOrientationChange);
		};
	}, []);

	const navigate = useNavigate();

	return (
		<div
			className={clsx(s.login_overlay, s.login, isOpen && s.login_active)}
			onClick={handleCloseLoginWind}
		>
			<div
				className={clsx(
					s.login__content,
					isLandscapeOrientation && !isTablet ? s.login__content_layout : ''
				)}
			>
				<img
					className={s.login__closeImg}
					onClick={handleCloseLoginWind}
					src={closeBtn}
					alt="Close button"
				/>

				<h2 className={s.login__title}>Вхід</h2>

				<form className={s.login__form} onSubmit={handleSubmit}>
					<div className={s.login__inputWrapper}>
						<div className={s.login__inputBox}>
							<label
								htmlFor="loginEmail"
								className={
									errors.loginEmail && touched.loginEmail
										? clsx(s.login__label, s.login__label_error)
										: authEmailError
										? clsx(s.login__label, s.login__label_error)
										: s.login__label
								}
							>
								Логін*
							</label>
							<div>
								<input
									id="loginEmail"
									name="loginEmail"
									type="email"
									autoComplete="email"
									className={
										errors.loginEmail && touched.loginEmail
											? clsx(s.login__input, s.login__input_error)
											: authEmailError
											? clsx(s.login__input, s.login__input_error)
											: s.login__input
									}
									placeholder="Введіть e-mail"
									value={values.loginEmail}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{errors.loginEmail && touched.loginEmail ? (
									<div className={s.login__errorMessage}>{errors.loginEmail}</div>
								) : null}
								{authEmailError && (
									<div className={s.login__errorMessage}>Введіть валідний e-mail</div>
								)}
							</div>
						</div>

						<div className={s.login__inputBox}>
							<label
								htmlFor="loginPassword"
								className={
									errors.loginPassword && touched.loginPassword
										? clsx(s.login__label, s.login__label_error)
										: authPasswordError
										? clsx(s.login__label, s.login__label_error)
										: s.login__label
								}
							>
								Пароль*
							</label>
							<div className={s.login__inputManipulPass}>
								<input
									id="loginPassword"
									name="loginPassword"
									autoComplete="password"
									type={onShowPass ? 'text' : 'password'}
									className={
										errors.loginPassword && touched.loginPassword
											? clsx(s.login__input, s.login__input_paddingR, s.login__input_error)
											: authPasswordError
											? clsx(s.login__input, s.login__input_error)
											: clsx(s.login__input, s.login__input_paddingR)
									}
									placeholder="Введіть пароль"
									value={values.loginPassword}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<div className={s.login__hiddenPass}>
									<Eye
										onClickShowPass={(boolean: boolean) => {
											setOnShowPass(boolean);
										}}
										onShowPass={onShowPass}
									/>
								</div>
								{errors.loginPassword && touched.loginPassword ? (
									<div className={s.login__errorMessage}>{errors.loginPassword}</div>
								) : null}
								{authPasswordError && (
									<div className={s.login__errorMessage}>Введіть коректний пароль</div>
								)}
							</div>
						</div>
					</div>

					<Link to={'/request-password'} className={s.login__forgetPass}>
						Забули пароль?
					</Link>

					<div className={s.login__boxBtn}>
						<Button
							name={'Увійти'}
							buttonClasses={'primaryBtn'}
							type={'submit'}
							styleBtn={primaryBtnStyle}
							disabled={isSubmitting}
						/>
						<Button
							name={'Зареєструватись'}
							buttonClasses={'secondaryBtn'}
							type={'button'}
							styleBtn={secondaryBtnStyle}
							onClick={() => {
								onCloseLoginWindow();
								navigate('/registration');
							}}
						/>
					</div>

					<div className={s.login__alternative}>
						<span className={s.login__alernatLine}></span>
						<span>або</span>
						<span className={s.login__alernatLine}></span>
					</div>
					<div className={s.login__alternatBtnBox}>
						<Button
							name={'Увійти через Google'}
							buttonClasses={'authBtn'}
							type={'button'}
							children={<Google className={s.login__authGoogleIcon} />}
							disabled={isSubmitting}
						/>
						<Button
							name={'Увійти через Facebook'}
							buttonClasses={'authBtn'}
							type={'button'}
							children={<Facebook className={s.login__authFacebookIcon} />}
							disabled={isSubmitting}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
