import React from 'react';

import s from './Button.module.scss';

interface IButtonProps {
	name: string;
	imgPath?: string;
	classes?: string;
	onClick: () => void;
	type?: 'button' | 'submit' | 'reset';
	disabled: boolean;
}

const Button: React.FC<IButtonProps> = ({ name, imgPath, classes, onClick, type, disabled }) => {
	return (
		<button
			className={[s.button, classes && s[classes]].join(' ')}
			disabled={disabled}
			type={type}
			onClick={onClick}
		>
			<div>{imgPath && <img src={imgPath} />}</div>
			{name}
		</button>
	);
};

export default Button;
