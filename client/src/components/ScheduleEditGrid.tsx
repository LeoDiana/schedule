import React, { useEffect, useRef, useState } from 'react';
import { allEntitiesRelated } from '../entities/entitiesRelated';
import { Day, Lesson, LessonTime, Subgroup, Teacher } from '../entities/entitiesClasses';
import { LessonCard, ScheduleGrid } from '../pages/Schedule';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { AllEntitiesItems, EditableLesson, EntitiesNamesToTypes, FilterType } from '../common/types';
import { Filters, useFilters } from './Filters';
import EntityForm from './EntityForm';
import { useModal } from '../common/hooks';

function ScheduleEditGrid(): JSX.Element {
  const [lessonTimes, setLessonTimes] = useState<LessonTime[]>();
  const [days, setDays] = useState<Day[]>();
  const [draggedLesson, setDraggedLesson] = useState<EditableLesson>();

  const [allLessons, setAllLessons] = useState<EditableLesson[]>([]);

  const checkingTablesRef = useRef<any>();
  const checkingTables = checkingTablesRef.current;

  const [collisions, setCollisions] = useState({});

  const [types, selectedType, setType,
    items, selectedItem, setEntity] = useFilters();

  const [selectedLesson, setSelectedLesson] = useState<EditableLesson>();
  const [isOpenEditFormForSelectedLesson, setIsOpenEditFormForSelectedLesson] = useState(false);
  const [isEditFormOpen, openEditForm, closeEditForm] = useModal();
  const [isCreateFormOpen, openCreateForm, closeCreateForm] = useModal();
  const [positionInSchedule, setPosition] = useState({});
  const [entities, setEntities] = useState<AllEntitiesItems>({
    academicStatus: [],
    teacher: [],
    lessonTime: [],
    day: [],
    lessonType: [],
    subject: [],
    group: [],
    subgroup: [],
    weekType: [],
    building: [],
    classroom: [],
    lesson: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      let entity: keyof typeof allEntitiesRelated;
      const fetched = {} as AllEntitiesItems;
      for (entity in allEntitiesRelated) {
        fetched[entity] = await allEntitiesRelated[entity].api.readAll();
      }
      setEntities(fetched);

      // const lessonTimes = await allEntitiesRelated.lessonTime.api.readAll();
      // const days = await allEntitiesRelated.day.api.readAll();
      const allLessons = await allEntitiesRelated.lesson.api.readAll();
      //
      // const teachers = await allEntitiesRelated.teacher.api.readAll();
      // const subgroups = await allEntitiesRelated.subgroup.api.readAll();

      setLessonTimes(fetched.lessonTime as LessonTime[]);
      setDays(fetched.day as Day[]);
      setAllLessons(allLessons);

      checkingTablesRef.current = buildTablesForChecking(
        allLessons,
        fetched.teacher as Teacher[],
        fetched.subgroup as Subgroup[],
        fetched.day as Day[],
        fetched.lessonTime as LessonTime[]);
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
      {length: lessonTimes.length+1},
      () => Array.from({length: days.length+1}, () => [])));
    const subgroupsSchedules: any = {};
    subgroups.forEach((subgroup) => subgroupsSchedules[subgroup.id] = Array.from(
      {length: lessonTimes.length+1},
      () => Array.from({length: days.length+1}, () => [])));

    allLessons.filter(lesson => lesson.lessonTime && lesson.day).map((lesson) => {
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
    if(prevLesson.lessonTime && prevLesson.day) {
      checkingTables.teacher[prevLesson.teacher.id][prevLesson.lessonTime.id][prevLesson.day.id].forEach((lesson: any) =>
        setCollisions((state) => ({ ...state, [lesson.id]: '' })),
      );
      checkingTables.subgroup[prevLesson.subgroup.id][prevLesson.lessonTime.id][prevLesson.day.id].forEach((lesson: any) =>
        setCollisions((state) => ({ ...state, [lesson.id]: '' })),
      );
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
    }

    if(movedLesson.lessonTime && movedLesson.day) {
      // move to new collisions
      const teachersLessonsAtThisPoint = checkingTables.teacher[movedLesson.teacher.id][movedLesson.lessonTime.id][movedLesson.day.id];
      const subgroupsLessonsAtThisPoint = checkingTables.subgroup[movedLesson.subgroup.id][movedLesson.lessonTime.id][movedLesson.day.id];
      // add new lesson
      teachersLessonsAtThisPoint.push(movedLesson);
      subgroupsLessonsAtThisPoint.push(movedLesson);
      // add collisions
      if (teachersLessonsAtThisPoint.length > 1) {
        teachersLessonsAtThisPoint.forEach((lesson: any) =>
          setCollisions((state) => ({ ...state, [lesson.id]: 'warning' })),
        );
      }
      if (subgroupsLessonsAtThisPoint.length > 1) {
        subgroupsLessonsAtThisPoint.forEach((lesson: any) =>
          setCollisions((state) => ({ ...state, [lesson.id]: 'warning' })),
        );
      }
    }
  }

  return lessonTimes && days && allLessons ? (
    <>
      {isCreateFormOpen ?
        <>
          <div
            onClick={closeCreateForm}
            className='fixed w-screen h-screen top-0 z-10 backdrop-blur bg-black/50'></div>
          <EntityForm<'create', Lesson>
            apiFunc={((...params: any[]) => allEntitiesRelated.lesson.api.create(params as any))}
            entity={{...allEntitiesRelated.lesson.createEmpty(), [selectedType]: selectedItem, ...positionInSchedule }}
            fields={allEntitiesRelated.lesson.fields}
            name={'lesson'}
            allEntities={entities}
            formType='create'
            returns={(ent)=>{
              setAllLessons((lessons) => {
                return [...lessons, ent] as Lesson[];
              });
              console.log(ent);
            }}
          />
        </>
        : null
      }
      {selectedLesson && isEditFormOpen &&
        <>
          <div
            onClick={closeEditForm}
            className='fixed w-screen h-screen top-0 z-10 backdrop-blur bg-black/50'></div>
          <EntityForm<'update', Lesson>
            apiFunc={((...params: any[]) => allEntitiesRelated.lesson.api.update(params as any)) as any}
            fields={allEntitiesRelated.lesson.fields}
            name={'lesson'}
            allEntities={entities}
            entity={selectedLesson as any}
            formType='update'
            returns={(ent)=>{
              setAllLessons((lessons) => {
                return [...lessons.filter(lesson => lesson.id !== ent.id),
                  ent] as Lesson[];
              });
              console.log(ent);
            }}
          />
        </>
      }
      <div className='flex'>
        <div className='flex-grow'>
          <Filters
            types={types} selectedType={selectedType}
            setType={setType} entities={items}
            selectedEntity={selectedItem} setEntity={setEntity}
          />
          <div className='m-5'>
            <h3 className='text-3xl text-center pb-6 font-bold'>{selectedItem.displayName}</h3>
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
                              className='invisible h-full border-4 flex justify-center border-gray-400 border-dashed rounded-xl group-hover:visible'
                              onClick={() => {
                                setPosition({lessonTime: lessonTime, day: day});
                                openCreateForm();
                              }}
                            >
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
                  filterLessonsBy(selectedType, selectedItem).filter(hasPositionInSchedule).map((lesson, index) => (
                    <div key={index}
                         style={{ gridRowStart: lesson!.lessonTime!.id + 1, gridColumnStart: lesson!.day!.id + 1 }}
                         draggable
                         onDragStart={(e) => {
                           setDraggedLesson(lesson);
                         }}
                         className={
                      [collisions[lesson.id as keyof typeof collisions] === 'warning' ? 'border-l-red-600 border-l-4' : '',
                        // selectedLesson?.id === lesson.id ? 'border-green-600 border-4' : '',
                      ].join(' ')
                    }
                     onClick={
                        () => {
                          if(lesson.id === selectedLesson?.id){
                            openEditForm();
                          }
                          setSelectedLesson(lesson)
                      }
                    }
                    >
                      <LessonCard
                        lesson={lesson as Lesson}
                        filterType={selectedType}
                        isSelected={selectedLesson?.id === lesson.id}
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
                 const newLesson = { ...draggedLesson, lessonTime: undefined, day: undefined };
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
          <button
            className='p-2 rounded-lg border-2 border-rose-500 text-rose-500 font-semibold mb-2'
            onClick={async () => {
              if(selectedLesson) {
                await allEntitiesRelated.lesson.api.delete(selectedLesson.id);
                const filtered = allLessons.filter((item) => item.id !== selectedLesson.id);
                setAllLessons((prevState) => ({ ...prevState, ...filtered }));
                setSelectedLesson(undefined);
              }
            }}
          >
            <TrashIcon className='w-5 inline stroke-2' /> Delete selected
          </button>
          <button
            className='p-2 rounded-lg border-2 border-blue-500 text-blue-500 font-semibold mb-2'
            onClick={() => {
              setPosition({});
              openCreateForm();
            }}
          >
            <PlusIcon className='w-5 inline stroke-2' /> Create new
          </button>
          {
            (() => {
              const lessonsNotOnSchedule = filterLessonsBy(selectedType, selectedItem).filter((lesson) => !hasPositionInSchedule(lesson));
              return (lessonsNotOnSchedule.length ? lessonsNotOnSchedule.map((lesson, index) =>
                <div
                  draggable
                  key={index}
                  onDragStart={(e) => {
                    setDraggedLesson(lesson);
                  }}
                  onClick={
                    () => {
                      if(lesson.id === selectedLesson?.id){
                        openEditForm();
                      }
                      setSelectedLesson(lesson)
                    }
                  }
                >
                  <LessonCard
                    lesson={lesson as Lesson}
                    filterType={selectedType}
                    isSelected={selectedLesson?.id === lesson.id}
                  />
                </div>,
              ) : <div className='pt-5 text-center text-gray-400'>DROP LESSONS HERE</div>);
            })()

          }
        </div>
      </div>
    </>
  ) : <div>Loading...</div>;
}

export default ScheduleEditGrid;