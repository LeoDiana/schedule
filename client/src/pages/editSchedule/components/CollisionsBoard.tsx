import React from 'react';
import { Collision } from '../../../utils/scheduleLogic';
import { getDisplayName } from '../../../utils/entitiesRelated';
import { FilterType, ObjWithId } from '../../../common/types';
import { WeekTypeDTO } from '../../../common/entitiesDTO';
import { MARKED_AS } from '../../../common/constants';
import { useSelector } from 'react-redux';
import { selectAllEntities } from '../../../store/features/entities/entitiesSlice';

interface Props {
  setFilters: (type: FilterType, item: ObjWithId, week: WeekTypeDTO) => void;
  collisions: Collision[];
}

export function CollisionsBoard({ setFilters, collisions }: Props) {
  const allEntities = useSelector(selectAllEntities);

  function collisionDescription(collision: Collision) {
    const type = collision.filter.tableName;
    const entitiesOfType = allEntities[type] as ObjWithId[];
    const item = entitiesOfType.find(i => i.id === collision.filter.item) as ObjWithId;
    const weekType = allEntities.weekType.find(w => w.id === collision.filter.weekType) as WeekTypeDTO;

    const markedLabel = MARKED_AS[collision.markedAs];
    const day = getDisplayName('day', allEntities.day.find(d => d.id === collision.filter.day));
    const lessonTime = getDisplayName('lessonTime', allEntities.lessonTime.find(lt => lt.id === collision.filter.lessonTime));

    return (
      <>
        • <span
        className={collision.markedAs === 'conflict' ? 'text-red-600' : 'text-green-600'}>
          {markedLabel}
        </span>
        {' '}в <span className='text-blue-600 hover:text-pink-600 cursor-pointer'
                     onClick={() => setFilters(type, item, weekType)}>
        {getDisplayName(type, item)} {getDisplayName('weekType', weekType)} {day} {lessonTime}
      </span>
      </>
    );
  }

  return (
    <div className='m-8 p-2 border-4 border-blue-300 rounded-xl'>
      <p className='text-md font-semibold'>Суперечності: </p>
      {collisions && collisions.map((collision, index) => (
        <div key={index}>
          {collisionDescription(collision)}
        </div>
      ))}
    </div>
  );
}