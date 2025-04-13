import styles from './TaskListFilter.module.scss';

interface IFilterProps {
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}


const TaskListFilter: React.FC<IFilterProps> = ({ onFilterChange }) => {

  return (
    <>
      <select className={styles.filter} name="taskListFilter" id="" onChange={onFilterChange}>
        <option className={styles.filterOption} value="all">All</option>
        <option className={styles.filterOption} value="active">Active</option>
        <option className={styles.filterOption} value="completed">Completed</option>
      </select>
    </>
  )
}

export default TaskListFilter;