import * as yup from 'yup';

const passwRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;:?'"`~()_=+[\]{}\-.,<>|/\\])[a-zA-Z0-9!@#$%^&*;:?'"`~()_=+[\]{}\-.,|<>/\\]{8,15}$/;

export const confirmPasswSchema = () => {
	return yup.object().shape({
		newPassw: yup
			.string()
			.min(8, 'Введіть коректний пароль')
			.max(15, 'Введіть коректний пароль')
			.matches(passwRegex, {
				message: 'Введіть коректний пароль',
			})
			.required("Обов'язкове поле"),
		confirmPassw: yup
			.string()
			.required("Обов'язкове поле")
			.oneOf([yup.ref('newPassw')], 'Пароль має збігатись'),
	});
};
