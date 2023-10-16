import { FC, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';

import s from './ChangePassword.module.scss';

import Button from 'src/components/Button/Button';
import InputPassword from 'src/components/InputPassword/InputPassword';
import { changePasswSchema } from 'src/schemas/changePassword.schema';
import ModalMsg from 'src/components/ModalMsg/ModalMsg';

interface InitValues {
	oldPassw: string;
	newPassw: string;
	confirmPassw: string;
}

const btnStyle = { width: '100%', marginTop: '1.25rem', minWidth: '17rem' };

const initialValues: InitValues = {
	oldPassw: '',
	newPassw: '',
	confirmPassw: '',
};
const ChangePassword: FC = () => {
	const [isSuccessResponse, setIsSuccessResponse] = useState<boolean>(false);
	const handleCloseModal = () => {
		setIsSuccessResponse(false);
	};
	const onSubmitForm = (values: InitValues, actions: FormikHelpers<InitValues>) => {
		console.log(values);
		setIsSuccessResponse(true);
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
				validationSchema={changePasswSchema}
				onSubmit={onSubmitForm}
			>
				{({ handleSubmit, isValid, values }) => (
					<form className={s.form} onSubmit={handleSubmit}>
						<InputPassword name="oldPassw" label="Поточний пароль*" />
						<InputPassword
							name="newPassw"
							label="Новий пароль*"
							title={
								'Пароль має містити від 8 до 15 символів (латинські літери нижнього, верхнього регістру, цифри, спецсимволи)'
							}
						/>
						<InputPassword name="confirmPassw" label="Підтвердити новий пароль*" />

						<Button
							styleBtn={btnStyle}
							buttonClasses={'primaryBtn'}
							name={'Зберегти'}
							type={'submit'}
							disabled={!isValid || !(values.oldPassw && values.newPassw && values.confirmPassw)}
						/>
					</form>
				)}
			</Formik>
			{isSuccessResponse && (
				<ModalMsg handleCloseModal={handleCloseModal} name="Ок" handleBtnClick={handleCloseModal} />
			)}
		</section>
	);
};

export default ChangePassword;
