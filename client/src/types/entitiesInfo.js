import {
  ENDPOINTS,
  createEntityApi,
  deleteEntityApi,
  readEntitiesApi,
  updateEntityApi,
} from '../api/apiCalls';
import CommonForm from '../forms/CommonForm';
import { Teacher } from './types';
import { generateCommonFormFor } from './generateCommomFormFor';

const generateApiCallsObjectFor = (endpoint) => {
  return {
    readAll: () => readEntitiesApi(endpoint),
    create: (obj) => createEntityApi(obj, endpoint),
    update: (obj) => updateEntityApi(obj, endpoint),
    delete: (id) => deleteEntityApi(id, endpoint),
  };
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

export const subjectInfo = {
  name: 'Subject',
  fields: {
    name: { label: 'Name', type: 'text' },
    shortName: { label: 'Short name', type: 'text' },
  },
  shortShownName: (obj) => {
    return `${obj.shortName}.`;
  },
  api: generateApiCallsObjectFor(ENDPOINTS.subject),
  CreateForm: null,
  UpdateForm: null,
};
subjectInfo.CreateForm = generateCommonFormFor('create', subjectInfo);
subjectInfo.UpdateForm = generateCommonFormFor('update', subjectInfo);

export const lessonTypeInfo = {
  name: 'Lesson type',
  fields: {
    name: { label: 'Name', type: 'text' },
    shortName: { label: 'Short name', type: 'text' },
  },
  shortShownName: (obj) => {
    return `${obj.shortName}.`;
  },
  api: generateApiCallsObjectFor(ENDPOINTS.lessonType),
  CreateForm: null,
  UpdateForm: null,
};
lessonTypeInfo.CreateForm = generateCommonFormFor('create', lessonTypeInfo);
lessonTypeInfo.UpdateForm = generateCommonFormFor('update', lessonTypeInfo);

export const lessonTimeInfo = {
  name: 'Lesson time',
  fields: {
    number: { label: 'Number', type: 'text' },
    timeStart: { label: 'Time start', type: 'text' },
    timeEnd: { label: 'Time end', type: 'text' },
  },
  shortShownName: (obj) => {
    return `${obj.number} ${obj.timeStart}`;
  },
  api: generateApiCallsObjectFor(ENDPOINTS.lessonTime),
  CreateForm: null,
  UpdateForm: null,
};
lessonTimeInfo.CreateForm = generateCommonFormFor('create', lessonTimeInfo);
lessonTimeInfo.UpdateForm = generateCommonFormFor('update', lessonTimeInfo);

export const dayInfo = {
  name: 'Day',
  fields: {
    name: { label: 'Name', type: 'text' },
  },
  shortShownName: (obj) => {
    return `${obj.name}`;
  },
  api: generateApiCallsObjectFor(ENDPOINTS.day),
  CreateForm: null,
  UpdateForm: null,
};
dayInfo.CreateForm = generateCommonFormFor('create', dayInfo);
dayInfo.UpdateForm = generateCommonFormFor('update', dayInfo);

export const weekTypeInfo = {
  name: 'Week type',
  fields: {
    name: { label: 'Name', type: 'text' },
  },
  shortShownName: (obj) => {
    return `${obj.name}`;
  },
  api: generateApiCallsObjectFor(ENDPOINTS.weekType),
  CreateForm: null,
  UpdateForm: null,
};
weekTypeInfo.CreateForm = generateCommonFormFor('create', weekTypeInfo);
weekTypeInfo.UpdateForm = generateCommonFormFor('update', weekTypeInfo);

export const buildingInfo = {
  name: 'Building',
  fields: {
    name: { label: 'Name', type: 'text' },
    address: { label: 'Address', type: 'text' },
  },
  shortShownName: (obj) => {
    return `${obj.name}`;
  },
  api: generateApiCallsObjectFor(ENDPOINTS.building),
  CreateForm: null,
  UpdateForm: null,
};
buildingInfo.CreateForm = generateCommonFormFor('create', buildingInfo);
buildingInfo.UpdateForm = generateCommonFormFor('update', buildingInfo);

export const classroomInfo = {
  name: 'Classroom',
  fields: {
    number: { label: 'Number', type: 'text' },
    capacity: { label: 'Capacity', type: 'number' },
    building: {
      label: 'Building',
      type: 'entity',
      getEntitiesForList: async () => {
        return await readEntitiesApi(ENDPOINTS.building);
      },
      makeShortShownName: (obj) => buildingInfo.shortShownName(obj),
    },
  },
  shortShownName: (obj) => {
    return `${obj.number} ${obj.building.makeShortShownName(obj)}`;
  },
  api: generateApiCallsObjectFor(ENDPOINTS.classroom),
  CreateForm: null,
  UpdateForm: null,
};
classroomInfo.CreateForm = generateCommonFormFor('create', classroomInfo);
classroomInfo.UpdateForm = generateCommonFormFor('update', classroomInfo);

export const subgroupInfo = {
  name: 'Group',
  fields: {
    name: { label: 'Name', type: 'text' },
    groupName: { label: 'Group name', type: 'text' },
    studentsNumber: { label: 'Students number', type: 'number' },
  },
  shortShownName: (obj) => {
    return `${obj.groupName} ${obj.name}`;
  },
  api: generateApiCallsObjectFor(ENDPOINTS.subgroup),
  CreateForm: null,
  UpdateForm: null,
};
subgroupInfo.CreateForm = generateCommonFormFor('create', subgroupInfo);
subgroupInfo.UpdateForm = generateCommonFormFor('update', subgroupInfo);

const convertToKebab = (str) => {
  return str.toLowerCase().replace(' ', '-');
};

export const commonEntitiesInfo = {
  [convertToKebab(academicStatusInfo.name)]: academicStatusInfo,
  [convertToKebab(teacherInfo.name)]: teacherInfo,
  [convertToKebab(subjectInfo.name)]: subjectInfo,
  [convertToKebab(lessonTypeInfo.name)]: lessonTypeInfo,
  [convertToKebab(lessonTimeInfo.name)]: lessonTimeInfo,
  [convertToKebab(dayInfo.name)]: dayInfo,
  [convertToKebab(weekTypeInfo.name)]: weekTypeInfo,
  [convertToKebab(buildingInfo.name)]: buildingInfo,
  [convertToKebab(classroomInfo.name)]: classroomInfo,
  [convertToKebab(subgroupInfo.name)]: subgroupInfo,
};
