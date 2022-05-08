import {
  ENDPOINTS,
  createEntityApi,
  deleteEntityApi,
  readEntitiesApi,
  updateEntityApi,
} from '../api/apiCalls';
import CommonForm from '../forms/CommonForm';
import { Teacher } from './types';

const generateApiCallsObjectFor = (endpoint) => {
  return {
    readAll: () => readEntitiesApi(endpoint),
    create: (obj) => createEntityApi(obj, endpoint),
    update: (obj) => updateEntityApi(obj, endpoint),
    delete: (id) => deleteEntityApi(id, endpoint),
  };
};

const generateCommonFormFor = (formType, infoObj) => {
  return (obj) =>
    CommonForm(
      {
        title: `${formType} ${infoObj.name}`,
        type: formType,
        fields: infoObj.fields,
        apiCall: async (obj) => {
          return await infoObj.api[formType](obj);
        },
      },
      obj,
    );
};

export const academicStatusInfo = {
  name: 'Academic status',
  fields: {
    name: { label: 'Name', type: 'text' },
    shortName: { label: 'Short name', type: 'text' },
  },
  shortShownName: (obj) => {
    return `${obj.shortName}.`;
  },
  api: generateApiCallsObjectFor(ENDPOINTS.academicStatus),
  CreateForm: null,
  UpdateForm: null,
};
academicStatusInfo.CreateForm = generateCommonFormFor('create', academicStatusInfo);
academicStatusInfo.UpdateForm = generateCommonFormFor('update', academicStatusInfo);

export const teacherInfo = {
  name: 'Teacher',
  fields: {
    surname: { label: 'Surname', type: 'text' },
    firstName: { label: 'First name', type: 'text' },
    patronymic: { label: 'Patronymic', type: 'text' },
    academicStatus: {
      label: 'Academic status',
      type: 'entity',
      getEntitiesForList: async () => {
        return await readEntitiesApi(ENDPOINTS.academicStatus);
      },
      makeShortShownName: (obj) => academicStatusInfo.shortShownName(obj),
    },
  },
  shortShownName: (obj) => {
    return `${obj.surname} ${obj.firstName[0]}.${obj.patronymic[0]}.`;
  },
  api: generateApiCallsObjectFor(ENDPOINTS.teacher),
  CreateForm: null,
  UpdateForm: null,
};
teacherInfo.CreateForm = generateCommonFormFor('create', teacherInfo);
teacherInfo.UpdateForm = generateCommonFormFor('update', teacherInfo);

// export const teacherInfo = {
//   name: 'Name',
//   fields: {
//   },
//   shortShownName: (obj) => {
//     return `${obj.shortName}.`;
//   },
//   api: generateApiCallsObjectFor(ENDPOINTS.),
//   CreateForm: null,
//   UpdateForm: null,
// };
// academicStatusInfo.CreateForm = generateCommonFormFor('create', academicStatusInfo);
// academicStatusInfo.UpdateForm = generateCommonFormFor('update', academicStatusInfo);

const convertToKebab = (str) => {
  return str.toLowerCase().replace(' ', '-');
};

export const commonEntitiesInfo = {
  [convertToKebab(academicStatusInfo.name)]: academicStatusInfo,
  [convertToKebab(teacherInfo.name)]: teacherInfo,
};
