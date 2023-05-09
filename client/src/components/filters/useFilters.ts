import { FilterType, ObjWithId } from '../../common/types';
import { useSelector } from 'react-redux';
import { selectAllEntities } from '../../store/features/entities/entitiesSlice';
import { useEffect, useState } from 'react';
import { FILTERS } from '../../common/constants';
import { WeekTypeDTO } from '../../common/entitiesDTO';

interface Return {
  types: FilterType[],
  selectedType: FilterType,
  setType: (type: FilterType) => void,
  entities: ObjWithId[],
  selectedEntity: ObjWithId,
  setEntity: (item: ObjWithId) => void,
  weekTypes: WeekTypeDTO[],
  selectedWeekType: WeekTypeDTO,
  setWeekType: (item: WeekTypeDTO) => void,
  setFilters: (type: FilterType, item: ObjWithId, week: WeekTypeDTO) => void
}

export function useFilters(): Return {
  const allEntities = useSelector(selectAllEntities);

  const [typeFilter, setTypeFilter] = useState<FilterType>(FILTERS[0]);
  const [selectedEntity, setSelectedEntity] = useState<ObjWithId>({} as ObjWithId);
  const [selectedWeekType, setSelectedWeekType] = useState<WeekTypeDTO>({} as WeekTypeDTO);

  useEffect(() => {
    setSelectedEntity(allEntities[typeFilter][0]);
    setSelectedWeekType(allEntities.weekType[0]);
  }, [allEntities, typeFilter]);

  function handleTypeChange(filter: FilterType) {
    setTypeFilter(filter);
    setSelectedEntity(allEntities[filter][0]);
  }

  function handleEntityChange(item: ObjWithId) {
    setSelectedEntity(item);
  }

  function handleWeekTypeChange(item: WeekTypeDTO) {
    setSelectedWeekType(item);
  }

  function setFilters(type: FilterType, item: ObjWithId, week: WeekTypeDTO) {
    handleTypeChange(type);
    handleEntityChange(item);
    handleWeekTypeChange(week);
    window.scrollTo({ top: 0 });
  }

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
    setFilters,
  };
}