import { ReactNode } from 'react';
import {
  DndContext,
  closestCorners,
} from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToFirstScrollableAncestor
} from '@dnd-kit/modifiers';

interface DndContextWrapperProps {
  children: ReactNode;
  sensors: any;
  handleDragStart: (event: any) => void;
  handleDragEnd: (event: any) => void;
}

const DndContextWrapper: React.FC<DndContextWrapperProps> = ({ children, sensors, handleDragStart, handleDragEnd }) => {

  return (
    <>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCorners}
        modifiers={[restrictToVerticalAxis, restrictToWindowEdges, restrictToFirstScrollableAncestor]}
      >
        {children}
      </DndContext>
    </>
  )
}

export default DndContextWrapper;