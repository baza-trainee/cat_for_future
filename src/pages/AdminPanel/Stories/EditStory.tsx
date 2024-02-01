import styles from './EditStory.module.scss';
import { ChevronLeft } from 'lucide-react';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditStoryMutation, useGetStoryByIdQuery } from 'src/store/slice/storiesApiSlice.ts';
import ModalAdmin from 'src/components/AdminPanel/Modal/ModalAdmin.tsx';
import SuccessModal from 'src/components/AdminPanel/Modal/SuccessModal.tsx';
import '../../../components/Loader/loader.css';
import { Form, Formik } from 'formik';
import { IStory } from 'src/types/IStory.ts';
import ButtonAdmin from 'src/components/AdminPanel/UIKit/Button/ButtonAdmin.tsx';
import InputAdmin from 'src/components/AdminPanel/UIKit/Input/InputAdmin.tsx';
import FileUploader from 'src/components/AdminPanel/UIKit/FileUploader/FileUploader.tsx';
import QuestionModal from 'src/components/AdminPanel/Modal/QuestionModal.tsx';
import { storySchema } from 'src/schemas/stories.schema.ts';

const EditStory = () => {
	const { id } = useParams();
	const [isQuestion, setIsQuestion] = useState(false);
	const navigate = useNavigate();
	const { data: story, refetch, isLoading, isError: isFetchError } = useGetStoryByIdQuery(id);
	const [editStory, { isSuccess, isError: isEditError }] = useEditStoryMutation();
	const [initialValues, setInitialValues] = useState<Partial<IStory>>({
		title: '',
		text: '',
		media_path: '',
	});

	useEffect(() => {
		if (id) refetch();
		if (story) {
			setInitialValues({
				title: story.title,
				text: story.text,
				media_path: story.media_path,
			});
		}
	}, [id, story]);

	return (
		<div className={styles.container}>
			<div onClick={() => setIsQuestion(true)} className={styles.header}>
				<ChevronLeft /> Редагувати
			</div>
			{(isEditError || isFetchError) && <div className={styles.error}>Упс...Щось пішло не так</div>}

			{isLoading ? (
				<div className="loader" />
			) : (
				<Formik
					initialValues={initialValues}
					validationSchema={storySchema}
					validateOnChange={true}
					validateOnBlur={true}
					enableReinitialize={true}
					onSubmit={async (values) => {
						const changedValues: Partial<Record<keyof Partial<IStory>, any>> = {};

						(Object.keys(values) as Array<keyof Partial<IStory>>).forEach((key) => {
							if (values[key] !== initialValues[key]) {
								changedValues[key] = values[key];
							}
						});

						const data = new FormData();
						(Object.keys(changedValues) as Array<keyof Partial<IStory>>).forEach((key) => {
							data.append(key, changedValues[key]);
						});

						if (Object.keys(changedValues).length > 0) {
							await editStory({ data, id }).unwrap();
						}
						refetch();
					}}
				>
					{({
						values,
						dirty,
						setFieldValue,
						handleChange,
						errors,
						touched,
						handleBlur,
						isValid,
					}) => (
						<Form className={styles.wrapper}>
							<div className={styles.form}>
								<div className={styles.formLeft}>
									<div className={styles.blockWrapper}>
										<InputAdmin
											name="title"
											id="title"
											label={'Заголовок історії'}
											value={values.title}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.title ? errors.title : ''}
										/>
										<p>{values?.title?.length}/120</p>
									</div>
									<div className={styles.blockWrapper}>
										<InputAdmin
											component={'textarea'}
											name="text"
											id="text"
											label={'Опис історії'}
											value={values.text}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.text ? errors.text : ''}
										/>
										<p>{values?.text?.length}/2000</p>
									</div>
								</div>
								<div className={styles.formRight}>
									<h2>Фото</h2>
									<FileUploader
										id="media_path"
										onChange={(img) => setFieldValue('media_path', img)}
										avatar={story?.media_path}
										value={values.media_path ? values.media_path : null}
										name="media_path"
										page="hero"
									/>
								</div>
							</div>
							<div className={styles.button}>
								<ButtonAdmin text={'Зберегти'} type={'submit'} disabled={!isValid || !dirty} />
							</div>
						</Form>
					)}
				</Formik>
			)}

			{isSuccess && (
				<ModalAdmin onClose={() => navigate(-1)}>
					<SuccessModal text="Ваші зміни успішно збережено!" />
				</ModalAdmin>
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

export default EditStory;
