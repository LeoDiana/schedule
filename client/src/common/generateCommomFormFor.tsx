// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable react/display-name

import CommonForm from '../forms/CommonForm';
import React from 'react';
import { AllEntities, EntityInfoInterface, FormTypes } from './entitiesInfo';

export const ENTITY_SHOWN_NAMES: AllEntities<string> = {
  academicStatus: 'Academic status',
  teacher: 'Teacher',
  subject: 'Subject',
  lessonType: 'Lesson types',
  lessonTime: 'Lesson times',
  day: 'Days',
  weekType: 'Week types',
  building: 'Buildings',
  classroom: 'Classrooms',
  subgroup: 'Subgroups',
  lesson: 'Lessons',
};

export const generateCommonFormFor = (formType: FormTypes, infoObj: EntityInfoInterface) => {
  if (formType === 'create') {
    return () => (
      <CommonForm
        {...{
          formScheme: {
            title: `${formType} ${ENTITY_SHOWN_NAMES[infoObj.name]}`,
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
          title: `${formType} ${infoObj.name}`,
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
