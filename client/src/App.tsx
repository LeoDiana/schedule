/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from 'react';
import './App.css';
import { ScheduleFilter } from './components/ScheduleFilter';
import ScheduleEditGrid from './components/ScheduleEditGrid';
import Schedule from './pages/Schedule';


function App() {
  return <>
    {/* <ScheduleFilter /> */}
    <ScheduleEditGrid />
  </>;
}

export default App;
