import * as Yup from 'yup';

export const passwRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,64}$/;

export const loginSchema = Yup.object().shape({
	loginEmail: Yup.string()
		.email('Введіть коректну e-mail адресу')
		.max(50, 'Максимальна кількість символів 50')
		.matches(
			/^[A-Z0-9_%+-]+(\.[A-Z0-9_%+-]+)*@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
			'Введіть коректну e-mail адресу'
		)
		.required("Обов'язкове поле"),
	loginPassword: Yup.string()
		.min(8, 'Мінімальна кількість символів 8')
		.max(64, 'Максимальна кількість символів 64')
		.matches(passwRegex, {
			message: 'Введіть коректний пароль',
		})
		.test('no-username-in-password', 'Пароль не може містити email', function (value) {
			const loginEmail = this.parent.loginEmail;
			const username = loginEmail.split('@')[0].toLowerCase();
			return !value?.toLowerCase().includes(username);
		})
		.required("Обов'язкове поле"),
});
