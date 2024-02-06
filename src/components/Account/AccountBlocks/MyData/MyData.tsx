import { FC, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import clsx from 'clsx';
import Button from 'src/components/Button/Button';
import { InputMask } from 'primereact/inputmask';

import s from './MyData.module.scss';
import { useGetUserQuery, useUpdateUserMutation } from 'src/store/slice/userApiSlice';
import { userDataSchema } from 'src/schemas/userData.schema';
import ModalMsg from 'src/components/ModalMsg/ModalMsg';

const btnWrapper = {
	width: '100%',
};

interface IError {
	data: {
		detail: string;
	};
	status: number;
}

const MyData: FC = () => {
	const { data: userData } = useGetUserQuery('');
	const [updateUser, { isSuccess }] = useUpdateUserMutation();

	const { error } = useGetUserQuery('', {
		refetchOnMountOrArgChange: true,
	});

	const userError = error as IError;

	useEffect(() => {
		if (userError?.status === 401) {
			localStorage.removeItem('token');
		}
	}, [userError]);

	const initialValues = {
		name: userData?.name || '',
		number: userData?.phone || '',
		email: userData?.email || '',
	};

	const [isSuccessModal, setIsSuccessModal] = useState(false);

	useEffect(() => {
		if (isSuccess) {
			setIsSuccessModal(true);
		}
	}, [isSuccess]);

	const handleModalClose = () => {
		setIsSuccessModal(false);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={userDataSchema}
			onSubmit={async (values) => {
				const { name, number, email } = values;
				const prepareNumber = number.replace(/\D/g, '');
				await updateUser({ name, phone: prepareNumber, email }).unwrap();
				console.log(prepareNumber);
			}}
			validateOnChange={true}
			validateOnBlur={true}
			enableReinitialize={true}
		>
			{({ values, errors, touched, isValid, setFieldValue, handleBlur }) => (
				<div className={s.details}>
					<Form>
						<div className={s.detailsForm}>
							<div className={s.detailsFormWrapper}>
								<div className={s.detailsBlock}>
									<label
										className={
											errors.name && touched.name
												? clsx(s.detailsLabel, s.errorLabel)
												: s.detailsLabel
										}
									>
										Імʼя*
									</label>

									<input
										className={
											errors.name && touched.name
												? clsx(s.detailsInput, s.inputError)
												: s.detailsInput
										}
										onChange={(e) => setFieldValue('name', e.target.value)}
										onBlur={handleBlur}
										value={values.name}
										name="name"
										type="text"
									/>
									{typeof errors.name === 'string' && touched.name ? (
										<span className={s.errorMessage}>{errors.name}</span>
									) : null}
								</div>

								<div className={s.detailsBlock}>
									<label
										className={
											errors.number && touched.number
												? clsx(s.detailsLabel, s.errorLabel)
												: s.detailsLabel
										}
									>
										E-mail*
									</label>

									<input
										className={
											errors.email && touched.email
												? clsx(s.detailsInput, s.inputError)
												: s.detailsInput
										}
										onChange={(e) => setFieldValue('email', e.target.value)}
										onBlur={handleBlur}
										value={values.email}
										name="email"
										type="text"
									/>
									{typeof errors.email === 'string' && touched.email ? (
										<span className={s.errorMessage}>{errors.email}</span>
									) : null}
								</div>

								<div className={s.detailsBlock}>
									<label
										className={
											errors.number && touched.number
												? clsx(s.detailsLabel, s.errorLabel)
												: s.detailsLabel
										}
									>
										Номер телефону*
									</label>

									<InputMask
										mask="+380 99 999 9999"
										autoClear={false}
										placeholder="+380 __ ___ ____"
										className={
											errors.number && touched.number
												? clsx(s.detailsInput, s.inputError)
												: s.detailsInput
										}
										onChange={(e) => setFieldValue('number', e.target.value)}
										onBlur={handleBlur}
										value={values.number}
										name="number"
										type="tel"
									/>
									{typeof errors.number === 'string' && touched.number ? (
										<span className={s.errorMessage}>{errors.number}</span>
									) : null}
								</div>
							</div>
							<div className={s.btnWrapper}>
								<Button
									styleBtn={btnWrapper}
									name={'Зберегти'}
									buttonClasses={'primaryBtn'}
									type={'submit'}
									disabled={!isValid}
								/>
							</div>
						</div>
					</Form>
					{isSuccessModal && (
						<ModalMsg
							btnText="OK"
							title="Ваші дані успішно змінено!"
							handleCloseModal={handleModalClose}
							handleBtnClick={handleModalClose}
							styleBtn={{ width: '8.75rem' }}
						/>
					)}
				</div>
			)}
		</Formik>
	);
};

export default MyData;
