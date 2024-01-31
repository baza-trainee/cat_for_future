import React, { useEffect, useState, useRef } from 'react';
import { ErrorMessage } from 'formik';
import styles from './FileUploader.module.scss';

interface FileUploaderProps {
	id: string;
	type: string;
	avatar: string | null;
	value: string | null;
	onChange: (file: File | null) => void;
	setImage: (file: File | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ id, avatar, onChange }) => {
	const [drag, setDrag] = useState(false);
	const [image, setImage] = useState<File | null>(null);

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			setImage(file);
			onChange(file);
		}
	};

	function dragStartHandler(e: React.DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		setDrag(true);
	}

	function dragLeaveHandler(e: React.DragEvent) {
		e.preventDefault();
		setDrag(false);
	}

	function onDropHandler(e: React.DragEvent) {
		e.preventDefault();
		e.stopPropagation();

		const files = e.dataTransfer.files;

		if (files.length > 0) {
			const file = files[0];
			setImage(file);
			onChange(file);
		}

		setDrag(false);
	}

	useEffect(() => {
		if (avatar) {
			fetch(avatar)
				.then((response) => response.blob())
				.then((blob) => {
					setImage(new File([blob], 'avatar') as File);
				});
		}
	}, [avatar]);

	return (
		<div className={styles.fileinputWrapper}>
			<h2 className={styles.formTitle}>Фото</h2>
			<div className={styles.inputWrapper}>
				<div
					className={`${drag ? styles.dropArea : styles.dragArea}`}
					style={{ border: image ? 'none' : `1px dashed $color-system-default-30` }}
					onDragStart={(e) => dragStartHandler(e)}
					onDragLeave={(e) => dragLeaveHandler(e)}
					onDragOver={(e) => dragStartHandler(e)}
					onDrop={(e) => onDropHandler(e)}
				>
					<label className={styles.regLabel} title="Drag and drop or click here to select a file">
						{image ? (
							<img
								src={URL.createObjectURL(image)}
								alt="preview"
								id="preview"
								className={styles.imgAfter}
							/>
						) : (
							<div className={styles.text}>Drag and drop or click here to select a file</div>
						)}
						<input
							ref={fileInputRef}
							className={styles.filesField}
							accept="image/jpeg, image/png, image/gif"
							onChange={handleImageChange}
							name="avatar"
							type="file"
							id={id}
						/>
						<ErrorMessage className={styles.error} name="avatar" component="div" />
					</label>
				</div>
			</div>
		</div>
	);
};

export default FileUploader;
