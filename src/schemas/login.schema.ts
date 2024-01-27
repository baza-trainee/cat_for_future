import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
	loginEmail: Yup.string()
		.email('Введіть коректну e-mail адресу')
		.matches(
			/^[A-Z0-9_%+-]+(\.[A-Z0-9_%+-]+)*@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
			'Введіть коректну e-mail адресу'
		)
		.required("Обов'язкове поле"),
	loginPassword: Yup.string()
		.min(8, 'Введіть коректний пароль')
		.max(15, 'Введіть коректний пароль')
		.matches(
			/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/,
			'Введіть коректний пароль'
		)
		.required("Обов'язкове поле"),
});
