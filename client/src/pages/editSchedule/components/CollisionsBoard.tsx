import React from 'react';
import { Collision, tableNameToFilterType } from '../../../utils/scheduleLogic';
import { getDisplayName } from '../../../utils/entitiesRelated';
import { EntitiesNamesToTypes, FilterType, ObjWithId } from '../../../common/types';
import { ID, WeekTypeDTO } from '../../../common/entitiesDTO';
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
    const markedAs = collision.markedAs;
    const weekType = getDisplayName('weekType', allEntities.weekType.find(w => w.id === collision.filter.weekType)?.name);
    const day = getDisplayName('day', allEntities.day.find(d => d.id === collision.filter.day)?.name);
    const lessonTime = getDisplayName('lessonTime', allEntities.lessonTime.find(lt => lt.id === collision.filter.lessonTime));

    const type = tableNameToFilterType(collision.filter.tableName);

    const entitiesOfType: Array<EntitiesNamesToTypes[typeof type]> = allEntities[type];
    const item = entitiesOfType.find((i: { id: ID; }) => i.id === collision.filter.item) as ObjWithId;
    const week = allEntities.weekType.find(w => w.id === collision.filter.weekType) as WeekTypeDTO;

    return (
      <>
        • <span
        className={markedAs === 'conflict' ? 'text-red-600' : 'text-green-600'}>{MARKED_AS[collision.markedAs]}</span>
        {' '}в <span className='text-blue-600 hover:text-pink-600 cursor-pointer'
                     onClick={() => setFilters(type, item, week)}>
        {getDisplayName(type, item)} {weekType} {day} {lessonTime}
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