import { PlusIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { DayDTO, LessonTimeDTO } from '../entities/entitiesDTO';

interface EmptyCellProps {
  lessonTime: LessonTimeDTO,
  day: DayDTO,
  onDrop: () => void,
  onClick: () => void,
}

function EmptyCell({ lessonTime, day, onDrop, onClick }: EmptyCellProps) {
  return (
    <div className='group'
         style={{ gridRowStart: Number(lessonTime.id) + 1, gridColumnStart: Number(day.id) + 1 }}
         onDragEnter={(e) => {
           e.preventDefault();
         }}
         onDragOver={(e) => {
           e.preventDefault();
         }}
         onDrop={onDrop}
    >
      <div
        className='invisible h-full border-4 flex justify-center border-gray-400 border-dashed rounded-xl group-hover:visible'
        onClick={onClick}
      >
        <PlusIcon className='w-12 stroke-2 text-gray-400' />
      </div>
    </div>
  );
}

export default EmptyCell;