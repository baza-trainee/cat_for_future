import * as yup from 'yup';

const passwordRules = /^(?=.*[a-zA-Z0-9@#$%^&+=!]).{8,64}$/;
const emailRules = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const nameRules = /^([a-zA-Z\u0400-\u04FF][a-zA-Z\u0400-\u04FF-'./ ]*)$/;
const phoneRegExp = /^\+380\s\d{2}\s\d{3}\s\d{4}$/;
export const signupSchema = () => {
	return yup.object().shape({
		name: yup
			.string()
			.label('Обов`язкове поле')
			.matches(nameRules, {
				message: 'Введіть ім`я латиницею або кирилицею!',
			})
			.required('Обов`язкове поле')
			.min(2, 'Введіть ім`я від 2 до 25 символів')
			.max(25, 'Введіть ім`я від 2 до 25 символів'),
		phone: yup
			.string()
			.matches(phoneRegExp, 'Введіть коректний номер телефону')
			.required('Обов`язкове поле'),
		email: yup
			.string()
			.max(50, 'Максимальна кількість символів 50')
			.email('Введіть коректну e-mail адресу')
			.required('Обов`язкове поле')
			.matches(emailRules, {
				message: 'Введіть коректну e-mail адресу',
			}),
		password: yup
			.string()
			.label('Введіть коректний пароль')
			.min(8, 'Мінімальна кількість символів 8')
			.max(64, 'Максимальна кількість символів 64')
			.matches(passwordRules, {
				message: 'Введіть коректний пароль',
			})
			.test('no-username-in-password', 'Пароль не може містити email', function (value) {
				const loginEmail = this.parent.email;
				const username = loginEmail.split('@')[0].toLowerCase();
				return !value?.toLowerCase().includes(username);
			})
			.required('Обов`язкове поле'),
		confirmpass: yup
			.string()
			.label('Підтвердження паролю')
			.required('Обов`язкове поле')
			.oneOf([yup.ref('password'), ''], 'Пароль має збігатись'),
		checkbox: yup.array().of(yup.boolean().oneOf([true], 'Будь ласка, відмітьте всі опції')),
	});
};
