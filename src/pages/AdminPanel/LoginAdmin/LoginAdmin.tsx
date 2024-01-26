import clsx from 'clsx';
import s from './LoginAdmin.module.scss';
import closeBtn from 'src/assets/icons/login-close-btn.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from 'src/components/Button/Button.tsx';
import React, { useEffect } from 'react';
import { useTypedSelector } from 'src/hooks/useTypedSelectors.ts';
import { useActions } from 'src/hooks/useActions.ts';
import { Form, Formik } from 'formik';
import { loginSchema } from 'src/schemas/login.schema.ts';
import LoginFields from 'src/components/Login/LoginForm/LoginFields.tsx';
import { useLoginForm } from 'src/hooks/useLoginForm.ts';

const primaryBtnStyle = {
	width: '100%',
	padding: '0.81rem 0',
};

const LoginAdmin = () => {
	const { isAdminOpen } = useTypedSelector((state) => state.showLogin);
	const { showLoginAdmin } = useActions();
	const location = useLocation();
	const { handleSubmit, loginError, initialValues, setLoginError } = useLoginForm();
	const navigate = useNavigate();

	const handleCloseLoginWind = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === e.currentTarget) {
			navigate('/');
		}
	};

	useEffect(() => {
		isAdminOpen && showLoginAdmin(false);
	}, [location]);

	return (
		<div className={clsx(s.login_overlay, s.login, isAdminOpen && s.login_active)}>
			<div className={clsx(s.login__content)}>
				<img
					className={s.login__closeImg}
					onClick={handleCloseLoginWind}
					src={closeBtn}
					alt="Close button"
				/>
				<h2 className={s.login__title}>Увійти як адміністратор</h2>
				<p>Введіть email і пароль від вашого акаунту</p>

				<Formik
					initialValues={initialValues}
					validationSchema={loginSchema}
					onSubmit={handleSubmit}
					validateOnChange={true}
					validateOnBlur={true}
				>
					{({ isSubmitting, isValid }) => (
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
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default LoginAdmin;
