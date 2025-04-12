import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from './taskListSlice';

export const store = configureStore({
  reducer: {
    taskList: taskListReducer
  }
});

store.subscribe(() => {
  const state = store.getState();
  const taskList = state.taskList;

  localStorage.setItem('taskList', JSON.stringify(taskList));
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;