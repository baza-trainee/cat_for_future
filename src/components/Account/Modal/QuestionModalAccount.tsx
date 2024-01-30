import Button from 'src/components/Button/Button';
import styles from './ModalAccount.module.scss';

const QuestionModalAccount = ({
	question,
	text,
	successFnc,
	declineFnc,
}: {
	question: string;
	text?: string;
	btnLeft: string;
	btnRight: string;
	successFnc: () => void;
	declineFnc: () => void;
}) => {
	const btnStyle = {
		width: '100%',
	};
	return (
		<div className={styles.question}>
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
