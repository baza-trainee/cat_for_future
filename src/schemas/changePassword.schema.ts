import * as yup from 'yup';

export const passwRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;:?'"[\]{}\-.,<>|/\\])[a-zA-Z0-9!@#$%^&*;:?'"[\]{}\-.,|<>/\\]{8,15}$/;

export const changePasswSchema = () => {
	return yup.object().shape({
		oldPassw: yup
			.string()
			.min(8, 'Перевірте коректність введеного паролю')
			.max(15, 'Перевірте коректність введеного паролю')
			.required("Обов'язкове поле"),
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
