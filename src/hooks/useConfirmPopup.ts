import { useState } from 'react';

export const useConfirmPopup = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editIsOpen, setEditIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [taskId, setTaskId] = useState<string | undefined>('');
  const [deleteConfirmed, setDeleteConfirmed] = useState<(id: string) => void>(() => { });
  const [deleteAllConfirmed, setDeleteAllConfirmed] = useState<() => void>(() => { });

  const openPopup = (message: string, deleteConfirmed: (id: string) => void, id?: string) => {
    setMessage(message);
    setTaskId(id);
    if (id) {
      setDeleteConfirmed(() => deleteConfirmed);
    } else {
      setDeleteAllConfirmed(() => deleteConfirmed);
    }
    setIsOpen(true)
  }

  const openEditPopup = (id: string) => {
    setTaskId(id);
    setEditIsOpen(true);
  }

  const closePopup = () => {
    setIsOpen(false);
    setEditIsOpen(false);
  }

  const onConfirm = () => {
    if (taskId) {
      deleteConfirmed(taskId)
    } else {
      deleteAllConfirmed()
    }

    closePopup()
  }

  const onCancel = () => {
    closePopup()
  }

  return {
    isOpen,
    editIsOpen,
    message,
    openPopup,
    openEditPopup,
    onConfirm,
    onCancel
  }
}

