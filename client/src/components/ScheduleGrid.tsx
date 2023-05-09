import React from 'react';
import { inGridPosition } from '../utils/inGridPosition';
import { useSelector } from 'react-redux';
import { selectDays, selectLessonTimes } from '../store/features/entities/entitiesSlice';

interface Props {
  children: JSX.Element | JSX.Element[],
}

export function ScheduleGrid({ children }: Props) {
  const lessonTimes = useSelector(selectLessonTimes);
  const days = useSelector(selectDays);

  return (
    <div className='grid grid-cols-6 grid-rows-8 gap-2'>
      {lessonTimes.map((lessonTime) => (
        <div key={lessonTime.number} style={inGridPosition({lessonTime})}>
          <div className='text-center h-28 flex flex-col justify-center'>
            <p className='font-semibold'>{lessonTime.number}</p>
            <p className='leading-none'>{lessonTime.timeStart} - {lessonTime.timeEnd}</p>
          </div>
        </div>
      ))}
      {days.map((day) => (
        <div key={day.name} style={inGridPosition({day})}>
          <p className='font-semibold text-center'>{day.name}</p>
        </div>
      ))}
      {children}
    </div>);
}