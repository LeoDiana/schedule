/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { commonEntitiesInfo } from './common/entitiesInfo';
import { EntityPage } from './components/EntityPage';

const convertToKebab = (str: string): string => {
  return str.replace(/[A-Z]/g, (match, offset, string) => {
    return (offset > 0 ? '-' : '') + match.toLowerCase();
  });
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {Object.keys(commonEntitiesInfo).map((entityName) => (
            <Route
              key={entityName}
              path={`/${convertToKebab(entityName)}`}
              element={<EntityPage {...commonEntitiesInfo[entityName]} />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
