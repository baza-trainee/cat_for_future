import { Formik, FormikHelpers } from 'formik';

import s from './ChangePassword.module.scss';

import Button from 'src/components/Button/Button';
import InputPassword from 'src/components/InputPassword/InputPassword';
import { changePasswSchema } from 'src/schemas/changePassword.schema';
import ModalMsg from 'src/components/ModalMsg/ModalMsg';
import { usePassChangeMutation } from 'src/store/slice/authApiSlice';
import { useGetUserQuery } from 'src/store/slice/userApiSlice';
import { useEffect, useState } from 'react';

interface InitValues {
	old_password: string;
	new_password: string;
	new_password_confirm: string;
}

interface IError {
	data: {
		detail: string;
	};
	status: number;
}

const btnStyle = { width: '100%', marginTop: '1.25rem', minWidth: '17rem' };

const initialValues: InitValues = {
	old_password: '',
	new_password: '',
	new_password_confirm: '',
};

const ChangePassword = () => {
	const [changePassword, { isSuccess, error }] = usePassChangeMutation();
	const { data: userData } = useGetUserQuery('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { error: getUserError } = useGetUserQuery('', {
		refetchOnMountOrArgChange: true,
	});

	const userError = getUserError as IError;

	useEffect(() => {
		if (userError?.status === 401) {
			localStorage.removeItem('token');
		}
	}, [userError]);

	const handleBtnClick = () => {
		setIsModalOpen(false);
	};

	const IsError = error as IError;

	useEffect(() => {
		if (isSuccess || IsError?.status === 422) {
			setIsModalOpen(true);
		}
	}, [isSuccess, error]);

	const onSubmitForm = async (values: InitValues, actions: FormikHelpers<InitValues>) => {
		const formData = new FormData();
		formData.append('old_password', values.old_password);
		formData.append('new_password', values.new_password);
		formData.append('new_password_confirm', values.new_password_confirm);
		await changePassword(formData).unwrap();
		actions.resetForm();
	};

	return (
		<section className={s.changePassw}>
			<div className={s.textWrap}>
				<h2 className={s.title}>Зміна паролю</h2>
				<p className={s.subtitle}>
					Якщо ви бажаєте змінити свій пароль, то будь ласка підтвердіть спочатку старий пароль, а
					потім введіть та підтвердіть ваш новий пароль
				</p>
			</div>
			<Formik
				initialValues={initialValues}
				validationSchema={changePasswSchema(userData?.email)}
				onSubmit={onSubmitForm}
			>
				{({ handleSubmit, isValid, values }) => (
					<form className={s.form} onSubmit={handleSubmit}>
						<InputPassword name="old_password" label="Поточний пароль*" />
						<InputPassword
							name="new_password"
							label="Новий пароль*"
							title={
								'Пароль має містити від 8 до 64 символів (латинські літери нижнього, верхнього регістру, цифри, та @, #, $, %, ^, &, +, =, !))'
							}
						/>
						<InputPassword name="new_password_confirm" label="Підтвердити новий пароль*" />

						<Button
							styleBtn={btnStyle}
							buttonClasses={'primaryBtn'}
							name={'Зберегти'}
							type={'submit'}
							disabled={
								!isValid ||
								!(values.old_password && values.new_password && values.new_password_confirm)
							}
						/>
					</form>
				)}
			</Formik>
			{isModalOpen && (
				<ModalMsg
					handleCloseModal={handleBtnClick}
					btnText="ОK"
					title={error ? 'Введено невірний пароль!' : 'Пароль успішно змінено!'}
					handleBtnClick={handleBtnClick}
					styleBtn={{ width: '8.75rem' }}
					isWarning={error ? true : false}
				/>
			)}
		</section>
	);
};

export default ChangePassword;
