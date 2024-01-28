import styles from './ContactsList.module.scss';
import { useEditContactMutation, useGetContactsQuery } from 'src/store/slice/contactsApiSlice.ts';
import InputAdmin from 'src/components/AdminPanel/UIKit/Input/InputAdmin.tsx';
import ButtonAdmin from 'src/components/AdminPanel/UIKit/Button/ButtonAdmin.tsx';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import '../../Loader/loader.css';
import { contactsSchema } from 'src/schemas/contacts.schema.ts';
import { formatPhoneNumber } from 'src/utils/formatPhoneNumber.ts';
import ModalAdmin from 'src/components/AdminPanel/Modal/ModalAdmin.tsx';
import SuccessModal from 'src/components/AdminPanel/Modal/SuccessModal.tsx';

const ContactsList = () => {
	const { data: contacts, isLoading } = useGetContactsQuery(undefined);
	const [editContact, { isError }] = useEditContactMutation();
	const [initialValues, setInitialValues] = useState({
		email: '',
		facebook: '',
		instagram: '',
		phone_first: '',
		phone_second: '',
		post_address: '',
	});
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (contacts) {
			setInitialValues({
				email: contacts.email,
				facebook: contacts.facebook,
				instagram: contacts.instagram,
				phone_first: formatPhoneNumber(contacts.phone_first),
				phone_second: formatPhoneNumber(contacts.phone_second),
				post_address: contacts.post_address,
			});
		}
	}, [contacts]);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={contactsSchema}
			onSubmit={async (values) => {
				const { phone_first, phone_second, ...rest } = values;

				const data = {
					phone_first: phone_first.replace(' ', ''),
					phone_second: phone_second.replace(' ', ''),
					...rest,
				};

				await editContact(data).unwrap();

				setSuccess(true);
			}}
			enableReinitialize={true}
			validateOnBlur={true}
			validateOnChange={true}
		>
			{({ values, errors, touched, isValid, setFieldValue, handleChange, handleBlur }) => (
				<Form>
					<div className={styles.container}>
						{success && (
							<ModalAdmin onClose={() => setSuccess(false)}>
								<SuccessModal text="Ваші зміни успішно збережено!" />
							</ModalAdmin>
						)}
						{isLoading ? (
							<div className="loader" />
						) : (
							<>
								<div className={styles.item}>
									<div className={styles.data}>
										<div className={styles.name}>Телефон</div>
										<div>
											<InputAdmin
												name="phone_first"
												id="phone_first"
												value={values.phone_first}
												onChange={(e) => {
													const formattedPhoneNumber = formatPhoneNumber(e.target.value);
													setFieldValue('phone_first', formattedPhoneNumber);
												}}
												onBlur={handleBlur}
												error={touched.phone_first ? errors.phone_first : ''}
											/>
										</div>
									</div>
								</div>
								<div className={styles.item}>
									<div className={styles.data}>
										<div className={styles.name}>Телефон</div>
										<div>
											<InputAdmin
												name="phone_second"
												id="phone_second"
												value={values.phone_second}
												onChange={(e) => {
													const formattedPhoneNumber = formatPhoneNumber(e.target.value);
													setFieldValue('phone_second', formattedPhoneNumber);
												}}
												onBlur={handleBlur}
												error={touched.phone_second ? errors.phone_second : ''}
											/>
										</div>
									</div>
								</div>
								<div className={styles.item}>
									<div className={styles.data}>
										<div className={styles.name}>Пошта</div>
										<div>
											<InputAdmin
												name="email"
												id="email"
												value={values.email}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.email ? errors.email : ''}
											/>
										</div>
									</div>
								</div>
								<div className={styles.item}>
									<div className={styles.data}>
										<div className={styles.name}>Facebook</div>
										<div>
											<InputAdmin
												name="facebook"
												id="facebook"
												value={values.facebook}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.facebook ? errors.facebook : ''}
											/>
										</div>
									</div>
								</div>
								<div className={styles.item}>
									<div className={styles.data}>
										<div className={styles.name}>Instagram</div>
										<div>
											<InputAdmin
												name="instagram"
												id="instagram"
												value={values.instagram}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.instagram ? errors.instagram : ''}
											/>
										</div>
									</div>
								</div>
								<div className={styles.item}>
									<div className={styles.data}>
										<div className={styles.name}>Поштова адреса</div>
										<div>
											<InputAdmin
												name="post_address"
												id="post_address"
												value={values.post_address}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.post_address ? errors.post_address : ''}
											/>
										</div>
									</div>
								</div>
								<div className={styles.button}>
									<ButtonAdmin text={'Зберегти'} type={'submit'} disabled={!isValid} />
								</div>
								{isError && <div style={{ color: 'red' }}>Упс...Щось пішло не так</div>}
							</>
						)}
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ContactsList;
