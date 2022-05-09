import { MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { subgroupInfo, teacherInfo } from '../types/entitiesInfo';
import { SchedulePage } from './SchedulePage';

const filterTypes = ['subgroup', 'teacher'];

export const ScheduleFilter = () => {
  const [typeFilter, setTypeFilter] = useState(filterTypes[0]);
  const [selectedEntity, setSelectedEntity] = useState();

  const [entities, setEntities] = useState({});

  useEffect(() => {
    const fetchedEntities = {};
    const fetchData = async () => {
      fetchedEntities['subgroup'] = await subgroupInfo.api.readAll();
      fetchedEntities['teacher'] = await teacherInfo.api.readAll();
      setEntities(fetchedEntities);
    };

    fetchData();
  }, []);

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleEntityChange = (e) => {
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
          {entities[typeFilter].map((item) => (
            <MenuItem value={item} key={JSON.stringify(item)}>
              {typeFilter === 'teacher'
                ? teacherInfo.shortShownName(item)
                : subgroupInfo.shortShownName(item)}
            </MenuItem>
          ))}
        </Select>
      ) : null}
      {typeFilter && selectedEntity ? (
        <SchedulePage {...{ filter: typeFilter, filteredEntityId: selectedEntity.id }} />
      ) : null}
    </>
  );
};
