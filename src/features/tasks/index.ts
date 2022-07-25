import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ITask } from './../../interfaces/task';

interface ITaskList {
  list: ITask[];
}

const initialState: ITaskList = {
  list: [],
};

export const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ITask>) => {
      state.list = [...state.list, { ...action.payload }];
    },
    remove: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    update: (state, action: PayloadAction<ITask>) => {
      state.list = state.list.map((item) =>
        item.id === action.payload.id ? { ...action.payload } : item
      );
    },
  },
});

export const { add, remove, update } = tasks.actions;

export default tasks.reducer;
