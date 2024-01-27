import { useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router';

import s from './ConfirmPasswordForm.module.scss';

import ModalBack from 'src/components/ModalBack/ModalBack';
import InputPassword from 'src/components/InputPassword/InputPassword';
import { confirmPasswSchema } from 'src/schemas/confirmPassword.schema';
import ModalMsg from 'src/components/ModalMsg/ModalMsg';
import Button from 'src/components/Button/Button';
import { useActions } from 'src/hooks/useActions';

interface InitValuesConfirmPassw {
	newPassw: string;
	confirmPassw: string;
}

const btnStyle = { width: '100%', marginTop: '0.5rem' };
const styleModalBtn = { maxWidth: '28.9375rem', paddingLeft: '0.5rem', paddingRight: '0.5rem' };
const initialValues: InitValuesConfirmPassw = {
	newPassw: '',
	confirmPassw: '',
};

const ConfirmPasswordForm = () => {
	const [isSuccessResponse, setIsSuccessResponse] = useState<boolean>(false);
	const navigate = useNavigate();
	const { showLogin } = useActions();
	const handleCloseModalMsg = () => {
		setIsSuccessResponse(false);
		navigate('/');
	};

	const handleCloseForm = () => {
		navigate('/');
	};

	const handleNavigateToLogin = () => {
		navigate('/');

		setTimeout(() => {
			showLogin(true);
		});
	};
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
						handleBtnClick={handleNavigateToLogin}
						styleBtn={styleModalBtn}
					/>
				)}
			</div>
		</ModalBack>
	);
};

export default ConfirmPasswordForm;
