import * as yup from 'yup';

export const catsValidation = yup.object({
	date_of_birth: yup.string().required("Обов'язкове поле"),
	description: yup
		.string()
		.max(200, 'Максимальна кількість символів 200')
		.required("Обов'язкове поле"),
	is_male: yup.string().required("Обов'язкове поле"),
	name: yup.string().max(6, 'Максимальна кількість символів 6').required("Обов'язкове поле"),
	photo1: yup.mixed().required("Це поле обов'язкове"),
	photo2: yup.mixed().required("Це поле обов'язкове"),
	photo3: yup.mixed().required("Це поле обов'язкове"),
	photo4: yup.mixed().required("Це поле обов'язкове"),
});
