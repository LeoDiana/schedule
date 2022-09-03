import React from 'react';
import { AllEntities, AllEntitiesNames } from '../common/types';

const EntitiesContext = React.createContext<{ [K in AllEntitiesNames]: Array<AllEntities> }>({
  academicStatus: [],
  teacher: [],
});

export const EntitiesProvider = EntitiesContext.Provider;

export default EntitiesContext;