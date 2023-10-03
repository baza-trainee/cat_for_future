import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const signupSchema = () => {
	return yup.object().shape({
		name: yup
			.string()
			.label('Введіть ваше ім’я')
			.required('Введіть ваше ім’я')
			.min(2, 'Ім`я повинно містити щонайменше 2 символи')
			.max(15, 'Ім`я не повинно містити більше 15 символів'),
		phone: yup.string().required('Введіть номер телефону'),
		email: yup
			.string()
			.email('Введіть валідний Email')
			.required('Введіть Email')
			.matches(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim),
		city: yup.string().label('Оберіть місто').required('Оберіть місто'),
		password: yup
			.string()
			.label('Невірний пароль!')
			.min(6, 'Пароль повинен містити щонайменше 8 символів')
			.max(16, 'Пароль не може містити більше 15 символів')
			.matches(passwordRules, {
				message:
					'Пароль має містити комбінацію з принаймі з однієї літери верхнього регістру, однієї літери нижнього регістру, однієї цифри та спецсимвола',
			})
			.required('Ввести пароль'),
		confirmpass: yup
			.string()
			.label('Підтвердження паролю')
			.required('Повторіть пароль')
			.oneOf([yup.ref('password'), ''], 'Пароль має збігатись'),
		checkbox: yup.array().of(yup.boolean().oneOf([true], 'Будь ласка, відмітьте всі опції')),
	});
};
