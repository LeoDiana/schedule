import { configureStore } from '@reduxjs/toolkit';
import entitiesReducer, { EntitiesInitialState } from '../features/entities/entitiesSlice';

export interface RootState {
  entities: EntitiesInitialState;
}

export default configureStore({
  reducer: {
    entities: entitiesReducer,
  },
});