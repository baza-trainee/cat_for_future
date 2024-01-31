import { useEditHeroMutation, useGetHeroQuery } from 'src/store/slice/heroApiSlice.ts';
import styles from './EditHero.module.scss';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import ModalAdmin from 'src/components/AdminPanel/Modal/ModalAdmin.tsx';
import SuccessModal from 'src/components/AdminPanel/Modal/SuccessModal.tsx';
import { useNavigate } from 'react-router';
import { Form, Formik } from 'formik';
import InputAdmin from 'src/components/AdminPanel/UIKit/Input/InputAdmin.tsx';
import ButtonAdmin from 'src/components/AdminPanel/UIKit/Button/ButtonAdmin.tsx';
import QuestionModal from 'src/components/AdminPanel/Modal/QuestionModal.tsx';
import { heroSchema } from 'src/schemas/hero.schema.ts';
import FileUploader from 'src/components/AdminPanel/UIKit/FileUploader/FileUploader.tsx';

type InitialValues = {
	id: number;
	left_text: string;
	avatar: string;
	right_text: string;
	sub_title: string;
	title: string;
};

const EditHero = () => {
	const { data: hero, isError: isGetError, isLoading, refetch } = useGetHeroQuery(undefined);
	const [isQuestion, setIsQuestion] = useState(false);
	const [editHero, { isSuccess, isError }] = useEditHeroMutation();
	const navigate = useNavigate();
	const [initialValues, setInitialValues] = useState<InitialValues>({
		id: 1,
		left_text: '',
		avatar: '',
		right_text: '',
		sub_title: '',
		title: '',
	});

	useEffect(() => {
		if (hero) {
			setInitialValues({
				id: 1,
				left_text: hero.left_text,
				avatar: hero.media_path,
				right_text: hero.right_text,
				sub_title: hero.sub_title,
				title: hero.title,
			});
		}
	}, [hero]);

	return (
		<div className={styles.container}>
			<div onClick={() => setIsQuestion(true)} className={styles.header}>
				<ChevronLeft /> Редагувати
			</div>
			{isSuccess && (
				<ModalAdmin onClose={() => navigate(-1)}>
					<SuccessModal text="Ваші зміни успішно збережено!" />
				</ModalAdmin>
			)}
			{isGetError && <div className={styles.error}>Упс...Щось пішло не так</div>}

			{isLoading ? (
				<div className="loader" />
			) : (
				<Formik
					initialValues={initialValues}
					validationSchema={heroSchema}
					onSubmit={async (values) => {
						const changedValues: Partial<Record<keyof InitialValues, any>> = {};

						(Object.keys(values) as Array<keyof InitialValues>).forEach((key) => {
							if (values[key] !== initialValues[key]) {
								changedValues[key] = values[key];
							}
						});
						const data = new FormData();

						(Object.keys(changedValues) as Array<keyof InitialValues>).forEach((key) => {
							data.append(key, changedValues[key]);
						});

						if (Object.keys(changedValues).length > 0) {
							await editHero(data).unwrap();
						}
						refetch();
					}}
					validateOnChange={true}
					validateOnBlur={true}
					enableReinitialize={true}
				>
					{({
						isValid,
						errors,
						dirty,
						setFieldValue,
						touched,
						values,
						handleChange,
						handleBlur,
					}) => (
						<Form className={styles.wrapper}>
							<div className={styles.form}>
								<div className={styles.formLeft}>
									<div className={styles.blockWrapper}>
										<InputAdmin
											name="title"
											id="title"
											label={'Заголовок'}
											value={values.title}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.title ? errors.title : ''}
										/>
										<p>{values.title.length}/120</p>
									</div>
									<div className={styles.blockWrapperBig}>
										<InputAdmin
											component={'textarea'}
											name="sub_title"
											id="sub_title"
											label={'Підзаголовок'}
											value={values.sub_title}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.sub_title ? errors.sub_title : ''}
										/>
										<p>{values.sub_title.length}/120</p>
									</div>

									<div className={styles.textWrapper}>
										<div className={styles.blockWrapperSmall}>
											<InputAdmin
												component={'textarea'}
												labelSmall
												name="left_text"
												id="left_text"
												label={'Текст 1'}
												value={values.left_text}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.left_text ? errors.left_text : ''}
											/>
											<p>{values.left_text.length}/100</p>
										</div>
										<div className={styles.blockWrapperSmall}>
											<InputAdmin
												component={'textarea'}
												labelSmall
												name="right_text"
												id="right_text"
												label={'Текст 2'}
												value={values.right_text}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.right_text ? errors.right_text : ''}
											/>
											<p style={{ width: '16.3rem' }}>{values.right_text.length}/200</p>
										</div>
									</div>
								</div>

								<div className={styles.formRight}>
									<FileUploader
										id="media_path"
										onChange={(img) => setFieldValue('media_path', img)}
										avatar={hero?.media_path}
										value={values.avatar}
										name="media_path"
									/>
								</div>
							</div>

							<div className={styles.button}>
								<ButtonAdmin text={'Зберегти'} type={'submit'} disabled={!isValid || !dirty} />
							</div>
							{isError && <div className={styles.errorEdit}>Упс...Щось пішло не так</div>}
						</Form>
					)}
				</Formik>
			)}

			{isQuestion && (
				<ModalAdmin onClose={() => setIsQuestion(false)}>
					<QuestionModal
						successFnc={() => navigate(-1)}
						declineFnc={() => setIsQuestion(false)}
						question="Ви впевнені що бажаєте залишити сторінку?"
						text="Ваші зміни не буде збережені"
						btnRight="ТАК"
						btnLeft="НІ"
					/>
				</ModalAdmin>
			)}
		</div>
	);
};

export default EditHero;
