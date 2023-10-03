import React from 'react';
import s from './ChangePassword.module.scss';
import { ReactComponent as Eye } from 'src/assets/icons/open-eye.svg';
import { ReactComponent as CloseEye } from 'src/assets/icons/close-eye.svg';
import Button from 'src/components/Button/Button';
const ChangePassword: React.FC = () => (
	<section className={s.changePassw}>
		<div className="textWrap">
			<h2 className={s.title}>Зміна паролю</h2>
			<p className={s.subtitle}>
				Якщо ви бажаєте змінити свій пароль, то будь ласка підтвердіть спочатку старий пароль, а
				потім введіть та підтвердіть ваш новий пароль
			</p>
			<form className={s.form}>
				<div className="inputWrap">
					<label className={s.label} htmlFor="oldPassw">
						Поточний пароль
					</label>
					<div className="input">
						<input type="password" className={s.oldPassw} placeholder="**********" id="oldPassw" />
						<Eye />
						<CloseEye />
					</div>
					<p className={s.errorMsg}></p>
				</div>
				<div className="inputWrap">
					<label className={s.label} htmlFor="oldPassw">
						Новий пароль
					</label>
					<div className="input">
						<input type="password" className={s.oldPassw} placeholder="**********" id="oldPassw" />
						<Eye />
						<CloseEye />
					</div>
					<p className={s.errorMsg}></p>
				</div>
				<div className="inputWrap">
					<label className={s.label} htmlFor="oldPassw">
						Підтвердити новий пароль
					</label>
					<div className="input">
						<input type="password" className={s.oldPassw} placeholder="**********" id="oldPassw" />
						<Eye />
						<CloseEye />
					</div>
					<p className={s.errorMsg}></p>
				</div>
				<Button
					buttonClasses={'primaryBtn'}
					type={'button'}
					name={'Зберегти'}
					onClick={() => console.log('click')}
				/>
			</form>
		</div>
	</section>
);

export default ChangePassword;
