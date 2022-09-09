import React, { useEffect, useState } from 'react';
import { allEntitiesRelated } from '../entities/entitiesRelated';
import { Day, Lesson, LessonTime } from '../entities/entitiesClasses';
import { readLessonsWithFilter } from '../api/apiCalls';

interface LessonCardProps {
  title: string,
  first: string,
  second: string,
}

export function LessonCard({title, first, second}: LessonCardProps): JSX.Element {
  return (
    <div className='col-start-4 h-28 flex flex-col justify-between row-start-4 bg-indigo-200 drop-shadow-md rounded-xl p-3 leading-tight border-2 border-indigo-300'>
      <p className='mb-2 font-medium'>{title}</p>
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
  const [lessonTimes, setLessonTimes] = useState<LessonTime[]>();
  const [days, setDays] = useState<Day[]>();
  const [lessons, setLessons] = useState<Lesson[]>();

  useEffect(() => {
    const fetchData = async () => {
      setLessonTimes(await allEntitiesRelated.lessonTime.api.readAll());
      setDays(await allEntitiesRelated.day.api.readAll());
      // setLessons(await allEntitiesRelated.lesson.api.readAll());

      setLessons(await readLessonsWithFilter(filteredEntity.id, filter));

    };

    fetchData();
  }, [filter, filteredEntity]);


  return lessonTimes && days && lessons ? (
    <div className='m-5'>
      <h3 className='text-3xl text-center pb-6 font-bold'>{filteredEntity.displayName}</h3>
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

        {lessons.map((lesson) => (
          <div key={lesson.id}
               style={{gridRowStart: lesson.lessonTime.id+1, gridColumnStart: lesson.day.id+1}}
               >
            <LessonCard
              title={lesson.subject.displayName}
              first={lesson.teacher.displayName}
              second={`${lesson.lessonType.displayName} ${lesson.classroom ? lesson.classroom.displayName : 'MS Teams'} `}
            />
          </div>
        ))}
      </div>
    </div>
  ) : <div>Loading...</div>
}

export default Schedule;