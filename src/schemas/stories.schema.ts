import * as Yup from 'yup';
export const storySchema = Yup.object({
	text: Yup.string()
		.min(2, `Введіть опис від 2 до 100 символів`)
		.max(2000, `Введіть опис'я від 2 до 2000 символів`)
		.required("Обов'язкове поле"),
	title: Yup.string()
		.min(2, `Введіть заголовок від 2 до 120 символів`)
		.max(120, `Введіть заголовок від 2 до 120 символів`)
		.required("Обов'язкове поле"),
	media_path: Yup.string().required("Обов'язкове поле"),
});
