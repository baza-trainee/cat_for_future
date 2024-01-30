import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showLogin, showLoginAdmin } from '../store/slice/showLoginSlice';
import { AppDispatch } from 'src/store/store';
import { resetEmail } from 'src/store/slice/resetPassSlice.ts';

export const useActions = () => {
	const dispatch = useDispatch<AppDispatch>();

	return bindActionCreators(
		{
			showLogin,
			showLoginAdmin,
			resetEmail,
		},
		dispatch
	);
};
