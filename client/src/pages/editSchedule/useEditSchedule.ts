import {
  deleteEntity,
  saveAllLessons, selectAllEntities,
} from '../../store/features/entities/entitiesSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { LessonDTO } from '../../common/entitiesDTO';
import { AllEntitiesItems, setState } from '../../common/types';

interface Return {
  allLessons: LessonDTO[],
  setAllLessons: setState<LessonDTO[]>,
  selectedLesson: LessonDTO | undefined,
  setSelectedLesson: setState<LessonDTO | undefined>
  handleDelete: () => void,
  // handleCreate: () => void,
  handleSave: () => void,
  allEntities: AllEntitiesItems,
}

export function useEditSchedule(): Return {
  const dispatch = useDispatch();
  const allEntities = useSelector(selectAllEntities);

  const [allLessons, setAllLessons] = useState<LessonDTO[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<LessonDTO>();

  useEffect(() => {
    setAllLessons(allEntities.lesson);
  }, [allEntities.lesson]);

  function handleDelete() {
    if (selectedLesson) {
      dispatch(deleteEntity({ entityName: 'lesson', id: selectedLesson.id }));
      const filtered = allLessons.filter((item) => item.id !== selectedLesson.id);
      setAllLessons(filtered);
      setSelectedLesson(undefined);
    }
  }

  function handleSave() {
    dispatch(saveAllLessons({ lessons: allLessons }));
    toast.success('Збережено');
  }


  return {
    allLessons,
    setAllLessons,
    selectedLesson,
    setSelectedLesson,
    handleDelete,
    // handleCreate,
    handleSave,
    allEntities,
  }
}