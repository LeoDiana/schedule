// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable react/display-name

import CommonForm from './CommonForm';
import React from 'react';
import { AllEntities, EntityInfoInterface, FormTypes } from '../common/entitiesInfo';
import { ENTITY_SHOWN_NAMES } from '../common/constants';
import { capitalize } from '../common/utilities';

export const generateCommonFormFor = (formType: FormTypes, infoObj: EntityInfoInterface) => {
  if (formType === 'create') {
    return () => (
      <CommonForm
        {...{
          formScheme: {
            title: `${capitalize(formType)} ${ENTITY_SHOWN_NAMES[infoObj.name]}`,
            type: formType,
            fields: infoObj.fields,
            apiCall: async (obj: any) => {
              return await infoObj.api[formType](obj);
            },
          },
        }}
      />
    );
  }
  return (obj: any) => (
    <CommonForm
      {...{
        formScheme: {
          title: `${capitalize(formType)} ${ENTITY_SHOWN_NAMES[infoObj.name]}`,
          type: formType,
          fields: infoObj.fields,
          apiCall: async (obj: any) => {
            return await infoObj.api[formType](obj);
          },
        },
        obj,
      }}
    />
  );
};
