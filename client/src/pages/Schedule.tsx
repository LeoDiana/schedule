import React, { useEffect, useState } from 'react';
import { allEntitiesRelated } from '../entities/entitiesRelated';
import { AllEntitiesItems } from '../common/types';
import { Day, LessonTime } from '../entities/entitiesClasses';

interface LessonCardProps {
  title: string,
  first: string,
  second: string,
}

function LessonCard({title, first, second}: LessonCardProps): JSX.Element {
  return (
    <div className='col-start-4 row-start-4 bg-indigo-100 drop-shadow-md rounded-xl p-3 leading-tight border-2 border-indigo-200'>
      <p className='mb-2 font-medium'>{title}</p>
      <p className='text-sm leading-none'>{first}</p>
      <p className='text-sm'>{second}</p>
    </div>
  )
}

interface TimeCellsProps {
  number: string,
  time: string,
}

function TimeCell({number, time}: TimeCellsProps): JSX.Element {
  return (
    <div className='text-center h-28 flex flex-col justify-center'>
      <p className='font-semibold'>{number}</p>
      <p className='leading-none'>{time}</p>
    </div>
  )
}

function Schedule(): JSX.Element {
  const [lessonTimes, setLessonTimes] = useState<LessonTime[]>();
  const [days, setDays] = useState<Day[]>();

  useEffect(() => {
    const fetchData = async () => {
      setLessonTimes(await allEntitiesRelated.lessonTime.api.readAll());
      setDays(await allEntitiesRelated.day.api.readAll());
    };

    fetchData();
  }, []);


  return lessonTimes && days ? (
    <div className='m-5'>
      <div className='grid grid-cols-6 grid-rows-9 gap-2'>
        <div className='row-start-1 col-start-1 col-span-6 bg-white relative -z-10 h-10 border-b-2 '></div>
        {lessonTimes.map((time, index) => (
          <div key={time.number} className={`col-start-1 row-start-${index + 2}`}>
            <TimeCell number={time.number} time={`${time.timeStart} - ${time.timeEnd}`} />
          </div>
        ))}
        {days.map((day, index) => (
          <div key={day.name} className={`text-center col-start-${index + 2} row-start-1`}>
            <p className='font-semibold'>{day.name}</p>
          </div>
        ))}
        <div className='col-start-4 row-start-3'>
          <LessonCard title='Обчислювальна геометрія та компʼютер' first='ст. в. Римар П.В.' second='лекція MS Teams'/>
        </div>
        <div className='col-start-3 row-start-2'>
          <LessonCard title='Обчислювальна геометрія та компʼютер' first='ст. в. Римар П.В.' second='лекція MS Teams'/>
        </div>
        <div className='col-start-3 row-start-3'>
          <LessonCard title='Обчислювальна геометрія та компʼютер' first='ст. в. Римар П.В.' second='лекція MS Teams'/>
        </div>
        <div className='col-start-4 row-start-4'>
          <LessonCard title='Обчислювальна геометрія та компʼютер' first='ст. в. Римар П.В.' second='лекція MS Teams'/>
        </div>

      </div>
    </div>
  ) : <div>Loading...</div>
}

export default Schedule;