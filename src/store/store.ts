import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from './taskListSlice';
import popupSlice from "./popupSlice";

export const store = configureStore({
  reducer: {
    taskList: taskListReducer,
    popups: popupSlice
  }
});

store.subscribe(() => {
  const state = store.getState();
  const taskList = state.taskList;

  localStorage.setItem('taskList', JSON.stringify(taskList));
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;