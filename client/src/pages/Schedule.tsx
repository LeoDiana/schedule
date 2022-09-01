import React from "react";

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
  return (
    <div className='m-5'>
      <div className='grid grid-cols-6 grid-rows-9 gap-2'>
        <div className='row-start-1 col-start-1 col-span-6 bg-white relative -z-10 h-10 border-b-2 '></div>
        <div className='col-start-1 row-start-2'>
          <TimeCell number='I' time='8:00 - 9:20' />
        </div>
        <div className='col-start-1 row-start-3'>
          <TimeCell number='II' time='8:00 - 9:20' />
        </div>
        <div className='col-start-1 row-start-4'>
          <TimeCell number='III' time='8:00 - 9:20' />
        </div>
        <div className='col-start-1 row-start-5'>
          <TimeCell number='IV' time='8:00 - 9:20' />
        </div>
        <div className='col-start-2 row-start-1 text-center '>
          <p className='font-semibold'>Понеділок</p>
        </div>
        <div className='col-start-3 row-start-1 text-center'>
          <p className='font-semibold'>Вівторок</p>
        </div>
        <div className='col-start-4 row-start-1 text-center'>
          <p className='font-semibold'>Середа</p>
        </div>
        <div className='col-start-5 row-start-1 text-center'>
          <p className='font-semibold'>Четвер</p>
        </div>
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
  )
}

export default Schedule;