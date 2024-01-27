import styles from './ButtonAdmin.module.scss';

const ButtonAdmin = ({ text }: { text: string }) => {
	return <button className={styles.button}>{text}</button>;
};

export default ButtonAdmin;
