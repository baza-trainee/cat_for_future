import { FormikHelpers, useFormik } from 'formik';
import { useNavigate } from 'react-router';

import s from './RequestPasswordForm.module.scss';

import ModalBack from 'src/components/ModalBack/ModalBack';
import Button from 'src/components/Button/Button';
import { requestPasswSchema } from 'src/schemas/requestPassword.schema';
import clsx from 'clsx';

interface InitValuesRequestPassw {
	email: string;
}

const btnStyle = { width: '100%' };

const initialValues: InitValuesRequestPassw = {
	email: '',
};

const RequestPasswordForm = () => {
	const navigate = useNavigate();

	const handleCloseForm = () => {
		navigate('/');
	};
	const { handleSubmit, handleBlur, handleChange, values, errors, touched, isValid } = useFormik({
		enableReinitialize: true,
		initialValues: initialValues,
		validationSchema: requestPasswSchema,
		onSubmit: (values: InitValuesRequestPassw, actions: FormikHelpers<InitValuesRequestPassw>) => {
			console.log(values);
			actions.resetForm();
			handleCloseForm();
		},
	});

	return (
		<ModalBack handleCloseModal={handleCloseForm}>
			<div className={s.formWrap}>
				<h2 className={s.title}>Відновлення пароля</h2>
				<p className={s.subtitle}>
					<span>Введіть email, пов’язаний з вашим акаунтом.</span>
					<span>
						Якщо у вас є акаунт, вам на email буде надіслано посилання для відновлення пароля
					</span>
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
									errors.email && touched.email && s.error
								)}
								placeholder="Введіть e-mail"
								title="E-mail*"
								name="email"
								id="email"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{errors.email && touched.email && <p className={s.errorMsg}>{errors.email}</p>}
						</div>
					</div>

					<Button
						styleBtn={btnStyle}
						buttonClasses={'primaryBtn'}
						name={'Надіслати'}
						type={'submit'}
						disabled={!isValid || !values.email}
					/>
				</form>
			</div>
		</ModalBack>
	);
};

export default RequestPasswordForm;
