import styles from '../TaskList.module.scss';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useConfirmPopup } from '../../../hooks/useConfirmPopup';
import { useToggleStatus } from '../../../hooks/toggleStatusHook';



interface SortableTaskProps {
  task: {
    title: string
    description: string
    id: string
    status: boolean
  };
}

const SortableTask: React.FC<SortableTaskProps> = ({ task }) => {

  const { openDeleteTaskPopup, openEditPopup } = useConfirmPopup();
  const onStatusChange = useToggleStatus();

  const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    zIndex: isDragging ? 99 : 1,
    opacity: isDragging ? 0.1 : 1,
  }

  return (
    <li className={styles.taskItem} ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <input type="checkbox" checked={task.status} onChange={() => onStatusChange(task.id)} />
      <div className={styles.taskText}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className={styles.taskButtons}>
        <button className={styles.taskEditButton} onClick={() => openEditPopup(task.id)}></button>
        <button className={styles.taskDeleteButton} onClick={() => openDeleteTaskPopup(task.id)}></button>
      </div>
    </li>
  );
}

export default SortableTask;