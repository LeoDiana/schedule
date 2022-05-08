/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from 'react';
import './App.css';
import { commonEntitiesInfo } from './types/entitiesInfo';
import { Link } from 'react-router-dom';

function App() {
  // return <EntityPage {...academicStatusInfo} />;
  return (
    <>
      {Object.keys(commonEntitiesInfo).map((entityName) => (
        <Link key={entityName} to={`/${entityName}`}>
          {commonEntitiesInfo[entityName].name}
        </Link>
      ))}
    </>
  );
}

export default App;
