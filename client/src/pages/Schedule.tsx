import React, { useEffect, useState } from 'react';
import { getDisplayName } from '../entities/entitiesRelated';
import { Lesson } from '../entities/entitiesClasses';
import { readLessonsWithFilter } from '../api/apiCalls';
import { FilterType } from '../common/types';
import { useSelector } from 'react-redux';
import { selectDays, selectLessonTimes } from '../features/entities/entitiesSlice';
import { DayDTO, LessonTimeDTO } from '../entities/entitiesDTO';

interface LessonCardProps {
  lesson: Lesson,
  filterType: FilterType,
  isSelected?: boolean
}

export function LessonCard({lesson, filterType, isSelected=false}: LessonCardProps): JSX.Element {
  let first;
  const second = `${getDisplayName('lessonType', lesson.lessonType)} ${lesson.classroom ? getDisplayName('classroom', lesson.classroom) : 'MS Teams'}`;

  switch (filterType) {
    case 'subgroup': first = getDisplayName('teacher', lesson.teacher); break;
    case 'teacher': first = getDisplayName('subgroup', lesson.subgroup); break;
  }

  return (
    <div className={[
      'col-start-4 h-28 flex flex-col justify-between row-start-4 bg-indigo-200 drop-shadow-md rounded-xl p-3 leading-tight min-w-60',
      isSelected ? 'border-4 border-indigo-400 p-2.5' : 'border-2 border-indigo-300'].join(' ')}
    style={{minWidth:'175px'}}>
      <p className='mb-2 font-medium'>{getDisplayName('subject', lesson.subject)}</p>
      <div>
        <p className='text-sm leading-none'>{first}</p>
        <p className='text-sm'>{second}</p>
      </div>
    </div>
  )
}

interface TimeCellsProps {
  number: string,
  time: string,
}

export function TimeCell({number, time}: TimeCellsProps): JSX.Element {
  return (
    <div className='text-center h-28 flex flex-col justify-center'>
      <p className='font-semibold'>{number}</p>
      <p className='leading-none'>{time}</p>
    </div>
  )
}

interface Props {
  filter: any,
  filteredEntity: any,
}

function Schedule({filter, filteredEntity}: Props): JSX.Element {
  const lessonTimes = useSelector(selectLessonTimes);
  const days = useSelector(selectDays);
  const [lessons, setLessons] = useState<Lesson[]>();

  useEffect(() => {
    (async () => {
      setLessons(await readLessonsWithFilter(filteredEntity.id, filter));
    })();

  }, [filter, filteredEntity]);


  return lessonTimes && days && lessons ? (
    <div className='m-5'>
      <h3 className='text-3xl text-center pb-6 font-bold'>{getDisplayName(filter, filteredEntity)}</h3>
      <ScheduleGrid lessonTimes={lessonTimes} days={days}>
        {lessons.filter(lesson => lesson.lessonTime && lesson.day).map((lesson) => (
          <div key={lesson.id}
               style={{gridRowStart: lesson.lessonTime!.id+1, gridColumnStart: lesson.day!.id+1}}
          >
            <LessonCard
              lesson={lesson}
              filterType={filter}
            />
          </div>
        ))}
      </ScheduleGrid>
    </div>
  ) : <div>Loading...</div>
}

interface ScheduleGridProps {
  lessonTimes: LessonTimeDTO[],
  days: DayDTO[],
  children: JSX.Element | JSX.Element[],
}

export function ScheduleGrid({lessonTimes, days, children}: ScheduleGridProps) {
   return(
     <div className='grid grid-cols-6 grid-rows-8 gap-2'>
      {lessonTimes.map((time) => (
        <div key={time.number} style={{gridRowStart: time.id + 1, gridColumnStart: 1}}>
          <TimeCell number={time.number} time={`${time.timeStart} - ${time.timeEnd}`} />
        </div>
      ))}
      {days.map((day) => (
        <div key={day.name} style={{gridRowStart: 1, gridColumnStart: day.id + 1}}>
          <p className='font-semibold text-center'>{day.name}</p>
        </div>
      ))}
     {children}
    </div>)
}

export default Schedule;