import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPanel from "./pages/AdminPanel";
import ScheduleEditGrid from './components/ScheduleEditGrid';
import { Provider } from 'react-redux';
import store from './app/store';
import { fetchEntities } from './features/entities/entitiesSlice';

store.dispatch(fetchEntities());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="admin-panel" element={<AdminPanel/>}/>
        <Route path="edit-schedule" element={<ScheduleEditGrid/>}/>
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
