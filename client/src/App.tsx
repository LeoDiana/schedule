/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from 'react';
import './App.css';
import { commonEntitiesInfo } from './common/entitiesInfo';
import { Link } from 'react-router-dom';
import { ScheduleFilter } from './components/ScheduleFilter';
import { SchedulePage } from './components/SchedulePage';

const convertToKebab = (str: string): string => {
  return str.replace(/[A-Z]/g, (match, offset, string) => {
    return (offset > 0 ? '-' : '') + match.toLowerCase();
  });
};

function App() {
  return (
    <>
      <ul>
        {Object.keys(commonEntitiesInfo).map((entityName) => (
          <li key={entityName}>
            <Link to={`/${convertToKebab(entityName)}`}>{commonEntitiesInfo[entityName].name}</Link>
          </li>
        ))}
      </ul>
      <ScheduleFilter />
    </>
  );
}

export default App;
