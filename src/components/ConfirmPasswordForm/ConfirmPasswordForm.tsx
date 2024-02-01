import { useEffect, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router';

import s from './ConfirmPasswordForm.module.scss';

import ModalBack from 'src/components/ModalBack/ModalBack';
import InputPassword from 'src/components/InputPassword/InputPassword';
import { confirmPasswSchema } from 'src/schemas/confirmPassword.schema';
import ModalMsg from 'src/components/ModalMsg/ModalMsg';
import Button from 'src/components/Button/Button';
import { useActions } from 'src/hooks/useActions';
import { useLocation } from 'react-router-dom';
import { useResetPassMutation } from 'src/store/slice/authApiSlice.ts';

interface InitValuesConfirmPassw {
	password: string;
	password_confirm: string;
}

const btnStyle = { width: '100%', marginTop: '0.5rem' };
const styleModalBtn = { maxWidth: '28.9375rem', paddingLeft: '0.5rem', paddingRight: '0.5rem' };
const initialValues: InitValuesConfirmPassw = {
	password: '',
	password_confirm: '',
};

const ConfirmPasswordForm = () => {
	const [isSuccessResponse, setIsSuccessResponse] = useState<boolean>(false);
	const navigate = useNavigate();
	const { showLogin } = useActions();
	const location = useLocation();
	const [resetPass] = useResetPassMutation();
	const queryParams = new URLSearchParams(location.search);
	const token = queryParams.get('token');
	const [email, setEmail] = useState('');

	useEffect(() => {
		const data = localStorage.getItem('email');
		if (data) {
			setEmail(data);
		}
	}, []);

	const handleCloseModalMsg = () => {
		setIsSuccessResponse(false);
		navigate('/');
	};

	const handleNavigateToLogin = () => {
		navigate('/');

		setTimeout(() => {
			showLogin(true);
		});
	};
	const onSubmitForm = async (
		values: InitValuesConfirmPassw,
		actions: FormikHelpers<InitValuesConfirmPassw>
	) => {
		const data = {
			token,
			password: values.password,
		};
		await resetPass(data).unwrap();
		setIsSuccessResponse(true);
		actions.resetForm();
		localStorage.removeItem('email');
	};

	return (
		<ModalBack handleCloseModal={() => navigate('/')}>
			<div className={s.formWrap}>
				<h2 className={s.title}>Завершення відновлення пароля</h2>
				<Formik
					initialValues={initialValues}
					validationSchema={confirmPasswSchema(email || '')}
					onSubmit={onSubmitForm}
				>
					{({ handleSubmit, isValid, values }) => (
						<form className={s.form} onSubmit={handleSubmit}>
							<InputPassword
								name="password"
								label="Новий пароль*"
								title={
									'Пароль має містити від 8 до 64 символів (латинські літери нижнього, верхнього регістру, цифри, спецсимволи)'
								}
							/>
							<InputPassword name="password_confirm" label="Повторіть новий пароль*" />

							<Button
								styleBtn={btnStyle}
								buttonClasses={'primaryBtn'}
								name={'Змінити пароль'}
								type={'submit'}
								disabled={!isValid || !(values.password && values.password_confirm)}
							/>
						</form>
					)}
				</Formik>
				{isSuccessResponse && (
					<ModalMsg
						handleCloseModal={handleCloseModalMsg}
						title="Ваш пароль успішно змінено!"
						btnText="Увійти в Особистий кабінет"
						handleBtnClick={handleNavigateToLogin}
						styleBtn={styleModalBtn}
					/>
				)}
			</div>
		</ModalBack>
	);
};

export default ConfirmPasswordForm;
