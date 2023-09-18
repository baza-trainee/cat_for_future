import { FC, useState } from 'react';
import clsx from 'clsx';
import closeBtn from 'src/assets/icons/login-close-btn.svg';
import Button from '../Button/Button';
import Eye from './Eye/Eye';
import { ReactComponent as Google } from 'src/assets/icons/google-auth-icon.svg';
import { ReactComponent as Facebook } from 'src/assets/icons/facebook-auth-icon.svg';
import s from './Login.module.scss';

const primaryBtnStyle = {
	width: '100%',
	padding: '0.81rem 0',
}

const secondaryBtnStyle = {
	width: '100%',
	padding: '0.75rem 0',
	backgroundColor: 'transparent'
}

interface LoginProps {
	onCloseLoginWindow: (boolean: boolean) => void;
	isLoginWindOpen: boolean;
}

const Login: FC<LoginProps> = ({ onCloseLoginWindow, isLoginWindOpen }) => {
	const [onShowPass, setOnShowPass] = useState<boolean>(false);

	const handleCloseLoginWind = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === e.currentTarget) {
			onCloseLoginWindow(false);
		}
	};

	return (
		<div className={isLoginWindOpen ? clsx(s.login_overlay, s.login, s.login_active) : clsx(s.login_overlay, s.login)} onClick={handleCloseLoginWind}>
			<div className={s.login__content}>
				<img className={s.login__closeImg} onClick={() => onCloseLoginWindow(false)} src={closeBtn} alt="Close button" />

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
									type={onShowPass ? "text" : "password"}
									className={clsx(s.login__input, s.login__input_paddingR)}
									placeholder="Введіть пароль"
								/>
								<div className={s.login__hiddenPass}>
									<Eye
										onClickShowPass={(boolean: boolean) => {
											setOnShowPass(boolean);
										}}
										onShowPass={onShowPass}
									/>
								</div>
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
