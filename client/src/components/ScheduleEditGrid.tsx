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
import {
  buildCollisions,
  buildScheduleTables, Collision,
  Collisions,
  getCollisions,
  ScheduleTables, tableNameToFilterType,
} from '../common/scheduleLogic';
import { ID, LessonDTO } from '../entities/entitiesDTO';
import Modal from './Modal';

function hasPositionInSchedule(lesson: EditableLesson): boolean {
  return !!(lesson.lessonTime && lesson.day);
}

function ScheduleEditGrid(): JSX.Element {
  const dispatch = useDispatch();
  const allEntities = useSelector(selectAllEntities);
  const lessonTimes = useSelector(selectLessonTimes);
  const days = useSelector(selectDays);

  const [draggedLesson, setDraggedLesson] = useState<EditableLesson>();

  const [allLessons, setAllLessons] = useState<EditableLesson[]>([]);

  // const checkingTablesRef = useRef<any>();
  // const checkingTables = checkingTablesRef.current;

  const [scheduleTables, setScheduleTables] = useState<ScheduleTables>();
  const [collisions, setCollisions] = useState<Collisions>();

  const [types, selectedType, setType,
    entities, selectedEntity, setEntity,
    weekTypes, selectedWeekType, setWeekType,
  ] = useFilters();

  const [selectedLesson, setSelectedLesson] = useState<EditableLesson>();
  const [isEditFormOpen, openEditForm, closeEditForm] = useModal();
  const [isCreateFormOpen, openCreateForm, closeCreateForm] = useModal();
  const [isConflictedModalOpen, openConflictedModal, closeConflictedModal] = useModal();
  const [positionInSchedule, setPosition] = useState({});

  const [conflictedModalData, setConflictedModalData] = useState<any>();

  useEffect(() => {
    const allLessons = allEntities.lesson as LessonDTO[];
    const lessonsInSchedule = allLessons.filter(hasPositionInSchedule) as Required<LessonDTO>[];

    const tables = buildScheduleTables(lessonsInSchedule, weekTypes, days, lessonTimes);

    setAllLessons(allLessons);
    setScheduleTables(tables);
    setCollisions(buildCollisions(tables));
  }, []);

  useEffect(() => {
    const lessonsInSchedule = allLessons.filter(hasPositionInSchedule) as Required<LessonDTO>[];
    const tables = buildScheduleTables(lessonsInSchedule, weekTypes, days, lessonTimes);

    setScheduleTables(tables);
    setCollisions(buildCollisions(tables));
  }, [allLessons]);


  function filterLessonsBy(filter: FilterType, filteredEntity: { id: ID }) {
    return allLessons.filter((lesson) => lesson[filter]?.id === filteredEntity.id);
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
                // changeTable(draggedLesson, newLesson);
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
    if (!scheduleTables) {
      return null;
    }

    const conflictedLessons = getCollisions(scheduleTables, selectedType, selectedEntity.id, selectedWeekType.id, lesson.day.id, lesson.lessonTime.id);
    // setConflictedModal(conflictedLessons);
    return (conflictedLessons.length > 1 &&
      <div className='bg-rose-700 h-full w-2.5 absolute z-2 rounded-l-md'
           onClick={(e) => {
             e.stopPropagation();
             console.log('66');
             openConflictedModal();
             setConflictedModalData(conflictedLessons);
           }}
        // onMouseOver={() => setConflictedModal(lesson)}
        // onMouseLeave={() => setConflictedModal(undefined)}
      ></div>);
  }

  // function addCollisionCircle(lesson: any) {
  //   return (checkingTables[selectedType][selectedEntity.id][lesson!.lessonTime!.id][lesson!.day!.id].length > 1 &&
  //     <div
  //       className='bg-rose-700 rounded-full w-6 h-6 absolute z-2 -right-2 -top-2  text-white font-bold text-xs pl-2 pt-1'
  //       onMouseOver={() => setConflictedModal(lesson)}
  //       onMouseLeave={() => setConflictedModal(undefined)}
  //     >
  //       {checkingTables[selectedType][selectedEntity.id][lesson!.lessonTime!.id][lesson!.day!.id].length}
  //     </div>);
  // }

  // function addConflictedModal(lesson: any) {
  //   return (conflictedModal && conflictedModal.id === lesson.id &&
  //     <div className='flex gap-2 absolute z-2 -top-32 opacity-75'>
  //       {
  //         (collisions as any)[lesson.id].map((l: any, i: number) => (
  //           <LessonCard
  //             key={i}
  //             lesson={l as Lesson}
  //             filterType={selectedType}
  //           />
  //         ))
  //       }
  //     </div>);
  // }

  function collisionDescription(collision: Collision) {
    const markedAs = collision.markedAs;
    const tableName = collision.filter.tableName;
    const weekType = weekTypes.find(w => w.id === collision.filter.weekType).name;
    const day = days.find(d => d.id === collision.filter.day)?.name;
    const lessonTime = lessonTimes.find(lt => lt.id === collision.filter.lessonTime)?.displayName;

    const type = tableNameToFilterType(collision.filter.tableName);

    const item = allEntities[type].find(i => i.id === collision.filter.item);
    const week = weekTypes.find(w => w.id === collision.filter.weekType);

    function handleClick() {
      setType(type);
      setEntity(item);
      setWeekType(week);
      window.scrollTo({top: 0});
    }

    return (<div>
      * {markedAs} at <span className='text-blue-600 hover:text-pink-600 cursor-pointer' onClick={handleClick}>{tableName} {weekType} {day} {lessonTime}</span>
    </div>);
  }

  if (!(lessonTimes && days && allLessons)) {
    return <div>Loading...</div>;
  }

  return (
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
      {isConflictedModalOpen &&
        <Modal close={closeConflictedModal}>
          <div className='flex gap-2 flex-col'>
          {conflictedModalData.map((l: any, i: number) => (
            <LessonCard
              key={i}
              lesson={l as Lesson}
              filterType={selectedType}
            />
          ))}
          </div>
        </Modal>
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
                         style={{
                           gridRowStart: Number(lesson!.lessonTime!.id) + 1,
                           gridColumnStart: Number(lesson!.day!.id) + 1,
                         }}
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
                      {/* {addConflictedModal(lesson)} */}
                      {/* {addCollisionCircle(lesson)} */}
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
             onDrop={() => {
               if (draggedLesson) {
                 const newLesson = { ...draggedLesson, lessonTime: undefined, day: undefined };
                 setAllLessons((lessons) => {
                   return [...lessons.filter(lesson => lesson.id !== draggedLesson.id),
                     newLesson] as Lesson[];
                 });
                 // changeTable(draggedLesson, newLesson);
               }
             }}
        >
          <button
            className='p-2 rounded-lg border-2 border-rose-500 text-rose-500 font-semibold mb-2'
            onClick={async () => {
              if (selectedLesson) {
                dispatch(deleteEntity({ entityName: 'lesson', id: selectedLesson.id }));
                const filtered = allLessons.filter((item) => item.id !== selectedLesson.id);
                // changeTable(selectedLesson);
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
      <div className='m-8 p-2 border-4 border-blue-300 rounded-xl'>
        <p className='text-md'>Collisions: </p>
        {collisions && collisions.map((collision, index) => (
          <div key={index}>
            {collisionDescription(collision)}
          </div>
        ))}
      </div>
    </>
  );
}

export default ScheduleEditGrid;