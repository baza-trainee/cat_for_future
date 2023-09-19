import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    text: string;

}

const initialState: Todo[] = [];

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.push(action.payload);
        },
    },
});

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;
