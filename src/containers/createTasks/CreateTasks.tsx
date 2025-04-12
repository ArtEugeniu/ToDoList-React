import styles from './CreateTasks.module.scss';
import { useState } from 'react';
import TaskInputs from '../../components/taskInputs/TaskInputs';
import AddButton from '../../components/addTaskButton/AddTaskButton';
import { useAppDispatch } from '../../hooks/hooks';
import { addNewTask } from '../../store/taskListSlice';
import { v4 as uuid } from 'uuid';

export interface ItaskDataTypes {
  title: string
  description: string
  id: string
  status: boolean
}



const CreateTasks: React.FC = () => {

  const emptyTask: ItaskDataTypes = {
    title: '',
    description: '',
    id: uuid(),
    status: false
  }

  const [taskData, setTaskData] = useState<ItaskDataTypes>(emptyTask)

  const dispatch = useAppDispatch();

  const handleInputs = (value: string, name: string): void => {
    setTaskData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleAddButton = (e: React.MouseEvent, taskData: ItaskDataTypes) => {
    if (e.target instanceof HTMLElement && e.target.tagName !== 'BUTTON') return;
    if (taskData.title.trim() === '' && taskData.description.trim() === '') return;
    dispatch(addNewTask(taskData));
    
    setTaskData(emptyTask);
  }

  return (
    <div className={styles.createTasks} onClick={(e) => handleAddButton(e, taskData)}>
      <TaskInputs
        onInputChange={handleInputs}
        titleValue={taskData.title}
        descriptionValue={taskData.description} />
      <AddButton />
    </div>
  )
}

export default CreateTasks;