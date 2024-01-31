import React from 'react';
import ModalAccount from '../../Modal/ModalAccount';
import QuestionModalAccount from '../../Modal/QuestionModalAccount';
import { useNavigate } from 'react-router';
import { useDeleteUserMutation } from 'src/store/slice/userApiSlice';

const DeleteUser: React.FC = () => {
	const [deleteUser] = useDeleteUserMutation();

	const navigate = useNavigate();

	const successFnc = async () => {
		await deleteUser('');
		localStorage.removeItem('token');
		navigate('/');
	};
	const declineFnc = () => {
		navigate(-1);
	};

	return (
		<div>
			<ModalAccount onClose={declineFnc}>
				<QuestionModalAccount
					question="Видалення акаунта"
					text="Ви впевнені що бажаєте видалити акаунт? Видалення акаунту призведе до втрати всіх даних профілю, бронювання кошенят буде відмінено"
					successFnc={successFnc}
					declineFnc={declineFnc}
				/>
			</ModalAccount>
		</div>
	);
};

export default DeleteUser;
