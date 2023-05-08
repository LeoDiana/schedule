import { FilterType } from '../common/types';
import DropdownInput from './inputs/DropdownInput';
import React, { useEffect, useState } from 'react';
import { FILTERS } from '../common/constants';
import { useSelector } from 'react-redux';
import { selectSubgroup, selectTeacher, selectWeekType } from '../features/entities/entitiesSlice';

type UseFilterReturn = [FilterType[], FilterType, (type: FilterType) => void,
  any[], any, (item: any) => void, any[], any, (item: any) => void];

export function useFilters(): UseFilterReturn {
  const teachers = useSelector(selectTeacher);
  const subgroups = useSelector(selectSubgroup);
  const weekTypes = useSelector(selectWeekType);

  const [typeFilter, setTypeFilter] = useState<FilterType>(FILTERS[0]);
  const [selectedEntity, setSelectedEntity] = useState<any>();

  const [entities, setEntities] = useState({} as { [k in FilterType]: any });
  const [selectedWeekType, setSelectedWeekType] = useState<any>();

  useEffect(() => {
    (() => {
      const fetchedEntities = {} as { [k in FilterType]: any };
      fetchedEntities['subgroup'] = subgroups;
      fetchedEntities['teacher'] = teachers;
      setEntities(fetchedEntities);
      setSelectedEntity(fetchedEntities[typeFilter][0]);
      setSelectedWeekType(weekTypes[0]);
    })();
  }, [teachers, subgroups, weekTypes]);

  const handleTypeChange = (filter: FilterType) => {
    setTypeFilter(filter);
    setSelectedEntity(entities[filter][0]);
  };

  const handleEntityChange = (item: any) => {
    setSelectedEntity(item);
  };

  const handleWeekTypeChange = (item: any) => {
    setSelectedWeekType(item);
  };

  return [FILTERS, typeFilter, handleTypeChange,
    entities[typeFilter], selectedEntity, handleEntityChange,
    weekTypes, selectedWeekType, handleWeekTypeChange];
}

export interface FiltersProps {
  types: FilterType[],
  selectedType: FilterType,
  setType: (type: FilterType) => void,
  entities: any[],
  selectedEntity: any,
  setEntity: (item: any) => void,
  weekTypes: any[],
  selectedWeekType: any,
  setWeekType: (item: any) => void,
}

export function Filters({
                          types, selectedType, setType,
                          entities, selectedEntity, setEntity,
                          weekTypes, selectedWeekType, setWeekType,
                        }: FiltersProps) {
  return (
    <div className='flex gap-2 p-4'>
      <DropdownInput name='Сортувати по' value={selectedType} onChange={setType} items={types} />
      {selectedType && entities && (
        <DropdownInput
          name={selectedType}
          value={selectedEntity}
          onChange={setEntity}
          items={entities} />
      )}
      <DropdownInput name='weekType' value={selectedWeekType} onChange={(item) => setWeekType(item)}
                     items={weekTypes} />
    </div>
  );
}
