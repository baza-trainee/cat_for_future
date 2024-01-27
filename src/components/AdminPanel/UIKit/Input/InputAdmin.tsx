import styles from './InputAdmin.module.scss';
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { CalendarDays } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	component?: 'input' | 'textarea';
	labelSmall?: boolean;
}

const InputAdmin = ({ label, labelSmall = false, component = 'input', ...props }: InputProps) => {
	const isDateInput = props.type === 'date';
	const isValue: boolean = !!(props.value && props.type === 'date');

	return (
		<label className={styles.wrapper}>
			<span className={`${styles.label} ${labelSmall ? styles.small : ''}`}>{label}</span>
			<div className={`${isDateInput ? styles.dateInputWrapper : ''} `}>
				{component === 'textarea' ? (
					<textarea {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
				) : (
					<input
						{...props}
						value={props.value}
						onChange={props.onChange}
						data-placeholder={'Оберіть дату народження'}
						className={isValue ? styles.placeholder : ''}
					/>
				)}
				{isDateInput && (
					<div className={styles.calendarIcon}>
						<CalendarDays />
					</div>
				)}
			</div>
		</label>
	);
};

export default InputAdmin;
