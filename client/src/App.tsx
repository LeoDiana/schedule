import React from 'react';
import './App.css';
import { ScheduleFilter } from './components/ScheduleFilter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import ScheduleEditGrid from './components/ScheduleEditGrid';
import { useSelector } from 'react-redux';
import { selectStatus } from './features/entities/entitiesSlice';
import Home from './pages/Home';
import { ROUTES } from './common/routes';


function App() {
  const status = useSelector(selectStatus);

  return (
    <>
      {status === 'succeeded' ?
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path={ROUTES.view} element={<ScheduleFilter />} />
            <Route path={ROUTES.panel} element={<AdminPanel />} />
            <Route path={ROUTES.edit} element={<ScheduleEditGrid />} />
          </Routes>
        </BrowserRouter>
        : <p>Loading...</p>
      }
    </>

  );
}

export default App;

