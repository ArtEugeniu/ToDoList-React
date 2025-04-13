import styles from './TaskListFilterContainer.module.scss'
import { useState } from "react";
import TaskListFilter from "../../components/taskListFilter/TaskListFilter";
import TasklistContainer from '../TaskListContainer/TaskListContainer';
import DeleteAllTasksButton from '../../components/deleteAllTasksButton/DeleteAllTasksButton';


const TaskListFilterContainer: React.FC = () => {

  const [filterState, setFilterState] = useState<string>('all');

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterState(e.target.value);
    e.target.blur();
  }


  return (
    <>
      <div className={styles.filterBlock}>
        <TaskListFilter onFilterChange={handleFilter} />
        <DeleteAllTasksButton />
      </div>
      <TasklistContainer filter={filterState} />
    </>
  )
}

export default TaskListFilterContainer;