import React from 'react';
import { getDisplayName } from '../../../utils/entitiesRelated';
import { FilterType, ObjWithId } from '../../../common/types';
import { useSelector } from 'react-redux';
import { selectDays, selectFilteredLessons, selectLessonTimes } from '../../../store/features/entities/entitiesSlice';
import { WeekTypeDTO } from '../../../common/entitiesDTO';
import { RootState } from '../../../store/app/store';
import { ScheduleGrid } from '../../../components/ScheduleGrid';
import { LessonCard } from '../../../components/LessonCard';
import { Spinner } from '../../../components/Spinner';
import { hasPositionInSchedule } from '../../../utils/hasPositionInSchedule';

interface Props {
  filter: FilterType,
  filteredEntity: ObjWithId,
  weekType: WeekTypeDTO,
}

export function Schedule({ filter, filteredEntity, weekType }: Props): JSX.Element {
  const lessonTimes = useSelector(selectLessonTimes);
  const days = useSelector(selectDays);
  const lessons = useSelector((state: RootState) =>
    selectFilteredLessons(state, weekType, filter, filteredEntity),
  );

  const isLoading = !(lessonTimes && days && lessons);

  if (isLoading) {
    return <Spinner />;
  }

  const title = `${getDisplayName(filter, filteredEntity)} ${getDisplayName('weekType', weekType)}`;

  return (
    <div className='m-5'>
      <h3 className='text-3xl text-center pb-6 font-bold'>{title}</h3>
      <ScheduleGrid lessonTimes={lessonTimes} days={days}>
        {lessons.filter(hasPositionInSchedule).map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            filterType={filter}
            inGrid
          />
        ))}
      </ScheduleGrid>
    </div>
  );
}
