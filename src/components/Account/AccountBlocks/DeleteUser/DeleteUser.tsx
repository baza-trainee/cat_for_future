import React, { useEffect } from 'react';
import ModalAccount from '../../Modal/ModalAccount';
import QuestionModalAccount from '../../Modal/QuestionModalAccount';
import { useNavigate } from 'react-router';
import { useDeleteUserMutation, useGetUserQuery } from 'src/store/slice/userApiSlice';

interface IError {
	data: {
		detail: string;
	};
	status: number;
}
const DeleteUser: React.FC = () => {
	const [deleteUser] = useDeleteUserMutation();

	const { error } = useGetUserQuery('', {
		refetchOnMountOrArgChange: true,
	});

	const userError = error as IError;

	useEffect(() => {
		if (userError?.status === 401) {
			localStorage.removeItem('token');
		}
	}, [userError]);

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
					className="delete"
					textBtnLeft="Назад"
					textBtnRight="Видалити"
				/>
			</ModalAccount>
		</div>
	);
};

export default DeleteUser;
