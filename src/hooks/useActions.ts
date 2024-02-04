import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showLogin, showLoginAdmin } from '../store/slice/showLoginSlice';
import { AppDispatch } from 'src/store/store';
import { setUserData } from 'src/store/slice/userSlice.ts';

export const useActions = () => {
	const dispatch = useDispatch<AppDispatch>();

	return bindActionCreators(
		{
			showLogin,
			showLoginAdmin,
			setUserData,
		},
		dispatch
	);
};
