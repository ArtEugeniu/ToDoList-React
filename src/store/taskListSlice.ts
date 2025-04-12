import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITaskListSliceTypes {
  title: string
  description: string
  id: string
  status: boolean
}

const loadFromLocalStorage = (): ITaskListSliceTypes[] => {
  try {
    const taskList = localStorage.getItem('taskList');
    if (!taskList) return [];
    return JSON.parse(taskList)
  } catch {
    return []
  }
}

const initialState: ITaskListSliceTypes[] = loadFromLocalStorage();

const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    addNewTask: (state, action: PayloadAction<ITaskListSliceTypes>) => {
      state.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.id !== action.payload)
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      return state.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            status: !item.status
          }
        } else {
          return {
            ...item
          }
        }
      })
    },
    saveEditTask: (state, action: PayloadAction<{ newTitle: string, newDescription: string, id: string }>) => {
      return state.map(item => {
        return item.id === action.payload.id ? {...item, title: action.payload.newTitle, description: action.payload.newDescription} : item
      })
    },
    deleteAllCompleted: (state) => {
      return state.filter(item => item.status === false);
    },
    updateTaskOrder: (state, action: PayloadAction<{ oldId: string, newId: string }>) => {
      const { oldId, newId } = action.payload;

      const oldIndex = state.findIndex(item => item.id === oldId);
      const newIndex = state.findIndex(item => item.id === newId);

      if (oldIndex !== -1 && newIndex !== -1) {
        const [movedTask] = state.splice(oldIndex, 1);
        state.splice(newIndex, 0, movedTask);
      }
    }
  }
})

export const {
  addNewTask,
  deleteTask,
  toggleStatus,
  deleteAllCompleted,
  updateTaskOrder,
  saveEditTask
} = taskListSlice.actions;

export default taskListSlice.reducer;