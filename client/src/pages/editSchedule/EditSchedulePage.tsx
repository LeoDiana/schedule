import React, { useEffect, useState } from 'react';
import { allEntitiesRelated, getDisplayName } from '../../utils/entitiesRelated';
import { EntitiesNamesToTypes, FilterType, ObjWithId } from '../../common/types';
import { Filters } from '../../components/filters/Filters';
import { CreateModal, EditModal } from '../../components/EntityForm';
import { useModal } from '../../components/modal/useModal';
import { useSelector } from 'react-redux';
import {
  selectDays,
  selectLessonTimes,
} from '../../store/features/entities/entitiesSlice';
import {
  buildCollisions,
  buildScheduleTables,
  Collision,
  Collisions,
  getCollisions,
  ScheduleTables,
  tableNameToFilterType,
} from '../../utils/scheduleLogic';
import { DayDTO, ID, LessonDTO, LessonTimeDTO, WeekTypeDTO } from '../../common/entitiesDTO';
import Modal from '../../components/modal/Modal';
import { MARKED_AS } from '../../common/constants';
import { useFilters } from '../../components/filters/useFilters';
import { LessonCard } from '../../components/LessonCard';
import { ScheduleGrid } from '../../components/ScheduleGrid';
import { Spinner } from '../../components/Spinner';
import { hasPositionInSchedule } from '../../utils/hasPositionInSchedule';
import { useEditSchedule } from './useEditSchedule';
import { DraggableCard } from './components/DraggableCard';
import { SidePanel } from './components/SidePanel';
import { EmptyCells } from './components/EmptyCells';

function EditSchedulePage(): JSX.Element {
  const {
    allLessons,
    setAllLessons,
    selectedLesson,
    setSelectedLesson,
    handleDelete,
    handleSave,
    allEntities,
  } = useEditSchedule();

  const lessonTimes = useSelector(selectLessonTimes);
  const days = useSelector(selectDays);

  const [draggedLesson, setDraggedLesson] = useState<LessonDTO>();

  const [scheduleTables, setScheduleTables] = useState<ScheduleTables>();
  const [collisions, setCollisions] = useState<Collisions>();

  const {
    types, selectedType, setType,
    entities, selectedEntity, setEntity,
    weekTypes, selectedWeekType, setWeekType,
  } = useFilters();


  const [isEditFormOpen, openEditForm, closeEditForm] = useModal();
  const [isCreateFormOpen, openCreateForm, closeCreateForm] = useModal();
  const [positionInSchedule, setPosition] = useState({});

  const [isConflictedModalOpen, openConflictedModal, closeConflictedModal] = useModal();
  const [conflictedModalData, setConflictedModalData] = useState<Required<LessonDTO>[]>();

  const lessonsNotOnSchedule = allLessons.filter((lesson) => !hasPositionInSchedule(lesson));
  const filteredLessons = getFilteredLessons();

  useEffect(() => {
    const lessonsInSchedule = allLessons.filter(hasPositionInSchedule) as Required<LessonDTO>[];
    const tables = buildScheduleTables(lessonsInSchedule, weekTypes, days, lessonTimes);

    setScheduleTables(tables);
    setCollisions(buildCollisions(tables));
  }, [allLessons, days, lessonTimes, weekTypes]);


  function filterLessonsBy(filter: FilterType, filteredEntity: ObjWithId) {
    return allLessons.filter((lesson) => lesson[filter]?.id === filteredEntity.id);
  }

  function getFilteredLessons(): Required<LessonDTO>[] {
    return filterLessonsBy(selectedType, selectedEntity)
      .filter((l) => l.weekType?.id === selectedWeekType.id)
      .filter(hasPositionInSchedule) as Required<LessonDTO>[];
  }

  function handleDrop(lessonTime?: LessonTimeDTO, day?: DayDTO) {
    if (draggedLesson) {
      const newLesson = { ...draggedLesson, lessonTime, day };
      setAllLessons((lessons: LessonDTO[]) => {
        return [...lessons.filter(lesson => lesson.id !== draggedLesson.id),
          newLesson];
      });
    }
  }

  function handleCreate(weekType?: WeekTypeDTO, lessonTime?: LessonTimeDTO, day?: DayDTO) {
    setPosition({ lessonTime, day, weekType });
    openCreateForm();
  }

  function handleDrag(lesson: LessonDTO) {
    setDraggedLesson(lesson);
  }

  function handleEdit(lesson: LessonDTO) {
    if (lesson.id === selectedLesson?.id) {
      openEditForm();
    }
    setSelectedLesson(lesson);
  }


  function addCollisionLine(lesson: Required<LessonDTO>): JSX.Element {
    if (!scheduleTables) {
      return <></>;
    }

    const conflictedLessons = getCollisions(scheduleTables, selectedType, selectedEntity.id, selectedWeekType.id, lesson.day.id, lesson.lessonTime.id);
    if (conflictedLessons.length < 2) {
      return <></>;
    }
    return (
      <div
        className='bg-rose-700 h-full w-2.5 absolute z-2 rounded-l-md'
        onClick={(e) => {
          e.stopPropagation();
          openConflictedModal();
          setConflictedModalData(conflictedLessons);
        }}
      />);
  }

  function collisionDescription(collision: Collision) {
    const markedAs = collision.markedAs;
    const weekType = weekTypes.find(w => w.id === collision.filter.weekType)?.name;
    const day = days.find(d => d.id === collision.filter.day)?.name;
    const lessonTime = getDisplayName('lessonTime', lessonTimes.find(lt => lt.id === collision.filter.lessonTime));

    const type = tableNameToFilterType(collision.filter.tableName);

    const entitiesOfType: Array<EntitiesNamesToTypes[typeof type]> = allEntities[type];
    const item = entitiesOfType.find((i: { id: ID; }) => i.id === collision.filter.item);
    const week = weekTypes.find(w => w.id === collision.filter.weekType);

    function handleClick() {
      setType(type);
      if (item) {
        setEntity(item);
      }
      if (week) {
        setWeekType(week);
      }

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

  const isLoading = !(lessonTimes && days && allLessons);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isCreateFormOpen &&
        <CreateModal
          onClose={closeCreateForm}
          entityType='lesson'
          entity={{
            ...allEntitiesRelated.lesson.createEmpty(),
            [selectedType]: selectedEntity,
            ...positionInSchedule,
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
                <EmptyCells onDrop={handleDrop} onClick={handleCreate.bind(null, selectedWeekType)} />
                {
                  filteredLessons.map((lesson) => (
                    <DraggableCard
                      key={lesson.id}
                      lesson={lesson}
                      addLine={() => addCollisionLine(lesson as Required<LessonDTO>)}
                      selectedType={selectedType}
                      isSelected={selectedLesson?.id === lesson.id}
                      onDrag={() => handleDrag(lesson)}
                      onClick={() => handleEdit(lesson)}
                    />
                  ))
                }
              </>
            </ScheduleGrid>
          </div>
        </div>
        <SidePanel
          onDrop={handleDrop}
          onCreate={() => handleCreate()}
          onDelete={handleDelete}
          onSave={handleSave}
          cards={
            lessonsNotOnSchedule.map((lesson) => (
              <DraggableCard
                key={lesson.id}
                lesson={lesson}
                selectedType={selectedType}
                isSelected={selectedLesson?.id === lesson.id}
                onDrag={() => handleDrag(lesson)}
                onClick={() => handleEdit(lesson)}
              />))
          } />
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

export default EditSchedulePage;
