import s from './LoginFields.module.scss';
import clsx from 'clsx';
import Eye from 'src/components/Login/Eye/Eye.tsx';
import { useState } from 'react';
import { useFormikContext } from 'formik';

interface TLoginFieldsProps {
	labelEmail: string;
	labelPass: string;
	loginError: string | null;
	setLoginError: React.Dispatch<React.SetStateAction<string | null>>;
}

interface FormValues {
	loginEmail: string;
	loginPassword: string;
}

const LoginFields = ({ labelEmail, labelPass, loginError, setLoginError }: TLoginFieldsProps) => {
	const [onShowPass, setOnShowPass] = useState<boolean>(false);
	const { errors, touched, validateField, handleChange, handleBlur } =
		useFormikContext<FormValues>();

	return (
		<div className={s.inputWrapper}>
			<div className={s.inputBox}>
				<label
					htmlFor="loginEmail"
					className={
						errors.loginEmail && touched.loginEmail ? clsx(s.label, s.label_error) : s.label
					}
				>
					{labelEmail}
				</label>
				<div>
					<input
						id="loginEmail"
						name="loginEmail"
						type="email"
						className={
							errors.loginEmail && touched.loginEmail ? clsx(s.input, s.input_error) : s.input
						}
						placeholder="Введіть e-mail"
						onChange={(e) => {
							setLoginError(null);
							handleChange(e);
							validateField('loginEmail');
						}}
						onBlur={(e) => {
							handleBlur(e);
							validateField('loginEmail');
						}}
					/>
					{errors.loginEmail && touched.loginEmail ? (
						<div className={s.errorMessage}>{errors.loginEmail}</div>
					) : null}
				</div>
			</div>

			<div className={s.inputBox}>
				<label
					htmlFor="loginPassword"
					className={
						errors.loginPassword && touched.loginPassword ? clsx(s.label, s.label_error) : s.label
					}
				>
					{labelPass}
				</label>
				<div className={s.inputManipulPass}>
					<input
						id="loginPassword"
						name="loginPassword"
						autoComplete="password"
						type={onShowPass ? 'text' : 'password'}
						className={
							errors.loginPassword && touched.loginPassword
								? clsx(s.input, s.input_paddingR, s.input_error)
								: clsx(s.input, s.input_paddingR)
						}
						placeholder="Введіть пароль"
						onChange={(e) => {
							setLoginError(null);
							handleChange(e);
							validateField('loginPassword');
						}}
						onBlur={(e) => {
							handleBlur(e);
							validateField('loginPassword');
						}}
					/>
					<div className={s.hiddenPass}>
						<Eye
							onClickShowPass={(boolean: boolean) => {
								setOnShowPass(boolean);
							}}
							onShowPass={onShowPass}
						/>
					</div>
					{errors.loginPassword && touched.loginPassword ? (
						<div className={s.errorMessage}>{errors.loginPassword}</div>
					) : null}
				</div>
			</div>
			{loginError && <div className={s.errorLogin}>{loginError}</div>}
		</div>
	);
};

export default LoginFields;
