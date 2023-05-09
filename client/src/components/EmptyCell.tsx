import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { DayDTO, LessonTimeDTO } from '../common/entitiesDTO';
import { inGridPosition } from '../utils/inGridPosition';

interface Props {
  lessonTime: LessonTimeDTO,
  day: DayDTO,
  onDrop: () => void,
  onClick: () => void,
}

function EmptyCell({ lessonTime, day, onDrop, onClick }: Props) {
  return (
    <div className='group'
         style={inGridPosition({ lessonTime, day })}
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