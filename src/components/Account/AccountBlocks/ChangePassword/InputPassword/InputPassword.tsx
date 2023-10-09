import { ReactElement, useState } from 'react';
import { useField } from 'formik';
import clsx from 'clsx';

import s from './InputPassword.module.scss';

import { ReactComponent as Eye } from 'src/assets/icons/open-eye.svg';
import { ReactComponent as CloseEye } from 'src/assets/icons/close-eye.svg';

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
			<label className={clsx(s.label, meta.error && s.errorColor)} htmlFor={name}>
				{label}
			</label>
			<div className={s.inputContainer}>
				<input
					type={isShownPassword ? 'text' : 'password'}
					className={clsx(s.input, fields.value && s.active, meta.error && s.error)}
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
