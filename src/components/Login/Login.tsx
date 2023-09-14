import { FC } from 'react';
import s from './Login.module.scss';

const Login: FC = () => {
	return (
		<div className={s.login}>
			<div className={s.login__overlay}>
				<div className={s.login__content}>
					<button className={s.login__closeBtn}>
						<img className={s.login__closeImg} src="" alt="Close" />
					</button>

					<h2 className={s.title}>Вхід</h2>

					<form className={s.login__form}>
						<div className={s.login__inputBox}>
							<label htmlFor="" className={s.login__label}>
								Логін
							</label>
							<input type="text" className={s.login__input} placeholder="Введіть e-mail" />
						</div>

						<div className={s.login__inputBox}>
							<label htmlFor="" className={s.login__label}>
								Логін
							</label>
							<input type="text" className={s.login__input} placeholder="Введіть e-mail" />
						</div>

						<a href="#">Забули пароль?</a>

						<button>Увійти</button>
						<button>Зареєструватись</button>

						<div className={s.login__alternative}>або</div>

						<button>Увійти через Google</button>
						<button>Увійти через Facebook</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
