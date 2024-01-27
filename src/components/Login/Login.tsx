import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import clsx from 'clsx';
import { Form, Formik } from 'formik';
import Button from '../Button/Button';
import { useTypedSelector } from 'src/hooks/useTypedSelectors';
import { useActions } from 'src/hooks/useActions';
import useMediaQuery from 'src/hooks/useMediaQuery';
import closeBtn from 'src/assets/icons/login-close-btn.svg';
import s from './Login.module.scss';
import { loginSchema } from 'src/schemas/login.schema.ts';
import LoginFields from 'src/components/Login/LoginForm/LoginFields.tsx';
import { useLoginForm } from 'src/hooks/useLoginForm.ts';

const primaryBtnStyle = {
	width: '100%',
	padding: '0.81rem 0',
};

const secondaryBtnStyle = {
	width: '100%',
	padding: '0.75rem 0',
	backgroundColor: 'transparent',
};

const Login = () => {
	const [isLandscapeOrientation, setIsLandscapeOrientation] = useState<boolean>(false);
	const { isDesktop } = useMediaQuery();
	const { handleSubmit, setLoginError, loginError, initialValues } = useLoginForm();
	const { isOpen } = useTypedSelector((state) => state.showLogin);
	const { showLogin } = useActions();
	const location = useLocation();
	const navigate = useNavigate();

	const onCloseLoginWindow = () => {
		showLogin(false);
	};

	const handleCloseLoginWind = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === e.currentTarget) {
			onCloseLoginWindow();
			navigate('/');
		}
	};

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

	return (
		<div
			className={clsx(s.login_overlay, s.login, isOpen && s.login_active)}
			onClick={handleCloseLoginWind}
		>
			<div
				className={clsx(
					s.login__content,
					isLandscapeOrientation && !isDesktop ? s.login__content_layout : ''
				)}
			>
				<img
					className={s.login__closeImg}
					onClick={handleCloseLoginWind}
					src={closeBtn}
					alt="Close button"
				/>

				<h2 className={s.login__title}>Вхід</h2>

				<Formik
					initialValues={initialValues}
					validationSchema={loginSchema}
					onSubmit={handleSubmit}
					validateOnChange={true}
					enableReinitialize={true}
				>
					{({ isSubmitting, isValid }) => {
						return (
							<Form className={s.login__form}>
								<LoginFields
									labelEmail="E-mail"
									labelPass="Пароль"
									loginError={loginError}
									setLoginError={setLoginError}
								/>

								<Link to={'/request-password'} className={s.login__forgetPass}>
									Забули пароль?
								</Link>

								<div className={s.login__boxBtn}>
									<Button
										name={'Увійти'}
										buttonClasses={'primaryBtn'}
										type={'submit'}
										styleBtn={primaryBtnStyle}
										disabled={isSubmitting || !isValid}
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
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default Login;
