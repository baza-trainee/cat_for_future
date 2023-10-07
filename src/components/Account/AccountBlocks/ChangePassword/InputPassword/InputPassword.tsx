import { ReactElement, useState } from 'react';

import s from './InputPassword.module.scss';

import { ReactComponent as Eye } from 'src/assets/icons/open-eye.svg';
import { ReactComponent as CloseEye } from 'src/assets/icons/close-eye.svg';
import { useField } from 'formik';

interface InputPasswordProps {
	label: string;
	placeholder?: string;
	name: string;
	title?: string;
}
interface SvgIconProps {
	isShownPassword: boolean;
	handleShowPassword: () => void;
}

const InputPassword = ({ label, placeholder = '**********', name, title }: InputPasswordProps) => {
	const [isShownPassword, setIsShownPassword] = useState(false);
	const [fields, meta] = useField(name);

	const handleShowPassword = () => {
		setIsShownPassword((prev) => !prev);
	};

	return (
		<div className={s.inputWrap}>
			<label className={s.label} htmlFor={name}>
				{label}
			</label>
			<div className={s.inputContainer}>
				<input
					type={isShownPassword ? 'text' : 'password'}
					className={s.input}
					placeholder={placeholder}
					title={title}
					id={name}
					{...fields}
				/>
				<EyeIcon isShownPassword={isShownPassword} handleShowPassword={handleShowPassword} />
				{meta.error && meta.touched && <p className={s.errorMsg}>{meta.error}</p>}
			</div>
		</div>
	);
};

export default InputPassword;

const EyeIcon = ({
	isShownPassword,
	handleShowPassword,
}: SvgIconProps): ReactElement<SVGElement> => {
	return isShownPassword ? (
		<Eye className={s.eyeIcon} onClick={handleShowPassword} />
	) : (
		<CloseEye className={s.eyeIcon} onClick={handleShowPassword} />
	);
};
