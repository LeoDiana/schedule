import React from 'react';
import DropdownInput from '../inputs/DropdownInput';
import { UseFiltersReturn } from './useFilters';

export function Filters({
                          types, selectedType, setType,
                          entities, selectedEntity, setEntity,
                          weekTypes, selectedWeekType, setWeekType,
                        }: UseFiltersReturn) {
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
