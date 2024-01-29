import styles from './ChangePassForm.module.scss';
import { changePasswSchema } from 'src/schemas/changePassword.schema.ts';
import InputPassword from 'src/components/InputPassword/InputPassword.tsx';
import Button from 'src/components/Button/Button.tsx';
import { Formik, FormikHelpers } from 'formik';
import { usePassChangeMutation } from 'src/store/slice/authApiSlice.ts';
import SuccessModal from 'src/components/AdminPanel/Modal/SuccessModal.tsx';
import { useGetUserQuery } from 'src/store/slice/userApiSlice.ts';

interface InitValues {
	old_password: string;
	new_password: string;
	new_password_confirm: string;
}

const initialValues: InitValues = {
	old_password: '',
	new_password: '',
	new_password_confirm: '',
};

const ChangePassForm = () => {
	const [passChange, { isSuccess }] = usePassChangeMutation();
	const { data } = useGetUserQuery(undefined);

	const onSubmitForm = async (values: InitValues, actions: FormikHelpers<InitValues>) => {
		const data = new FormData();

		data.append('old_password', values.old_password);
		data.append('new_password', values.new_password);
		data.append('new_password_confirm', values.new_password_confirm);
		await passChange(data).unwrap();
		window.location.href = 'admin';
		localStorage.removeItem('token');
		actions.resetForm();
	};

	return (
		<div className={styles.container}>
			{isSuccess ? (
				<SuccessModal text="Пароль успішно змінено!" />
			) : (
				<>
					<Formik
						initialValues={initialValues}
						validationSchema={changePasswSchema(data.email)}
						onSubmit={onSubmitForm}
					>
						{({ handleSubmit, isValid, values }) => (
							<form className={styles.form} onSubmit={handleSubmit}>
								<InputPassword
									name="old_password"
									label="Поточний пароль"
									placeholder="Поточний пароль"
								/>
								<InputPassword
									name="new_password"
									label="Новий пароль"
									placeholder="Новий пароль"
									title={
										'Пароль має містити від 8 до 15 символів (латинські літери нижнього, верхнього регістру, цифри, спецсимволи)'
									}
								/>
								<InputPassword
									name="new_password_confirm"
									label="Повторіть новий пароль"
									placeholder="Повторіть новий пароль"
								/>
								<Button
									buttonClasses={'primaryBtn'}
									name={'Змінити пароль'}
									type={'submit'}
									disabled={
										!isValid ||
										!(values.old_password && values.new_password && values.new_password_confirm)
									}
								/>
							</form>
						)}
					</Formik>
				</>
			)}
		</div>
	);
};

export default ChangePassForm;
