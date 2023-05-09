import { LessonDTO } from '../common/entitiesDTO';
import { FilterType } from '../common/types';
import { getDisplayName } from '../utils/entitiesRelated';
import React from 'react';
import { inGridPosition } from '../utils/inGridPosition';

interface LessonCardProps {
  lesson: LessonDTO,
  filterType: FilterType,
  isSelected?: boolean,
  inGrid?: boolean,
}

export function LessonCard({ lesson, filterType, isSelected = false, inGrid = false }: LessonCardProps): JSX.Element {
  let first;
  const second = `${getDisplayName('lessonType', lesson.lessonType)} ${lesson.classroom ? getDisplayName('classroom', lesson.classroom) : 'MS Teams'}`;

  switch (filterType) {
    case 'subgroup':
      first = getDisplayName('teacher', lesson.teacher);
      break;
    case 'teacher':
      first = getDisplayName('subgroup', lesson.subgroup);
      break;
  }

  return (
    <div
      style={inGrid ? inGridPosition({ ...lesson }) : {}}
      className={[
        'col-start-4 h-28 flex flex-col justify-between row-start-4 bg-indigo-200 drop-shadow-md rounded-xl p-3 leading-tight min-w-[175px]',
        isSelected ? 'border-4 border-indigo-400 p-2.5' : 'border-2 border-indigo-300'].join(' ')}>
      <p className='mb-2 font-medium'>{getDisplayName('subject', lesson.subject)}</p>
      <div>
        <p className='text-sm leading-none'>{first}</p>
        <p className='text-sm'>{second}</p>
      </div>
    </div>
  );
}