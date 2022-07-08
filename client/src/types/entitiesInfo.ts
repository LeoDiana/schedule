import {
  ENDPOINTS,
  createEntityApi,
  deleteEntityApi,
  readEntitiesApi,
  updateEntityApi,
} from '../api/apiCalls';
import { generateCommonFormFor } from './generateCommomFormFor';

export type FormTypes = 'create' | 'update';

export interface AllEntities<T> {
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

export interface EntityInfoInterface {
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

const createAllEntities = (): AllEntities<EntityInfoInterface> => {
  type lvl0DependencyEntitiesNames =
    | 'academicStatus'
    | 'subject'
    | 'lessonType'
    | 'lessonTime'
    | 'day'
    | 'weekType'
    | 'building'
    | 'subgroup';
  type lvl1DependencyEntitiesNames = 'teacher' | 'classroom';
  type lvl2DependencyEntitiesNames = 'lesson';

  const lvl0DependencyEntities: { [K in lvl0DependencyEntitiesNames]: EntityInfoInterface } = {
    academicStatus: new EntityInfo(
      'academicStatus',
      {
        name: { label: 'Name', type: 'text' },
        shortName: { label: 'Short name', type: 'text' },
      },
      (obj) => {
        return `${obj.shortName}.`;
      },
    ),
    subject: new EntityInfo(
      'subject',
      {
        name: { label: 'Name', type: 'text' },
        shortName: { label: 'Short name', type: 'text' },
      },
      (obj) => {
        return `${obj.shortName}`;
      },
    ),
    lessonType: new EntityInfo(
      'lessonType',
      {
        name: { label: 'Name', type: 'text' },
        shortName: { label: 'Short name', type: 'text' },
      },
      (obj) => {
        return `${obj.shortName}.`;
      },
    ),
    lessonTime: new EntityInfo(
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
    day: new EntityInfo(
      'day',
      {
        name: { label: 'Name', type: 'text' },
      },
      (obj) => {
        return `${obj.name}`;
      },
    ),
    weekType: new EntityInfo(
      'weekType',
      {
        name: { label: 'Name', type: 'text' },
      },
      (obj) => {
        return `${obj.name}`;
      },
    ),
    building: new EntityInfo(
      'building',
      {
        name: { label: 'Name', type: 'text' },
        address: { label: 'Address', type: 'text' },
      },
      (obj) => {
        return `${obj.name}`;
      },
    ),
    subgroup: new EntityInfo(
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

  const createFieldOfEntityTypeLvl1 = (
    label: lvl0DependencyEntitiesNames,
  ): EntityInfoFieldComplex => {
    return {
      label,
      type: 'entity',
      getEntitiesForList: lvl0DependencyEntities[label].api.readAll,
      makeShortShownName: (obj) => lvl0DependencyEntities[label].shortShownName(obj),
    };
  };

  const lvl1DependencyEntities: { [K in lvl1DependencyEntitiesNames]: EntityInfoInterface } = {
    teacher: new EntityInfo(
      'teacher',
      {
        surname: { label: 'Surname', type: 'text' },
        firstName: { label: 'First name', type: 'text' },
        patronymic: { label: 'Patronymic', type: 'text' },
        academicStatus: createFieldOfEntityTypeLvl1('academicStatus'),
      },
      (obj) => {
        return `${obj.surname} ${obj.firstName[0]}.${obj.patronymic[0]}.`;
      },
    ),
    classroom: new EntityInfo(
      'classroom',
      {
        number: { label: 'Number', type: 'text' },
        capacity: { label: 'Capacity', type: 'number' },
        building: createFieldOfEntityTypeLvl1('building'),
      },
      (obj) => {
        return `${obj.number} ${commonEntitiesInfo['building'].shortShownName(obj.building)}`;
      },
    ),
  };

  const createFieldOfEntityTypeLvl2 = (
    label: lvl0DependencyEntitiesNames | lvl1DependencyEntitiesNames,
  ): EntityInfoFieldComplex => {
    const availableEntities = { ...lvl0DependencyEntities, ...lvl1DependencyEntities };
    return {
      label,
      type: 'entity',
      getEntitiesForList: availableEntities[label].api.readAll,
      makeShortShownName: (obj) => availableEntities[label].shortShownName(obj),
    };
  };

  const lvl2DependencyEntities: { [K in lvl2DependencyEntitiesNames]: EntityInfoInterface } = {
    lesson: new EntityInfo(
      'lesson',
      {
        teacher: createFieldOfEntityTypeLvl2('teacher'),
        subject: createFieldOfEntityTypeLvl2('subject'),
        lessonType: createFieldOfEntityTypeLvl2('lessonType'),
        lessonTime: createFieldOfEntityTypeLvl2('lessonTime'),
        classroom: createFieldOfEntityTypeLvl2('classroom'),
        day: createFieldOfEntityTypeLvl2('day'),
        weekType: createFieldOfEntityTypeLvl2('weekType'),
        subgroup: createFieldOfEntityTypeLvl2('subgroup'),
      },
      (obj) => {
        return `Lesson`; // TODO
      },
    ),
  };

  return {
    ...lvl0DependencyEntities,
    ...lvl1DependencyEntities,
    ...lvl2DependencyEntities,
  } as const;
};

export const commonEntitiesInfo: AllEntities<EntityInfoInterface> = createAllEntities();
