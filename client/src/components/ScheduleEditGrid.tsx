import React, { useEffect, useState } from 'react';
import { allEntitiesRelated } from '../entities/entitiesRelated';
import { Day, Lesson, LessonTime } from '../entities/entitiesClasses';
import { readLessonsWithFilter } from '../api/apiCalls';
import { LessonCard, TimeCell } from '../pages/Schedule';
import { PlusIcon } from '@heroicons/react/24/outline';

interface Props {
blah: string,
}

function ScheduleEditGrid(): JSX.Element {
  const [lessonTimes, setLessonTimes] = useState<LessonTime[]>();
  const [days, setDays] = useState<Day[]>();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [draggedLesson, setDraggedLesson] = useState<Lesson>();

  const filter = 'subgroup';

  useEffect(() => {
    const fetchData = async () => {
      setLessonTimes(await allEntitiesRelated.lessonTime.api.readAll());
      setDays(await allEntitiesRelated.day.api.readAll());

      // setLessons([{name: 'abc', x: 1, y: 1, id: 1}, {name: 'asd', x: 2, y:2, id: 2}, {name: 'pop', x: undefined, y:undefined, id: 3}])

      setLessons(await readLessonsWithFilter(1, filter));
    };

    fetchData();
  }, []);

  function hasPositionInSchedule(lesson: Lesson): boolean{
    return !!(lesson.lessonTime && lesson.day);
  }

  return lessonTimes && days && lessons ? (
    <div className='flex'>
    <div className='m-5 flex-grow'>
      {/* <h3 className='text-3xl text-center pb-6 font-bold'>{filteredEntity.displayName}</h3> */}
      <div className='grid grid-cols-6 grid-rows-8 gap-2'>
        {lessonTimes.map((time) => (
          <div key={time.number} style={{ gridRowStart: time.id + 1, gridColumnStart: 1 }}>
            <TimeCell number={time.number} time={`${time.timeStart} - ${time.timeEnd}`} />
          </div>
        ))}
        {days.map((day) => (
          <div key={day.name} style={{ gridRowStart: 1, gridColumnStart: day.id + 1 }}>
            <p className='font-semibold text-center'>{day.name}</p>
          </div>
        ))}
        {
          (()=>{
            const cells = [];
            // for(let i=0; i<days.length; i++){
            for(const day of days){
              for (const lessonTime of lessonTimes){
              // for(let j=0;j<lessonTimes.length;j++){
                cells.push(
                  <div key={`${day.id}-${lessonTime.id}`} className='group'
                       style={{ gridRowStart: lessonTime.id + 1, gridColumnStart: day.id + 1 }}
                       onDragEnter={(e)=>{
                         e.preventDefault()}}
                       onDragOver={(e)=>{
                         e.preventDefault()}}
                       onDrop={(e)=>{
                         if(draggedLesson) {
                           setLessons((lessons)=> {
                             return [...lessons.filter(lesson => lesson.id !== draggedLesson.id),
                               { ...draggedLesson, lessonTime: lessonTime, day: day }] as Lesson[];
                           })
                         }
                       }}
                  >
                    <div className='invisible h-full border-4 flex justify-center border-gray-400 border-dashed rounded-xl group-hover:visible'>
                      <PlusIcon className='w-12 stroke-2 text-gray-400'/>
                    </div>
                  </div>
                );
              }
            }
            return cells;
          })()
        }
        {
          lessons?.filter(hasPositionInSchedule).map((lesson, index) => (
            <div key={index}
                 style={{ gridRowStart: lesson.lessonTime.id + 1, gridColumnStart: lesson.day.id + 1 }}
                 draggable
                 onDragStart={(e)=>{
                   console.log('start drag');
                   setDraggedLesson(lesson);
                 }}
            >
              <LessonCard
                lesson={lesson}
                filterType={filter}
                // first={'lesson.teacher.displayName'}
                // second={'Teams'}
              />
            </div>
          ))
        }

        {/* {lessons.map((lesson) => ( */}
        {/*   <div key={lesson.id} */}
        {/*        style={{ gridRowStart: lesson.lessonTime.id + 1, gridColumnStart: lesson.day.id + 1 }} */}
        {/*   > */}
        {/*     /!* <LessonCard *!/ */}
        {/*     /!*   title={lesson.subject.displayName} *!/ */}
        {/*     /!*   first={lesson.teacher.displayName} *!/ */}
        {/*     /!*   second={`${lesson.lessonType.displayName} ${lesson.classroom ? lesson.classroom.displayName : 'MS Teams'} `} *!/ */}
        {/*     /!* /> *!/ */}
        {/*   </div> */}
        {/* ))} */}
      </div>
    </div>
      <div className='bg-pink-400 p-3'>
        {
          lessons?.filter((lesson) => !hasPositionInSchedule(lesson)).map((lesson, index) =>
            <div
            key={index}
            onDragStart={(e)=>{
              console.log('start drag');
              setDraggedLesson(lesson);
            }}
              draggable>
              <LessonCard
                lesson={lesson}
                filterType={filter}
              />
            </div>

          )
        }
      </div>
    </div>
  ) : <div>Loading...</div>;
}

export default ScheduleEditGrid;