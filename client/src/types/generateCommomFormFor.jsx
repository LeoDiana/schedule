/* eslint-disable react/display-name */

import CommonForm from '../forms/CommonForm';
import React from 'react';

export const generateCommonFormFor = (formType, infoObj) => {
  if (formType === 'create') {
    return () => (
      <CommonForm
        {...{
          formScheme: {
            title: `${formType} ${infoObj.name}`,
            type: formType,
            fields: infoObj.fields,
            apiCall: async (obj) => {
              return await infoObj.api[formType](obj);
            },
          },
        }}
      />
    );
  }
  return (obj) => (
    <CommonForm
      {...{
        formScheme: {
          title: `${formType} ${infoObj.name}`,
          type: formType,
          fields: infoObj.fields,
          apiCall: async (obj) => {
            return await infoObj.api[formType](obj);
          },
        },
        obj,
      }}
    />
  );
};
