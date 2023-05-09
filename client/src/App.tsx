import React from 'react';
import './App.css';
import { ViewSchedulePage } from './pages/viewSchedule/ViewSchedulePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPanelPage from './pages/adminPanel/AdminPanelPage';
import EditSchedulePage from './pages/editSchedule/EditSchedulePage';
import { useSelector } from 'react-redux';
import { selectStatus } from './store/features/entities/entitiesSlice';
import Home from './pages/home/Home';
import { ROUTES } from './common/routes';
import { Spinner } from './components/Spinner';


function App() {
  const status = useSelector(selectStatus);

  const isLoading = status !== 'succeeded';

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path={ROUTES.view} element={<ViewSchedulePage />} />
        <Route path={ROUTES.panel} element={<AdminPanelPage />} />
        <Route path={ROUTES.edit} element={<EditSchedulePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

