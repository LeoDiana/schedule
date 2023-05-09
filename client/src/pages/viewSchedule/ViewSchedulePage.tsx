import React from 'react';
import { Filters } from '../../components/filters/Filters';
import { useFilters } from '../../components/filters/useFilters';
import { Schedule } from './components/Schedule';
import { Spinner } from '../../components/Spinner';

export function ViewSchedulePage() {
  const {
    types, selectedType, setType,
    entities, selectedEntity, setEntity,
    weekTypes, selectedWeekType, setWeekType,
  } = useFilters();

  const isLoading = !(selectedType && selectedEntity);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Filters
        types={types} selectedType={selectedType}
        setType={setType} entities={entities}
        selectedEntity={selectedEntity} setEntity={setEntity}
        selectedWeekType={selectedWeekType} setWeekType={setWeekType} weekTypes={weekTypes} />
      <Schedule
        {...{
          filter: selectedType,
          filteredEntity: selectedEntity,
          weekType: selectedWeekType,
        }}
      />
    </>
  );
}