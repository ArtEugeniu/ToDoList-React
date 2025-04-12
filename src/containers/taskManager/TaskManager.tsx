import styles from './TaskManager.module.scss';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useConfirmPopup } from "../../hooks/useConfirmPopup";
import { deleteTask, toggleStatus, deleteAllCompleted } from "../../store/taskListSlice";
import { useState, useEffect } from "react";
import { useEditPopup } from "../../hooks/useEditPopup";
import TaskList from "../../components/taskList/TaskList";
import TaskListFilter from "../../components/taskListFilter/TaskListFilter";
import ConfirmPopup from "../../components/confirmPopup/ConfirmPopup";
import EditPopup from "../../components/editPopup/EditPopup";




const TaskManager: React.FC = () => {
  const { isOpen, message, openPopup, onCancel, onConfirm } = useConfirmPopup();
  const { isEditOpen, currentDescription, currentTitle, openEditPopup, cancelEditPopup, saveEditPopup, newData } = useEditPopup();

  const [filterState, setFilterState] = useState<string>('all');
  const [newText, setNewText] = useState<{ title: string, description: string }>({
    title: '',
    description: ''
  });

  const taskList = useAppSelector(state => state.taskList);
  const dispatch = useAppDispatch();

  const completedCount: number = taskList.reduce((count, task) => {
    return task.status ? count + 1 : count;
  }, 0);

  useEffect(() => {
    setNewText({
      title: currentTitle,
      description: currentDescription
    });
  }, [currentTitle, currentDescription]);


  const handleDeleteButton = (id: string): void => {
    openPopup('Delete this task?', () => dispatch(deleteTask(id)), id);
  }

  const handleStatusCheckbox = (id: string): void => {
    dispatch(toggleStatus(id));
  }

  const handleEditButton = (id: string, currentTitle: string, currentDescription: string) => {
    openEditPopup( id, currentTitle, currentDescription, cancelEdit)
  }

  const handleTaskListFilter = (e: React.ChangeEvent<HTMLDivElement>): void => {
    if (e.target instanceof HTMLSelectElement) {
      const value: string = e.target.value;
      setFilterState(value);
      e.target.blur()
    }
  }

  const handleDeleteAllButton = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLButtonElement && completedCount !== 0) {
      openPopup('Delete all completed taskts?', () => dispatch(deleteAllCompleted()));
    }
  }

  const handleInput = (value: string, name: string) => {
    setNewText(prev => {
      const uppdatedText =  {
        ...prev,
        [name]: value
      }

      newData(uppdatedText)

      return uppdatedText
    })
  }

  
  const cancelEdit = (cancelTitle: string, cancelDescription: string) => {
    setNewText({
      title: cancelTitle,
      description: cancelDescription
    })
  }

  



  const filteredTaskList = taskList.filter(item => {
    switch (filterState) {
      case 'all':
        return true;
      case 'active':
        return item.status === false;
      case 'completed':
        return item.status === true;
      default:
        return true;
    }
  })


  return (
    <div className={styles.taskContainer}>
      <div className={styles.taskFilter} onChange={handleTaskListFilter} onClick={handleDeleteAllButton}>
        <TaskListFilter />
      </div>

      {
        filteredTaskList.length === 0
          ? <div className={styles.taskNoTask}>No Tasks</div>
          : <TaskList
            taskData={filteredTaskList}
            onDeleteClick={handleDeleteButton}
            onStatusChange={handleStatusCheckbox}
            onEditClick={handleEditButton}
          />
      }
      <EditPopup
        isOpen={isEditOpen}
        newText={newText}
        onCancel={cancelEditPopup}
        onChange={handleInput}
        onAccept={saveEditPopup}
      />
      <ConfirmPopup isOpen={isOpen} onCancel={onCancel} onConfirm={onConfirm} message={message} />
    </div>
  )
}

export default TaskManager;