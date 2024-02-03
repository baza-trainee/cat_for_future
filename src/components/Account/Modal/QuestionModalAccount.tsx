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
	textBtnLeft,
	textBtnRight,
}: {
	question: string;
	text?: string;
	successFnc: () => void;
	declineFnc: () => void;
	className?: string;
	textBtnLeft?: string;
	textBtnRight?: string;
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
					onClick={declineFnc}
					name={textBtnLeft ? textBtnLeft : 'Ні'}
					styleBtn={{ ...btnStyle }}
					buttonClasses={'secondaryBtn tertiary'}
				></Button>
				<Button
					onClick={successFnc}
					name={textBtnRight ? textBtnRight : 'Так'}
					buttonClasses={'primaryBtn'}
					styleBtn={btnStyle}
				></Button>
			</div>
		</div>
	);
};

export default QuestionModalAccount;
