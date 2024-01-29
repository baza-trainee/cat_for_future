import * as Yup from 'yup';

export const feedbackSchema = Yup.object().shape({
	name: Yup.string()
		.notRequired()
		.min(2, `Введіть ім'я від 2 до 15 символів`)
		.max(15, `Введіть ім'я від 2 до 15 символів`)
		//name starts with one letter, then could be symbols and/or at least 1 another letter
		//name could be either with latin or cyrillic letters
		.matches(
			/^((?:([a-zA-Z]+[\s'.-]*)+|([\u0400-\u04FF]+[\s'.-]*)+))$/,
			`Дозволена латиниця або кирилиця, пробіл, дефіс, апостроф, крапка`
		),
	email: Yup.string()
		.min(3, `Введіть коректну e-mail адресу`)
		.max(320, `Введіть коректну e-mail адресу`)
		.email(`Введіть коректну e-mail адресу`)
		.matches(
			/[A-Z0-9_%+-]+(?:\.[0-9a-zA-Z]+)*@[A-Z0-9-]+.+.[A-Z]{2,4}/gim,
			`Введіть коректну e-mail адресу`
		)
		.required(`Обов'язкове поле`),
	message: Yup.string()
		.min(8, `Введіть повідомлення від 8 символів`)
		.max(255, `Повідомлення не повинно містити більше 255 символів`)
		.required(`Обов'язкове поле`),
});
