import {
  ENDPOINTS,
  createEntityApi,
  deleteEntityApi,
  readEntitiesApi,
  updateEntityApi,
} from '../api/apiCalls';
import { Teacher } from './types';
import { generateCommonFormFor } from './generateCommomFormFor';

export default interface AllEntities<T> {
  academicStatus: T;
  teacher: T;
  subject: T;
  lessonType: T;
  lessonTime: T;
  day: T;
  weekType: T;
  building: T;
  classroom: T;
  subgroup: T;
  lesson: T;
}

const generateApiCallsObjectFor = (endpoint: string): ApiEndpoints => {
  return {
    readAll: () => readEntitiesApi(endpoint),
    create: (obj: any) => createEntityApi(obj, endpoint),
    update: (obj: any) => updateEntityApi(obj, endpoint),
    delete: (id: string) => deleteEntityApi(id, endpoint),
  };
};

type EntityInfoFieldTypes = 'text' | 'number' | 'entity';

interface EntityInfoFieldSimple {
  label: string;
  type: EntityInfoFieldTypes;
}

interface EntityInfoFieldComplex extends EntityInfoFieldSimple {
  type: 'entity';
  getEntitiesForList: () => Promise<any>;
  makeShortShownName: (obj: any) => string;
}

interface EntityInfoFields {
  [name: string]: EntityInfoFieldSimple | EntityInfoFieldComplex;
}

interface ApiEndpoints {
  readAll: () => Promise<any[]>;
  create: (obj: any) => Promise<string>;
  update: (obj: any) => Promise<string>;
  delete: (id: string) => Promise<string>;
}

interface EntityInfoInterface {
  name: string;
  fields: EntityInfoFields;
  shortShownName: (obj: any) => string;
  api: ApiEndpoints;
  CreateForm: any;
  UpdateForm: any;
}

class EntityInfo implements EntityInfoInterface {
  name: string;
  fields: EntityInfoFields;
  shortShownName: (obj: any) => string;
  api: ApiEndpoints;
  CreateForm: any;
  UpdateForm: any;

  constructor(
    name: keyof AllEntities<any>,
    fields: EntityInfoFields,
    shortShownName: (obj: any) => string,
  ) {
    this.name = name;
    this.fields = fields;
    this.shortShownName = shortShownName;

    this.api = generateApiCallsObjectFor(ENDPOINTS[name]);
    this.CreateForm = generateCommonFormFor('create', this);
    this.UpdateForm = generateCommonFormFor('update', this);
  }
}

const convertToKebab = (str: string) => {
  return str.toLowerCase().replace(' ', '-');
};

// TODO don't use here convertToKebab
export const commonEntitiesInfo = {
  [convertToKebab('Academic status')]: new EntityInfo(
    'academicStatus',
    {
      name: { label: 'Name', type: 'text' },
      shortName: { label: 'Short name', type: 'text' },
    },
    (obj) => {
      return `${obj.shortName}.`;
    },
  ),
  [convertToKebab('Subject')]: new EntityInfo(
    'subject',
    {
      name: { label: 'Name', type: 'text' },
      shortName: { label: 'Short name', type: 'text' },
    },
    (obj) => {
      return `${obj.shortName}`;
    },
  ),
  [convertToKebab('Lesson type')]: new EntityInfo(
    'lessonType',
    {
      name: { label: 'Name', type: 'text' },
      shortName: { label: 'Short name', type: 'text' },
    },
    (obj) => {
      return `${obj.shortName}.`;
    },
  ),
  [convertToKebab('Lesson time')]: new EntityInfo(
    'lessonTime',
    {
      number: { label: 'Number', type: 'text' },
      timeStart: { label: 'Time start', type: 'text' },
      timeEnd: { label: 'Time end', type: 'text' },
    },
    (obj) => {
      return `${obj.number} ${obj.timeStart}`;
    },
  ),
  [convertToKebab('Day')]: new EntityInfo(
    'day',
    {
      name: { label: 'Name', type: 'text' },
    },
    (obj) => {
      return `${obj.name}`;
    },
  ),
  [convertToKebab('Week Type')]: new EntityInfo(
    'weekType',
    {
      name: { label: 'Name', type: 'text' },
    },
    (obj) => {
      return `${obj.name}`;
    },
  ),
  [convertToKebab('Building')]: new EntityInfo(
    'building',
    {
      name: { label: 'Name', type: 'text' },
      address: { label: 'Address', type: 'text' },
    },
    (obj) => {
      return `${obj.name}`;
    },
  ),
  [convertToKebab('Group')]: new EntityInfo(
    'subgroup',
    {
      name: { label: 'Name', type: 'text' },
      groupName: { label: 'Group name', type: 'text' },
      studentsNumber: { label: 'Students number', type: 'number' },
    },
    (obj) => {
      return `${obj.groupName} ${obj.name}`;
    },
  ),
};

const createFieldOfEntityType = (label: string): EntityInfoFieldComplex => {
  return {
    label,
    type: 'entity',
    getEntitiesForList: commonEntitiesInfo[convertToKebab(label)].api.readAll,
    makeShortShownName: (obj) => commonEntitiesInfo[convertToKebab(label)].shortShownName(obj),
  };
};

commonEntitiesInfo[convertToKebab('Teacher')] = new EntityInfo(
  'teacher',
  {
    surname: { label: 'Surname', type: 'text' },
    firstName: { label: 'First name', type: 'text' },
    patronymic: { label: 'Patronymic', type: 'text' },
    academicStatus: createFieldOfEntityType('Academic status'),
  },
  (obj) => {
    return `${obj.surname} ${obj.firstName[0]}.${obj.patronymic[0]}.`;
  },
);

commonEntitiesInfo[convertToKebab('Classroom')] = new EntityInfo(
  'classroom',
  {
    number: { label: 'Number', type: 'text' },
    capacity: { label: 'Capacity', type: 'number' },
    building: createFieldOfEntityType('Building'),
  },
  (obj) => {
    return `${obj.number} ${commonEntitiesInfo[convertToKebab('Building')].shortShownName(
      obj.building,
    )}`;
  },
);

commonEntitiesInfo[convertToKebab('Lesson')] = new EntityInfo(
  'lesson',
  {
    teacher: createFieldOfEntityType('Teacher'),
    subject: createFieldOfEntityType('Subject'),
    lessonType: createFieldOfEntityType('Lesson type'),
    lessonTime: createFieldOfEntityType('Lesson time'),
    classroom: createFieldOfEntityType('Classroom'),
    day: createFieldOfEntityType('Day'),
    weekType: createFieldOfEntityType('Week type'),
    subgroup: createFieldOfEntityType('Subgroup'),
  },
  (obj) => {
    return `Lesson`; // TODO
  },
);
