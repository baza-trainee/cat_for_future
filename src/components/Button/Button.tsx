import React from 'react';

import s from './Button.module.scss';

interface IButtonProps {
	name?: string;
	imgPath?: string;
	buttonClasses?: string;
	divClasses?: string;
	imgClasses?: string;
	onClick: () => void;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
	name,
	imgPath,
	buttonClasses,
	divClasses,
	imgClasses,
	onClick,
	type,
	disabled,
}) => {
	return (
		<button
			className={[s.button, buttonClasses && s[buttonClasses]].join(' ')}
			disabled={disabled}
			type={type}
			onClick={onClick}
		>
			<div className={[divClasses && s[divClasses]].join(' ')}>
				{imgPath && <img className={[imgClasses && s[imgClasses]].join(' ')} src={imgPath} />}
			</div>
			{name}
		</button>
	);
};

export default Button;
