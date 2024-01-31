import styles from './InputAdmin.module.scss';
import Select, {
	CSSObjectWithLabel,
	Props as SelectProps,
	SingleValue,
	StylesConfig,
} from 'react-select';
import { useField } from 'formik';
import { useEffect } from 'react';

interface InputSelectProps extends SelectProps<OptionType, false> {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
	name: string;
}

interface OptionType {
	value: string;
	label: string;
}

const customStyles: StylesConfig<OptionType, false> = {
	control: (provided: CSSObjectWithLabel) => ({
		...provided,
		borderRadius: 'none',
		borderColor: '#939393',
		height: '3rem',
		width: '33.5625rem',
		boxShadow: 'none',
		'&:hover': {
			borderColor: '#434444',
		},
	}),
	valueContainer: (provided: CSSObjectWithLabel) => ({
		...provided,
		height: '3rem',
		padding: '0 1rem',
		fontSize: '1.25rem',
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

const InputSelect = ({ label, options, placeholder, name, ...props }: InputSelectProps) => {
	const [field, , fieldHelpers] = useField(name);

	useEffect(() => {
		if (field.value !== undefined && field.value.toString() !== field.value) {
			const initialOption = options.find((option) => option.value === field.value.toString());
			if (initialOption) {
				fieldHelpers.setValue(initialOption.value);
			}
		}
	}, [field.value, options, fieldHelpers]);

	const handleChange = (newValue: SingleValue<OptionType>) => {
		if (newValue) {
			fieldHelpers.setValue(newValue.value);
		} else {
			fieldHelpers.setValue(field.value.toString());
		}
	};

	const selectedValue = options.find((option) => option.value === field.value);

	return (
		<label className={styles.wrapper}>
			<span className={`${styles.label}`}>{label}</span>
			<Select
				{...props}
				value={selectedValue}
				onChange={handleChange}
				options={options}
				styles={customStyles}
				placeholder={placeholder}
			/>
		</label>
	);
};

export default InputSelect;
