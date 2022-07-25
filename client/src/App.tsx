/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from 'react';
import './App.css';
import { commonEntitiesInfo } from './common/entitiesInfo';
import { Link } from 'react-router-dom';
import { ScheduleFilter } from './components/ScheduleFilter';
import { SchedulePage } from './pages/SchedulePage';
import { convertToKebab } from './common/utilities';
import { EntitiesListNavigator } from './components/EntitiesListNavigator';

function App() {
  return (
    <>
      <EntitiesListNavigator />
      <ScheduleFilter />
    </>
  );
}

export default App;
