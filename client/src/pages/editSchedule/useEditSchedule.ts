import {
  deleteEntity,
  saveAllLessons, selectAllEntities,
} from '../../store/features/entities/entitiesSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { DayDTO, LessonDTO, LessonTimeDTO, WeekTypeDTO } from '../../common/entitiesDTO';

interface Props {
  openCreateForm: () => void,
  openEditForm: () => void,
}

interface Return {
  lessons: LessonDTO[],
  selectedLesson: LessonDTO | undefined,
  handleDelete: () => void,
  handleSave: () => void,
  handleDrag: (lesson: LessonDTO) => void,
  handleDrop: (weekType?: WeekTypeDTO, lessonTime?: LessonTimeDTO, day?: DayDTO) => void,
  handleCreate: (weekType?: WeekTypeDTO, lessonTime?: LessonTimeDTO, day?: DayDTO) => void,
  handleEdit: (lesson: LessonDTO) => void,
  positionInSchedule: {weekType?: WeekTypeDTO, lessonTime?: LessonTimeDTO, day?: DayDTO};
}

export function useEditSchedule({openCreateForm, openEditForm}: Props): Return {
  const dispatch = useDispatch();
  const allEntities = useSelector(selectAllEntities);

  const [allLessons, setAllLessons] = useState<LessonDTO[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<LessonDTO>();
  const [draggedLesson, setDraggedLesson] = useState<LessonDTO>();
  const [positionInSchedule, setPosition] = useState({});


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

  function handleDrag(lesson: LessonDTO) {
    setDraggedLesson(lesson);
  }

  function handleDrop(weekType?: WeekTypeDTO, lessonTime?: LessonTimeDTO, day?: DayDTO) {
    if (draggedLesson) {
      const newLesson = { ...draggedLesson, lessonTime, day, weekType };
      setAllLessons(lessons =>
        lessons.map(lesson => lesson.id === draggedLesson.id ? newLesson : lesson),
      );
    }
  }

  function handleCreate(weekType?: WeekTypeDTO, lessonTime?: LessonTimeDTO, day?: DayDTO) {
    setPosition({ lessonTime, day, weekType });
    openCreateForm();
  }

  function handleEdit(lesson: LessonDTO) {
    if (lesson.id === selectedLesson?.id) {
      openEditForm();
    }
    setSelectedLesson(lesson);
  }


  return {
    lessons: allLessons,
    selectedLesson,
    handleDelete,
    handleSave,
    handleDrag,
    handleDrop,
    handleCreate,
    handleEdit,
    positionInSchedule
  }
}