import React, { useEffect, useState } from 'react';
import { FILTERS } from '../common/constants';
import { allEntitiesRelated } from '../entities/entitiesRelated';
import Schedule from '../pages/Schedule';
import DropdownInput from '../components/DropdownInput';
import { FilterType } from '../common/types';

export const ScheduleFilter = () => {
  const [typeFilter, setTypeFilter] = useState<FilterType>(FILTERS[0]);
  const [selectedEntity, setSelectedEntity] = useState<any>();

  const [entities, setEntities] = useState({} as { [k in FilterType]: any });

  useEffect(() => {
    const fetchedEntities = {} as { [k in FilterType]: any };
    const fetchData = async () => {
      fetchedEntities['subgroup'] = await allEntitiesRelated.subgroup.api.readAll();
      fetchedEntities['teacher'] = await allEntitiesRelated.teacher.api.readAll();
      setEntities(fetchedEntities);
    };

    fetchData();
  }, []);

  const handleTypeChange = (filter: FilterType) => {
    setTypeFilter(filter);
    setSelectedEntity(entities[filter][0]);
  };

  const handleEntityChange = (item: any) => {
    setSelectedEntity(item);
  };

  return (
    <>
      <div className='flex gap-2 p-4'>
      <DropdownInput name='Сортувати по' value={typeFilter} onChange={handleTypeChange} items={FILTERS} />
      {typeFilter && entities[typeFilter] ? (
        <DropdownInput name={typeFilter} value={selectedEntity} onChange={handleEntityChange} items={entities[typeFilter]} />
      ) : null}
      </div>
      {typeFilter && selectedEntity ? (
        <Schedule
          {...{
            filter: typeFilter,
            filteredEntity: selectedEntity as any,
          }}
        />
      ) : null}
    </>
  );
};