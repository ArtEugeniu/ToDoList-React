import styles from './TaskListContainer.module.scss';
import { useAppSelector } from "../../hooks/hooks";
import TaskList from "../../components/taskList/TaskList";
import EmptyTaskList from "../../components/emptyTaskList/EmptyTaskList";

interface IListContainerProps {
  filter: string
}

const AddToListContainer: React.FC<IListContainerProps> = ({ filter }) => {

  const taskList = useAppSelector(state => state.taskList);

  const filteredTaskList = taskList.filter(item => {
    switch (filter) {
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
    <div className={styles.taskListContainer}>
      {filteredTaskList.length === 0 ?
        <EmptyTaskList /> : <TaskList taskList={filteredTaskList} />
      }
    </div>
  )
}

export default AddToListContainer;