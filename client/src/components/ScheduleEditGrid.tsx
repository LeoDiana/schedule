import React, { useEffect, useRef, useState } from 'react';
import { allEntitiesRelated } from '../entities/entitiesRelated';
import { Day, Lesson, LessonTime } from '../entities/entitiesClasses';
import { LessonCard, ScheduleGrid } from '../pages/Schedule';
import { PlusIcon } from '@heroicons/react/24/outline';
import { EditableLesson, FilterType } from '../common/types';
import { Filters, useFilters } from './Filters';

function ScheduleEditGrid(): JSX.Element {
  const [lessonTimes, setLessonTimes] = useState<LessonTime[]>();
  const [days, setDays] = useState<Day[]>();
  const [draggedLesson, setDraggedLesson] = useState<EditableLesson>();

  const [allLessons, setAllLessons] = useState<EditableLesson[]>([]);

  const checkingTablesRef = useRef<any>();
  const checkingTables = checkingTablesRef.current;

  const [collisions, setCollisions] = useState({});

  const [types, selectedType, setType,
    entities, selectedEntity, setEntity] = useFilters();

  useEffect(() => {
    const fetchData = async () => {
      const lessonTimes = await allEntitiesRelated.lessonTime.api.readAll();
      const days = await allEntitiesRelated.day.api.readAll();
      const allLessons = await allEntitiesRelated.lesson.api.readAll();

      const teachers = await allEntitiesRelated.teacher.api.readAll();
      const subgroups = await allEntitiesRelated.subgroup.api.readAll();

      setLessonTimes(lessonTimes);
      setDays(days);
      setAllLessons(allLessons);

      checkingTablesRef.current = buildTablesForChecking(allLessons, teachers, subgroups, days, lessonTimes);
    };

    fetchData();
  }, []);

  function hasPositionInSchedule(lesson: EditableLesson): boolean {
    return !!(lesson.lessonTime && lesson.day);
  }

  function filterLessonsBy(filter: FilterType, filteredEntity: { id: number }) {
    return allLessons.filter((lesson) => lesson[filter]?.id === filteredEntity.id);
  }
  
  function buildTablesForChecking(allLessons: any[], teachers: any[], subgroups: any[], days: any[], lessonTimes: any[]) {
    const teachersSchedules: any = {};
    teachers.forEach((teacher) => teachersSchedules[teacher.id] = Array.from(
      {length: lessonTimes.length},
      () => Array.from({length: days.length}, () => [])));
    const subgroupsSchedules: any = {};
    subgroups.forEach((subgroup) => subgroupsSchedules[subgroup.id] = Array.from(
      {length: lessonTimes.length},
      () => Array.from({length: days.length}, () => [])));

    allLessons.map((lesson) => {
      teachersSchedules[lesson.teacher.id][lesson.lessonTime.id][lesson.day.id].push(lesson);
      subgroupsSchedules[lesson.subgroup.id][lesson.lessonTime.id][lesson.day.id].push(lesson);
    })

    return {
      subgroup: subgroupsSchedules,
      teacher: teachersSchedules,
    };
  }

  function check(movedLesson: any){
    // also check name of subject
    // console.log(checkingTables);
    // const teachers = checkingTables.teacher[movedLesson.teacher.id][movedLesson.lessonTime.id][movedLesson.day.id];
    // const subgroups = checkingTables.subgroup[movedLesson.subgroup.id][movedLesson.lessonTime.id][movedLesson.day.id];
    //
    // //I should modify this correctly
    // // actyally i should not modify this here
    // if(teachers.length || subgroups.length){
    //   setCollisions((state) => ({...state, ...[movedLesson, ...teachers].map((lesson:any) =>
    //      ( {[lesson.id]: 'warning'}) )}));
    //   setCollisions((state) => ({...state, ...[movedLesson, ...subgroups].map((lesson:any) =>
    //       ( {[lesson.id]: 'warning'}) )}));
    //   //and for each lesson in this teacher | subgroup
    // } else {
    //   setCollisions((state) => ({...state, [movedLesson.id]: '', }));
    // }

    // console.log(teacher);
    // console.log(subgroup);
    return true;
  }

  function changeTable(prevLesson: any, movedLesson: any){
    // clear previous collisions at this point
    checkingTables.teacher[prevLesson.teacher.id][prevLesson.lessonTime.id][prevLesson.day.id].forEach((lesson:any) =>
      setCollisions((state) => ({...state, [lesson.id]: ''}))
    )
    checkingTables.subgroup[prevLesson.subgroup.id][prevLesson.lessonTime.id][prevLesson.day.id].forEach((lesson:any) =>
      setCollisions((state) => ({...state, [lesson.id]: ''}))
    )
    // remove lesson from where it was
    checkingTables.teacher[prevLesson.teacher.id][prevLesson.lessonTime.id][prevLesson.day.id] =
      checkingTables.teacher[prevLesson.teacher.id][prevLesson.lessonTime.id][prevLesson.day.id].filter((lesson: any) => lesson.id !== prevLesson.id);
    checkingTables.subgroup[prevLesson.subgroup.id][prevLesson.lessonTime.id][prevLesson.day.id] =
      checkingTables.subgroup[prevLesson.subgroup.id][prevLesson.lessonTime.id][prevLesson.day.id].filter((lesson: any) => lesson.id !== prevLesson.id);
    // add collisions if they are still at prev point
    if(checkingTables.teacher[prevLesson.teacher.id][prevLesson.lessonTime.id][prevLesson.day.id].length > 1) {
      checkingTables.teacher[prevLesson.teacher.id][prevLesson.lessonTime.id][prevLesson.day.id].forEach((lesson:any) =>
        setCollisions((state) => ({...state, [lesson.id]: 'warning'}))
      )
    }
    if(checkingTables.subgroup[prevLesson.subgroup.id][prevLesson.lessonTime.id][prevLesson.day.id].length > 1) {
      checkingTables.subgroup[prevLesson.subgroup.id][prevLesson.lessonTime.id][prevLesson.day.id].forEach((lesson:any) =>
        setCollisions((state) => ({...state, [lesson.id]: 'warning'}))
      )
    }

    // move to new collisions
    const teachersLessonsAtThisPoint = checkingTables.teacher[movedLesson.teacher.id][movedLesson.lessonTime.id][movedLesson.day.id];
    const subgroupsLessonsAtThisPoint = checkingTables.subgroup[movedLesson.subgroup.id][movedLesson.lessonTime.id][movedLesson.day.id];
    // add new lesson
    teachersLessonsAtThisPoint.push(movedLesson);
    subgroupsLessonsAtThisPoint.push(movedLesson);
    // add collisions
    if(teachersLessonsAtThisPoint.length > 1){
      teachersLessonsAtThisPoint.forEach((lesson:any) =>
        setCollisions((state) => ({...state, [lesson.id]: 'warning'}))
      )
    }
    if(subgroupsLessonsAtThisPoint.length > 1){
      subgroupsLessonsAtThisPoint.forEach((lesson:any) =>
        setCollisions((state) => ({...state, [lesson.id]: 'warning'}))
      )
    }
  }

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
                                   const newLesson = { ...draggedLesson, lessonTime: lessonTime, day: day };
                                   if(check(newLesson)){
                                     setAllLessons((lessons) => {
                                       return [...lessons.filter(lesson => lesson.id !== draggedLesson.id),
                                         newLesson] as Lesson[];
                                     });
                                     changeTable(draggedLesson, newLesson);
                                   }
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
                         className={collisions[lesson.id as keyof typeof collisions] === 'warning' ? 'border-l-red-600 border-l-4' : ''}
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