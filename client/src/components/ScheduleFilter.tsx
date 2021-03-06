import { MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SchedulePage } from '../pages/SchedulePage';
import { commonEntitiesInfo } from '../common/entitiesInfo';
import { FILTERS } from '../common/constants';
import { AllEntities, FieldsOfType, FilterTypes } from '../common/types';

export const ScheduleFilter = () => {
  const [typeFilter, setTypeFilter] = useState(FILTERS[0]);
  const [selectedEntity, setSelectedEntity] = useState();

  const [entities, setEntities] = useState({} as { [k in FilterTypes]: any });

  useEffect(() => {
    const fetchedEntities: { [k in FilterTypes]: any } = {} as { [k in FilterTypes]: any };
    const fetchData = async () => {
      fetchedEntities['subgroup'] = await commonEntitiesInfo.subgroup.api.readAll();
      fetchedEntities['teacher'] = await commonEntitiesInfo.teacher.api.readAll();
      setEntities(fetchedEntities);
    };

    fetchData();
  }, []);

  const handleTypeChange = (e: any) => {
    const filter = e.target.value as FilterTypes;
    setTypeFilter(filter);
    setSelectedEntity(entities[filter][0]);
  };

  const handleEntityChange = (e: any) => {
    setSelectedEntity(e.target.value);
  };

  return (
    <>
      <Select id="type" label="Type" value={typeFilter} onChange={handleTypeChange}>
        {FILTERS.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      {typeFilter && entities[typeFilter] ? (
        <Select id="entity" label="entity" value={selectedEntity} onChange={handleEntityChange}>
          {entities[typeFilter].map((item: any) => (
            <MenuItem value={item} key={JSON.stringify(item)}>
              {typeFilter === 'teacher'
                ? commonEntitiesInfo.teacher.shortShownName(item)
                : commonEntitiesInfo.subgroup.shortShownName(item)}
            </MenuItem>
          ))}
        </Select>
      ) : null}
      {typeFilter && selectedEntity ? (
        <SchedulePage
          {...{
            filter: typeFilter,
            filteredEntity: selectedEntity as unknown as Required<FieldsOfType<AllEntities>>,
          }}
        />
      ) : null}
    </>
  );
};
