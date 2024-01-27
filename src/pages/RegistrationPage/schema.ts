import * as yup from 'yup';

const passwordRules =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;:?'"`~()_=+[\]{}\-.,<>|/\\])[a-zA-Z0-9!@#$%^&*;:?'"`~()_=+[\]{}\-.,|<>/\\]{8,15}$/;
const emailRules = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const nameRules = /^([a-zA-Z\u0400-\u04FF][a-zA-Z\u0400-\u04FF-'./ ]*)$/;

export const signupSchema = () => {
	return yup.object().shape({
		name: yup
			.string()
			.label('Обов`язкове поле')
			.matches(nameRules, {
				message: 'Введіть ім`я латиницею або кирилицею!',
			})
			.required('Обов`язкове поле')
			.min(2, 'Введіть ім`я від 2 до 15 символів')
			.max(15, 'Введіть ім`я від 2 до 15 символів'),
		phone: yup.string().required('Обов`язкове поле').min(9, 'Введіть коректний номер телефону'),
		email: yup
			.string()
			.email('Введіть коректну e-mail адресу')
			.required('Обов`язкове поле')
			.matches(emailRules, {
				message: 'Введіть коректну e-mail адресу',
			}),
		password: yup
			.string()
			.label('Введіть коректний пароль')
			.min(8, 'Введіть коректний пароль')
			.max(15, 'Введіть коректний пароль')
			.matches(passwordRules, {
				message: 'Введіть коректний пароль',
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
