import { SelectHTMLAttributes } from 'react';
import styles from './InputAdmin.module.scss';
import Select, { CSSObjectWithLabel, StylesConfig } from 'react-select';

interface InputSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
}

interface OptionType {
	value: string;
	label: string;
}

const customStyles: StylesConfig<OptionType, false> = {
	control: (provided: CSSObjectWithLabel) => ({
		...provided,
		borderRadius: 'none',
		borderColor: '#000',
		height: '3rem',
		width: '33.5625rem',
		boxShadow: 'none',
		'&:hover': {
			borderColor: 'none',
		},
	}),
	valueContainer: (provided: CSSObjectWithLabel) => ({
		...provided,
		height: '3rem',
		padding: '0 1rem',
	}),
	input: (provided: CSSObjectWithLabel) => ({
		...provided,
		margin: '0px',
	}),
	indicatorSeparator: () => ({
		display: 'none',
	}),
	indicatorsContainer: (provided: CSSObjectWithLabel) => ({
		...provided,
		height: '3rem',
		width: '3rem',
	}),
	dropdownIndicator: (base: CSSObjectWithLabel) => ({
		...base,
		color: 'black',
		strokeWidth: '1',
		'&:hover': {
			color: 'black',
		},
	}),
	placeholder: (provided: CSSObjectWithLabel) => ({
		...provided,
		color: '#C7C7C7',
		fontSize: '1.25rem',
	}),
};

const InputSelect = ({ label, options, placeholder }: InputSelectProps) => {
	return (
		<label className={styles.wrapper}>
			<span className={`${styles.label}`}>{label}</span>
			<Select options={options} styles={customStyles} placeholder={placeholder} />
		</label>
	);
};

export default InputSelect;
