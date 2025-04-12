import styles from './TaskListFilter.module.scss';


const TaskListFilter: React.FC = () => {

  return (
    <>
      <select className={styles.filter} name="taskListFilter" id="">
        <option className={styles.filterOption} value="all">All</option>
        <option className={styles.filterOption} value="active">Active</option>
        <option className={styles.filterOption} value="completed">Completed</option>
      </select>
      <button className={styles.deleteAllButton}>Delete Completed Tasks</button>
    </>
  )
}

export default TaskListFilter;