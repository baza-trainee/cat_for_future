import styles from './CatsActions.module.scss';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';
import {
	useAddCatMutation,
	useEditCatMutation,
	useGetCatByIdQuery,
} from 'src/store/slice/catsApiSlice.ts';
import '../../../components/Loader/loader.css';
import { Form, Formik } from 'formik';
import Modals from 'src/components/AdminPanel/Cats/Modals/Modals.tsx';
import { ICat } from 'src/types/ICat.ts';
import ButtonAdmin from 'src/components/AdminPanel/UIKit/Button/ButtonAdmin.tsx';
import CatsFormFields from 'src/components/AdminPanel/Cats/Form/CatsFormFields.tsx';
import { catsValidation } from 'src/schemas/cats.shema.ts';

export interface IInitialValues extends Partial<ICat> {
	photo1: string;
	photo2: string;
	photo3: string;
	photo4: string;
}

type CatsValidationErrors = {
	date_of_birth?: string;
	description?: string;
	is_male?: string;
	name?: string;
	photo1?: string;
	photo2?: string;
	photo3?: string;
	photo4?: string;
};

const CatsActions = () => {
	const { id } = useParams();
	const [isQuestion, setIsQuestion] = useState(false);
	const {
		data: cat,
		refetch,
		isLoading,
		isError: isGetError,
	} = useGetCatByIdQuery(id, { skip: !id });
	const [addCat, { isSuccess: isAdded, isError: isNotAdded }] = useAddCatMutation();
	const [editCat, { isSuccess: isEdited, isError: isNotEdited }] = useEditCatMutation();

	const initialValues: IInitialValues = {
		date_of_birth: cat?.date_of_birth || '',
		description: cat?.description || '',
		is_male: cat?.is_male.toString() || '',
		name: cat?.name || '',
		photo1: cat?.photos[0].media_path || '',
		photo2: cat?.photos[1].media_path || '',
		photo3: cat?.photos[2].media_path || '',
		photo4: cat?.photos[3].media_path || '',
	};

	const isFormFilledCorrectly = (values: IInitialValues, errors: CatsValidationErrors) => {
		const allFieldsFilled = Object.values(values).every((value) => value != null && value !== '');
		const noErrors = Object.values(errors).length === 0;

		return allFieldsFilled && noErrors;
	};

	return (
		<div className={styles.container}>
			<div onClick={() => setIsQuestion(true)} className={styles.header}>
				<ChevronLeft /> {id ? 'Редагувати' : 'Додати'}
			</div>
			{(isGetError || isNotAdded || isNotEdited) && (
				<div className={styles.error}>Упс...Щось пішло не так</div>
			)}
			{isLoading ? (
				<div className="loader" />
			) : (
				<Formik
					initialValues={initialValues}
					validationSchema={catsValidation}
					onSubmit={async (values) => {
						const data = new FormData();

						if (id) {
							const changedValues: Partial<Record<keyof IInitialValues, any>> = {};
							(Object.keys(values) as Array<keyof IInitialValues>).forEach((key) => {
								if (values[key] !== initialValues[key]) {
									changedValues[key] = values[key];
								}
							});

							(Object.keys(changedValues) as Array<keyof IInitialValues>).forEach((key) => {
								data.append(key, changedValues[key]);
							});

							if (Object.keys(changedValues).length > 0) {
								await editCat({ data, id }).unwrap();
							}

							refetch();
						} else {
							(Object.keys(values) as Array<keyof IInitialValues>).forEach((key) => {
								const value = values[key];

								if (value !== undefined) {
									if (typeof value === 'string' || value instanceof Blob || value instanceof File) {
										data.append(key, value);
									} else if (typeof value === 'number' || typeof value === 'boolean') {
										data.append(key, value.toString());
									} else if (Array.isArray(value)) {
										value.forEach((item) => {
											data.append(key, JSON.stringify(item));
										});
									}
								}
							});
							await addCat(data).unwrap();
						}
					}}
					validateOnChange={false}
					validateOnBlur={false}
					enableReinitialize={true}
				>
					{({ dirty, values, errors }) => (
						<Form className={styles.form}>
							<CatsFormFields />
							<div>
								<ButtonAdmin
									type="submit"
									text="Зберегти"
									disabled={!isFormFilledCorrectly(values, errors) || !dirty}
								/>
							</div>
						</Form>
					)}
				</Formik>
			)}
			<Modals
				isEdited={isEdited}
				isAdded={isAdded}
				setIsQuestion={setIsQuestion}
				isQuestion={isQuestion}
			/>
		</div>
	);
};

export default CatsActions;
