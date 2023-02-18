import React from 'react';
import Schedule from '../pages/Schedule';
import { Filters, useFilters } from './Filters';

export function ScheduleFilter() {
  const [types, selectedType, setType,
         entities, selectedEntity, setEntity,
         weekTypes, selectedWeekType, setWeekType
        ] = useFilters();

  return (
    <>
      <Filters
        types={types} selectedType={selectedType}
        setType={setType} entities={entities}
        selectedEntity={selectedEntity} setEntity={setEntity}
        selectedWeekType={selectedWeekType} setWeekType={setWeekType} weekTypes={weekTypes}/>
      {selectedType && selectedEntity ? (
        <Schedule
          {...{
            filter: selectedType,
            filteredEntity: selectedEntity as any,
            weekType: selectedWeekType,
          }}
        />
      ) : null}
    </>
  );
}