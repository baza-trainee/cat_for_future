import * as yup from 'yup';

const passwRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;:?'"`~()_=+[\]{}\-.,<>|/\\])[a-zA-Z0-9!@#$%^&*;:?'"`~()_=+[\]{}\-.,|<>/\\]{8,64}$/;

export const confirmPasswSchema = (email: string) => {
	return yup.object().shape({
		password: yup
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
		password_confirm: yup
			.string()
			.required("Обов'язкове поле")
			.oneOf([yup.ref('password')], 'Пароль має збігатись'),
	});
};
