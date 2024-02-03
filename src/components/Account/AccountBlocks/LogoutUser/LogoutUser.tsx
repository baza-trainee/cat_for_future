import React from 'react';
import ModalAccount from '../../Modal/ModalAccount';
import QuestionModalAccount from '../../Modal/QuestionModalAccount';
import { useLogOutMutation } from 'src/store/slice/authApiSlice';
import { useNavigate } from 'react-router';

const LogoutUser: React.FC = () => {
	const [logOut] = useLogOutMutation();

	const navigate = useNavigate();

	const successFnc = async () => {
		await logOut('');
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
					question="Вихід з акаунта"
					text="Ви впевнені, що хочете вийти з акаунту?"
					successFnc={successFnc}
					declineFnc={declineFnc}
					textBtnLeft="Назад"
					textBtnRight="Вихід"
				/>
			</ModalAccount>
		</div>
	);
};

export default LogoutUser;
