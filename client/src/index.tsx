import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store/app/store';
import { fetchEntities } from './store/features/entities/entitiesSlice';
import { Toaster } from 'react-hot-toast';

store.dispatch(fetchEntities());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster />
      <App />
    </Provider>
  </React.StrictMode>,
);

serviceWorker.unregister();
