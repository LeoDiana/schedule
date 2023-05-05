import React, { useEffect, useState } from 'react';
import { allEntitiesRelated, getDisplayName } from '../entities/entitiesRelated';
import { LessonCard, ScheduleGrid } from '../pages/Schedule';
import { ArrowDownTrayIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { FilterType } from '../common/types';
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
import { MARKED_AS } from '../common/constants';
import toast from 'react-hot-toast';

function hasPositionInSchedule(lesson: LessonDTO): boolean {
  return !!(lesson.lessonTime && lesson.day);
}

function ScheduleEditGrid(): JSX.Element {
  const dispatch = useDispatch();
  const allEntities = useSelector(selectAllEntities);
  const lessonTimes = useSelector(selectLessonTimes);
  const days = useSelector(selectDays);

  const [draggedLesson, setDraggedLesson] = useState<LessonDTO>();

  const [allLessons, setAllLessons] = useState<LessonDTO[]>([]);

  const [scheduleTables, setScheduleTables] = useState<ScheduleTables>();
  const [collisions, setCollisions] = useState<Collisions>();

  const [types, selectedType, setType,
    entities, selectedEntity, setEntity,
    weekTypes, selectedWeekType, setWeekType,
  ] = useFilters();

  const [selectedLesson, setSelectedLesson] = useState<LessonDTO>();
  const [isEditFormOpen, openEditForm, closeEditForm] = useModal();
  const [isCreateFormOpen, openCreateForm, closeCreateForm] = useModal();
  const [isConflictedModalOpen, openConflictedModal, closeConflictedModal] = useModal();
  const [positionInSchedule, setPosition] = useState({});

  const [conflictedModalData, setConflictedModalData] = useState<Required<LessonDTO>[]>();

  const lessonsNotOnSchedule = allLessons.filter((lesson) => !hasPositionInSchedule(lesson));
  const filteredLessons = getFilteredLessons();

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

  function getFilteredLessons(): Required<LessonDTO>[] {
    return filterLessonsBy(selectedType, selectedEntity)
      .filter((l) => l.weekType?.id === selectedWeekType.id)
      .filter(hasPositionInSchedule) as Required<LessonDTO>[];
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
                    newLesson];
                });
              }
            }}
            onClick={() => {
              setPosition({ lessonTime: lessonTime, day: day, weekType: selectedWeekType });
              openCreateForm();
            }}
          />,
        );
      }
    }
    return cells;
  }

  function addCollisionLine(lesson: Required<LessonDTO>) {
    if (!scheduleTables) {
      return null;
    }

    const conflictedLessons = getCollisions(scheduleTables, selectedType, selectedEntity.id, selectedWeekType.id, lesson.day.id, lesson.lessonTime.id);
    return (conflictedLessons.length > 1 &&
      <div className='bg-rose-700 h-full w-2.5 absolute z-2 rounded-l-md'
           onClick={(e) => {
             e.stopPropagation();
             openConflictedModal();
             setConflictedModalData(conflictedLessons);
           }}
      ></div>);
  }

  function collisionDescription(collision: Collision) {
    const markedAs = collision.markedAs;
    const weekType = weekTypes.find(w => w.id === collision.filter.weekType).name;
    const day = days.find(d => d.id === collision.filter.day)?.name;
    const lessonTime = getDisplayName('lessonTime', lessonTimes.find(lt => lt.id === collision.filter.lessonTime));

    const type = tableNameToFilterType(collision.filter.tableName);

    const item = allEntities[type].find(i => i.id === collision.filter.item) as { name: string };
    const week = weekTypes.find(w => w.id === collision.filter.weekType);

    function handleClick() {
      setType(type);
      setEntity(item);
      setWeekType(week);
      window.scrollTo({ top: 0 });
    }

    return (
      <div>
        • <span
        className={markedAs === 'conflict' ? 'text-red-600' : 'text-green-600'}>{MARKED_AS[collision.markedAs]}</span>
        {' '}в <span className='text-blue-600 hover:text-pink-600 cursor-pointer'
                     onClick={handleClick}>{getDisplayName(type, item)} {weekType} {day} {lessonTime}</span>
      </div>
    );
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
      {isConflictedModalOpen && conflictedModalData &&
        <Modal close={closeConflictedModal}>
          <div className='flex gap-2 flex-col'>
            {conflictedModalData.map((l: LessonDTO, i: number) => (
              <LessonCard
                key={i}
                lesson={l}
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
                  filteredLessons.map((lesson, index) => (
                    <div key={index}
                         style={{
                           gridRowStart: Number(lesson.lessonTime.id) + 1,
                           gridColumnStart: Number(lesson.day.id) + 1,
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
                      {addCollisionLine(lesson as Required<LessonDTO>)}
                      <LessonCard
                        lesson={lesson}
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
                     newLesson];
                 });
               }
             }}
        >
          <button
            className='p-2 rounded-lg border-2 border-rose-500 text-rose-500 font-semibold mb-2'
            onClick={async () => {
              if (selectedLesson) {
                dispatch(deleteEntity({ entityName: 'lesson', id: selectedLesson.id }));
                const filtered = allLessons.filter((item) => item.id !== selectedLesson.id);
                setAllLessons(filtered);
                setSelectedLesson(undefined);
              }
            }}
          >
            <TrashIcon className='w-5 inline stroke-2' /> Видалити обране
          </button>
          <button
            className='p-2 rounded-lg border-2 border-green-500 text-green-500 font-semibold mb-2'
            onClick={() => {
              setPosition({});
              openCreateForm();
            }}
          >
            <PlusIcon className='w-5 inline stroke-2' /> Створити
          </button>
          <button
            className='p-2 rounded-lg border-2 border-blue-500 text-blue-500 font-semibold mb-2'
            onClick={() => {
              allLessons.forEach(lesson => dispatch(updateEntity({ entityName: 'lesson', entity: lesson })));
              toast.success('Збережено')
            }}
          >
            <ArrowDownTrayIcon className='w-5 inline stroke-2' /> Зберегти зміни
          </button>
          {
            (lessonsNotOnSchedule.length ? lessonsNotOnSchedule.map((lesson, index) =>
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
                  lesson={lesson}
                  filterType={selectedType}
                  isSelected={selectedLesson?.id === lesson.id}
                />
              </div>,
            ) : <div className='pt-5 text-center text-gray-400'>Перетягніть заняття сюди</div>)
          }
        </div>
      </div>
      <div className='m-8 p-2 border-4 border-blue-300 rounded-xl'>
        <p className='text-md font-semibold'>Суперечності: </p>
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
