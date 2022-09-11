import React, { useEffect, useState } from 'react';
import { allEntitiesRelated } from '../entities/entitiesRelated';
import { Day, Lesson, LessonTime } from '../entities/entitiesClasses';
import { LessonCard, ScheduleGrid } from '../pages/Schedule';
import { PlusIcon } from '@heroicons/react/24/outline';
import { EditableLesson, FilterType } from '../common/types';
import { Filters, useFilters } from './Filters';

interface Props {
  blah: string,
}

function ScheduleEditGrid(): JSX.Element {
  const [lessonTimes, setLessonTimes] = useState<LessonTime[]>();
  const [days, setDays] = useState<Day[]>();
  const [draggedLesson, setDraggedLesson] = useState<EditableLesson>();

  const [allLessons, setAllLessons] = useState<EditableLesson[]>([]);

  const [types, selectedType, setType,
    entities, selectedEntity, setEntity] = useFilters();

  useEffect(() => {
    const fetchData = async () => {
      setLessonTimes(await allEntitiesRelated.lessonTime.api.readAll());
      setDays(await allEntitiesRelated.day.api.readAll());

      setAllLessons(await allEntitiesRelated.lesson.api.readAll());
      // setLessons(await readLessonsWithFilter(1, filter));
    };

    fetchData();
  }, []);

  function hasPositionInSchedule(lesson: EditableLesson): boolean {
    return !!(lesson.lessonTime && lesson.day);
  }

  function filterLessonsBy(filter: FilterType, filteredEntity: { id: number }) {
    return allLessons.filter((lesson) => lesson[filter]?.id === filteredEntity.id);
  }

  // function editLesson(lessons: Lesson[], newLesson: Lesson): Lesson[]{
  //   return [...lessons.filter(lesson => lesson.id !== newLesson.id),
  //     { ...newLesson }] as Lesson[];
  // }

  return lessonTimes && days && allLessons ? (
    <>
      <div className='flex'>
        <div className='flex-grow'>
          <Filters
            types={types} selectedType={selectedType}
            setType={setType} entities={entities}
            selectedEntity={selectedEntity} setEntity={setEntity}
          />
          <div className='m-5'>
            <h3 className='text-3xl text-center pb-6 font-bold'>{selectedEntity.displayName}</h3>
            <ScheduleGrid lessonTimes={lessonTimes} days={days}>
              <>
                {
                  (() => {
                    const cells = [];
                    for (const day of days) {
                      for (const lessonTime of lessonTimes) {
                        cells.push(
                          <div key={`${day.id}-${lessonTime.id}`} className='group'
                               style={{ gridRowStart: lessonTime.id + 1, gridColumnStart: day.id + 1 }}
                               onDragEnter={(e) => {
                                 e.preventDefault();
                               }}
                               onDragOver={(e) => {
                                 e.preventDefault();
                               }}
                               onDrop={(e) => {
                                 if (draggedLesson) {
                                   setAllLessons((lessons) => {
                                     return [...lessons.filter(lesson => lesson.id !== draggedLesson.id),
                                       { ...draggedLesson, lessonTime: lessonTime, day: day }] as Lesson[];
                                   });
                                 }
                               }}
                          >
                            <div
                              className='invisible h-full border-4 flex justify-center border-gray-400 border-dashed rounded-xl group-hover:visible'>
                              <PlusIcon className='w-12 stroke-2 text-gray-400' />
                            </div>
                          </div>,
                        );
                      }
                    }
                    return cells;
                  })()
                }
                {
                  filterLessonsBy(selectedType, selectedEntity).filter(hasPositionInSchedule).map((lesson, index) => (
                    <div key={index}
                         style={{ gridRowStart: lesson!.lessonTime!.id + 1, gridColumnStart: lesson!.day!.id + 1 }}
                         draggable
                         onDragStart={(e) => {
                           setDraggedLesson(lesson);
                         }}
                    >
                      <LessonCard
                        lesson={lesson as Lesson}
                        filterType={selectedType}
                      />
                    </div>
                  ))
                }
              </>
            </ScheduleGrid>
          </div>
        </div>
        <div className='border-blue-300 border-l-4 p-3 flex flex-col gap-2'
             onDragEnter={(e) => {
               e.preventDefault();
             }}
             onDragOver={(e) => {
               e.preventDefault();
             }}
             onDrop={(e) => {
               if (draggedLesson) {
                 setAllLessons((lessons) => {
                   // so it not Lesson anymore only data , without diaplayNMaae
                   return [...lessons.filter(lesson => lesson.id !== draggedLesson.id),
                     { ...draggedLesson, lessonTime: undefined, day: undefined }] as Lesson[];
                 });
               }
             }}
        >
          {
            (() => {
              const lessonsNotOnSchedule = filterLessonsBy(selectedType, selectedEntity).filter((lesson) => !hasPositionInSchedule(lesson));
              console.log(lessonsNotOnSchedule);
              return (lessonsNotOnSchedule.length ? lessonsNotOnSchedule.map((lesson, index) =>
                <div
                  draggable
                  key={index}
                  onDragStart={(e) => {
                    setDraggedLesson(lesson);
                  }}>
                  <LessonCard
                    lesson={lesson as Lesson}
                    filterType={selectedType}
                  />
                </div>,
              ) : <div>DROP LESSONS HERE</div>);
            })()

          }
        </div>
      </div>
    </>
  ) : <div>Loading...</div>;
}

export default ScheduleEditGrid;