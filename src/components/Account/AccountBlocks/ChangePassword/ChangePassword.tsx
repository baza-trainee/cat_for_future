import React from 'react';
import s from './ChangePassword.module.scss';
import { ReactComponent as Eye } from 'src/assets/icons/open-eye.svg';
import { ReactComponent as CloseEye } from 'src/assets/icons/close-eye.svg';
import Button from 'src/components/Button/Button';
// import clsx from 'clsx';

const btnStyle = { width: '24.125rem' };

const ChangePassword: React.FC = () => (
	<section className={s.changePassw}>
		<div className={s.textWrap}>
			<h2 className={s.title}>Зміна паролю</h2>
			<p className={s.subtitle}>
				Якщо ви бажаєте змінити свій пароль, то будь ласка підтвердіть спочатку старий пароль, а
				потім введіть та підтвердіть ваш новий пароль
			</p>
		</div>
		<form className={s.form}>
			<div className={s.inputWrap}>
				<label className={s.label} htmlFor="oldPassw">
					Поточний пароль
				</label>
				<div className={s.inputContainer}>
					<input type="password" className={s.input} placeholder="**********" id="oldPassw" />
					{/* <Eye className={s.eyeIcon} /> */}
					<CloseEye className={s.eyeIcon} />
				</div>
				<p className={s.errorMsg}>Обов'язкове поле</p>
			</div>
			<div className={s.inputWrap}>
				<label className={s.label} htmlFor="newPassw">
					Новий пароль
				</label>
				<div className={s.inputContainer}>
					<input type="password" className={s.input} placeholder="**********" id="newPassw" />
					<Eye className={s.eyeIcon} />
					<CloseEye className={s.eyeIcon} />
				</div>
				<p className={s.errorMsg}></p>
			</div>
			<div className={s.inputWrap}>
				<label className={s.label} htmlFor="confirmPassw">
					Підтвердити новий пароль
				</label>
				<div className={s.inputContainer}>
					<input type="password" className={s.input} placeholder="**********" id="confirmPassw" />
					<Eye className={s.eyeIcon} />
					<CloseEye className={s.eyeIcon} />
				</div>
				<p className={s.errorMsg}></p>
			</div>
			<Button
				styleBtn={btnStyle}
				buttonClasses={'primaryBtn'}
				type={'button'}
				name={'Зберегти'}
				onClick={() => console.log('click')}
				disabled
			/>
		</form>
	</section>
);

export default ChangePassword;
