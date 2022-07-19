import { MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SchedulePage } from './SchedulePage';
import { commonEntitiesInfo } from '../common/entitiesInfo';

const filterTypes: Filters[] = ['subgroup', 'teacher'];
type Filters = 'subgroup' | 'teacher';

export const ScheduleFilter = () => {
  const [typeFilter, setTypeFilter] = useState(filterTypes[0]);
  const [selectedEntity, setSelectedEntity] = useState();

  const [entities, setEntities] = useState({} as { [k in Filters]: any });

  useEffect(() => {
    const fetchedEntities: { [k in Filters]: any } = {} as { [k in Filters]: any };
    const fetchData = async () => {
      fetchedEntities['subgroup'] = await commonEntitiesInfo.subgroup.api.readAll();
      fetchedEntities['teacher'] = await commonEntitiesInfo.teacher.api.readAll();
      setEntities(fetchedEntities);
    };

    fetchData();
  }, []);

  const handleTypeChange = (e: any) => {
    setTypeFilter(e.target.value);
  };

  const handleEntityChange = (e: any) => {
    setSelectedEntity(e.target.value);
  };

  return (
    <>
      <Select id="type" label="Type" value={typeFilter} onChange={handleTypeChange}>
        {filterTypes.map((item) => (
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
            filteredEntityId: (selectedEntity as unknown as { id: any }).id,
          }}
        />
      ) : null}
    </>
  );
};
