import styles from './TaskList.module.scss';
import SortableTask from './sortableTask/SortableTask';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { updateTaskOrder } from '../../store/taskListSlice';
import {
  DndContext,
  closestCorners,
  DragOverlay,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToFirstScrollableAncestor
} from '@dnd-kit/modifiers';

interface ITaskListTypes {
  taskList: {
    title: string
    description: string
    id: string
    status: boolean
  }[]
}


const TaskList: React.FC<ITaskListTypes> = ({ taskList }) => {

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const taskData = useAppSelector(state => state.taskList)
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 8
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);


  const handleDragStart = (event: any) => {
    setDraggingId(event.active.id);
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      dispatch(updateTaskOrder({ oldId: active.id, newId: over.id }))
    }
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCorners}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges, restrictToFirstScrollableAncestor]}
    >

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
    </DndContext>
  )
}

export default TaskList;