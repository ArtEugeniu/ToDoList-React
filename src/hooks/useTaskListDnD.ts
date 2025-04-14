import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { updateTaskOrder } from '../store/taskListSlice';
import {
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor
} from '@dnd-kit/core';


export const useTaskListDnD = () => {
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

  return {
    draggingId,
    taskData,
    sensors,
    handleDragStart,
    handleDragEnd
  }
}