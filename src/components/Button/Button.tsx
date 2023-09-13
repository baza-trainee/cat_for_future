import React from 'react';

import s from './Button.module.scss';
import clsx from 'clsx';

interface IButtonProps {
	name?: string;
	imgPath?: string;
	buttonClasses?: string;
	imgClasses?: string;
	onClick: () => void;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	style?: React.CSSProperties;
}

const Button: React.FC<IButtonProps> = ({
	name,
	imgPath,
	buttonClasses,
	imgClasses,
	onClick,
	type,
	disabled,
	style,
}) => {
	const btnClasses = buttonClasses
		? clsx(s.button, buttonClasses?.split(' ').map((item) => s[item]))
		: s.button;

	return (
		<button className={btnClasses} disabled={disabled} type={type} onClick={onClick} style={style}>
			{imgPath && <img className={clsx(imgClasses && s[imgClasses])} src={imgPath} />}
			{name}
		</button>
	);
};

export default Button;
