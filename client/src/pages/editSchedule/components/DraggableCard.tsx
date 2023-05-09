import { inGridPosition } from '../../../utils/inGridPosition';
import { LessonDTO } from '../../../common/entitiesDTO';
import { LessonCard } from '../../../components/LessonCard';
import React from 'react';
import { FilterType } from '../../../common/types';

interface Props {
  lesson: LessonDTO,
  addLine?: (() => JSX.Element),
  selectedType: FilterType,
  isSelected: boolean,
  onDrag: () => void,
  onClick: () => void,
}

export function DraggableCard({ lesson, addLine, selectedType, isSelected, onDrag, onClick }: Props) {
  return (
    <div
      draggable
      style={inGridPosition({ ...lesson })}
      className='relative'
      onDragStart={onDrag}
      onClick={onClick}
    >
      {addLine?.()}
      <LessonCard
        lesson={lesson}
        filterType={selectedType}
        isSelected={isSelected}
      />
    </div>
  );
}