import styles from './TaskList.module.scss';
import SortableTask from './sortableTask/SortableTask';
import { useTaskListDnD } from '../../hooks/useTaskListDnD';
import { DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import DndContextWrapper from '../../context/dndContext';


interface ITaskListTypes {
  taskList: {
    title: string
    description: string
    id: string
    status: boolean
  }[]
}


const TaskList: React.FC<ITaskListTypes> = ({ taskList }) => {

  const dndObj = useTaskListDnD();

  const { draggingId, taskData } = dndObj;


  return (
    <DndContextWrapper {...dndObj}>

      <ul className={styles.taskList}>
        <SortableContext items={taskData} >
          {
            taskList.map(item => {
              return (
                <SortableTask
                  key={item.id}
                  task={item}
                />
              )
            })
          }
        </SortableContext>
      </ul>
      <DragOverlay>
        <div className={styles.taskDragOverlay}>
          <SortableTask
            key={draggingId}
            task={taskData.find((task) => task.id === draggingId)!}
          />
        </div>
      </DragOverlay>
    </DndContextWrapper>
  )
}

export default TaskList;