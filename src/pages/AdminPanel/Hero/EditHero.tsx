import { useEditHeroMutation, useGetHeroQuery } from 'src/store/slice/heroApiSlice.ts';
import styles from './EditHero.module.scss';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IHero } from 'src/types/IHero.ts';
import ModalAdmin from 'src/components/AdminPanel/Modal/ModalAdmin.tsx';
import SuccessModal from 'src/components/AdminPanel/Modal/SuccessModal.tsx';
import { useNavigate } from 'react-router';
import { Form, Formik } from 'formik';
import InputAdmin from 'src/components/AdminPanel/UIKit/Input/InputAdmin.tsx';
import ButtonAdmin from 'src/components/AdminPanel/UIKit/Button/ButtonAdmin.tsx';
import QuestionModal from 'src/components/AdminPanel/Modal/QuestionModal.tsx';
import { heroSchema } from 'src/schemas/hero.schema.ts';

const EditHero = () => {
	const { data: hero, isError: isGetError, isLoading, refetch } = useGetHeroQuery(undefined);
	const [isQuestion, setIsQuestion] = useState(false);
	const [editHero, { isSuccess, isError }] = useEditHeroMutation();
	const navigate = useNavigate();
	const [initialValues, setInitialValues] = useState<IHero>({
		id: 1,
		left_text: '',
		media_path: '',
		right_text: '',
		sub_title: '',
		title: '',
	});

	useEffect(() => {
		if (hero) {
			setInitialValues({
				id: 1,
				left_text: hero.left_text,
				media_path: hero.media_path,
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
						const data = new FormData();

						data.append('left_text', values.left_text);
						data.append('right_text', values.right_text);
						data.append('title', values.title);
						data.append('sub_title', values.sub_title);
						data.append('media_path', values.media_path);

						await editHero({ data }).unwrap();
						refetch();
					}}
					validateOnChange={true}
					validateOnBlur={true}
					enableReinitialize={true}
				>
					{({ isValid, errors, touched, values, handleChange, handleBlur }) => (
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
										<div className={styles.blockWrapper} style={{ width: '16.3rem' }}>
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
										<div className={styles.blockWrapper} style={{ width: '16.3rem' }}>
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
											<p>{values.right_text.length}/200</p>
										</div>
									</div>
								</div>

								<div className={styles.formRight}>image input</div>
							</div>

							<div className={styles.button}>
								<ButtonAdmin text={'Зберегти'} type={'submit'} disabled={!isValid} />
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
