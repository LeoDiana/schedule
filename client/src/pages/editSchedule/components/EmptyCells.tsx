import EmptyCell from '../../../components/EmptyCell';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectDays, selectLessonTimes } from '../../../store/features/entities/entitiesSlice';
import { DayDTO, LessonTimeDTO } from '../../../common/entitiesDTO';

interface Props {
  onDrop: (lessonTime?: LessonTimeDTO, day?: DayDTO) => void,
  onClick: (lessonTime?: LessonTimeDTO, day?: DayDTO) => void,
}

export function EmptyCells({ onDrop, onClick }: Props) {
  const days = useSelector(selectDays);
  const lessonTimes = useSelector(selectLessonTimes);

  const cells: JSX.Element[] = [];
  for (const day of days) {
    for (const lessonTime of lessonTimes) {
      cells.push(
        <EmptyCell
          key={`${day.id}-${lessonTime.id}`}
          day={day}
          lessonTime={lessonTime}
          onDrop={() => onDrop(lessonTime, day)}
          onClick={() => onClick(lessonTime, day)}
        />,
      );
    }
  }

  return (
    <>{cells}</>
  )
}