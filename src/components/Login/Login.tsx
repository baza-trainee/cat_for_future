import { FC, useState } from 'react';
import clsx from 'clsx';
import closeBtn from 'src/assets/icons/login-close-btn.svg';
import Button from '../Button/Button';
import { ReactComponent as Google } from 'src/assets/icons/google-auth-icon.svg';
import { ReactComponent as Facebook } from 'src/assets/icons/facebook-auth-icon.svg';
import s from './Login.module.scss';
import { useNavigate } from 'react-router';

const primaryBtnStyle = {
	width: '100%',
	padding: '0.81rem 0',
};

const secondaryBtnStyle = {
	width: '100%',
	padding: '0.75rem 0',
	backgroundColor: 'transparent',
};

interface LoginProps {
	onCloseLoginWindow: (boolean: boolean) => void;
	isLoginWindOpen: boolean;
}

const Login: FC<LoginProps> = ({ onCloseLoginWindow, isLoginWindOpen }) => {
	const navigate = useNavigate();
	const [onShowPass, setOnShowPass] = useState<boolean>(false);

	const handleCloseLoginWind = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === e.currentTarget) {
			onCloseLoginWindow(false);
		}
	};

	const eye = !onShowPass ? (
		<svg
			className={s.login__inputImg}
			onClick={() => setOnShowPass(true)}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M9.87964 9.87988C9.58489 10.1545 9.34848 10.4857 9.18451 10.8537C9.02055 11.2217 8.93238 11.619 8.92527 12.0218C8.91816 12.4246 8.99226 12.8247 9.14315 13.1983C9.29403 13.5718 9.51861 13.9112 9.80348 14.196C10.0884 14.4809 10.4277 14.7055 10.8012 14.8564C11.1748 15.0073 11.5749 15.0814 11.9777 15.0742C12.3805 15.0671 12.7778 14.979 13.1458 14.815C13.5138 14.651 13.845 14.4146 14.1196 14.1199"
				stroke="#131313"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M10.7305 5.08C11.1518 5.02751 11.5759 5.00079 12.0005 5C19.0005 5 22.0005 12 22.0005 12C21.5534 12.9571 20.9927 13.8569 20.3305 14.68"
				stroke="#131313"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M6.61 6.60986C4.62125 7.96449 3.02987 9.82512 2 11.9999C2 11.9999 5 18.9999 12 18.9999C13.9159 19.005 15.7908 18.445 17.39 17.3899"
				stroke="#131313"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M2 2L22 22"
				stroke="#131313"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	) : (
		<svg
			className={s.login__inputImg}
			onClick={() => setOnShowPass(false)}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
				stroke="#939393"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
				stroke="#939393"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);

	return (
		<div
			className={
				isLoginWindOpen
					? clsx(s.login_overlay, s.login, s.login_active)
					: clsx(s.login_overlay, s.login)
			}
			onClick={handleCloseLoginWind}
		>
			<div className={s.login__content}>
				<img
					className={s.login__closeImg}
					onClick={() => onCloseLoginWindow(false)}
					src={closeBtn}
					alt="Close button"
				/>

				<h2 className={s.login__title}>Вхід</h2>

				<form className={s.login__form}>
					<div className={s.login__inputWrapper}>
						<div className={s.login__inputBox}>
							<label htmlFor="login-email" className={s.login__label}>
								Логін
							</label>
							<input
								id="login-email"
								type="text"
								className={s.login__input}
								placeholder="Введіть e-mail"
							/>
						</div>

						<div className={s.login__inputBox}>
							<label htmlFor="login-password" className={s.login__label}>
								Пароль
							</label>
							<div className={s.login__inputManipulPass}>
								<input
									id="login-password"
									type={onShowPass ? 'text' : 'password'}
									className={clsx(s.login__input, s.login__input_paddingR)}
									placeholder="Введіть пароль"
								/>
								<div className={s.login__hiddenPass}>{eye}</div>
							</div>
						</div>
					</div>

					<a href="#" className={s.login__forgetPass}>
						Забули пароль?
					</a>

					<div className={s.login__boxBtn}>
						<Button
							name={'Увійти'}
							buttonClasses={'primaryBtn'}
							type={'submit'}
							styleBtn={primaryBtnStyle}
							onClick={() => navigate('/account')}
						/>
						<Button
							name={'Зареєструватись'}
							buttonClasses={'secondaryBtn'}
							type={'button'}
							styleBtn={secondaryBtnStyle}
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
						/>
						<Button
							name={'Увійти через Facebook'}
							buttonClasses={'authBtn'}
							type={'button'}
							children={<Facebook className={s.login__authFacebookIcon} />}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
