import * as yup from 'yup';

export const passwRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,64}$/;

export const changePasswSchema = (email: string) => {
	return yup.object().shape({
		old_password: yup
			.string()
			.min(8, 'Мінімальна кількість символів 8')
			.max(64, 'Максимальна кількість символів 64')
			.required("Обов'язкове поле"),
		new_password: yup
			.string()
			.min(8, 'Введіть коректний пароль')
			.max(64, 'Введіть коректний пароль')
			.matches(passwRegex, {
				message: 'Введіть коректний пароль',
			})
			.test('no-username-in-password', 'Пароль не може містити email', (value) => {
				const username = email.split('@')[0].toLowerCase();
				return !value?.toLowerCase().includes(username);
			})
			.required("Обов'язкове поле"),
		new_password_confirm: yup
			.string()
			.required("Обов'язкове поле")
			.oneOf([yup.ref('new_password')], 'Пароль має збігатись'),
	});
};
