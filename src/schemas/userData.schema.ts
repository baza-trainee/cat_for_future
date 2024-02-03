import * as Yup from 'yup';

const emailRegex =
	// eslint-disable-next-line no-control-regex
	/^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

export const userDataSchema = () =>
	Yup.object().shape({
		name: Yup.string()
			.required("Обов'язкове поле")
			.matches(
				/^([a-zA-Z\u0400-\u04FF][a-zA-Z\u0400-\u04FF-'./ ]*)$/,
				`Введіть ім'я латиницею або кирилицею!`
			)
			.min(2, "Введіть ім'я від 2 до 25 символів")
			.max(25, "Введіть ім'я від 2 до 25 символів"),
		number: Yup.string()
			.required("Обов'язкове поле")
			.matches(/^[^_]+$/, 'Введіть коректний номер телефону'),
		email: Yup.string()
			.email('Введіть коректну електронну пошту!')
			.matches(emailRegex, 'Введіть коректну e-mail адресу')
			.required("Обов'язкове поле")
			.max(50, 'Максимальна кількість символів 50'),
	});
