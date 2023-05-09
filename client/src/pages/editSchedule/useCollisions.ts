import { useEffect, useState } from 'react';
import { hasPositionInSchedule } from '../../utils/hasPositionInSchedule';
import { LessonDTO } from '../../common/entitiesDTO';
import { buildCollisions, buildScheduleTables, Collisions, ScheduleTables } from '../../utils/scheduleLogic';
import { useSelector } from 'react-redux';
import { selectDays, selectLessonTimes, selectWeekTypes } from '../../store/features/entities/entitiesSlice';

interface Props {
  lessons: LessonDTO[];
}

interface Return {
  scheduleTables: ScheduleTables;
  collisions: Collisions;
}

export function useCollisions({ lessons }: Props): Return {
  const weekTypes = useSelector(selectWeekTypes);
  const days = useSelector(selectDays);
  const lessonTimes = useSelector(selectLessonTimes);

  const [scheduleTables, setScheduleTables] = useState<ScheduleTables>(new Map());
  const [collisions, setCollisions] = useState<Collisions>([]);

  useEffect(() => {
    const lessonsInSchedule = lessons.filter(hasPositionInSchedule) as Required<LessonDTO>[];
    const tables = buildScheduleTables(lessonsInSchedule, weekTypes, days, lessonTimes);

    setScheduleTables(tables);
    setCollisions(buildCollisions(tables));
  }, [lessons, days, lessonTimes, weekTypes]);

  return {
    scheduleTables,
    collisions
  };
}