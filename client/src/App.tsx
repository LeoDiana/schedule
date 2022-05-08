/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from 'react';
import './App.css';
import { commonEntitiesInfo } from './types/entitiesInfo';
import { Link } from 'react-router-dom';

function App() {
  // return <EntityPage {...academicStatusInfo} />;
  return (
    <ul>
      {Object.keys(commonEntitiesInfo).map((entityName) => (
        <li key={entityName}>
          <Link to={`/${entityName}`}>{commonEntitiesInfo[entityName].name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default App;
