import styles from './DeleteTaskButton.module.scss';
import { useConfirmPopup } from '../../hooks/useConfirmPopup';

const DeleteAllTasksButton: React.FC = () => {
  
  const { openDeleteAllPopup } = useConfirmPopup();

  return(
    <>
      <button className={styles.deleteAllTasksButton} onClick={() => openDeleteAllPopup()}>Delete Completed Tasks</button>
    </>
  )
}

export default DeleteAllTasksButton;