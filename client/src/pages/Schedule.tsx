import React, { useEffect, useState } from 'react';
import { allEntitiesRelated } from '../entities/entitiesRelated';
import { Day, Lesson, LessonTime } from '../entities/entitiesClasses';

interface LessonCardProps {
  title: string,
  first: string,
  second: string,
}

function LessonCard({title, first, second}: LessonCardProps): JSX.Element {
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
  const [lessons, setLessons] = useState<Lesson[]>();

  useEffect(() => {
    const fetchData = async () => {
      setLessonTimes(await allEntitiesRelated.lessonTime.api.readAll());
      setDays(await allEntitiesRelated.day.api.readAll());
      setLessons(await allEntitiesRelated.lesson.api.readAll());

      // const a = await allEntitiesRelated.lessonTime.api.readAll();
      // const b = [0, ...a.map((time) => time.id)];
      // console.log(b.join(' '));
      // const c = await allEntitiesRelated.day.api.readAll();
      // const d = [0, ...c.map((d) => d.id)];
      // console.log(d.join(' '));
      // const g
    };

    fetchData();
  }, []);


  return lessonTimes && days && lessons ? (
    <div className='m-5'>
      <div className='grid grid-cols-6 grid-rows-8 gap-2'>
      {/* <div style={{ */}
      {/*   display: 'grid', */}
      {/*   gridTemplateColumns: '150px repeat(7, 200px)', */}
      {/*   gridTemplateRows:' 40px repeat(7, 100px)', */}
      {/*   gap: '7px', */}
      {/* }}> */}
      {/*   <div className='row-start-1 col-start-1 col-span-6 bg-white relative -z-10 h-10 border-b-2 '></div> */}
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

        {lessons.map((lesson, index) => (
          <div key={index}
               style={{gridRowStart: lesson.lessonTime.id+1, gridColumnStart: lesson.day.id+1}}
               >
            <LessonCard
              title={lesson.subject.displayName}
              first={lesson.teacher.displayName}
              second={`${lesson.lessonType.displayName} ${lesson.classroom ? lesson.classroom.displayName : 'MS Teams'} `}
            />
          </div>
        ))}
        {/* <div className='col-start-4 row-start-3'> */}
        {/*   <LessonCard title='Обчислювальна геометрія та компʼютер' first='ст. в. Римар П.В.' second='лекція MS Teams'/> */}
        {/* </div> */}
        {/* <div className='col-start-3 row-start-2'> */}
        {/*   <LessonCard title='Обчислювальна геометрія та компʼютер' first='ст. в. Римар П.В.' second='лекція MS Teams'/> */}
        {/* </div> */}
        {/* <div className='col-start-3 row-start-3'> */}
        {/*   <LessonCard title='Обчислювальна геометрія та компʼютер' first='ст. в. Римар П.В.' second='лекція MS Teams'/> */}
        {/* </div> */}
        {/* <div className='col-start-4 row-start-4'> */}
        {/*   <LessonCard title='Обчислювальна геометрія та компʼютер' first='ст. в. Римар П.В.' second='лекція MS Teams'/> */}
        {/* </div> */}

      </div>
    </div>
  ) : <div>Loading...</div>
}

export default Schedule;