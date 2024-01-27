import styles from './ModalAdmin.module.scss';

const QuestionModal = ({
	question,
	text,
	btnLeft,
	btnRight,
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
	return (
		<div className={styles.question}>
			<h2>{question}</h2>
			{text && <p>{text}</p>}
			<div className={styles.buttons}>
				<button onClick={declineFnc} className={styles.noBtn}>
					{btnLeft}
				</button>
				<button onClick={successFnc} className={styles.yesBtn}>
					{btnRight}
				</button>
			</div>
		</div>
	);
};

export default QuestionModal;
