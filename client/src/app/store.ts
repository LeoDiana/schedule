import { configureStore } from '@reduxjs/toolkit';
import entitiesReducer from '../features/entities/entitiesSlice';

export default configureStore({
  reducer: {
    entities: entitiesReducer
  }
})