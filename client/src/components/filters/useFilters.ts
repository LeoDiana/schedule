import { FilterType, ObjWithId } from '../../common/types';
import { useSelector } from 'react-redux';
import { selectAllEntities } from '../../store/features/entities/entitiesSlice';
import { useEffect, useState } from 'react';
import { FILTERS } from '../../common/constants';
import { WeekTypeDTO } from '../../common/entitiesDTO';

export interface UseFiltersReturn {
  types: FilterType[],
  selectedType: FilterType,
  setType: (type: FilterType) => void,
  entities: ObjWithId[],
  selectedEntity: ObjWithId,
  setEntity: (item: ObjWithId) => void,
  weekTypes: WeekTypeDTO[],
  selectedWeekType: WeekTypeDTO,
  setWeekType: (item: WeekTypeDTO) => void,
}

export function useFilters(): UseFiltersReturn {
  const allEntities = useSelector(selectAllEntities);

  const [typeFilter, setTypeFilter] = useState<FilterType>(FILTERS[0]);
  const [selectedEntity, setSelectedEntity] = useState<ObjWithId>({} as ObjWithId);
  const [selectedWeekType, setSelectedWeekType] = useState<WeekTypeDTO>({} as WeekTypeDTO);

  useEffect(() => {
    setSelectedEntity(allEntities[typeFilter][0]);
    setSelectedWeekType(allEntities.weekType[0]);
  }, [allEntities, typeFilter]);

  const handleTypeChange = (filter: FilterType) => {
    setTypeFilter(filter);
    setSelectedEntity(allEntities[filter][0]);
  };

  const handleEntityChange = (item: ObjWithId) => {
    setSelectedEntity(item);
  };

  const handleWeekTypeChange = (item: WeekTypeDTO) => {
    setSelectedWeekType(item);
  };

  return {
    types: FILTERS,
    selectedType: typeFilter,
    setType: handleTypeChange,
    entities: allEntities[typeFilter],
    selectedEntity,
    setEntity: handleEntityChange,
    weekTypes: allEntities.weekType,
    selectedWeekType,
    setWeekType: handleWeekTypeChange,
  };
}