import { FilterType } from '../common/types';
import DropdownInput from './inputs/DropdownInput';
import React, { useEffect, useState } from 'react';
import { FILTERS } from '../common/constants';
import { useSelector } from 'react-redux';
import { selectSubgroup, selectTeacher } from '../features/entities/entitiesSlice';


type UseFilterReturn = [FilterType[], FilterType, (type: FilterType) => void,
  any[], any, (item: any) => void];

export function useFilters(): UseFilterReturn {
  const teachers = useSelector(selectTeacher);
  const subroups = useSelector(selectSubgroup);

  const [typeFilter, setTypeFilter] = useState<FilterType>(FILTERS[0]);
  const [selectedEntity, setSelectedEntity] = useState<any>();

  const [entities, setEntities] = useState({} as { [k in FilterType]: any });

  useEffect(() => {
    (() => {
      const fetchedEntities = {} as { [k in FilterType]: any };
      fetchedEntities['subgroup'] = subroups;
      fetchedEntities['teacher'] = teachers;
      setEntities(fetchedEntities);
      setSelectedEntity(fetchedEntities[typeFilter][0]);
    })()
  }, [teachers, subroups]);

  const handleTypeChange = (filter: FilterType) => {
    setTypeFilter(filter);
    setSelectedEntity(entities[filter][0]);
  };

  const handleEntityChange = (item: any) => {
    setSelectedEntity(item);
  };

  return [FILTERS, typeFilter, handleTypeChange,
    entities[typeFilter], selectedEntity, handleEntityChange];
}

export interface FiltersProps {
  types: FilterType[],
  selectedType: FilterType,
  setType: (type: FilterType) => void,
  entities: any[],
  selectedEntity: any,
  setEntity: (item: any) => void,
}

export function Filters({
                          types, selectedType, setType,
                          entities, selectedEntity, setEntity,
                        }: FiltersProps) {
  console.log({
    types, selectedType, setType,
    entities, selectedEntity, setEntity,
  });
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
    </div>
  );
}
