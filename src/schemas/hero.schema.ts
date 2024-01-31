import * as Yup from 'yup';
export const heroSchema = Yup.object({
	left_text: Yup.string()
		.min(2, `Введіть ім'я від 2 до 100 символів`)
		.max(100, `Введіть ім'я від 2 до 100 символів`)
		.required("Обов'язкове поле"),
	right_text: Yup.string()
		.min(2, `Введіть ім'я від 2 до 200 символів`)
		.max(200, `Введіть ім'я від 2 до 200 символів`)
		.required("Обов'язкове поле"),
	sub_title: Yup.string()
		.min(2, `Введіть ім'я від 2 до 120 символів`)
		.max(120, `Введіть ім'я від 2 до 120 символів`)
		.required("Обов'язкове поле"),
	title: Yup.string()
		.min(2, `Введіть ім'я від 2 до 120 символів`)
		.max(120, `Введіть ім'я від 2 до 120 символів`)
		.required("Обов'язкове поле"),
	avatar: Yup.string().required("Обов'язкове поле"),
});
