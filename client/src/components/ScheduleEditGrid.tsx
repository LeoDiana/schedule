import React, { useEffect, useRef, useState } from 'react';
import { allEntitiesRelated, getDisplayName } from '../entities/entitiesRelated';
import { Day, Lesson, LessonTime, Subgroup, Teacher } from '../entities/entitiesClasses';
import { LessonCard, ScheduleGrid } from '../pages/Schedule';
import { ArrowDownTrayIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { EditableLesson, FilterType } from '../common/types';
import { Filters, useFilters } from './Filters';
import { CreateModal, EditModal } from './EntityForm';
import { useModal } from '../common/hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteEntity,
  selectAllEntities,
  selectDays,
  selectLessonTimes, updateEntity,
} from '../features/entities/entitiesSlice';
import EmptyCell from './EmptyCell';

function ScheduleEditGrid(): JSX.Element {
  const dispatch = useDispatch();
  const allEntities = useSelector(selectAllEntities);
  const lessonTimes = useSelector(selectLessonTimes);
  const days = useSelector(selectDays);

  const [draggedLesson, setDraggedLesson] = useState<EditableLesson>();

  const [allLessons, setAllLessons] = useState<EditableLesson[]>([]);

  const checkingTablesRef = useRef<any>();
  const checkingTables = checkingTablesRef.current;

  const [collisions, setCollisions] = useState({});

  const [types, selectedType, setType,
    entities, selectedEntity, setEntity,
    weekTypes, selectedWeekType, setWeekType,
  ] = useFilters();

  const [selectedLesson, setSelectedLesson] = useState<EditableLesson>();
  const [isEditFormOpen, openEditForm, closeEditForm] = useModal();
  const [isCreateFormOpen, openCreateForm, closeCreateForm] = useModal();
  const [positionInSchedule, setPosition] = useState({});
  const [conflictedModal, setConflictedModal] = useState<any>();


  useEffect(() => {
    (async () => {
      const allLessons = allEntities.lesson;

      await setAllLessons(allLessons);

      const emptyCollisions = {};
      allLessons.forEach(lesson => (emptyCollisions as any)[lesson.id] = []);
      setCollisions(emptyCollisions);

      const chT = buildTablesForChecking(
        allLessons,
        allEntities.teacher as Teacher[],
        allEntities.subgroup as Subgroup[],
        allEntities.day as Day[],
        allEntities.lessonTime as LessonTime[]);
      allLessons.forEach(lesson => changeTable2(lesson, lesson, chT));
      checkingTablesRef.current = chT;
    })();
  }, []);

  function hasPositionInSchedule(lesson: EditableLesson): boolean {
    return !!(lesson.lessonTime && lesson.day);
  }

  function filterLessonsBy(filter: FilterType, filteredEntity: { id: number }) {
    return allLessons.filter((lesson) => lesson[filter]?.id === filteredEntity.id);
  }

  function changeTable2(prevLesson: any, movedLesson: any = undefined, checkingTables: any) {
    // clear previous collisions at this point
    if (prevLesson.lessonTime && prevLesson.day) {
      checkingTables.teacher[prevLesson.teacher.id][prevLesson.lessonTime.id][prevLesson.day.id].forEach((lesson: any) =>
        setCollisions((state) => ({ ...state, [lesson.id]: [] })),
      );
      checkingTables.subgroup[prevLesson.subgroup.id][prevLesson.lessonTime.id][prevLesson.day.id].forEach((lesson: any) =>
        setCollisions((state) => ({ ...state, [lesson.id]: [] })),
      );
      // remove lesson from where it was
      checkingTables.teacher[prevLesson.teacher.id][prevLesson.lessonTime.id][prevLesson.day.id] =
        checkingTables.teacher[prevLesson.teacher.id][prevLesson.lessonTime.id][prevLesson.day.id].filter((lesson: any) => lesson.id !== prevLesson.id);
      checkingTables.subgroup[prevLesson.subgroup.id][prevLesson.lessonTime.id][prevLesson.day.id] =
        checkingTables.subgroup[prevLesson.subgroup.id][prevLesson.lessonTime.id][prevLesson.day.id].filter((lesson: any) => lesson.id !== prevLesson.id);
      // add collisions if they are still at prev point
      if (checkingTables.teacher[prevLesson.teacher.id][prevLesson.lessonTime.id][prevLesson.day.id].length > 1) {
        checkingTables.teacher[prevLesson.teacher.id][prevLesson.lessonTime.id][prevLesson.day.id].forEach((lesson: any) =>
          setCollisions((state) => ({ ...state, [lesson.id]: [...(state as any)[lesson.id], lesson] })),
        );
      }
      if (checkingTables.subgroup[prevLesson.subgroup.id][prevLesson.lessonTime.id][prevLesson.day.id].length > 1) {
        checkingTables.subgroup[prevLesson.subgroup.id][prevLesson.lessonTime.id][prevLesson.day.id].forEach((lesson: any) =>
          setCollisions((state) => ({ ...state, [lesson.id]: [...(state as any)[lesson.id], lesson] })),
        );
      }
    }

    if (movedLesson && movedLesson.lessonTime && movedLesson.day) {
      // move to new collisions
      const teachersLessonsAtThisPoint = checkingTables.teacher[movedLesson.teacher.id][movedLesson.lessonTime.id][movedLesson.day.id];
      const subgroupsLessonsAtThisPoint = checkingTables.subgroup[movedLesson.subgroup.id][movedLesson.lessonTime.id][movedLesson.day.id];
      // add new lesson
      teachersLessonsAtThisPoint.push(movedLesson);
      subgroupsLessonsAtThisPoint.push(movedLesson);
      // add collisions
      if (teachersLessonsAtThisPoint.length > 1) {
        const newCollisions = {};
        teachersLessonsAtThisPoint.forEach((lesson: any) =>
          (newCollisions as any)[lesson.id] = teachersLessonsAtThisPoint,
        );
        setCollisions((state) => ({ ...state, ...newCollisions }));
      }
      if (subgroupsLessonsAtThisPoint.length > 1) {
        const newCollisions = {};
        subgroupsLessonsAtThisPoint.forEach((lesson: any) =>
          (newCollisions as any)[lesson.id] = subgroupsLessonsAtThisPoint,
        );
        setCollisions((state) => ({ ...state, ...newCollisions }));
      }
    }
  }

  function buildTablesForChecking(allLessons: any[], teachers: any[], subgroups: any[], days: any[], lessonTimes: any[]) {
    const teachersSchedules: any = {};
    teachers.forEach((teacher) => teachersSchedules[teacher.id] = Array.from(
      { length: lessonTimes.length + 1 },
      () => Array.from({ length: days.length + 1 }, () => [])));
    const subgroupsSchedules: any = {};
    subgroups.forEach((subgroup) => subgroupsSchedules[subgroup.id] = Array.from(
      { length: lessonTimes.length + 1 },
      () => Array.from({ length: days.length + 1 }, () => [])));

    allLessons.filter(lesson => lesson.lessonTime && lesson.day).forEach((lesson) => {
      teachersSchedules[lesson.teacher.id][lesson.lessonTime.id][lesson.day.id].push(lesson);
      subgroupsSchedules[lesson.subgroup.id][lesson.lessonTime.id][lesson.day.id].push(lesson);
    });

    return {
      subgroup: subgroupsSchedules,
      teacher: teachersSchedules,
    };
  }

  // if no moved lesson - just delete prev from table
  function changeTable(prevLesson: any, movedLesson: any = undefined) {
    // clear previous collisions at this point
    if (prevLesson.lessonTime && prevLesson.day) {
      checkingTables.teacher[prevLesson.teacher.id][prevLesson.lessonTime.id][prevLesson.day.id].forEach((lesson: any) =>
        setCollisions((state) => ({ ...state, [lesson.id]: [] })),
      );
      checkingTables.subgroup[prevLesson.subgroup.id][prevLesson.lessonTime.id][prevLesson.day.id].forEach((lesson: any) =>
        setCollisions((state) => ({ ...state, [lesson.id]: [] })),
      );
      // remove lesson from where it was
      checkingTables.teacher[prevLesson.teacher.id][prevLesson.lessonTime.id][prevLesson.day.id] =
        checkingTables.teacher[prevLesson.teacher.id][prevLesson.lessonTime.id][prevLesson.day.id].filter((lesson: any) => lesson.id !== prevLesson.id);
      checkingTables.subgroup[prevLesson.subgroup.id][prevLesson.lessonTime.id][prevLesson.day.id] =
        checkingTables.subgroup[prevLesson.subgroup.id][prevLesson.lessonTime.id][prevLesson.day.id].filter((lesson: any) => lesson.id !== prevLesson.id);
      // add collisions if they are still at prev point
      if (checkingTables.teacher[prevLesson.teacher.id][prevLesson.lessonTime.id][prevLesson.day.id].length > 1) {
        checkingTables.teacher[prevLesson.teacher.id][prevLesson.lessonTime.id][prevLesson.day.id].forEach((lesson: any) =>
          setCollisions((state) => ({ ...state, [lesson.id]: [...(state as any)[lesson.id], lesson] })),
        );
      }
      if (checkingTables.subgroup[prevLesson.subgroup.id][prevLesson.lessonTime.id][prevLesson.day.id].length > 1) {
        checkingTables.subgroup[prevLesson.subgroup.id][prevLesson.lessonTime.id][prevLesson.day.id].forEach((lesson: any) =>
          setCollisions((state) => ({ ...state, [lesson.id]: [...(state as any)[lesson.id], lesson] })),
        );
      }
    }

    if (movedLesson && movedLesson.lessonTime && movedLesson.day) {
      // console.log(movedLesson);
      // move to new collisions
      const teachersLessonsAtThisPoint = checkingTables.teacher[movedLesson.teacher.id][movedLesson.lessonTime.id][movedLesson.day.id];
      const subgroupsLessonsAtThisPoint = checkingTables.subgroup[movedLesson.subgroup.id][movedLesson.lessonTime.id][movedLesson.day.id];
      // add new lesson
      teachersLessonsAtThisPoint.push(movedLesson);
      subgroupsLessonsAtThisPoint.push(movedLesson);
      // add collisions
      if (teachersLessonsAtThisPoint.length > 1) {
        const newCollisions = {};
        teachersLessonsAtThisPoint.forEach((lesson: any) =>
          (newCollisions as any)[lesson.id] = teachersLessonsAtThisPoint,
        );
        setCollisions((state) => ({ ...state, ...newCollisions }));
      }
      if (subgroupsLessonsAtThisPoint.length > 1) {
        const newCollisions = {};
        subgroupsLessonsAtThisPoint.forEach((lesson: any) =>
          (newCollisions as any)[lesson.id] = subgroupsLessonsAtThisPoint,
        );
        setCollisions((state) => ({ ...state, ...newCollisions }));
      }
    }
  }

  function getFilteredLessons() {
    return filterLessonsBy(selectedType, selectedEntity).filter((l: any) => l.weekType.id === selectedWeekType.id).filter(hasPositionInSchedule);
  }

  function addEmptyCells() {
    const cells = [];
    for (const day of days) {
      for (const lessonTime of lessonTimes) {
        cells.push(
          <EmptyCell
            key={`${day.id}-${lessonTime.id}`}
            day={day}
            lessonTime={lessonTime}
            onDrop={() => {
              if (draggedLesson) {
                const newLesson = { ...draggedLesson, lessonTime: lessonTime, day: day };
                setAllLessons((lessons) => {
                  return [...lessons.filter(lesson => lesson.id !== draggedLesson.id),
                    newLesson] as Lesson[];
                });
                changeTable(draggedLesson, newLesson);
              }
            }}
            onClick={() => {
              setPosition({ lessonTime: lessonTime, day: day });
              openCreateForm();
            }}
          />,
        );
      }
    }
    return cells;
  }

  function addCollisionLine(lesson: any) {
    return ((collisions[lesson.id as keyof typeof collisions] as any).length > 0 &&
      <div className='bg-rose-700 h-full w-2.5 absolute z-2 rounded-l-md'
           onMouseOver={() => setConflictedModal(lesson)}
           onMouseLeave={() => setConflictedModal(undefined)}
      ></div>);
  }

  function addCollisionCircle(lesson: any) {
    return (checkingTables[selectedType][selectedEntity.id][lesson!.lessonTime!.id][lesson!.day!.id].length > 1 &&
      <div
        className='bg-rose-700 rounded-full w-6 h-6 absolute z-2 -right-2 -top-2  text-white font-bold text-xs pl-2 pt-1'
        onMouseOver={() => setConflictedModal(lesson)}
        onMouseLeave={() => setConflictedModal(undefined)}
      >
        {checkingTables[selectedType][selectedEntity.id][lesson!.lessonTime!.id][lesson!.day!.id].length}
      </div>);
  }

  function addConflictedModal(lesson: any) {
    return (conflictedModal && conflictedModal.id === lesson.id &&
      <div className='flex gap-2 absolute z-2 -top-32 opacity-75'>
        {
          (collisions as any)[lesson.id].map((l: any, i: number) => (
            <LessonCard
              key={i}
              lesson={l as Lesson}
              filterType={selectedType}
            />
          ))
        }
      </div>);
  }

  return lessonTimes && days && allLessons && Object.keys(collisions).length ? (
    <>
      {isCreateFormOpen &&
        <CreateModal
          onClose={closeCreateForm}
          entityType='lesson'
          entity={{
            ...allEntitiesRelated.lesson.createEmpty(),
            [selectedType]: selectedEntity, ...positionInSchedule,
          }} />
      }
      {selectedLesson && isEditFormOpen &&
        <EditModal
          onClose={closeEditForm}
          entityType='lesson'
          entity={selectedLesson}
        />
      }
      <div className='flex'>
        <div className='flex-grow'>
          <Filters
            types={types} selectedType={selectedType}
            setType={setType} entities={entities}
            selectedEntity={selectedEntity} setEntity={setEntity}
            selectedWeekType={selectedWeekType} setWeekType={setWeekType} weekTypes={weekTypes} />
          <div className='m-5'>
            <h3 className='text-3xl text-center pb-6 font-bold'>{getDisplayName(selectedType, selectedEntity)}</h3>
            <ScheduleGrid lessonTimes={lessonTimes} days={days}>
              <>
                {addEmptyCells()}
                {
                  getFilteredLessons().map((lesson, index) => (
                    <div key={index}
                         style={{ gridRowStart: lesson!.lessonTime!.id + 1, gridColumnStart: lesson!.day!.id + 1 }}
                         draggable
                         onDragStart={() => {
                           setDraggedLesson(lesson);
                         }}
                         className='relative'
                         onClick={
                           () => {
                             if (lesson.id === selectedLesson?.id) {
                               openEditForm();
                             }
                             setSelectedLesson(lesson);
                           }
                         }
                    >
                      {addCollisionLine(lesson)}
                      {addCollisionCircle(lesson)}
                      <LessonCard
                        lesson={lesson as Lesson}
                        filterType={selectedType}
                        isSelected={selectedLesson?.id === lesson.id}
                      />
                      {addConflictedModal(lesson)}
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
             onDrop={() => {
               if (draggedLesson) {
                 const newLesson = { ...draggedLesson, lessonTime: undefined, day: undefined };
                 setAllLessons((lessons) => {
                   return [...lessons.filter(lesson => lesson.id !== draggedLesson.id),
                     newLesson] as Lesson[];
                 });
                 changeTable(draggedLesson, newLesson);
               }
             }}
        >
          <button
            className='p-2 rounded-lg border-2 border-rose-500 text-rose-500 font-semibold mb-2'
            onClick={async () => {
              if (selectedLesson) {
                dispatch(deleteEntity({ entityName: 'lesson', id: selectedLesson.id }));
                const filtered = allLessons.filter((item) => item.id !== selectedLesson.id);
                changeTable(selectedLesson);
                setAllLessons(filtered);
                setSelectedLesson(undefined);
              }
            }}
          >
            <TrashIcon className='w-5 inline stroke-2' /> Delete selected
          </button>
          <button
            className='p-2 rounded-lg border-2 border-green-500 text-green-500 font-semibold mb-2'
            onClick={() => {
              setPosition({});
              openCreateForm();
            }}
          >
            <PlusIcon className='w-5 inline stroke-2' /> Create new
          </button>
          <button
            className='p-2 rounded-lg border-2 border-blue-500 text-blue-500 font-semibold mb-2'
            onClick={() => {
              allLessons.forEach(lesson => dispatch(updateEntity({ entityName: 'lesson', entity: lesson })));
            }}
          >
            <ArrowDownTrayIcon className='w-5 inline stroke-2' /> Save all changes
          </button>
          {
            (() => {
              const lessonsNotOnSchedule = filterLessonsBy(selectedType, selectedEntity).filter((lesson) => !hasPositionInSchedule(lesson));
              return (lessonsNotOnSchedule.length ? lessonsNotOnSchedule.map((lesson, index) =>
                <div
                  draggable
                  key={index}
                  onDragStart={() => {
                    setDraggedLesson(lesson);
                  }}
                  onClick={
                    () => {
                      if (lesson.id === selectedLesson?.id) {
                        openEditForm();
                      }
                      setSelectedLesson(lesson);
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