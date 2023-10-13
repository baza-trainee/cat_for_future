import { useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router';

import s from './ConfirmPasswordForm.module.scss';

import ModalBack from 'src/components/ModalBack/ModalBack';
import InputPassword from 'src/components/InputPassword/InputPassword';
import { confirmPasswSchema } from 'src/components/ConfirmPasswordForm/confirmPassword.schema';
import ModalMsg from 'src/components/ModalMsg/ModalMsg';
import Button from 'src/components/Button/Button';

interface InitValuesConfirmPassw {
	newPassw: string;
	confirmPassw: string;
}

const btnStyle = { width: '100%', marginTop: '0.5rem' };

const initialValues: InitValuesConfirmPassw = {
	newPassw: '',
	confirmPassw: '',
};

const ConfirmPasswordForm = () => {
	const [isSuccessResponse, setIsSuccessResponse] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleCloseModalMsg = () => {
		setIsSuccessResponse(false);
	};

	const handleCloseForm = () => {
		navigate('/');
	};
	// const handleNavigateToLogin = () => {
	// 	navigate('/');
	// };
	const onSubmitForm = (
		values: InitValuesConfirmPassw,
		actions: FormikHelpers<InitValuesConfirmPassw>
	) => {
		console.log(values);
		setIsSuccessResponse(true);
		actions.resetForm();
	};

	return (
		<ModalBack handleCloseModal={handleCloseForm}>
			<div className={s.formWrap}>
				<h2 className={s.title}>Завершення відновлення пароля</h2>
				<Formik
					initialValues={initialValues}
					validationSchema={confirmPasswSchema}
					onSubmit={onSubmitForm}
				>
					{({ handleSubmit, isValid, values }) => (
						<form className={s.form} onSubmit={handleSubmit}>
							<InputPassword
								name="newPassw"
								label="Новий пароль*"
								title={
									'Пароль має містити від 8 до 15 символів (латинські літери нижнього, верхнього регістру, цифри, спецсимволи)'
								}
							/>
							<InputPassword name="confirmPassw" label="Повторіть новий пароль*" />

							<Button
								styleBtn={btnStyle}
								buttonClasses={'primaryBtn'}
								name={'Змінити пароль'}
								type={'submit'}
								disabled={!isValid || !(values.newPassw && values.confirmPassw)}
							/>
						</form>
					)}
				</Formik>
				{isSuccessResponse && (
					<ModalMsg
						handleCloseModal={handleCloseModalMsg}
						name="Увійти в Особистий кабінет"
						handleBtnClick={handleCloseModalMsg}
					/>
				)}
			</div>
		</ModalBack>
	);
};

export default ConfirmPasswordForm;
