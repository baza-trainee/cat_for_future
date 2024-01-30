import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import s from './RequestPasswordForm.module.scss';
import ModalBack from 'src/components/ModalBack/ModalBack.tsx';
import Button from 'src/components/Button/Button.tsx';
import { requestPasswSchema } from 'src/schemas/requestPassword.schema.ts';
import clsx from 'clsx';
import { useState } from 'react';
import { useRequestPassMutation } from 'src/store/slice/authApiSlice.ts';

interface InitValuesRequestPassw {
	email: string;
}

const btnStyle = { width: '100%' };
const subtitleText = {
	textStart1: 'Введіть email, пов’язаний з вашим акаунтом.',
	textStart2: 'Якщо у вас є акаунт, вам на email буде надіслано посилання для відновлення пароля',
	textResponse:
		'Незабаром на вказану адресу  має надійти лист для зміни пароля. Якщо ви його не бачите, будь ласка, перевірте папку “Спам”.',
};

const initialValues: InitValuesRequestPassw = {
	email: '',
};

const RequestPasswordForm = () => {
	const [isSuccessResponse, setIsSuccessResponse] = useState<boolean>(false);
	const navigate = useNavigate();
	const [requestPass] = useRequestPassMutation();

	const { handleSubmit, handleBlur, handleChange, values, errors, touched, isValid } = useFormik({
		enableReinitialize: true,
		initialValues: initialValues,
		validationSchema: requestPasswSchema,
		onSubmit: async (values, actions) => {
			await requestPass(values).unwrap();
			setIsSuccessResponse(true);
			localStorage.setItem('email', values.email);
			actions.resetForm();
		},
	});

	return (
		<ModalBack handleCloseModal={() => navigate('/')}>
			<div className={s.formWrap}>
				<h2 className={s.title}>Відновлення пароля</h2>
				<p className={clsx(s.subtitle, isSuccessResponse && s.responseText)}>
					{!isSuccessResponse ? (
						<>
							<span>{subtitleText.textStart1}</span>
							<span>{subtitleText.textStart2}</span>
						</>
					) : (
						subtitleText.textResponse
					)}
				</p>
				<form className={s.form} onSubmit={handleSubmit}>
					<div className={s.inputWrap}>
						<label
							className={clsx(s.label, errors.email && touched.email && s.errorColor)}
							htmlFor="email"
						>
							E-mail*
						</label>
						<div className={s.inputContainer}>
							<input
								type="email"
								className={clsx(
									s.input,
									values.email && s.active,
									errors.email && touched.email && s.error,
									isSuccessResponse && s.disabled
								)}
								placeholder="Введіть e-mail"
								name="email"
								id="email"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
								disabled={isSuccessResponse}
							/>
							{errors.email && touched.email && <p className={s.errorMsg}>{errors.email}</p>}
						</div>
					</div>

					<Button
						styleBtn={btnStyle}
						buttonClasses={'primaryBtn'}
						name={'Надіслати'}
						type={'submit'}
						disabled={!isValid || !values.email || isSuccessResponse}
					/>
				</form>
			</div>
		</ModalBack>
	);
};

export default RequestPasswordForm;
