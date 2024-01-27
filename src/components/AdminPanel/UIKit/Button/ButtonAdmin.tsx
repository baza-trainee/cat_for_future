import styles from './ButtonAdmin.module.scss';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<any> {
	text: string;
}

const ButtonAdmin = ({ text, ...props }: ButtonProps) => {
	return (
		<button className={styles.button} {...props}>
			{text}
		</button>
	);
};

export default ButtonAdmin;
