import React from 'react';

import s from './Button.module.scss';
import clsx from 'clsx';

interface IButtonProps {
	name?: string;
	buttonClasses?: string;
	onClick: () => void;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	styleBtn?: React.CSSProperties;
	children?: React.ReactNode;
}

const Button: React.FC<IButtonProps> = ({
	name,
	buttonClasses,
	onClick,
	type,
	disabled,
	styleBtn,
	children,
}) => {
	const btnClasses = buttonClasses
		? clsx(s.button, buttonClasses?.split(' ').map((item) => s[item]))
		: s.button;

	return (
		<button
			className={btnClasses}
			disabled={disabled}
			type={type}
			onClick={onClick}
			style={styleBtn}
		>
			{children}
			{name}
		</button>
	);
};

export default Button;
