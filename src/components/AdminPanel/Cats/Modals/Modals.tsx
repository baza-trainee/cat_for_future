import ModalAdmin from 'src/components/AdminPanel/Modal/ModalAdmin.tsx';
import SuccessModal from 'src/components/AdminPanel/Modal/SuccessModal.tsx';
import QuestionModal from 'src/components/AdminPanel/Modal/QuestionModal.tsx';
import { useNavigate } from 'react-router';

interface IModals {
	isAdded: boolean;
	isEdited: boolean;
	isQuestion: boolean;
	setIsQuestion: (isQuestion: boolean) => void;
}
const Modals = ({ isAdded, isEdited, isQuestion, setIsQuestion }: IModals) => {
	const navigate = useNavigate();
	return (
		<>
			{(isAdded || isEdited) && (
				<ModalAdmin onClose={() => navigate(-1)}>
					<SuccessModal text={isAdded ? 'Кіт успішно доданий!' : 'Ваші зміни успішно збережено!'} />
				</ModalAdmin>
			)}

			{isQuestion && (
				<ModalAdmin onClose={() => setIsQuestion(false)}>
					<QuestionModal
						successFnc={() => navigate(-1)}
						declineFnc={() => setIsQuestion(false)}
						question="Ви впевнені що бажаєте залишити сторінку?"
						text="Ваші зміни не буде збережені"
						btnRight="ТАК"
						btnLeft="НІ"
					/>
				</ModalAdmin>
			)}
		</>
	);
};

export default Modals;
