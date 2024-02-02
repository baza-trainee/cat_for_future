import { useFormikContext } from 'formik';
import styles from './FormFields.module.scss';
import InputAdmin from 'src/components/AdminPanel/UIKit/Input/InputAdmin.tsx';
import { IInitialValues } from 'src/pages/AdminPanel/Cats/CatsActions.tsx';
import InputSelect from 'src/components/AdminPanel/UIKit/Input/InputSelect.tsx';
import FileUploader from 'src/components/AdminPanel/UIKit/FileUploader/FileUploader.tsx';
import { useParams } from 'react-router';

const CatsFormFields = () => {
	const { id } = useParams();
	const { values, errors, handleChange, handleBlur, validateField, setFieldValue } =
		useFormikContext<IInitialValues>();
	const genderOptions = [
		{ value: 'true', label: 'Кіт' },
		{ value: 'false', label: 'Кішка' },
	];
	return (
		<div className={styles.formFields}>
			<div className={styles.inputs}>
				<InputAdmin
					label="Ім’я"
					name="name"
					value={values.name}
					onChange={(e) => {
						handleChange(e);
						validateField('name');
					}}
					onBlur={(e) => {
						handleBlur(e);
						validateField('name');
					}}
					placeholder="Введіть ім’я"
					error={errors.name || ''}
				/>
				<InputSelect
					label="Стать"
					name="is_male"
					options={genderOptions}
					placeholder="Оберіть стать"
				/>
				<InputAdmin
					label="Дата народження"
					placeholder="Оберіть дату народження"
					type="date"
					name="date_of_birth"
					value={values.date_of_birth}
					onChange={handleChange}
					onBlur={handleBlur}
					error={errors.date_of_birth || ''}
				/>
				<div className={styles.description}>
					<InputAdmin
						placeholder="Введіть опис"
						label="Опис"
						component="textarea"
						name="description"
						value={values.description}
						onChange={(e) => {
							handleChange(e);
							validateField('description');
						}}
						onBlur={(e) => {
							handleBlur(e);
							validateField('description');
						}}
						error={errors.description || ''}
					/>
					<p>{values?.description?.length}/200</p>
				</div>
			</div>
			<div className={styles.imagesWrapper}>
				<h2 className={styles.formTitle}>Фото</h2>
				<div className={styles.images}>
					<div className={id ? styles.imagesBlock : undefined}>
						<FileUploader
							id="photo1"
							name="photo1"
							page={id ? 'cats' : undefined}
							value={values.photo1}
							onChange={(file) => {
								setFieldValue('photo1', file, false);
							}}
							avatar={values.photo1}
						/>
					</div>
					<FileUploader
						id="photo2"
						name="photo2"
						page={id ? 'cats' : undefined}
						value={values.photo2}
						onChange={(file) => {
							setFieldValue('photo2', file, false);
						}}
						avatar={values.photo2}
					/>
					<FileUploader
						id="photo3"
						name="photo3"
						page={id ? 'cats' : undefined}
						value={values.photo3}
						onChange={(file) => {
							setFieldValue('photo3', file, false);
						}}
						avatar={values.photo3}
					/>
					<FileUploader
						id="photo4"
						name="photo4"
						page={id ? 'cats' : undefined}
						value={values.photo4}
						onChange={(file) => {
							setFieldValue('photo4', file, false);
						}}
						avatar={values.photo4}
					/>
				</div>
			</div>
		</div>
	);
};

export default CatsFormFields;
