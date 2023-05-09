import React, { useState } from 'react';
import { allEntitiesRelated, getDisplayName } from '../../utils/entitiesRelated';
import { Filters } from '../../components/filters/Filters';
import { CreateModal, EditModal } from '../../components/EntityForm';
import { useModal } from '../../components/modal/useModal';
import { getCollisions } from '../../utils/scheduleLogic';
import { LessonDTO } from '../../common/entitiesDTO';
import Modal from '../../components/modal/Modal';
import { useFilters } from '../../components/filters/useFilters';
import { LessonCard } from '../../components/LessonCard';
import { ScheduleGrid } from '../../components/ScheduleGrid';
import { hasPositionInSchedule } from '../../utils/hasPositionInSchedule';
import { useEditSchedule } from './useEditSchedule';
import { DraggableCard } from './components/DraggableCard';
import { SidePanel } from './components/SidePanel';
import { EmptyCells } from './components/EmptyCells';
import { isFitFilters } from '../../utils/isFitFilters';
import { CollisionsBoard } from './components/CollisionsBoard';
import { useCollisions } from './useCollisions';

function EditSchedulePage(): JSX.Element {
  const [isEditFormOpen, openEditForm, closeEditForm] = useModal();
  const [isCreateFormOpen, openCreateForm, closeCreateForm] = useModal();
  const [isConflictedModalOpen, openConflictedModal, closeConflictedModal] = useModal();
  const [conflictedModalData, setConflictedModalData] = useState<Required<LessonDTO>[]>();

  const {
    lessons,
    selectedLesson,
    handleDelete,
    handleSave,
    handleDrag,
    handleDrop,
    handleCreate,
    handleEdit,
    positionInSchedule,
  } = useEditSchedule({
    openEditForm,
    openCreateForm,
  });

  const {
    scheduleTables,
    collisions,
  } = useCollisions({
    lessons,
  });

  const {
    types, selectedType, setType,
    entities, selectedEntity, setEntity,
    weekTypes, selectedWeekType, setWeekType,
    setFilters,
  } = useFilters();

  const lessonsNotOnSchedule = lessons.filter((lesson) => !hasPositionInSchedule(lesson));
  const lessonsOnGrid = lessons
    .filter(isFitFilters.bind(null, selectedWeekType, selectedType, selectedEntity))
    .filter(hasPositionInSchedule) as Required<LessonDTO>[];


  function addCollisionLine(lesson: Required<LessonDTO>): JSX.Element {
    const conflictedLessons = getCollisions(
      scheduleTables, selectedType, selectedEntity.id, selectedWeekType.id, lesson.day.id, lesson.lessonTime.id);

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
            {conflictedModalData.map((lesson: LessonDTO) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
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
            <ScheduleGrid>
              <>
                <EmptyCells
                  onDrop={handleDrop.bind(null, selectedWeekType)}
                  onClick={handleCreate.bind(null, selectedWeekType)}
                />
                {lessonsOnGrid.map((lesson) => (
                  <DraggableCard
                    key={lesson.id}
                    lesson={lesson}
                    addLine={() => addCollisionLine(lesson as Required<LessonDTO>)}
                    selectedType={selectedType}
                    isSelected={selectedLesson?.id === lesson.id}
                    onDrag={() => handleDrag(lesson)}
                    onClick={() => handleEdit(lesson)}
                  />
                ))}
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
      <CollisionsBoard
        setFilters={setFilters}
        collisions={collisions}
      />
    </>
  );
}

export default EditSchedulePage;
