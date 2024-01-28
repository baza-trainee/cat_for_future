import { useParams } from 'react-router';
import {
	useEditInstructionMutation,
	useGetInstructionByIdQuery,
} from 'src/store/slice/instructionsApiSlice.ts';
import styles from './EditInstruction.module.scss';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import ButtonAdmin from 'src/components/AdminPanel/UIKit/Button/ButtonAdmin.tsx';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputAdmin from 'src/components/AdminPanel/UIKit/Input/InputAdmin.tsx';
import ModalAdmin from 'src/components/AdminPanel/Modal/ModalAdmin.tsx';
import QuestionModal from 'src/components/AdminPanel/Modal/QuestionModal.tsx';
import { useNavigate } from 'react-router-dom';
import '../../../components/Loader/loader.css';
import SuccessModal from 'src/components/AdminPanel/Modal/SuccessModal.tsx';

const validationSchema = Yup.object({
	title: Yup.string()
		.min(2, 'Мінімальна кількість символів 2')
		.max(120, 'Маскимальна кількість символів 120')
		.required('Поле обовязкове до заповнення'),
	description: Yup.string()
		.max(500, 'Маскимальна кількість символів 500')
		.required('Поле обовязкове до заповнення'),
});

const EditInstruction = () => {
	const { id } = useParams();
	const {
		data: instruction,
		isLoading,
		refetch,
		isError: isGetError,
	} = useGetInstructionByIdQuery(id);
	const [isQuestion, setIsQuestion] = useState(false);
	const navigate = useNavigate();
	const [initialValues, setInitialValues] = useState({
		title: '',
		description: '',
	});
	const [editInstruction, { isSuccess, isError }] = useEditInstructionMutation();

	useEffect(() => {
		if (instruction) {
			setInitialValues({
				title: instruction.title,
				description: instruction.description,
			});
		}
	}, [instruction]);

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
					validationSchema={validationSchema}
					onSubmit={async (values) => {
						await editInstruction({ data: values, id }).unwrap();
						refetch();
					}}
					validateOnChange={true}
					validateOnBlur={true}
					enableReinitialize={true}
				>
					{({ isValid, errors, touched, values, handleChange, handleBlur }) => (
						<Form className={styles.formWrapper}>
							<InputAdmin
								name="title"
								id="title"
								label={'Заголовок'}
								value={values.title}
								onChange={handleChange}
								onBlur={handleBlur}
								error={touched.title ? errors.title : ''}
							/>
							<div className={styles.description}>
								<InputAdmin
									component={'textarea'}
									name="description"
									id="description"
									label={'Опис інструкції'}
									value={values.description}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.description ? errors.description : ''}
								/>
								<p>{values.description.length}/500</p>
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

export default EditInstruction;
