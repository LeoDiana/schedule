import React from 'react';
import DropdownInput from '../inputs/DropdownInput';
import { FilterType, ObjWithId } from '../../common/types';
import { WeekTypeDTO } from '../../common/entitiesDTO';

interface Props {
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

export function Filters({
                          types, selectedType, setType,
                          entities, selectedEntity, setEntity,
                          weekTypes, selectedWeekType, setWeekType,
                        }: Props) {
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
