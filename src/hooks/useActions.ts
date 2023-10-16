import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addTodo } from '../store/slice/exampleSlices';
import { showLogin } from '../store/slice/showLoginSlice';
import { AppDispatch } from 'src/store/store';

export const useActions = () => {
	const dispatch = useDispatch<AppDispatch>();

	return bindActionCreators(
		{
			addTodo,
			showLogin,
		},
		dispatch
	);
};
