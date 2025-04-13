import styles from './EmptyTaskList.module.scss';

const EmptyTaskList: React.FC = () => {


  return (
    <>
      <div className={styles.emptyTaskList}>No Tasks</div>
    </>
  )
}

export default EmptyTaskList;