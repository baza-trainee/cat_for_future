import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo } from './slice/exampleSlices';


export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(
        {
            addTodo,
        },
        dispatch
    );
};
