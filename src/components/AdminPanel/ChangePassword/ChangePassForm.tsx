import styles from './ChangePassForm.module.scss';
import { changePasswSchema } from 'src/schemas/changePassword.schema.ts';
import InputPassword from 'src/components/InputPassword/InputPassword.tsx';
import Button from 'src/components/Button/Button.tsx';
import { Formik, FormikHelpers } from 'formik';

interface InitValues {
	oldPassw: string;
	newPassw: string;
	confirmPassw: string;
}

const initialValues: InitValues = {
	oldPassw: '',
	newPassw: '',
	confirmPassw: '',
};

const ChangePassForm = () => {
	const onSubmitForm = (values: InitValues, actions: FormikHelpers<InitValues>) => {
		console.log(values);
		actions.resetForm();
	};

	return (
		<div className={styles.container}>
			<h2>Зміна пароля</h2>
			<Formik
				initialValues={initialValues}
				validationSchema={changePasswSchema}
				onSubmit={onSubmitForm}
			>
				{({ handleSubmit, isValid, values }) => (
					<form className={styles.form} onSubmit={handleSubmit}>
						<InputPassword name="oldPassw" label="Поточний пароль" placeholder="Поточний пароль" />
						<InputPassword
							name="newPassw"
							label="Новий пароль"
							placeholder="Новий пароль"
							title={
								'Пароль має містити від 8 до 15 символів (латинські літери нижнього, верхнього регістру, цифри, спецсимволи)'
							}
						/>
						<InputPassword
							name="confirmPassw"
							label="Повторіть новий пароль"
							placeholder="Повторіть новий пароль"
						/>
						<Button
							buttonClasses={'primaryBtn'}
							name={'Змінити пароль'}
							type={'submit'}
							disabled={!isValid || !(values.oldPassw && values.newPassw && values.confirmPassw)}
						/>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default ChangePassForm;
