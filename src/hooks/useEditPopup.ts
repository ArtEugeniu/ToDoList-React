import { useState } from 'react';
import { useAppDispatch } from './hooks';
import { saveEditTask } from '../store/taskListSlice';

export const useEditPopup = () => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [currentDescription, setCurrentDescription] = useState<string>('');
  const [editedData, setEditedData] = useState<{ title: string, description: string }>({ title: '', description: '' });
  const [currentId, setCurrentId] = useState<string>('');
  const [cancelEdit, setCancelEdit] = useState<(a: string, b: string) => void>(() => {})
  const dispatch = useAppDispatch();

  const openEditPopup = (id: string, currentTitle: string, currentDescription: string, cancelEdit: (a: string, b: string) => void) => {
    setIsEditOpen(true);
    setCurrentTitle(currentTitle);
    setCurrentDescription(currentDescription);
    setCurrentId(id);
    setCancelEdit(() => cancelEdit);
  }

  const newData = (newData: { title: string, description: string }) => {
    setEditedData(newData)
  }

  const saveEditPopup = () => {
    dispatch(saveEditTask({
      newTitle: editedData.title,
      newDescription: editedData.description,
      id: currentId
    }))
    setIsEditOpen(false)
  }

  const cancelEditPopup = () => {
    cancelEdit(currentTitle, currentDescription)
    setIsEditOpen(false);
  }


  return {
    isEditOpen,
    currentDescription,
    currentTitle,
    openEditPopup,
    cancelEditPopup,
    saveEditPopup,
    newData
  }
}