import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AdminPanel from "./pages/AdminPanel";
import Schedule from "./pages/Schedule";
// import { commonEntitiesInfo } from './common/entitiesInfo';
// import { EntityPage } from './pages/EntityPage';
// import { convertToKebab } from './common/utilities';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        {/* {Object.keys(commonEntitiesInfo).map((entityName) => ( */}
        {/*   <Route */}
        {/*     key={entityName} */}
        {/*     path={`/${convertToKebab(entityName)}`} */}
        {/*     element={<EntityPage {...commonEntitiesInfo[entityName]} />} */}
        {/*   /> */}
        {/* ))} */}
        <Route path="admin-panel" element={<AdminPanel/>}/>
        <Route path="schedule" element={<Schedule/>}/>
      </Routes>
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
