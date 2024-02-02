import Button from 'src/components/Button/Button';
import styles from './ModalAccount.module.scss';
import { useMediaQuery } from 'src/hooks/useMediaQuery';
import clsx from 'clsx';

const QuestionModalAccount = ({
	question,
	text,
	successFnc,
	declineFnc,
	className,
}: {
	question: string;
	text?: string;
	successFnc: () => void;
	declineFnc: () => void;
	className?: string;
}) => {
	const { isTablet } = useMediaQuery();
	const btnStyle = {
		width: isTablet ? '12.5rem' : '12rem',
	};
	return (
		<div className={clsx(styles.question, className ? styles[className] : null)}>
			<h2>{question}</h2>
			{text && <p>{text}</p>}
			<div className={styles.buttons}>
				<Button
					onClick={successFnc}
					name="Так"
					buttonClasses={'primaryBtn'}
					styleBtn={btnStyle}
				></Button>
				<Button
					onClick={declineFnc}
					name="Ні"
					styleBtn={{ ...btnStyle, color: '#131313', borderColor: '#131313' }}
					buttonClasses={'secondaryBtn'}
				></Button>
			</div>
		</div>
	);
};

export default QuestionModalAccount;
