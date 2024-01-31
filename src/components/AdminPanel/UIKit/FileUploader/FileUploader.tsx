import React, { useState } from 'react';
import { ErrorMessage } from 'formik';
import styles from './FileUploader.module.scss';

interface FileUploaderProps {
	id: string;
	name: string;
	avatar: string | null;
	value: string | null;
	onChange: (file: File | null) => void;
	page?: 'hero' | 'cats' | 'stories';
}

const FileUploader: React.FC<FileUploaderProps> = ({ page, id, avatar, onChange, name }) => {
	const [preview, setPreview] = useState<string | null>(avatar);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setPreview(imageUrl);
			onChange(file);
		}
	};

	return (
		<div className={styles.fileinputWrapper}>
			<div className={styles.inputWrapper}>
				<div>
					<label
						className={styles.regLabel}
						title="Drag and drop or click here to select a file"
						data-page={page}
					>
						{preview ? (
							<img src={preview} alt="preview" id="preview" className={styles.imgAfter} />
						) : (
							<div className={styles.text}>Drag and drop or click here to select a file</div>
						)}
						<input
							className={styles.filesField}
							accept="image/jpeg, image/png, image/gif, image/webp"
							onChange={handleImageChange}
							name={name}
							type="file"
							id={id}
						/>
						<ErrorMessage className={styles.error} name={name} component="div" />
						{page && <p>Змінити фото</p>}
					</label>
				</div>
			</div>
		</div>
	);
};

export default FileUploader;
