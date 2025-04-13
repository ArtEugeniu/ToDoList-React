import { useAppDispatch, useAppSelector } from './hooks';
import { openPopup, closePopup } from '../store/popupSlice';
import { deleteTask, deleteAllCompleted, saveEditTask } from '../store/taskListSlice';


export const useConfirmPopup = () => {

  const dispatch = useAppDispatch();
  const popupState = useAppSelector(state => state.popups);
  const taskList = useAppSelector(state => state.taskList);
  const completedCount: number = taskList.reduce((count, task) => {
    return task.status ? count + 1 : count;
  }, 0);

  const openDeleteTaskPopup = (id: string) => {
    dispatch(openPopup({
      isOpen: true,
      message: 'Delete this task?',
      type: 'deleteSingle',
      id: id
    }))
  }

  const openDeleteAllPopup = () => {
    if(!completedCount) return

    dispatch(openPopup({
      isOpen: true,
      message: 'Delete all completed tasks?',
      type: 'deleteAll',
      id: ''
    }))
  }

  const openEditPopup = (id: string) => {
    dispatch(openPopup({
      isOpen: true,
      type: 'edit',
      message: '',
      id: id
    }))
  }

  const onConfirm = (editedTitle?: string, editedDescription?: string) => {
    if (popupState.type === 'deleteSingle') {
      dispatch(deleteTask(popupState.id));
      dispatch(closePopup());
    }
    if (!popupState.id) {
      dispatch(deleteAllCompleted());
      dispatch(closePopup());
    }
    if (popupState.type === 'edit' && editedTitle && editedDescription) {
      dispatch(saveEditTask({
        newTitle: editedTitle,
        newDescription: editedDescription,
        id: popupState.id
      }));
      dispatch(closePopup());
    }
  }

  const onCancel = () => {
    dispatch(closePopup())
  }

  return {
    openDeleteTaskPopup,
    openDeleteAllPopup,
    onConfirm,
    onCancel,
    openEditPopup
  }
}

